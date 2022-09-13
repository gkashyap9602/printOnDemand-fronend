import React from 'react'
import {  Dialog, DialogTitle, DialogContent, Slide } from '@material-ui/core'
import style from './style'

const useStyles = style

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CatalogModal = (props) => {
  const { handleClose = () => {}, open, children, scroll = 'body', component } = props
  const classes = useStyles()

  return (
    <Dialog
      scroll={scroll}
      className={classes.modalPopper}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>
        <div>{component}</div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default CatalogModal
