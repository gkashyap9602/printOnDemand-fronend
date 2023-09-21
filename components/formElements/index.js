import React, { useRef, useState, useEffect } from 'react'
import { MenuItem, Button, Menu, Popper, Grow, Paper, ClickAwayListener } from '@material-ui/core'

import Icon from 'icomoons/Icon'
import style from './style'
import SwitchInput from 'components/formControls/switch'
import { ISSERVER } from 'constants/routePaths'
import { getWaitingListStatus, updateWaitingList } from 'redux/actions/adminActions'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import { checkIfEmpty } from 'utils/helpers'

const useStyles = style
export const MoreActions = ({
  options,
  isOpen,
  PopTabClass,
  isActionChange,
  rawDteails,
  actionOnToggle,
  isCustomerActivate,
  handleChange = () => {},
  confirmDelete = () => {}
}) => {
  const classes = useStyles()

  const [openOver, setOpen] = useState(false)
  const anchorRef = useRef(null)

  useEffect(() => {
    if (openOver) {
      actionOnToggle()
    }
  }, [openOver])

  const handleToggle = (e) => {
    setOpen((prevOpen) => !prevOpen)
    if (e.target.innerText === 'Edit') {
      handleChange(e)
    }
    if (e.target.innerText === 'Delete') {
      confirmDelete(e)
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
    event.stopPropagation()
  }

  return (
    <>
      {isCustomerActivate ? (
        <Button
          ref={anchorRef}
          aria-controls={openOver ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={(e) => {
            handleToggle(e)
            e.stopPropagation()
          }}
          variant='outlined'
          endIcon={<Icon icon='drop-down' size={18} color='#8a8a9e' />}
          className={classes.actionButton}
        >
          Select actions
        </Button>
      ) : (
        <Button
          ref={anchorRef}
          aria-controls={openOver ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={(e) => {
            handleToggle(e)
            e.stopPropagation()
          }}
          className={classes.MenuMoreTab}
        >
          <Icon icon='action-more' size={20} color='#8a8a9e' />
        </Button>
      )}
      <Menu
        open={openOver}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        className={classes.MenuPopper}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ horizontal: 'center' }}
      >
        {options.filter(Boolean)?.map(({ id, status, label, icon, key, disable }, index) => (
          <MenuItem
            key={index}
            disabled={
              (key === 'cancelled' &&
                (rawDteails?.status !== 1 ||
                  (!checkIfEmpty(rawDteails?.mwwOrderId) &&
                    rawDteails?.source !== 3 &&
                    rawDteails?.source !== 4))) ||
              (key === 'download' && rawDteails?.source === 5) ||
              disable ||
              (key === 'admin_cancelled' &&
                (rawDteails?.status === 4 || rawDteails?.status === 5 || rawDteails?.status === 3))
            }
            onClick={(e) => {
              isActionChange(status, rawDteails)
              handleToggle(e)
            }}
          >
            <Icon icon={icon} size={17} color='#8a8a9e' className={classes.hvrIcon} />
            <span className={classes.ListPop}>{label}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
MoreActions.defaultProps = {
  options: {},
  isOpen: false,
  PopTabClass: null,
  isActionChange: () => {},
  rawDteails: {},
  actionOnToggle: () => {}
}

const MoreSettings = ({
  updateWaitingList,
  waitingListStatus,
  getWaitingListStatus,
  userDetails
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [toggleBtnDisabled, setToggleBtnDisabled] = useState(false)
  const [isEnabledWaitingList, setIsEnabledWaitingList] = useState(false)
  const anchorRef = React.useRef(null)

  useEffect(() => {
    if (userDetails?.userType) {
      const { userType } = userDetails
      if (userType === 2) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    }
  }, [userDetails])

  useEffect(async () => {
    const res = await getWaitingListStatus()
    if (
      ((res?.StatusCode >= 400 && res?.StatusCode <= 500) || res.hasError) &&
      res?.StatusCode !== 401
    ) {
      NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
    }
  }, [])

  useEffect(() => {
    if (waitingListStatus) {
      const {
        response: { isWaitingListEnabled }
      } = waitingListStatus
      if (waitingListStatus?.statusCode >= 200 && waitingListStatus.statusCode <= 300) {
        setIsEnabledWaitingList(isWaitingListEnabled)
      }
      if (
        (waitingListStatus?.StatusCode >= 400 || waitingListStatus?.StatusCode === 12002) &&
        waitingListStatus?.StatusCode !== 401
      ) {
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
    }
  }, [waitingListStatus])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const toggleHandler = async (e) => {
    setIsEnabledWaitingList(!isEnabledWaitingList)
    setToggleBtnDisabled(true)
    const res = await updateWaitingList({ value: !isEnabledWaitingList })
    if (res?.statusCode >= 200 && res?.statusCode <= 300) {
      NotificationManager.success(
        `${!isEnabledWaitingList ? 'Waiting list enabled' : 'Waiting list disabled'}`,
        '',
        2000
      )
      setTimeout(() => {
        setToggleBtnDisabled(false)
      }, 2000)
    }
    if (
      (res?.statusCode === 400 || res.hasError || res.StatusCode === 12002) &&
      res?.statusCode !== 401
    ) {
      if (!navigator.onLine) {
        NotificationManager.error('No active internet connection.', '', 10000)
      } else {
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
      setToggleBtnDisabled(false)
    }
  }

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        className={classes.MenuMoreTab}
      >
        <Icon icon='settings' size={22} color='#9A9AB0' />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.rootPaper}>
              {isAdmin && (
                <ClickAwayListener onClickAway={handleClose}>
                  <div className={classes.popWrapper}>
                    <SwitchInput
                      value={isEnabledWaitingList}
                      onChange={toggleHandler}
                      disabled={toggleBtnDisabled}
                      label='Enable waiting list'
                    />
                  </div>
                </ClickAwayListener>
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const mapStateToProps = (state) => ({
  waitingListStatus: state.admin.waitingListStatus,
  userSessionShopify: state?.user?.userSessionShopify,
  userDetails: state?.user?.userDetails
})
const mapDispatchToProps = {
  updateWaitingList,
  getWaitingListStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreSettings)
