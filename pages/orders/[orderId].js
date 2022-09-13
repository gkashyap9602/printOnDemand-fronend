import { Button, Grid, Typography } from '@material-ui/core'
import BreadCrumb from 'components/breadcrumb'
import CommonTab from 'components/CommonTab'
import Layout from 'components/layout'
import Loader from 'components/loader'
import Modal from 'components/modal'
import clsx from 'clsx'
import CardBlock from 'components/pages/orders/card'
import {
  BILLING_INFORMATION,
  OrderDetailsTab,
  ORDER_INFORMATION,
  SHPPING_INFORMATION
} from 'constants/fields'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { connect } from 'react-redux'
import { cancelOrders, fetchOrderDetails, updateVariantsOfOrders } from 'redux/actions/orderActions'
import { calculateAmountOfOrder, getObjectValue } from 'utils/helpers'
import Icon from 'icomoons/Icon'
import { style } from 'styles/orderDetail'
import DataTable from 'components/dataTable'
import { TABLE_TITLES } from 'constants/tableValue'

/**
 * Order details page
 * @param {*} param0
 * @returns
 */
function OrderDetails({
  fetchOrderDetails,
  order,
  cancelOrders,
  userDetails,
  updateVariantsOfOrders
}) {
  const [active, setactive] = useState(OrderDetailsTab?.[0])
  const useStyles = style
  const classes = useStyles()
  const [toggleModal, settoggleModal] = useState(false)
  const route = useRouter()
  const [loader, setloader] = useState(false)
  /*
   * useEffect
   */
  useEffect(async () => {
    setloader(true)
    const res = await fetchOrderDetails(route.query?.orderId)
    if (res) {
      setloader(false)
    }
  }, [route.query?.orderId])

  /**
   * handleOnTabChange
   * @param {*} item
   */
  const handleOnTabChange = (item) => {
    if (navigator.onLine) {
      setactive(item)
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }

  /**
   *handleDelete
   */
  const handleDelete = async () => {
    if (navigator.onLine) {
      const res = await cancelOrders({
        orderGuid: order?.guid,
        orderStatus: 5
      })
      if (res?.statusCode === 200) {
        settoggleModal(false)
        NotificationManager.success('Order has been cancelled', '', 2000)
        fetchOrderDetails(route.query?.orderId)
      }
      if (res?.StatusCode === 400) {
        settoggleModal(false)
        NotificationManager.error(res?.Response?.Message, '', 10000)
      }
    } else {
      NotificationManager.error('No active internet connection', '', 1000)
    }
  }

  /**
   * handleEditOrder
   */
  const handleEditOrder = () => {
    if (navigator.onLine) {
      updateVariantsOfOrders({
        variants: order?.lineItems.map((item) => ({
          costPrice: item?.price,
          quantity: item?.quantity,
          name: item?.productTitle || 'test',
          libraryVariantId: item?.productLibraryVarientId,
          productLibraryVariantImages: item?.images || [],
          productVarientOptions: item?.variantOptions
        })),
        productId: order?.lineItems?.[0]?.guid
      })
      route.push(`/orders/edit/${route.query.orderId}`)
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }

  //HTML
  return (
    <Layout>
      {loader && <Loader />}
      {/* <!--new--> */}
      <div className={classes.bgOrderDetail}>
        <div className={classes.orderDetail_Head}>
          <div style={{ flexGrow: 1 }}>
            <div className={classes.orderHead}>
              <Typography variant='h3'>
                Order #{order?.displayId}{' '}
                <span className={classes.spanOrder}>
                  {(() => {
                    switch (order?.status) {
                      case 1:
                        return 'New'
                      case 2:
                        return 'In production'
                      case 3:
                        return 'Error'
                      case 4:
                        return 'Shipped'
                      case 5:
                        return 'Cancelled'
                      case 6:
                        return 'Received'
                      default:
                        return 'Cancelled'
                    }
                  })()}
                </span>
              </Typography>
            </div>
            <BreadCrumb
              routes={[{ name: 'Order list', link: '/orders' }, { name: 'Order details' }]}
            />
          </div>
          <div className={classes.detail_Action}>
            {order?.status === 1 &&
              (order?.source === 1 || order?.source === 5 || order?.source === 2) && (
                <Button
                  type='submit'
                  variant='outlined'
                  className={classes.btnCancel_order}
                  onClick={() => settoggleModal(true)}
                >
                  Cancel order
                </Button>
              )}
            {order?.status !== 5 &&
              order?.status !== 4 &&
              order?.status !== 3 &&
              (order?.source === 1 || order?.source === 2) &&
              userDetails?.status !== 2 && (
                <Button
                  type='submit'
                  variant='outlined'
                  onClick={handleEditOrder}
                  startIcon={<Icon icon='edit-icon' size={18} color='#8a8a9e' />}
                >
                  Edit order
                </Button>
              )}
          </div>
        </div>

        <div className={classes.detailTab_Pad}>
          <CommonTab
            tab={OrderDetailsTab}
            count={order?.lineItems?.length}
            tabChange={handleOnTabChange}
            showItemCount={false}
            className={classes.tabOrderDetail}
            tabClass={classes.tabFlex}
            activeClass={classes.tabActivate}
          />

          {active.id === 1 && (
            <>
              <div className={classes.orderDetail_Root}>
                <Typography variant='body2'>Order information</Typography>
                <Grid container spacing={3} direction='row' className={classes.orderGrid_Row}>
                  {ORDER_INFORMATION?.map((info) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className={classes.orderGrid}>
                      <Typography variant='body1'> {info?.label}</Typography>
                      <Typography variant='body2'>
                        {info.type === 'date'
                          ? moment(moment.utc(order?.[info.name]))
                              .local()
                              .format('YYYY-MMM-DD hh:mm A')
                          : order?.[info.name] || getObjectValue(order, info.name) || '---'}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div className={classes.orderDetail_Root}>
                <Typography variant='body2'>Shipping information</Typography>
                <Grid container spacing={3} direction='row' className={classes.orderGrid_Row}>
                  {SHPPING_INFORMATION?.map((info) => (
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.orderGrid}>
                      <Typography variant='body1'> {info?.label}</Typography>

                      {info?.name === 'shippingAddress' ? (
                        <Typography variant='body2'>
                          {`${order?.shippingAddress?.address1},${
                            order?.shippingAddress?.address2
                              ? order?.shippingAddress?.address2 + ','
                              : ''
                          }
                        ${order?.shippingAddress?.country},
                        ${order?.shippingAddress?.state},
                        ${order?.shippingAddress?.city},
                        ${order?.shippingAddress?.zipCode}
                          `}
                        </Typography>
                      ) : (
                        <Typography variant='body2'>
                          {order?.[info.name] || getObjectValue(order, info.name) || '---'}
                        </Typography>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div className={classes.orderDetail_Root}>
                <Typography variant='body2'>Billing information</Typography>
                <Grid container spacing={3} direction='row' className={classes.orderGrid_Row}>
                  {BILLING_INFORMATION?.map((info) => (
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.orderGrid}>
                      <Typography variant='body1'> {info?.label}</Typography>
                      {info?.name === 'billingAddress' ? (
                        <Typography variant='body2'>
                          {`${order?.billingAddress?.address1},${
                            order?.billingAddress?.address2
                              ? order?.billingAddress?.address2 + ','
                              : ''
                          }
                        ${order?.billingAddress?.country},
                        ${order?.billingAddress?.state},
                        ${order?.billingAddress?.city},
                        ${order?.billingAddress?.zipCode}
                          `}
                        </Typography>
                      ) : (
                        <Typography variant='body2'>
                          {order?.[info.name] || getObjectValue(order, info.name) || '---'}
                        </Typography>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div className={classes.orderAmount}>
                <div style={{ marginRight: 8 }}>
                  <Icon icon='dollar-amount' size={20} />
                </div>
                <div>
                  <Typography variant='body1'>Order amount</Typography>
                  <Typography variant='h3'>${calculateAmountOfOrder(order?.lineItems)}</Typography>
                </div>
              </div>
            </>
          )}
          {active?.id === 2 && (
            <>
              {order?.source === 5 ? (
                <DataTable tableTitles={TABLE_TITLES.ORDER_VARIANT} lists={order?.lineItems} />
              ) : (
                <Grid container spacing={3} direction='row'>
                  {order?.lineItems?.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item?.guid}>
                      <CardBlock item={item} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </div>
      </div>
      {/* <!--cancel Modal--> */}
      <Modal open={toggleModal} handleClose={() => settoggleModal(false)} title='Cancel order'>
        {/* <!--new--> */}
        <div className={classes.deleteModal}>
          <Typography variant='h4' className={classes.cancelTitle}>
            Are you sure you want to cancel the order <span> {order?.displayId} </span>?
          </Typography>
          <div className={classes.cancelIcon}>
            <Icon icon='orders-error' size={100} />
          </div>
          <Grid container spacing={3} direction='row' className={classes.gridRoot}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography variant='h4' className={classes.orderLabel}>
                Customer name
              </Typography>
              <Typography variant='body2' className={classes.orderContent}>
                {order?.customerName || '---'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography variant='h4' className={classes.orderLabel}>
                Order #
              </Typography>
              <Typography variant='body2' className={classes.orderContent}>
                {order?.displayId || '---'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography variant='h4' className={classes.orderLabel}>
                Order date
              </Typography>
              <Typography variant='body2' className={classes.orderContent}>
                {moment(moment.utc(order?.orderDate)).local().format('YYYY-MMM-DD hh:mm A') ||
                  '---'}
              </Typography>
            </Grid>
            {order?.productNames?.length > 0 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant='h4' className={classes.orderLabel}>
                  Order items
                </Typography>
                <div className={classes.flex_Item}>
                  <Typography
                    variant='body2'
                    className={clsx(classes.orderContent)}
                    style={{ maxWidth: '88%', marginRight: 10 }}
                  >
                    {order.productNames.map((t) => `${t}`).join(', ')}
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>
          <div className={classes.orderAmount}>
            <div style={{ marginRight: 8 }}>
              <Icon icon='dollar-amount' size={20} />
            </div>
            <div>
              <Typography variant='body1'>Order amount</Typography>
              <Typography variant='h3'>${calculateAmountOfOrder(order?.lineItems)}</Typography>
            </div>
          </div>
          <div className={classes.btnActions}>
            <Button className={classes.btnClose} onClick={() => settoggleModal(false)}>
              Close
            </Button>
            <Button
              className={classes.btnCancel}
              variant='outlined'
              endIcon={<Icon icon='delete' size={18} />}
              onClick={handleDelete}
            >
              Cancel order
            </Button>
          </div>
        </div>
        {/* <!--new--> */}
      </Modal>
      {/* <!--cancel Modal--> */}
    </Layout>
  )
}

//Map state to props
const mapStateToProps = (state) => ({
  order: state?.orderReducer?.orderDetails?.response,
  userDetails: state.user.userDetails
})

//Map dispatch to props
const mapDispatchToProps = {
  fetchOrderDetails,
  cancelOrders,
  updateVariantsOfOrders
}

//export
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
