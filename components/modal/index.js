import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, Slide, Button } from '@material-ui/core'

import Icon from 'icomoons/Icon'
import style from './style'
import { Heading } from 'components/formControls/typography'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Modal = (props) => {
  const {
    handleClose = () => {},
    open,
    children,
    scroll = 'body',
    title,
    className,
    isOrder,
    downloadClickHandler
  } = props
  const classes = style()

  return (
    <Dialog
      scroll={scroll}
      className={`${classes.modalPopper} ${className}`}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>
        <Box display='flex' alignItems='baseline' className={classes.samplePopup}>
          <Box style={{ flexGrow: 1 }} className={classes.modalTitle}>
            <Heading title={title} />
          </Box>
          {isOrder && (
            <Box className={classes.download_Btn}>
              <Button variant='outlined' onClick={downloadClickHandler}>
                Download sample template
              </Button>
            </Box>
          )}

          <Box onClick={handleClose} className={classes.CloseDialog}>
            <Icon icon='pop-close' size={22} color='#8a8a9e' />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
