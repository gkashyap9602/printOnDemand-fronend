import { Button, ClickAwayListener, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setDelayForOrders } from 'redux/actions/orderActions'
import { checkIfEmpty, decryptId, isShopifyApp } from 'utils/helpers'
import { style } from 'styles/pushDelay'
import { NotificationManager } from 'react-notifications'
import { ISSERVER } from 'constants/routePaths'
import clsx from 'clsx'
import { getUserSessionShopify } from 'redux/actions/userActions'
const useStyles = style

/**
 * Submit delayed order component
 * @param {*} param0
 * @returns
 */
function PushDelay({
  handleClose,
  setDelayForOrders,
  userDetails,
  shopifyAuth,
  userSessionShopify,
  getUserSessionShopify
}) {
  const [days, setdays] = useState('0')
  const [hours, sethours] = useState('0')
  const [minutes, setminutes] = useState('0')
  const [disable, setdisable] = useState(false)
  const classes = useStyles()
  const [orderSubmissionDelay, setOrderSubmissionDelay] = useState()
  /**
   * If usersession shopify
   */
  useEffect(() => {
    if (!ISSERVER && !isShopifyApp()) {
      localStorage.getItem('orderSubmissionDelay') &&
        setOrderSubmissionDelay(localStorage.getItem('orderSubmissionDelay'))
    } else if (userSessionShopify && userSessionShopify?.response) {
      setOrderSubmissionDelay(userSessionShopify.response?.orderSubmissionDelay)
    }
  }, [userSessionShopify])
  /**
   * Handle ordersubmission delay
   */
  useEffect(() => {
    if (!checkIfEmpty(orderSubmissionDelay)) {
      setdays(parseInt(orderSubmissionDelay?.split(':')?.[0]))
      sethours(parseInt(orderSubmissionDelay?.split(':')?.[1]))
      setminutes(parseInt(orderSubmissionDelay?.split(':')?.[2]))
    }
  }, [orderSubmissionDelay])

  /**
   * HAndle submit delay of orders
   */
  const handleSubmit = async () => {
    if (navigator?.onLine) {
      if (days === 7 && (hours > 0 || minutes > 0)) {
        NotificationManager.error('Please set a maximum delay of seven days', '', 10000)
      } else {
        setdisable(true)
        const d = days <= 9 ? `0${parseInt(days)}` : parseInt(days)
        const h = hours <= 9 ? `0${parseInt(hours)}` : parseInt(hours)
        const m = minutes <= 9 ? `0${parseInt(minutes)}` : parseInt(minutes)
        const res = await setDelayForOrders({
          id: shopifyAuth ? userDetails?.customerId : decryptId(userDetails?.customerId),
          orderSubmissionDelay: `${d}:${h}:${m}`
        })
        if (res?.statusCode === 200) {
          setdisable(false)
          if (!shopifyAuth) {
            localStorage.setItem('orderSubmissionDelay', `${d}:${h}:${m}`)
          } else {
            await getUserSessionShopify()
          }

          NotificationManager.success('Order submission delay has been updated', '', 2000)
          handleClose()
        }
        if (res?.StatusCode === 400) {
          setdisable(false)
          NotificationManager.error(res?.Response?.Message, '', 10000)
          handleClose()
        }
      }
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }
  //HTML
  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <div
        // className={classes?.delayContainer}
        className={clsx(classes.delayContainer, classes.order_delay_Popup)}
      >
        <h4 style={{ marginTop: 8 }}>Order submission delay</h4>
        <p>
          All your new orders would be submitted to the MWW system after the time frame set below.{' '}
        </p>
        <Grid container spacing={2} direction='row' className={classes.Delayroot}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <label>Days</label>
            <input
              type='number'
              id='days'
              name='days'
              style={{ marginTop: '8px' }}
              className='form-control'
              placeholder='Days'
              value={days}
              min='0'
              onChange={(e) => {
                e.target.value <= 7 && setdays(`${e.target.value}`)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <label>Hours</label>
            <input
              type='number'
              style={{ marginTop: '8px' }}
              id='hours'
              name='hours'
              className='form-control'
              placeholder='Hours'
              value={hours}
              min='0'
              onChange={(e) => {
                if (e.target.value <= 23) {
                  sethours(e.target.value)
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <label>Minutes</label>
            <input
              type='number'
              style={{ marginTop: '8px' }}
              id='minutes'
              name='minutes'
              className='form-control'
              placeholder='Minutes'
              value={minutes}
              min='0'
              onChange={(e) => {
                if (e.target.value <= 59) {
                  setminutes(e.target.value)
                }
              }}
            />
          </Grid>
        </Grid>
        <div className={classes.btnContainer}>
          <Button type='submit' onClick={handleClose} className={classes.btnCancel}>
            cancel
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit}
            disable={disable}
            variant='contained'
            className={classes.btnApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </ClickAwayListener>
  )
}
const mapStateToProps = (state) => ({
  userDetails: state?.user?.userDetails,
  shopifyAuth: state?.shopify?.shopifyAuth,
  userSessionShopify: state?.user?.userSessionShopify
})

const mapDispatchToProps = {
  setDelayForOrders,
  getUserSessionShopify
}

export default connect(mapStateToProps, mapDispatchToProps)(PushDelay)
