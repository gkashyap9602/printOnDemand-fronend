import React from 'react'
import { Box, Switch } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  SwitchRoot: {
    marginBottom: 20
  },
  SwitchHead: {
    marginRight: 10
  },
  SwitchIcon: {
    '& .MuiSwitch-root': {
      borderRadius: 11,
      backgroundColor: '#f5f5f5',
      height: '22px!important'
    }
  }
}))

export const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 19,
    padding: 0,
    margin: theme.spacing(1),

    '& .MuiSwitch-thumb': {
      width: 20,
      height: 20,
      backgroundColor: '#c9cfd5'
    },
    '& .MuiSwitch-switchBase': {
      right: 11
    },
    '& .MuiIconButton-root': {
      right: 'unset'
    }
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& .MuiSwitch-thumb': {
        backgroundColor: '#3374b6'
      },
      '& + $track': {
        backgroundColor: '#f5f5f5'
      },
      '&.MuiIconButton-root': {
        right: '11px'
      }
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, onChange, id, name, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      disabled={props.disabled}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      checked={props.value}
      onChange={onChange}
      name={name}
    />
  )
})

const SwitchInput = ({ label, className, ...props }) => {
  const classes = useStyles()
  return (
    <Box display='flex' alignItems='center' flexWrap='wrap' width='100%'>
      <Box className={classes.SwitchHead}>{label}</Box>
      <Box className={classes.SwitchIcon}>
        <IOSSwitch {...props} />
      </Box>
    </Box>
  )
}

export default SwitchInput
