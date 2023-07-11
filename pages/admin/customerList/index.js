import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button, TextField, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import {
  fetchCustomerList,
  updateQuery,
  updateField,
  updateCustomerStatus
} from 'redux/actions/adminActions'
import CustomerTab from 'components/pages/adminPortal/customerTab'
import Layout from 'components/layout'
import SearchArea from 'components/searchArea'
import DataTable from 'components/dataTable'
import Pagination from 'components/pagination'
import { style } from 'styles/customerList'
import Loader from 'components/loader'
import { NotificationManager } from 'react-notifications'
import { TABLE_TITLES } from 'constants/tableValue'
import { usePrevious } from 'utils/hooks'
import Modal from 'components/modal'
import { useRouter } from 'next/router'

const useStyles = style

const options = [
  { id: 1, status: 1, label: 'Activate', icon: 'activate-person' },
  { id: 2, status: 2, label: 'Deactivate', icon: 'deactivate-person' },
  { id: 3, status: 3, label: 'Edit', icon: 'edit-icon' }
]

const AdminCustomer = ({
  fetchCustomerList,
  customerList,
  adminParam,
  updateQuery,
  updateField,
  updateCustomerStatus,
  tableLoader
}) => {
  const classes = useStyles()
  const route = useRouter()
  const [loader, setLoader] = useState(false)
  const [totalCountOfList, setTotalCountOfList] = useState(0)
  const [tableTitles, setTableTitles] = useState([])
  const [lists, setLists] = useState([])
  const [statusLoader, setStatusLoader] = useState([])
  const previousAdminParam = usePrevious(adminParam)
  const [isSort, setIsSort] = useState(5)
  const [toggleModal, setToggleModal] = useState(false)
  const [toggleModal2, setToggleModal2] = useState(false)
  const [apiKey, setApiKey] = useState()
  const [customerStatusData, setCustomerStatusData] = useState()
  const [deleteLoader, setDeleteLoader] = useState(false)
  useEffect(() => {
    setTableTitles(TABLE_TITLES['CUSTOMER_LIST_TABLE_TITLE'])
    // fetchCustomerList({
    //   ...adminParam,
    //   sortColumn: 'createdOn',
    //   sortDirection: 'desc',
    //   pageIndex: 0
    // })
    updateQuery({
      ...adminParam,
      sortColumn: 'createdOn',
      sortDirection: 'desc',
      pageIndex: 0
    })
  }, [])

  // useEffect(async () => {

  const handleAllFilterChange = async (param) => {
    let res
    const isSearchUpdated =
      param?.searchKey &&
      previousAdminParam?.searchKey &&
      Object.entries(param.searchKey).sort().toString() ===
        Object.entries(previousAdminParam.searchKey).sort().toString()
    if (isSearchUpdated) {
      updateField('tableLoader', true)
      const delayDebounceFn = setTimeout(async () => {
        res = await fetchCustomerList({
          ...param
        })
      }, 1000)

      return () => clearTimeout(delayDebounceFn)
    } else {
      updateField('tableLoader', true)
      res = await fetchCustomerList({
        ...param
      })
    }
    if (
      (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res.hasError) &&
      res?.StatusCode !== 401
    ) {
      if (!navigator.onLine) {
        NotificationManager.error('No active internet connection.', '', 10000)
      } else {
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }

      setLoader(false)
      updateField('tableLoader', false)
      updateField('customerList', [])
    }
  }

  // }, [adminParam])

  useEffect(() => {
    if (customerList?.statusCode >= 200 && customerList.statusCode <= 300) {
      setLoader(false)
      const {
        response: { getAllCustomersResponse, totalCount }
      } = customerList
      setTotalCountOfList(totalCount)
      setLists(getAllCustomersResponse)
      updateField('tableLoader', false)
    } else {
      setLists([])
    }
  }, [customerList])

  /**
   * Handle pagination page size change
   * @param {*} e
   */
  const handlePageSizeChange = (e) => {
    updateQuery({ ...adminParam, pageSize: e, pageIndex: 0 })
    handleAllFilterChange({ ...adminParam, pageSize: e, pageIndex: 0 })
  }

  /**
   * Handle pagination
   * @param {*} page
   */
  const handlePageNation = (page) => {
    updateQuery({ ...adminParam, pageIndex: page - 1 })
    handleAllFilterChange({ ...adminParam, pageIndex: page - 1 })
  }

  /**
   * Handle search
   * @param {*} e
   */
  const serachHandler = (e) => {
    if (e.target.value) {
      updateQuery({ ...adminParam, pageIndex: 0, searchKey: e.target.value })
      handleAllFilterChange({ ...adminParam, pageIndex: 0, searchKey: e.target.value })
    } else {
      const keyRemovedParam = { ...adminParam }
      delete keyRemovedParam.searchKey
      updateQuery({ ...keyRemovedParam, pageIndex: 0 })
      handleAllFilterChange({
        ...keyRemovedParam,
        pageIndex: 0,
        sortColumn: 'createdOn',
        sortDirection: 'desc'
      })
    }
  }

  /**
   * Handle table sort
   * @param {*} titleObj
   */
  const sortFunction = (titleObj, key) => {
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
    setTableTitles(newTitleObj)
    setIsSort(titleObj.id)
    updateQuery({
      ...adminParam,
      sortColumn: titleObj.sortName,
      sortDirection: key,
      pageIndex: 0
    })
    handleAllFilterChange({
      ...adminParam,
      sortColumn: titleObj.sortName,
      sortDirection: key,
      pageIndex: 0
    })
  }

  /**
   * Handle status change
   * @param {*} value
   * @param {*} item
   */
  const statusChanger = (value, item) => {
    if (value === 3) {
      route?.push(`/admin/customerList/${item?.userGuid}?customerGuid=${item?.customerGuid}`)
    } else {
      const isSameStatus = lists?.filter(
        (listItem) => listItem.userGuid === item.userGuid && listItem.status === value
      )
      if (item?.mwwapiKey) {
        setApiKey(item?.mwwapiKey)
      }
      if (isSameStatus?.length > 0) {
        NotificationManager.warning(
          `User account is already ${
            value === 1 ? 'active' : value === 3 ? 'pending' : 'Deactivated'
          }`,
          '',
          3000
        )
      } else {
        if (item) {
          setCustomerStatusData({
            userGuid: item?.userGuid,
            status: value
          })
          if (item?.status === 1) {
            setToggleModal(true)
          } else if (item?.status === 2) {
            setToggleModal2(true)
          } else {
            if (value === 1) {
              setToggleModal2(true)
            } else if (value === 2) {
              setToggleModal(true)
            }
          }
          setStatusLoader([item?.userGuid])
        }
      }
    }
  }

  /**
   * Update global states=> customerList and adminParam
   */
  useEffect(() => {
    handleAllFilterChange(adminParam)
    return () => {
      updateField('customerList', [])
      updateField('adminParam', {
        pageIndex: 0,
        pageSize: 10
      })
    }
  }, [])

  /**
   * Handle popup close
   * @param {*} type
   */
  const handleModalClose = (type) => {
    setApiKey()
    setStatusLoader([])
    if (type === 1) {
      setToggleModal2(false)
    } else {
      setToggleModal(false)
    }
  }

  /**
   * Handle popup submit
   * @param {*} type
   */
  const handleSubmitModal = async (type) => {
    setDeleteLoader(true)
    let currentData = customerStatusData
    let res
    if (type === 1) {
      if (apiKey) {
        currentData.mwwapiKey = apiKey
        res = await updateCustomerStatus(currentData)
      }
    } else {
      res = await updateCustomerStatus(currentData)
    }
    if (res?.statusCode >= 200 && res?.statusCode <= 300) {
      if (currentData.status === 1) {
        NotificationManager.success('The user has been activated successfully.', '', 3000)
      } else if (currentData.status === 2) {
        NotificationManager.success('The user has been deactivated successfully.', '', 3000)
      }
      setDeleteLoader(false)
      const coustmerListResponse = await fetchCustomerList(adminParam)
      if (coustmerListResponse.statusCode >= 200 && res?.statusCode <= 300) {
        setStatusLoader([])
      }
      if (coustmerListResponse.StatusCode >= 400 || coustmerListResponse.hasError) {
        setStatusLoader([])
      }
      setToggleModal(false)
      setToggleModal2(false)
      setCustomerStatusData()
      setApiKey()
    }
    if (res.StatusCode >= 400 || res.hasError) {
      if (!navigator.onLine) {
        NotificationManager.error('No active internet connection.', '', 10000)
      } else {
        NotificationManager.error(
          res.Response.Message
            ? res.Response.Message
            : 'Something went wrong, please refresh the page',
          '',
          10000
        )
      }
      setDeleteLoader(false)
      setStatusLoader([])
      setToggleModal(false)
      setToggleModal2(false)
      setCustomerStatusData()
      setApiKey()
    }
  }

  const rerenderPage = async (link) => {
    if (navigator?.onLine) {
      if (link === '/admin/customerList') route.reload()
    }
  }

  return (
    <Layout activateHide handleOnClick={rerenderPage}>
      {(loader || deleteLoader) && <Loader />}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {/* <!--active tabs--> */}
        <CustomerTab handleAllFilterChange={handleAllFilterChange} />
        {/* <!--active tabs--> */}
        <div className={classes.bgTab_Info}>
          <div className={classes.tabFlex}>
            <div className={classes.tabInfo_Head}>
              <Typography variant='h3'>Customers</Typography>
              <Typography variant='h5'>Customers list</Typography>
            </div>

            <div className={classes.filterArea}>
              <div className={classes.searchFilter}>
                {/* <!--search bar--> */}
                <SearchArea
                  placeholder='Search customer'
                  className={classes.searchStyle}
                  handleSearch={serachHandler}
                />
                {/* <!--search bar--> */}
              </div>
              <Button
                type='submit'
                variant='contained'
                onClick={() => route.push('/admin/customerList/create')}
              >
                New customer
              </Button>
            </div>
          </div>

          {/* <!--table--> */}
          <div className={classes.tableWrapper}>
            <DataTable
              sortFunction={sortFunction}
              isAscDescSort={true}
              tableTitles={tableTitles}
              lists={lists}
              statusChanger={statusChanger}
              statusLoader={statusLoader}
              tableLoader={tableLoader}
              options={options}
              isSort={isSort}
              nodataMessage='No users found!'
            />
          </div>

          {/* <!--table--> */}

          {/* <!--pagination--> */}
          <div className={classes.tabPagination}>
            <Pagination
              pageSize={adminParam?.pageSize}
              handlePageSizeChange={handlePageSizeChange}
              handlePageNation={handlePageNation}
              currentPage={adminParam?.pageIndex}
              totalCount={totalCountOfList}
            />
          </div>
          {/* <!--pagination--> */}
        </div>
        {/* <!--modal--> */}
        {toggleModal && (
          <Modal
            open={toggleModal}
            handleClose={() => handleModalClose(2)}
            title={'Deactivate customer'}
          >
            <Typography variant='h3' className={classes.modalTitle}>
              Are you sure you want to deactivate this customer?
            </Typography>
            <div className={classes.btnTabSave}>
              <Button
                className={classes.btnCancel}
                style={{ width: '10%', marginRight: '10px' }}
                onClick={() => handleModalClose(2)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                className={classes.saveBtn}
                onClick={() => handleSubmitModal(2)}
              >
                Save
                {deleteLoader && (
                  <CircularProgress
                    style={{ marginLeft: 8 }}
                    size={18}
                    className={classes.LoaderSession}
                  />
                )}
              </Button>
            </div>
          </Modal>
        )}
        {/* <!--modal--> */}

        {/* <!--modal--> */}
        {toggleModal2 && (
          <Modal
            open={toggleModal2}
            handleClose={() => handleModalClose(1)}
            title={'Activate customer'}
          >
            <Typography variant='h3' className={classes.modalTitle}>
              Please enter the API key to activate the customer
            </Typography>
            <TextField
              variant='outlined'
              type={'text'}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder='API key'
              defaultValue={apiKey}
              fullWidth
              InputLabelProps={{
                shrink: false
              }}
            />
            <div className={classes.btnTabSave}>
              <Button
                className={classes.btnCancel}
                style={{ width: '10%', marginRight: '10px' }}
                onClick={() => handleModalClose(1)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                className={classes.saveBtn}
                disabled={apiKey ? false : true}
                onClick={() => handleSubmitModal(1)}
              >
                Save
              </Button>
            </div>
          </Modal>
        )}
        {/* <!--modal--> */}
      </Grid>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  customerList: state.admin.customerList,
  adminParam: state.admin.adminParam,
  tableLoader: state.admin.tableLoader
})

const mapDispatchToProps = {
  fetchCustomerList,
  updateQuery,
  updateField,
  updateCustomerStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCustomer)
