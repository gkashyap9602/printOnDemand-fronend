import { Grid, Typography } from '@material-ui/core'
import DataTable from 'components/dataTable'
import Layout from 'components/layout'
import Loader from 'components/loader'
import Pagination from 'components/pagination'
import SearchArea from 'components/searchArea'
import { TABLE_TITLES } from 'constants/tableValue'
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchAdminLogs } from 'redux/actions/admin/logActions'
import { style } from 'styles/logs'
import { getActionType, getEntityName } from 'utils/helpers'
const useStyles = style

/**
 * Admin Logs
 * @param {*} param0
 * @returns
 */
function Logs({ fetchAdminLogs }) {
  const [filter, setFilter] = useState({
    pageSize: 10,
    pageIndex: 0,
    searchKey: '',
    sortColumn: 'createdOn',
    sortDirection: 'desc'
  })
  const [loader, setLoader] = useState(false)
  const classes = useStyles()
  const data = useSelector((state) => state?.log?.logs?.response)

  /**
   * Initial api fetching
   */
  useEffect(async () => {
    await setLoader(true)
    const dt = await fetchAdminLogs(filter)
    if (dt) {
      setLoader(false)
    }
  }, [filter])

  /**
   * Rerender page when clicking on the side menu
   * @param {*} link
   */
  const rerenderPage = async (link) => {
    if (navigator?.onLine) {
      if (link === '/admin/logs') route.reload()
    }
  }

  //HTML
  return (
    <Layout activateHide handleOnClick={() => {}}>
      {loader && <Loader />}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {/* <!--table--> */}
        {/* <!--active tabs--> */}
        <div className={classes.bgTab_Info}>
          <div className={classes.tabFlex}>
            <div className={classes.tabInfo_Head}>
              <Typography variant='h3'>Logs</Typography>
              <Typography variant='h5'>Admin logs</Typography>
            </div>
            <div className={classes.filterArea}>
              <div className={classes.searchFilter}>
                {/* <!--search bar--> */}
                <SearchArea
                  placeholder='Search admin'
                  className={classes.searchStyle}
                  handleSearch={(e) => setFilter({ ...filter, searchKey: e?.target?.value })}
                />
                {/* <!--search bar--> */}
              </div>
            </div>
          </div>
          <div className={classes.tableWrapper}>
            <DataTable
              tableTitles={TABLE_TITLES['ADMIN_LOG']}
              lists={data?.logs?.map((val) => ({
                ...val,
                actionType: getActionType(val?.actionType),
                appEntityType: getEntityName(val?.appEntityType)
              }))}
              nodataMessage='No admins found!'
            />
          </div>
          {/* <!--pagination--> */}
          <div className={classes.tabPagination}>
            <Pagination
              pageSize={filter?.pageSize}
              handlePageSizeChange={(e) => setFilter({ ...filter, pageSize: e, pageIndex: 0 })}
              handlePageNation={(page) => setFilter({ ...filter, pageIndex: page - 1 })}
              currentPage={filter?.pageIndex}
              totalCount={data?.totalCount}
            />
          </div>
          {/* <!--pagination--> */}
        </div>
      </Grid>
    </Layout>
  )
}

//Dispatch
const mapDispatchToProps = {
  fetchAdminLogs
}

//export
export default connect(() => {}, mapDispatchToProps)(Logs)
