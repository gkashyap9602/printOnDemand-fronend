import React from 'react'
import { Button, Typography } from '@material-ui/core'
import Image from 'next/image'
import AlertBanner from '/static/images/alert-banner.png'
import style from '../alertPopup/style'

const useStyles = style
const UnsaveChangesAlertPopup = ({ onConfirm, onClose }) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.imgBanner}>
        <Image src={AlertBanner} alt='Alert Banner' />
      </div>
      <div className={classes.textHeader}>
        <Typography variant='h3'>Unsaved changes</Typography>
      </div>
      <div className={classes.contentBlock}>
        <Typography variant='h4'>
          Your changes have not been saved yet. All unsaved changes will be lost. Would you like to
          proceed?
        </Typography>
      </div>

      <div className={classes.btnAlert}>
        <Button className={classes.btnCancel} onClick={onClose}>
          Cancel
        </Button>
        <Button className={classes.btnApprove} variant='contained' onClick={onConfirm}>
          Proceed
        </Button>
      </div>
    </div>
  )
}

export default UnsaveChangesAlertPopup
