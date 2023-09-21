import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import AddOrder from 'components/pages/orders/addOrder'
import Loader from 'components/loader'
import BillingDetail from 'components/pages/orders/addOrder/billingDetail'
import { style } from 'styles/createOrder'
import { connect } from 'react-redux'
import { getAccontDetails } from 'redux/actions/userActions'
import { createOrders, updateVariantsOfOrders } from 'redux/actions/orderActions'
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications'
import { checkIfEmpty, decryptId } from 'utils/helpers'
import Modal from 'components/modal'
import Image from 'next/image'
import AlertBanner from '/static/images/alert-banner.png'
import { getProductLibraryDetail } from 'redux/actions/productLibraryActions'
const useStyles = style

/**
 * Create Order page
 * @param {*} param0
 * @returns
 */
const CreateOrder = ({
  variants,
  productId,
  productLibraryVariantLength,
  getAccontDetails,
  address,
  createOrders,
  getProductLibraryDetail,
  updateVariantsOfOrders,
  userAccountDetails,
  userDetails
}) => {
  const classes = useStyles()
  const [lineItems, setlineItems] = useState({})
  const route = useRouter()
  const [open, setopen] = useState(false)
  const [disable, setdisable] = useState(false)
  const [type, setType] = useState({})
  const [loader, setloader] = useState(false)

  /**
   * Initial fetch
   */
  useEffect(async () => {
    if (userDetails?._id) {
      setloader(true)
      const res = await getAccontDetails(userDetails?._id)
      const data = await getProductLibraryDetail(route?.query?.productId)
      const result = await updateVariantsOfOrders({
        variants: data?.response?.productLibraryVariants.map((item) => item),
        productId: route.query.productId
      })
      if (result) {
        setloader(false)
      }
    }
  }, [userDetails])

  /**
   * handle create order submit
   * @param {*} value
   */
  const handleSubmit = async (value) => {
    if (checkIfEmpty(address?.billingAddress)) {
      NotificationManager.error('Billing address is required', '', 10000)
    } else if (checkIfEmpty(address?.shippingAddress)) {
      NotificationManager.error('Shipping address is required', '', 10000)
    } else if (checkIfEmpty(variants)) {
      NotificationManager.error('Add one or more product variants to place an order', '', 10000)
    } else if (checkIfEmpty(userAccountDetails?.response?.paymentDetails)) {
      NotificationManager.error(
        'You must update your payment information in order to place an order',
        '',
        10000
      )
    } else {
      setdisable(true)
      setloader(true)
      const res = await createOrders({
        OrderType: parseInt(type.OrderType),
        status: 1,
        orderSource: 1,
        shippingAddress: {
          name: address?.shippingAddress?.contactName,
          companyName: address?.shippingAddress?.companyName,
          address1: address?.shippingAddress?.address1,
          address2: address?.shippingAddress?.address2,
          city: address?.shippingAddress?.city,
          state: address?.shippingAddress?.stateName,
          country: address?.shippingAddress?.country,
          zipCode: address?.shippingAddress?.zipCode,
          companyEmail: address?.shippingAddress?.companyEmail,
          contactPhone:
            address?.shippingAddress?.contactPhone || address?.shippingAddress?.companyPhone,
          taxId: address?.shippingAddress?.taxId
        },
        billingAddress: {
          name: address?.billingAddress?.contactName,
          companyName: address?.billingAddress?.companyName,
          address1: address?.billingAddress?.address1,
          address2: address?.billingAddress?.address2,
          city: address?.billingAddress?.city,
          state: address?.billingAddress?.stateName,
          country: address?.billingAddress?.country,
          zipCode: address?.billingAddress?.zipCode,
          companyEmail: address?.billingAddress?.companyEmail,
          contactPhone:
            address?.billingAddress?.contactPhone || address?.billingAddress?.companyPhone,
          taxId: address?.billingAddress?.taxId
        },
        customerId: decryptId(userDetails?.customerId),
        orderPlacedOn: new Date(),
        orderLineItems: lineItems,
        submitImmediately: value
      })
      if (res) {
        setloader(false)
      }
      if (res?.statusCode === 200) {
        setdisable(false)
        if (value) {
          NotificationManager.success('The order is placed without a delay', '', 3000)
        } else {
          NotificationManager.success('The order is placed with a delay', '', 3000)
        }
        route.push('/orders')
      } else if (res.StatusCode === 12002 || res.StatusCode >= 400) {
        setdisable(false)
        res?.Response?.ValidationErrors?.map((txt) => NotificationManager.error(txt, '', 10000))
      }
    }
  }

  //HTML
  return (
    <Layout>
      {loader && <Loader />}
      <div className={classes.bgCreateOrder}>
        <Grid container spacing={3} direction='row' className={classes.rootOrder}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: 16 }}>
            <div className={classes.createHead}>
              <Typography variant='h3'>New order</Typography>
            </div>
            <BreadCrumb
              routes={[{ name: 'Order list', link: '/orders' }, { name: 'Order details' }]}
            />
            <AddOrder
              variants={variants}
              productId={productId}
              handleCount={(itm) => setlineItems(itm)}
              handleloader={(val) => setloader(val)}
              productLibraryVariantLength={productLibraryVariantLength}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className={classes.orderDetail}>
            <BillingDetail
              handleSubmit={(values) => {
                if (checkIfEmpty(address?.billingAddress)) {
                  NotificationManager.error('Billing address is required', '', 10000)
                } else if (checkIfEmpty(address?.shippingAddress)) {
                  NotificationManager.error('Shipping address is required', '', 10000)
                } else if (checkIfEmpty(variants)) {
                  NotificationManager.error(
                    'Add one or more product variants to place an order',
                    '',
                    10000
                  )
                } else if (checkIfEmpty(userAccountDetails?.response?.paymentDetails)) {
                  NotificationManager.error(
                    'You must update your payment information in order to place an order',
                    '',
                    10000
                  )
                } else {
                  setType(values)
                  setopen(true)
                }
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Modal open={open} handleClose={() => setopen(false)}>
        <div className={classes.order_Banner}>
          <Image src={AlertBanner} alt='Delay Banner' />
        </div>
        <Typography variant='body2' className={classes.orderDelay_Popup}>
          Would you like to submit the order without the default delay?
        </Typography>
        <Typography variant='h4' style={{ marginTop: 4, lineHeight: '22px', marginBottom: 10 }}>
          Please note that if you choose 'Yes', your order will be submitted to the MWW system and
          you will not be able to Edit/Cancel the order.
        </Typography>
        <Box display='flex' justifyContent='flex-end' width='100%' className={classes.wrapper_Btn}>
          <Button
            className={classes.btnOrder}
            variant='contained'
            disabled={disable}
            onClick={() => handleSubmit(true)}
          >
            Yes
          </Button>
          <Button
            className={classes.btnOrder_Close}
            disabled={disable}
            onClick={() => handleSubmit(false)}
          >
            No
          </Button>
        </Box>
      </Modal>
    </Layout>
  )
}

//Map state to props
const mapStateToProps = (state) => ({
  productLibraryVariantLength:
    state.productLibrary.productLibraryDetails?.response?.productLibraryVariants?.length,
  variants: state.orderReducer?.variants?.variants,
  productId: state.orderReducer?.variants?.productId,
  address: state.orderReducer?.address,
  productLibrary: state.productLibrary.productLibraryDetails?.response,
  userAccountDetails: state.user.userAccountDetails,
  userDetails: state?.user?.userDetails
})

// map dispatch to props
const mapDispatchToProps = {
  getAccontDetails,
  createOrders,
  getProductLibraryDetail,
  updateVariantsOfOrders
}
// export
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
