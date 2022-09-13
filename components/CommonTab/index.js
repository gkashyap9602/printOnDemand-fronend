import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import Icon from 'icomoons/Icon'
import style from './style'
const useStyles = style

/**
 * Tab component
 * @param {*} param0
 * @returns
 */
const CommonTab = ({
  tab,
  tabChange,
  count,
  className,
  tabClass,
  activeClass,
  statusSummary,
  showItemCount = true,
  query = {},
  isFromOrder = false
}) => {
  const classes = useStyles()
  const [active, setActive] = useState(tab?.[0]?.id)

  /**
   * Handle tab change
   * @param {*} item
   */
  const tabHandler = (item) => {
    const { id } = item
    setActive(id)
    tabChange(item)
  }

  /**
   * set active tab
   */
  useEffect(() => {
    if (isFromOrder) {
      setActive(tab?.[tab?.findIndex((item) => item.key === query.status)]?.id)
    } else {
      setActive(tab?.[0]?.id)
    }
  }, [])

  //HTML
  return (
    <div className={`${classes.customer_Tab} ${className}`}>
      {tab?.map((item, i) => (
        <Box
          {...item}
          display='flex'
          key={i}
          className={`${classes.tab_Block} ${tabClass}`}
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
            {showItemCount && (
              <Typography variant='body2'>
                {item?.name === 'totalCount'
                  ? statusSummary && Object.values(statusSummary).reduce((a, b) => a + b)
                  : statusSummary?.[item.name] || 0}
              </Typography>
            )}

            <Typography variant='h4'>
              {item.status}
              {item.countValue && <span className={classes.orderVariant}>{count}</span>}
            </Typography>
          </Box>
          {/* <!--active border--> */}
          <div
            style={{
              background: active === item.id ? item.bgActive : 'transparent'
            }}
            className={`${classes.tab_ActiveCustomer} ${activeClass}`}
          ></div>
          {/* <!--active border--> */}
        </Box>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CommonTab)
