import { Button, Grid, Typography } from '@material-ui/core'
import DataTable from 'components/dataTable'
import Layout from 'components/layout'
import Loader from 'components/loader'
import Modal from 'components/modal'
import Pagination from 'components/pagination'
import SearchArea from 'components/searchArea'
import { TABLE_TITLES } from 'constants/tableValue'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchAllOrders, updateAdminOrderQuery } from 'redux/actions/admin/orderActions'
import { style } from 'styles/orderList'
import clsx from 'clsx'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import Icon from 'icomoons/Icon'
import OrderFilter from 'components/pages/adminPortal/order/orderFilter'
import { checkIfEmpty, getBase64 } from 'utils/helpers'
import { cancelOrders, downloadXlsxFile } from 'redux/actions/orderActions'

const useStyles = style

/**
 * Orders
 * @returns
 */
function Orders({ fetchAllOrders, orders, cancelOrders, downloadXlsxFile, updateAdminOrderQuery }) {
  const classes = useStyles()
  const [loader, setloader] = useState(false)
  const [toggleModal, settoggleModal] = useState(false)
  const [data, setdata] = useState({})
  const [filter, setfilter] = useState(false)
  const route = useRouter()
  const [tableLoader, settableLoader] = useState(false)
  const adminQuery = useSelector((state) => state?.adminOrders?.adminOrderQuery)
  const [tableTitles, settableTitles] = useState(TABLE_TITLES['ADMIN_ORDER_LIST'])
  const [isSort, setIsSort] = useState(5)

  useEffect(async () => {
    await updateAdminOrderQuery(adminQuery)
    const res = await fetchAllOrders(adminQuery)
    if (res) {
      setloader(false)
    }
  }, [])

  const handleNonetwork = () => {
    NotificationManager.error('No active internet connection.', '', 10000)
    setloader(false)
  }
  /**
   *handleDelete
   */
  const handleDelete = async () => {
    if (navigator.onLine) {
      setloader(true)
      const res = await cancelOrders({
        orderGuid: data?.guid,
        orderStatus: 5
      })
      if (res?.statusCode === 200) {
        NotificationManager.success('Order has been cancelled', '', 2000)
        const res = await fetchAllOrders(adminQuery)
        if (res) {
          settoggleModal(false)
          setdata({})
          setloader(false)
        }
      }
      if (res?.StatusCode === 400) {
        settoggleModal(false)
        setdata({})
        setloader(false)
        NotificationManager.error(res?.Response?.Message, '', 10000)
      }
    } else {
      handleNonetwork()
    }
  }

  /**
   * sortFunction
   * @param {*} titleObj
   */
  const sortFunction = async (titleObj, key) => {
    console.log(titleObj)
    const newTitleObj = tableTitles.map((obj) => {
      if (obj.id === titleObj.id) {
        return {
          ...obj,
          isAscending: key
        }
      }
      return { ...obj, isAscending: false }
    })
    settableTitles(newTitleObj)
    setIsSort(titleObj.id)
    handleAllApis({
      sortColumn: titleObj?.apiName,
      sortDirection: key
    })
  }

  /**
   * handleSearch
   * @param {*} param0
   */
  const handleSearch = ({ target }) => {
    handleAllApis({
      searchKey: target.value,
      pageIndex: target.value === '' ? adminQuery?.pageIndex : 0
    })
  }

  const handleAllApis = async (newQuery) => {
    if (navigator.onLine) {
      setloader(true)
      const res = await fetchAllOrders({
        ...adminQuery,
        ...newQuery
      })
      updateAdminOrderQuery({
        ...adminQuery,
        ...newQuery
      })
      if (res) {
        setloader(false)
      }
    } else {
      handleNonetwork()
    }
  }
  /**
   * handleStatusChange
   * @param {*} status
   * @param {*} item
   */
  const handleStatusChange = async (status, item) => {
    if (navigator.onLine) {
      switch (status) {
        case 1:
          route.push(`/admin/orders/${item.guid}`)
          break
        case 2:
          setdata(orders?.orders?.find((val) => val?.guid === item?.guid))
          settoggleModal(true)
          break
        case 3:
          const res = await downloadXlsxFile({
            orderGuids: [item?.guid],
            timeZoneOffset: new Date().getTimezoneOffset() * -1
          })
          if (res?.statusCode >= 200 && res?.statusCode <= 300 && res?.response) {
            const {
              response: { fileContents }
            } = res
            if (fileContents) {
              getBase64(fileContents, item?.displayId)
            }
          }
          if (
            (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res?.hasError) &&
            res?.StatusCode !== 401
          ) {
            NotificationManager.error(
              res?.Response?.Message
                ? res?.Response?.Message
                : 'Something went wrong, please refresh the page',
              '',
              10000
            )
          }
          break

        default:
          break
      }
    } else {
      handleNonetwork()
    }
  }
  /**
   * handleApiCall
   * @param {*} date
   */
  const handleApiCall = async (date) => {
    if (navigator.onLine) {
      await setloader(true)
      await setfilter(false)
      const from = await moment(date?.from).set({ hour: 0, minute: 0, second: 0 })
      const to = await moment(date?.to).set({ hour: 23, minute: 59, second: 59 })
      const fromUtc = await moment.utc(from).local().format()
      const toUtc = await moment.utc(to).local().format()
      handleAllApis({
        orderType: parseInt(date?.orderType) === 0 ? null : parseInt(date?.orderType),
        orderSource: parseInt(date?.sources?.value),
        createdFrom: date?.from ? fromUtc : null,
        createdTill: date?.to ? toUtc : null,
        pageIndex: 0,
        pageSize: adminQuery?.pageSize
      })
    } else {
      handleNonetwork()
    }
  }

  const rerenderPage = async (link) => {
    if (navigator?.onLine) {
      if (link === '/admin/orders') route.reload()
      updateAdminOrderQuery({
        sortColumn: 'orderDate',
        sortDirection: 'desc',
        pageIndex: 0,
        pageSize: 10,
        customerId: null,
        createdFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        createdTill: new Date()
      })
    }
  }

  return (
    <Layout handleOnClick={rerenderPage}>
      {loader && <Loader />}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className={classes.bgTab_Info}>
          <div className={classes.tabFlex}>
            <div className={classes.tabInfo_Head}>
              <Typography variant='h3'>Orders</Typography>
            </div>
            <div className={classes.filterArea}>
              <div className={classes.searchFilter}>
                <SearchArea
                  placeholder='Search'
                  handleSearch={handleSearch}
                  className={classes.searchOrder}
                  searchValue={adminQuery.searchKey ? adminQuery.searchKey : ''}
                />
                <div className={classes.order_Btn}>
                  <Button
                    type='submit'
                    endIcon={<Icon icon='drop-down' size={18} />}
                    startIcon={<Icon icon='filter-list' size={18} />}
                    onClick={() => setfilter(!filter)}
                    variant='outlined'
                  >
                    Filter
                  </Button>
                </div>
                {filter && (
                  <OrderFilter
                    appliedFilters={{
                      from: adminQuery?.createdFrom ? moment(adminQuery?.createdFrom).toDate() : '',
                      to: adminQuery?.createdTill ? moment(adminQuery?.createdTill).toDate() : '',
                      orderType: adminQuery?.orderType?.toString() || '0',
                      sources: adminQuery?.orderSource
                    }}
                    apiCall={handleApiCall}
                    setfilter={() => setfilter(false)}
                    handleClose={(qry) => {
                      setfilter(false)
                      handleAllApis({
                        orderType: parseInt(qry?.orderType) === 0 ? null : parseInt(qry?.orderType),
                        orderSource: parseInt(qry?.sources?.value),
                        createdFrom: qry?.from,
                        createdTill: qry?.to,
                        pageIndex: 0,
                        pageSize: adminQuery?.pageSize
                      })
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* <!--table--> */}
          <div className={classes.tableWrapper}>
            <DataTable
              sortFunction={sortFunction}
              isAscDescSort={true}
              tableTitles={tableTitles}
              lists={orders?.orders?.map((val) =>
                val?.source === 5 ? { ...val, displayId: `${val?.displayId} *` } : val
              )}
              tableLoader={tableLoader}
              nodataMessage={'No orders found !'}
              statusChanger={handleStatusChange}
              options={[
                { status: 1, label: 'View', icon: 'eye-show', key: 'edit' },
                { status: 3, label: 'Download', icon: 'file_download', key: 'download' },
                { status: 2, key: 'admin_cancelled', label: 'Cancel', icon: 'delete' }
              ]}
              isSort={isSort}
            />
            {orders && orders.totalCount ? (
              <>
                <Typography
                  variant='h4'
                  className={classes.cancelTitle}
                  style={{ marginTop: '4px' }}
                >
                  * refers to the orders imported via csv file
                </Typography>
                <Typography
                  variant='h4'
                  className={classes.cancelTitle}
                  style={{ marginTop: '4px' }}
                >
                  The orders in orange text are test orders
                </Typography>
              </>
            ) : null}
          </div>
          {/* <!--table--> */}
          {/* <!--pagination--> */}
          {!checkIfEmpty(orders?.orders) && (
            <div className={classes.tabPagination}>
              <Pagination
                pageSize={adminQuery?.pageSize}
                currentPage={adminQuery?.pageIndex}
                handleOnClick={async (index) => {
                  if (navigator?.onLine) {
                    await setloader(true)
                    handleAllApis({ pageIndex: index - 1 })
                  } else {
                    handleNonetwork()
                  }
                }}
                totalCount={orders?.totalCount}
                handlePageSizeChange={async (value) => {
                  if (navigator.onLine) {
                    await setloader(true)
                    handleAllApis({ pageSize: value, pageIndex: 0 })
                  } else {
                    handleNonetwork()
                  }
                }}
                handlePageNation={async (index) => {
                  if (navigator.onLine) {
                    await setloader(true)
                    handleAllApis({ pageIndex: index - 1 })
                  } else {
                    handleNonetwork()
                  }
                }}
              />
            </div>
          )}
          {/* <!--pagination--> */}
        </div>
      </Grid>
      {/* <!--cancel Modal--> */}
      <Modal open={toggleModal} handleClose={() => settoggleModal(false)} title='Cancel order'>
        <div className={classes.deleteModal}>
          <Typography variant='h4' className={classes.cancelTitle}>
            Are you sure you want to cancel the order <span> {data?.displayId} </span>?
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
                {data?.customerName || '---'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography variant='h4' className={classes.orderLabel}>
                Merch maker #
              </Typography>
              <Typography variant='body2' className={classes.orderContent}>
                {data?.displayId || '---'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography variant='h4' className={classes.orderLabel}>
                Order date
              </Typography>
              <Typography variant='body2' className={classes.orderContent}>
                {moment(moment.utc(data?.orderDate)).local().format('YYYY-MMM-DD hh:mm A') || '---'}
              </Typography>
            </Grid>
            {data?.productNames?.length > 0 && (
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
                    {data.productNames.map((t) => `${t}`).join(',')}
                  </Typography>
                  {data?.productNames?.length - data?.productNames?.slice(0, 2)?.length > 0 && (
                    <div className={classes.orderNum}>
                      +{data?.productNames?.length - data?.productNames?.slice(0, 2)?.length}
                    </div>
                  )}
                </div>
              </Grid>
            )}
          </Grid>
          <div className={classes.orderAmount}>
            <div style={{ marginRight: 8 }}>
              <Icon icon='dollar-amount' size={20} />
            </div>
            <div>
              <Typography variant='body1'>Order amount </Typography>
              <Typography variant='h3'>${data?.amount}</Typography>
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
      </Modal>
      {/* <!--cancel Modal--> */}
    </Layout>
  )
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({
  orders: state?.adminOrders?.adminOrders?.response,
  template: state?.orderReducer?.template?.response,
  orderQuery: state?.orderReducer?.orderQuery,
  allConnectedStores: state?.userStore?.allConnectedStores,
  userSessionShopify: state?.user?.userSessionShopify,
  shopifyAuth: state?.shopify?.shopifyAuth
})

/**
 * mapDispatchToProps
 */
const mapDispatchToProps = {
  fetchAllOrders,
  cancelOrders,
  downloadXlsxFile,
  updateAdminOrderQuery
}
//Export
export default connect(mapStateToProps, mapDispatchToProps)(Orders)
