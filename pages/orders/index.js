import { Button, Grid, Typography } from '@material-ui/core'
import CommonTab from 'components/CommonTab'
import DataTable from 'components/dataTable'
import Layout from 'components/layout'
import Loader from 'components/loader'
import Modal from 'components/modal'
import Pagination from 'components/pagination'
import SearchArea from 'components/searchArea'
import { orderTab } from 'constants/fields'
import { TABLE_TITLES } from 'constants/tableValue'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { usePrevious } from 'utils/hooks'

import {
  bulkOrderImport,
  cancelOrders,
  fetchAllOrders,
  fetchOrderTemplate,
  downloadXlsxFile,
  updateOrderQuery
} from 'redux/actions/orderActions'
import { getAllConnectedStores } from 'redux/actions/userStoreActions'
import { style } from 'styles/orderList'
import clsx from 'clsx'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import Icon from 'icomoons/Icon'
import PushDelay from 'components/pages/orders/pushDelay'
import FileUpload from 'pages/fileUpload'
import atob from 'atob'
import OrderFilter from 'components/orderFilter'
import { checkIfEmpty } from 'utils/helpers'
const useStyles = style

/**
 * Orders list page
 * @returns
 */
function Orders({
  fetchAllOrders,
  orders,
  cancelOrders,
  fetchOrderTemplate,
  downloadXlsxFile,
  template,
  orderQuery,
  updateOrderQuery,
  allConnectedStores,
  getAllConnectedStores,
  shopifyAuth,
  userDetails
}) {
  const classes = useStyles()
  const [loader, setloader] = useState(false)
  const [toggleModal, settoggleModal] = useState(false)
  const [delay, setdelay] = useState(false)
  const [data, setdata] = useState({})
  const [bulkOrder, setbulkOrder] = useState(false)
  const [filter, setfilter] = useState(false)
  const [isSort, setIsSort] = useState(5)
  const [tableTitles, setTableTitles] = useState([])
  const route = useRouter()
  const [currentTab, setcurrentTab] = useState({})
  const [tableLoader, settableLoader] = useState(false)
  const previousQuery = usePrevious(orderQuery)
  const [isCheck, setIsCheck] = useState([])

  /**
   * Fetch all orders
   */

  useEffect(() => {
    if (!shopifyAuth) {
      setloader(true)
    }
    updateOrderQuery({ ...orderQuery, customerId: userDetails?.customerGuid })
    if (orderQuery?.sortId) {
      setIsSort(orderQuery?.sortId)
      const newTitleObj = TABLE_TITLES['ORDER_LIST'].map((obj) => {
        if (obj.id === orderQuery?.sortId) {
          return {
            ...obj,
            isAscending: !obj.isAscending
          }
        }
        return obj
      })
      setTableTitles(newTitleObj)
    } else {
      setTableTitles(TABLE_TITLES['ORDER_LIST'])
    }
  }, [userDetails])

  /**
   * Fetch all connected store
   */
  useEffect(() => {
    if (filter) {
      const data = {
        customerGuid: userDetails?.customerGuid,
        storeType: null
      }
      getAllConnectedStores(data)
    }
  }, [filter, userDetails])

  /**
   * fetch order sample template
   */
  useEffect(async () => {
    if (JSON.stringify(previousQuery) !== JSON.stringify(orderQuery)) {
      let storeList = []
      if (orderQuery.storeIds && orderQuery.storeIds.length && orderQuery.storeIds.length > 0) {
        orderQuery.storeIds.map((store) => (storeList = [...storeList, store.value]))
      }
      const newValues = {
        ...orderQuery,
        customerId: orderQuery?.customerId ? orderQuery?.customerId : userDetails?.customerGuid,
        storeIds: storeList
      }
      if (orderQuery?.customerId) {
        fetchOrderTemplate()
        await fetchAllOrders(newValues)
      }
      setloader(false)
      settableLoader(false)
    }
  }, [orderQuery, userDetails])

  /**
   * Reset checkbox when page index changed
   */
  useEffect(() => {
    setIsCheck([])
  }, [orderQuery?.pageIndex])

  /**
   * Handle all no network scenarios
   */
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
        const res = await fetchAllOrders(orderQuery)
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
   * handle tab change
   */
  const handleOnTabChange = async (item) => {
    if (item?.id === 2 || item?.id === 3) {
      setTableTitles(tableTitles.filter((ele) => ele?.apiName !== 'mwwOrderId'))
    } else {
      setTableTitles(TABLE_TITLES['ORDER_LIST'])
    }
    setcurrentTab(item)
    setloader(true)
    updateOrderQuery({
      ...orderQuery,
      pageIndex: 0,
      status: item.key
    })
  }
  /**
   * sortFunction
   * @param {*} titleObj
   */
  const sortFunction = async (titleObj, key) => {
    if (navigator.onLine) {
      await settableLoader(true)
      const newTitleObj = await tableTitles.map((obj) => {
        if (obj.id === titleObj.id) {
          return {
            ...obj,
            isAscending: key
          }
        }
        return { ...obj, isAscending: false }
      })
      setTableTitles(newTitleObj)
      updateOrderQuery({
        ...orderQuery,
        sortColumn: titleObj.sortName,
        sortDirection: key,
        sortId: titleObj.id
      })
      await setIsSort(titleObj.id)
    } else {
      handleNonetwork()
    }
  }

  /**
   * Search orders
   * @param {*} param0
   */
  const handleSearch = async ({ target }) => {
    if (navigator.onLine) {
      setloader(true)
      updateOrderQuery({ ...orderQuery, searchKey: target.value, pageIndex: 0 })
    } else {
      handleNonetwork()
    }
  }

  /**
   * action change in orders
   * @param {*} status
   * @param {*} item
   */
  const handleStatusChange = async (status, item) => {
    if (navigator.onLine) {
      switch (status) {
        case 1:
          route.push(`/orders/${item.guid}`)
          break
        case 2:
          setdata(orders?.orders?.find((val) => val?.guid === item?.guid))
          settoggleModal(true)
        default:
          break
      }
    } else {
      handleNonetwork()
    }
  }

  const handleDownload = async () => {
    NotificationManager.warning('The order(s) will be downloaded shortly', '', 2000)
    const res = await downloadXlsxFile({
      orderGuids: isCheck,
      timeZoneOffset: new Date().getTimezoneOffset() * -1
    })
    if (res?.statusCode >= 200 && res?.statusCode <= 300 && res?.response) {
      const {
        response: { fileContents }
      } = res
      setIsCheck([])

      if (fileContents) {
        getBase64(fileContents)
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
  }

  /**
   * s2ab
   * @param {*} s
   * @returns
   */
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  /**
   * getBase64
   * @param {*} file
   * @returns
   */
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      var blob = new Blob([s2ab(atob(file))], {
        type: ''
      })
      let objectURL = window.URL.createObjectURL(blob)
      let anchor = document.createElement('a')
      anchor.href = objectURL
      const today = moment().format('YYYY-MMM-DD hh:mm A')
      anchor.download =
        isCheck.length === 1
          ? orders?.orders?.filter((ele) => ele.guid === isCheck[0])[0]?.displayId + '.xlsx'
          : `Order-${today}.xlsx`
      anchor.click()
    })
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
      updateOrderQuery({
        ...orderQuery,
        orderType: parseInt(date?.orderType) === 0 ? null : parseInt(date?.orderType),
        storeIds: date?.filterStores,
        createdFrom: date?.from ? fromUtc : null,
        createdTill: date?.to ? toUtc : null,
        pageIndex: 0,
        pageSize: 10
      })
    } else {
      handleNonetwork()
    }
  }

  /**
   * handle checkbox
   */
  const checkBoxHandler = (e, list) => {
    if (list?.source === 5) {
      NotificationManager.warning('Not possible to select bulk orders', '', 2000)
    } else {
      const isSelected = isCheck?.includes(list.guid)
      if (isSelected) {
        const valueUpdated = isCheck.filter((item) => item !== list.guid)
        setIsCheck(valueUpdated)
      } else {
        setIsCheck([...isCheck, list.guid])
      }
    }
  }

  /**
   * select all fields in checkbox except bulk orders
   */
  const selectAllField = (e) => {
    if (e.target.checked) {
      // const allChecked = orders?.orders?.map((item) => item?.guid)

      //Select orders except bulk orders
      const allChecked = orders?.orders
        ?.filter((ele) => ele.source !== 5)
        ?.map((item) => item?.guid)
      setIsCheck(allChecked)
    } else {
      setIsCheck([])
    }
  }

  /**
   * Re render page on sidebar click
   * @param {*} orderQuery
   */
  const rerenderPage = async (orderQuery) => {
    if (navigator?.onLine) {
      setloader(true)
      if (!orderQuery.customerId) {
        updateOrderQuery({ ...orderQuery, customerId: userDetails?.customerGuid })
      }
      const res = await fetchAllOrders({ ...orderQuery, customerId: userDetails?.customerGuid })
      res && setloader(false)
    }
  }

  //HTML
  return (
    <Layout handleOnClick={() => rerenderPage(orderQuery)}>
      {loader && <Loader />}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CommonTab
          tab={orderTab}
          tabChange={handleOnTabChange}
          statusSummary={orders?.statusSummary}
          query={orderQuery}
          isFromOrder={true}
        />
        <div className={classes.bgTab_Info}>
          <div className={classes.tabFlex}>
            <div className={classes.tabInfo_Head}>
              <Typography variant='h3'>Orders</Typography>
            </div>
            <div className={classes.filterArea}>
              <div className={classes.searchFilter}>
                {delay && <PushDelay handleClose={() => setdelay(!delay)} />}
                <Button
                  type='submit'
                  startIcon={<Icon icon='file_download' size={18} />}
                  onClick={handleDownload}
                  variant='contained'
                  disabled={isCheck.length === 0}
                  style={{ marginRight: 8 }}
                  className={classes.download_Btn_Filt}
                >
                  Download
                </Button>
                <SearchArea
                  placeholder='Search'
                  handleSearch={handleSearch}
                  className={classes.searchOrder}
                  searchValue={orderQuery.searchKey ? orderQuery.searchKey : null}
                />
                <div className={clsx(classes.order_Btn, classes.order_Delay)}>
                  <Button
                    type='submit'
                    endIcon={<Icon icon='drop-down' size={18} />}
                    onClick={() => setdelay(!delay)}
                    variant='outlined'
                  >
                    Submission delay
                  </Button>
                </div>
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
                    appliedDate={{
                      from: orderQuery?.createdFrom ? moment(orderQuery?.createdFrom).toDate() : '',
                      to: orderQuery?.createdTill ? moment(orderQuery?.createdTill).toDate() : '',
                      orderType: orderQuery?.orderType?.toString() || null,
                      filterStores: orderQuery?.storeIds
                    }}
                    apiCall={handleApiCall}
                    setfilter={() => setfilter(false)}
                    handleClose={async () => {
                      setfilter(false)
                      setloader(true)
                      updateOrderQuery({
                        ...orderQuery,
                        orderType: null,
                        createdFrom: null,
                        createdTill: null,
                        storeIds: []
                      })
                    }}
                    storeList={allConnectedStores?.response}
                  />
                )}
              </div>
              <div className={classes.order_Btn}>
                <Button
                  type='submit'
                  onClick={() => setbulkOrder(!bulkOrder)}
                  variant='outlined'
                  startIcon={<Icon icon='add-icon' size={16} />}
                >
                  Excel upload
                </Button>
              </div>
              <Button
                type='submit'
                variant='contained'
                startIcon={<Icon icon='add-icon' size={16} />}
                className={classes.orderBtn_New}
                onClick={() => {
                  if (navigator.onLine) {
                    route.push('/productlibrary')
                  } else {
                    handleNonetwork()
                  }
                }}
              >
                New order
              </Button>
            </div>
          </div>

          {/* <!--table--> */}
          <div className={classes.tableWrapper}>
            <DataTable
              sortFunction={sortFunction}
              tableTitles={tableTitles}
              isAscDescSort={true}
              lists={orders?.orders?.map((val) =>
                val?.source === 5 ? { ...val, displayId: `${val?.displayId} *` } : val
              )}
              tableLoader={tableLoader}
              nodataMessage={'No orders found !'}
              statusChanger={handleStatusChange}
              options={[
                { status: 1, label: 'View', icon: 'eye-show', key: 'edit' },
                currentTab?.key !== 5 && {
                  status: 2,
                  key: 'cancelled',
                  label: 'Cancel',
                  icon: 'delete'
                }
              ]}
              isSort={isSort}
              isCheck={isCheck}
              isExtraFieldReq={true}
              PageId={'order_page'}
              checkBoxHandler={checkBoxHandler}
              selectAllField={selectAllField}
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
                pageSize={orderQuery?.pageSize}
                currentPage={orderQuery?.pageIndex}
                handleOnClick={async (index) => {
                  if (navigator?.onLine) {
                    await setloader(true)
                    updateOrderQuery({ ...orderQuery, pageIndex: index - 1 })
                  } else {
                    handleNonetwork()
                  }
                }}
                totalCount={orders?.totalCount}
                handlePageSizeChange={async (value) => {
                  if (navigator.onLine) {
                    await setloader(true)
                    updateOrderQuery({ ...orderQuery, pageSize: value, pageIndex: 0 })
                  } else {
                    handleNonetwork()
                  }
                }}
                handlePageNation={async (index) => {
                  if (navigator.onLine) {
                    await setloader(true)
                    updateOrderQuery({ ...orderQuery, pageIndex: index - 1 })
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

      <Modal
        open={bulkOrder}
        handleClose={() => setbulkOrder(false)}
        title='Import orders'
        isOrder
        downloadClickHandler={() => {
          if (navigator.onLine) {
            getBase64(template).then((data) => console.log(data))
          } else {
            handleNonetwork()
          }
        }}
      >
        <FileUpload
          bulkOrder={bulkOrder}
          handleClose={async () => {
            setbulkOrder(false)
            setloader(true)
            const res = await fetchAllOrders(orderQuery)
            res && setloader(false)
          }}
        />
      </Modal>
    </Layout>
  )
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({
  orders: state?.orderReducer?.orders?.response,
  template: state?.orderReducer?.template?.response,
  orderQuery: state?.orderReducer?.orderQuery,
  allConnectedStores: state?.userStore?.allConnectedStores,
  shopifyAuth: state?.shopify?.shopifyAuth,
  userDetails: state?.user?.userDetails
})

/**
 * mapDispatchToProps
 */
const mapDispatchToProps = {
  fetchAllOrders,
  cancelOrders,
  bulkOrderImport,
  fetchOrderTemplate,
  downloadXlsxFile,
  updateOrderQuery,
  getAllConnectedStores
}
//Export
export default connect(mapStateToProps, mapDispatchToProps)(Orders)
