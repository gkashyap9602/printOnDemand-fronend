import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import Loader from 'components/loader'
import EditOrderDetail from 'components/pages/orders/addOrder/EditOrderDetail'
import { style } from 'styles/createOrder'
import { connect } from 'react-redux'
import { getAccontDetails } from 'redux/actions/userActions'
import { fetchOrderDetails, updateOrder, updateVariantsOfOrders } from 'redux/actions/orderActions'
import { NotificationManager } from 'react-notifications'
import { useRouter } from 'next/router'
import VariantOfOrder from 'components/pages/orders/addOrder/VariantOfOrder'
import { checkIfEmpty, decryptId } from 'utils/helpers'
const useStyles = style

/**
 * Edit Order page
 * @param {*} param0
 * @returns
 */
const EditOrder = ({
  variants,
  productLibraryVariantLength,
  orderDetail,
  address,
  updateOrder,
  updateVariantsOfOrders,
  fetchOrderDetails,
  productLibrary,
  userDetails,
  shopifyAuth
}) => {
  const classes = useStyles()
  const [lineItems, setlineItems] = useState({})
  const [loader, setloader] = useState(false)
  const route = useRouter()

  /**
   * fetch order details api
   */
  useEffect(async () => {
    setloader(true)
    const res = await fetchOrderDetails(route.query?.orderId)
    if (res) {
      setloader(false)
    }
  }, [route.query?.orderId])

  /**
   * update data in redux
   */
  useEffect(() => {
    route?.query?.history !== 'product'
      ? updateVariantsOfOrders({
          variants: orderDetail?.lineItems.map((item) => ({
            costPrice: item?.price,
            quantity: item?.quantity,
            guid: item?.guid,
            name: item?.productTitle || 'test',
            libraryVariantId: item?.productLibraryVarientId,
            productLibraryVariantImages: item?.images || [],
            productVarientOptions: item?.variantOptions
          })),
          productId: orderDetail?.lineItems?.[0]?.guid
        })
      : updateVariantsOfOrders({
          variants: productLibrary?.productLibraryVariants.map((item) => item).filter(Boolean),
          productId: productLibrary?.guid
        })
  }, [orderDetail, productLibrary])

  /**
   * update Orders submit
   * @param {*} value
   */
  const handleSubmit = async (value) => {
    if (navigator.onLine) {
      if (checkIfEmpty(lineItems)) {
        NotificationManager.error('Varaints are required', '', 10000)
      } else if (orderDetail?.status === 2) {
        NotificationManager.warning('Only shipping information can be updated', '', 3000)
      } else {
        setloader(true)
        const res = await updateOrder({
          orderType: value.orderType,
          shippingMethodId: value.shippingMethodId,
          shippingAccountNumber: value.shippingAccountNumber,
          status: 1,
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
            contactPhone: address?.shippingAddress?.contactPhone,
            taxId: address?.shippingAddress?.taxId
          },
          billingAddress: {
            name: address?.billingAddress?.contactName || address?.billingAddress?.name,
            companyName: address?.billingAddress?.companyName,
            address1: address?.billingAddress?.address1,
            address2: address?.billingAddress?.address2,
            city: address?.billingAddress?.city,
            state: address?.billingAddress?.stateName || address?.billingAddress?.state,
            country: address?.billingAddress?.country,
            zipCode: address?.billingAddress?.zipCode,
            companyEmail: address?.billingAddress?.companyEmail,
            contactPhone: address?.billingAddress?.contactPhone,
            taxId: address?.billingAddress?.taxId
          },
          customerId: shopifyAuth ? userDetails?.customerId : decryptId(userDetails?.customerId),
          orderPlacedOn: new Date(),
          orderLineItems: lineItems.map(({ totalPrice, ...keepAttrs }) => keepAttrs),
          orderGuid: orderDetail?.guid
        })
        if (res) {
          setloader(false)
        }
        if (res?.statusCode === 200) {
          NotificationManager.success('Order has been successfully updated', '', 3000)
          route.push(`/orders/${orderDetail?.guid}`)
        } else if (res?.StatusCode === 400) {
          res?.Response?.ValidationErrors?.map((txt) => NotificationManager.error(txt, '', 10000))
        }
      }
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
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
              <Typography variant='h3'>Update order</Typography>
            </div>
            <BreadCrumb routes={[{ name: 'Order list', link: '/' }, { name: 'Order details' }]} />
            <VariantOfOrder
              variants={variants}
              isProduction={orderDetail?.status === 2 || orderDetail?.status === 6}
              productId={orderDetail?.lineItems?.[0]?.productLibraryGuid}
              handleCount={(itm) => setlineItems(itm)}
              productLibraryVariantLength={productLibraryVariantLength}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className={classes.orderDetail}>
            <EditOrderDetail
              isProduction={orderDetail?.status === 2 || orderDetail?.status === 6}
              handleSubmit={handleSubmit}
              orderDetail={orderDetail}
            />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({
  productLibraryVariantLength:
    state.productLibrary.productLibraryDetails?.response?.productLibraryVariants?.length,
  productLibrary: state.productLibrary.productLibraryDetails?.response,
  variants: state.orderReducer?.variants?.variants,
  productId: state.orderReducer?.variants?.productId,
  address: state.orderReducer?.address,
  orderDetail: state?.orderReducer?.orderDetails?.response,
  userDetails: state?.user?.userDetails,
  shopifyAuth: state?.shopify?.shopifyAuth
})

/**
 * mapDispatchToProps
 */
const mapDispatchToProps = {
  getAccontDetails,
  updateOrder,
  updateVariantsOfOrders,
  fetchOrderDetails
}

//export
export default connect(mapStateToProps, mapDispatchToProps)(EditOrder)
