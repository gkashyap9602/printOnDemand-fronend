import React from 'react'
import { Drawer, Box } from '@material-ui/core'

import style from './style'
import Icon from 'icomoons/Icon'

const useStyles = style

const ToggleDrawer = ({ open, handleClose, component, drawerClass, faqFilter }) => {
  const classes = useStyles()
  return (
    <Drawer
      anchor='right'
      open={open}
      ModalProps={{
        keepMounted: true
      }}
      onClose={() => handleClose()}
      className={drawerClass}
    >
      {faqFilter && (
        <div className={classes.faqClassFilt} onClick={handleClose}>
          <Icon icon='pop-close' size={22} color='#9A9AB0' />
        </div>
      )}

      <Box className={classes.list}>
        <Box>{component}</Box>
      </Box>
    </Drawer>
  )
}
export default ToggleDrawer
