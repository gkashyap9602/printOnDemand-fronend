import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchCustomerList, updateQuery } from 'redux/actions/adminActions'
import Icon from 'icomoons/Icon'
import style from './style'
import { statusTabList } from 'constants/fields'

const useStyles = style

const CustomerTab = ({ updateQuery, customerList, adminParam }) => {
  const classes = useStyles()
  const [active, setActive] = useState(4)
  const [activeTabDetails, setActiveTabDetails] = useState(statusTabList[4])
  const [statusList, setStatusList] = useState(statusTabList)

  useEffect(() => {
    if (customerList && customerList.response && customerList.response.statusSummary) {
      const {
        response: { statusSummary }
      } = customerList
      const newStatusList = statusList?.map((list) => {
        if (statusSummary[list.name] === 0 || statusSummary[list.name]) {
          return {
            ...list,
            count: statusSummary[list.name]
          }
        }
        return { ...list }
      })
      setStatusList(newStatusList)
    }
  }, [customerList])

  useEffect(() => {
    if (adminParam?.status !== activeTabDetails?.statusId) {
      if (activeTabDetails?.statusId) {
        updateQuery({ ...adminParam, pageIndex: 0, status: activeTabDetails?.statusId })
      } else {
        const keyRemovedParam = { ...adminParam }
        delete keyRemovedParam.status
        updateQuery({ ...keyRemovedParam, pageIndex: 0 })
      }
    }
  }, [active])

  const tabHandler = (item) => {
    const { id } = item
    setActive(id)
    setActiveTabDetails(item)
  }

  return (
    <div className={classes.customer_Tab}>
      {statusList?.map((item, i) => (
        <Box
          {...item}
          display='flex'
          key={i}
          className={classes.tab_Block}
          onClick={() => tabHandler(item)}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            className={classes.tabIcon}
            style={{ backgroundColor: active === item.id ? item.bgActive : 'transparent' }}
          >
            {active === item.id ? (
              <Icon icon={item.activeIcon} size={22} color='#fff' />
            ) : (
              <Icon icon={item.icon} size={22} color={item.color} />
            )}
          </Box>
          <Box className={classes.tabArea}>
            <Typography variant='body2'>{item.count}</Typography>
            <Typography variant='h4'>{item.status}</Typography>
          </Box>
          {/* <!--active border--> */}
          <div
            style={{
              background: active === item.id ? item.bgActive : 'transparent'
            }}
            className={classes.tab_ActiveCustomer}
          ></div>
          {/* <!--active border--> */}
        </Box>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  customerList: state.admin.customerList,
  adminParam: state.admin.adminParam
})

const mapDispatchToProps = {
  fetchCustomerList,
  updateQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTab)
