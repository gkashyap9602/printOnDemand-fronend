import React from 'react'
import { Drawer, Box } from '@material-ui/core'

import style from './style'

const useStyles = style

const ToggleDrawer = ({ open, handleClose, component }) => {
  const classes = useStyles()
  return (
    <Drawer anchor='left' open={open} onClose={() => handleClose()}>
      <Box className={classes.menuList}>
        <Box>{component}</Box>
      </Box>
      <a
        className={classes.privacy_Policy_drawer}
        href='https://mwwondemand.com/privacy-policy/'
        target='_blank'
      >
        Privacy policy
      </a>
    </Drawer>
  )
}
export default ToggleDrawer
