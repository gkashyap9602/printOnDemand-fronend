import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { storeUploadsTab } from 'constants/fields'
import CommonTab from 'components/CommonTab'
import moment from 'moment'

import {
  updateStoreUploadsQuery,
  fetchAllStoreUploads,
  retryStoreUploads,
  getAllConnectedStores
} from 'redux/actions/userStoreActions'
import Layout from 'components/layout'
import SearchArea from 'components/searchArea'
import DataTable from 'components/dataTable'
import StoreUploadsFilter from 'components/storeUploadsFilter'
import Pagination from 'components/pagination'
import { style } from 'styles/storeUploadsList'
import Loader from 'components/loader'
import { NotificationManager } from 'react-notifications'
import { TABLE_TITLES } from 'constants/tableValue'
import { checkIfEmpty, isShopifyApp } from 'utils/helpers'
import Icon from 'icomoons/Icon'

const useStyles = style

const StoreUploads = ({
  fetchAllStoreUploads,
  retryStoreUploads,
  storeUploadsQuery,
  updateStoreUploadsQuery,
  storeUploadsList,
  userDetails,
  getAllConnectedStores,
  allConnectedStores
}) => {
  const classes = useStyles()
  const [tableTitles, setTableTitles] = useState([])
  const [isSort, setIsSort] = useState(3)
  const [loader, setLoader] = useState(false)
  const [tableLoader, settableLoader] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const [filter, setfilter] = useState(false)

  /**
   * set table titles state
   */
  useEffect(() => {
    setTableTitles(TABLE_TITLES['STORE_UPLOADS_LIST'])
    setLoader(true)
  }, [])

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
   * Fetch all store uploads
   */
  useEffect(async () => {
    let storeList = []
    if (
      storeUploadsQuery.storeIds &&
      storeUploadsQuery.storeIds.length &&
      storeUploadsQuery.storeIds.length > 0
    ) {
      storeUploadsQuery.storeIds.map((store) => (storeList = [...storeList, store.value]))
    }
    const res = await fetchAllStoreUploads({
      ...storeUploadsQuery,
      ...(isShopifyApp()
        ? {
            storeIds: [userDetails?.storeId]
          }
        : {
            storeIds: storeList
          }),
      isFromShop: isShopifyApp() ? true : false
    })
    setLoader(false)
    settableLoader(false)
  }, [storeUploadsQuery])

  /**
   * handle tab change
   */
  const handleOnTabChange = async (item) => {
    setTableTitles(TABLE_TITLES['STORE_UPLOADS_LIST'])
    setLoader(true)
    let statusKey
    if (item.name === 'total') {
      statusKey = null
    } else {
      statusKey = item?.name
    }
    updateStoreUploadsQuery({
      ...storeUploadsQuery,
      pageIndex: 0,
      sortColumn: 'uploadDate',
      sortDirection: 'desc',
      status: statusKey
    })
  }

  /**
   * handle no internet
   */
  const handleNonetwork = () => {
    NotificationManager.error('No active internet connection.', '', 10000)
    setLoader(false)
  }

  /**
   * handle search
   */
  const handleSearch = (e) => {
    if (e.target.value) {
      updateStoreUploadsQuery({ ...storeUploadsQuery, pageIndex: 0, searchKey: e.target.value })
    } else {
      const keyRemovedParam = { ...storeUploadsQuery }
      delete keyRemovedParam.searchKey
      updateStoreUploadsQuery({ ...keyRemovedParam, pageIndex: 0 })
    }
  }

  /**
   * handle sort function
   */
  const sortFunction = (titleObj, key) => {
    const newTitleObj = tableTitles.map((obj) => {
      if (obj.id === titleObj.id) {
        return {
          ...obj,
          isAscending: key
        }
      }
      return { ...obj, isAscending: false }
    })

    setTableTitles(newTitleObj)
    setIsSort(titleObj.id)
    setIsCheck([])
    updateStoreUploadsQuery({
      ...storeUploadsQuery,
      sortColumn: titleObj.sortName,
      sortDirection: key,
      pageIndex: 0
    })
  }

  /**
   * handle checkbox
   */
  const checkBoxHandler = (e, list) => {
    const isSelected = isCheck?.includes(list.guid)
    if (list.pushStatus === 4) {
      if (isSelected) {
        const valueUpdated = isCheck.filter((item) => item !== list.guid)
        setIsCheck(valueUpdated)
      } else {
        setIsCheck([...isCheck, list.guid])
      }
    }
  }

  /**
   * select all fields in checkbox
   */
  const selectAllField = (e) => {
    if (e.target.checked) {
      const allChecked = storeUploadsList?.pushProductDetails
        .map((val) => val?.pushStatus === 4 && val?.guid)
        ?.filter((v) => v)
      setIsCheck(allChecked)
    } else {
      setIsCheck([])
    }
  }

  /**
   * handle retry failed status
   */
  const retryItems = async () => {
    const params = {
      pushProductQueueIds: isCheck
    }
    setLoader(true)
    const res = await retryStoreUploads(params)
    if (res.statusCode >= 200 && res.statusCode <= 300) {
      setLoader(false)
      setIsCheck([])
      updateStoreUploadsQuery({
        ...storeUploadsQuery,
        pageIndex: 0
      })
      NotificationManager.success('Retry successful', '', 3000)
    }
    if (res.StatusCode >= 400 || res.hasError) {
      setLoader(false)
      setIsCheck([])
      if (!navigator.onLine) {
        NotificationManager.error('No active internet connection.', '', 2000)
      } else {
        NotificationManager.error(
          res.Response.Message
            ? res.Response.Message
            : 'Something went wrong, please refresh the page',
          '',
          2000
        )
      }
    }
  }

  /**
   * handleApiCall
   * @param {*} date
   */
  const handleApiCall = async (date) => {
    if (navigator.onLine) {
      await setLoader(true)
      await setfilter(false)
      const from = await moment(date?.from).set({ hour: 0, minute: 0, second: 0 })
      const to = await moment(date?.to).set({ hour: 23, minute: 59, second: 59 })
      const fromUtc = await moment.utc(from).local().format()
      const toUtc = await moment.utc(to).local().format()
      updateStoreUploadsQuery({
        ...storeUploadsQuery,
        createdFrom: date?.from ? fromUtc : null,
        createdTill: date?.to ? toUtc : null,
        storeIds: date?.filterStores,
        pageIndex: 0,
        pageSize: 10
      })
    } else {
      handleNonetwork()
    }
  }

  return (
    <Layout>
      {loader && <Loader />}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CommonTab
          tab={storeUploadsTab}
          tabChange={handleOnTabChange}
          statusSummary={storeUploadsList?.statusSummary}
          query={storeUploadsQuery}
          // isFromOrder={true}
        />
        <div className={classes.bgTab_Info}>
          <div className={classes.tabFlex}>
            <div className={classes.tabInfo_Head}>
              <Typography variant='h3'>Store uploads</Typography>
              <div className={classes.searchFilter}>
                <SearchArea
                  placeholder='Search'
                  handleSearch={handleSearch}
                  className={classes.searchOrder}
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
                  <StoreUploadsFilter
                    appliedDate={{
                      from: storeUploadsQuery?.createdFrom
                        ? moment(storeUploadsQuery?.createdFrom).toDate()
                        : '',
                      to: storeUploadsQuery?.createdTill
                        ? moment(storeUploadsQuery?.createdTill).toDate()
                        : '',
                      filterStores: storeUploadsQuery?.storeIds
                    }}
                    apiCall={handleApiCall}
                    setfilter={() => setfilter(false)}
                    className={classes.store_Filterwrapping}
                    handleClose={async () => {
                      setfilter(false)
                      setLoader(true)
                      updateStoreUploadsQuery({
                        ...storeUploadsQuery,
                        createdFrom: null,
                        createdTill: null,
                        storeIds: []
                      })
                    }}
                    storeList={allConnectedStores?.response}
                  />
                )}
                <Button
                  type='submit'
                  variant='contained'
                  disabled={isCheck.length <= 0 ? true : false}
                  className={classes.orderBtn_New}
                  onClick={retryItems}
                >
                  Retry
                </Button>
              </div>
            </div>
          </div>

          {/* <!--table--> */}
          <div className={classes.tableWrapper}>
            <DataTable
              sortFunction={sortFunction}
              tableTitles={tableTitles}
              isAscDescSort={true}
              lists={storeUploadsList?.pushProductDetails?.map((val) => val)}
              tableLoader={tableLoader}
              nodataMessage={'No items found !'}
              isSort={isSort}
              isExtraFieldReq={true}
              isCheck={isCheck}
              PageId={'store_uploads'}
              checkBoxHandler={checkBoxHandler}
              selectAllField={selectAllField}
            />
          </div>
          {/* <!--table--> */}

          {/* <!--pagination--> */}
          {!checkIfEmpty(storeUploadsList?.pushProductDetails) && (
            <div className={classes.tabPagination}>
              <Pagination
                pageSize={storeUploadsQuery?.pageSize}
                currentPage={storeUploadsQuery?.pageIndex}
                handleOnClick={async (index) => {
                  if (navigator?.onLine) {
                    await setLoader(true)
                    updateStoreUploadsQuery({ ...storeUploadsQuery, pageIndex: index - 1 })
                  } else {
                    handleNonetwork()
                  }
                }}
                totalCount={storeUploadsList?.totalCount}
                handlePageSizeChange={async (value) => {
                  if (navigator.onLine) {
                    await setLoader(true)
                    updateStoreUploadsQuery({ ...storeUploadsQuery, pageSize: value, pageIndex: 0 })
                  } else {
                    handleNonetwork()
                  }
                }}
                handlePageNation={async (index) => {
                  if (navigator.onLine) {
                    await setLoader(true)
                    updateStoreUploadsQuery({ ...storeUploadsQuery, pageIndex: index - 1 })
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
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  storeUploadsQuery: state.userStore.storeUploadsQuery,
  storeUploadsList: state.userStore.storeUploadsList?.response,
  userDetails: state?.user?.userDetails,
  allConnectedStores: state?.userStore?.allConnectedStores
})

const mapDispatchToProps = {
  fetchAllStoreUploads,
  updateStoreUploadsQuery,
  retryStoreUploads,
  getAllConnectedStores
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreUploads)
