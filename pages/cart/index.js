import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import AddOrder from 'components/pages/orders/addOrder'
import Loader from 'components/loader'
import BillingDetail from 'components/pages/orders/addOrder/billingDetail'
import { style } from 'styles/createOrder'
import { connect } from 'react-redux'
import { ISSERVER } from 'constants/routePaths'
import { getAccontDetails } from 'redux/actions/userActions'
import {
  createOrders,
  updateVariantsOfOrders,
  fetchCartItems,
  placeOrder,
  updateField
} from 'redux/actions/orderActions'
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications'
import { checkIfEmpty } from 'utils/helpers'
import Modal from 'components/modal'
import Image from 'next/image'
import AlertBanner from '/static/images/alert-banner.png'
import { getProductLibraryDetail } from 'redux/actions/productLibraryActions'
import { EU_UK_COUNTRIES } from 'constants/fields'
const useStyles = style

/**
 * CreateOrder
 * @param {*} param0
 * @returns
 */
const Cart = ({
  variants,
  productId,
  productLibraryVariantLength,
  getAccontDetails,
  address,
  getProductLibraryDetail,
  updateVariantsOfOrders,
  userAccountDetails,
  fetchCartItems,
  placeOrder,
  updateField,
  userDetails
}) => {
  const classes = useStyles()
  const [lineItems, setlineItems] = useState({})
  const route = useRouter()
  const [open, setopen] = useState(false)
  const [disable, setdisable] = useState(false)
  const [type, setType] = useState({})
  const [loader, setloader] = useState(false)
  const FEDEX = [
    'FED_SO',
    'FED_PO',
    'FED_2DAC',
    'FED_2DAR',
    'FED_GR',
    'FED_GC',
    'FED_GH',
    'INT_FED_ECO',
    'INT_FED_PRI',
    'INT_FED_FST'
  ]
  /**
   * useEffect
   */
  useEffect(async () => {
    if (userDetails?.guid) {
      setloader(true)
      const result = await updateVariantsOfOrders({
        productId: route.query.productId
      })
    }
  }, [userDetails])

  useEffect(async () => {
    const res = await fetchCartItems()
    console.log('res')
    console.log(res)
    if (res?.StatusCode === 400) {
      setloader(false)
      updateField([])
    }
    if (res) {
      setloader(false)
    }
  }, [])

  /**
   * handleSubmit
   * @param {*} value
   */
  const handleSubmit = async (value) => {
    if (checkIfEmpty(address?.billingAddress)) {
      NotificationManager.error('Billing address is required', '', 10000)
    } else if (checkIfEmpty(address?.shippingAddress)) {
      NotificationManager.error('Shipping address is required', '', 10000)
    } else if (checkIfEmpty(variants)) {
      NotificationManager.error('Add one or more product variants to place an order', '', 10000)
    } else {
      setdisable(true)
      setloader(true)
      const res = await placeOrder({
        OrderType: parseInt(type?.OrderType),
        shippingMethodId: type?.shippingMethodId,
        shippingAccountNumber: type?.shippingAccountNumber,
        receipt: type?.receipt,
        preship: type?.preship,
        ioss: EU_UK_COUNTRIES?.map((v) => v?.code)?.includes(address?.shippingAddress?.country)
          ? type?.ioss
          : null,
        cartItems: EU_UK_COUNTRIES?.map((v) => v?.code)?.includes(address?.shippingAddress?.country)
          ? lineItems?.map((val) => ({
              guid: val?.guid,
              hsCode: val?.hsCode,
              declaredValue: val?.declaredValue
            }))
          : null,

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
        submitImmediately: value
      })
      console.log(res)
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
        NotificationManager.error(res?.Response?.Message, '', 10000)
        setopen(false)
      }
    }
  }

  //Layout
  return (
    <Layout>
      {loader && <Loader />}
      <div className={classes.bgCreateOrder}>
        <Grid container spacing={3} direction='row' className={classes.rootOrder}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: 16 }}>
            <div className={classes.createHead}>
              <Typography variant='h3'>Your order(s)</Typography>
            </div>
            {/* <BreadCrumb
              routes={[{ name: 'Order list', link: '/orders' }, { name: 'Order details' }]}
            /> */}
            {/* {JSON.stringify(lineItems)} */}
            <AddOrder
              variants={variants}
              productId={productId}
              isEuOrUk={EU_UK_COUNTRIES?.map((v) => v?.code)?.includes(
                address?.shippingAddress?.country
              )}
              handleCount={(itm) => setlineItems(itm)}
              handleloader={(val) => setloader(val)}
              productLibraryVariantLength={productLibraryVariantLength}
            />
          </Grid>
          {/* {JSON.stringify(lineItems)}
          {JSON.stringify(lineItems.map((val) => checkIfEmpty(val?.hsCode)))} */}
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className={classes.orderDetail}>
            <BillingDetail
              isEuOrUk={EU_UK_COUNTRIES?.map((v) => v?.code)?.includes(
                address?.shippingAddress?.country
              )}
              handleSubmit={(values) => {
                if (
                  FEDEX?.includes(values?.shipMethod) &&
                  checkIfEmpty(values?.shippingAccountNumber)
                ) {
                  NotificationManager.error(
                    'Kindly enter a shipping account number for the selected shipping method',
                    '',
                    10000
                  )
                } else if (
                  address?.shippingAddress?.country !== 'US' &&
                  values?.shipMethod === 'GS1'
                ) {
                  NotificationManager.error(
                    'Flat rate shipping method is not allowed for international orders',
                    '',
                    10000
                  )
                } else if (checkIfEmpty(address?.billingAddress)) {
                  NotificationManager.error('Billing address is required', '', 10000)
                } else if (checkIfEmpty(address?.shippingAddress)) {
                  NotificationManager.error('Shipping address is required', '', 10000)
                } else if (values?.isPreship && checkIfEmpty(values?.preship)) {
                  NotificationManager.error(
                    'Please provide URL for custom preship labels',
                    '',
                    10000
                  )
                } else if (
                  EU_UK_COUNTRIES?.map((v) => v?.code)?.includes(
                    address?.shippingAddress?.country
                  ) &&
                  !lineItems.map((val) => checkIfEmpty(val?.hsCode)).every((v) => v === false)
                ) {
                  NotificationManager.error('Please provide HS code of each variant', '', 10000)
                } else if (
                  EU_UK_COUNTRIES?.map((v) => v?.code)?.includes(
                    address?.shippingAddress?.country
                  ) &&
                  !lineItems
                    .map((val) => checkIfEmpty(val?.declaredValue))
                    .every((v) => v === false)
                ) {
                  NotificationManager.error(
                    'Please provide declared value of each variant',
                    '',
                    10000
                  )
                } else if (
                  EU_UK_COUNTRIES?.map((v) => v?.code)?.includes(
                    address?.shippingAddress?.country
                  ) &&
                  checkIfEmpty(values?.ioss)
                ) {
                  NotificationManager.error('Please provide IOSS', '', 10000)
                } else if (checkIfEmpty(variants)) {
                  NotificationManager.error(
                    'Add one or more product variants to place an order',
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
  variants: state.orderReducer?.addVariants?.response,
  productId: state.orderReducer?.addVariants?.productId,
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
  updateVariantsOfOrders,
  fetchCartItems,
  placeOrder,
  updateField
}
// export
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
