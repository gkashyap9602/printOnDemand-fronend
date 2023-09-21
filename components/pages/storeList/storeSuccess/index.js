import React from 'react'
import { Button, Typography } from '@material-ui/core'
import router from 'next/router'
import successImg from '/static/images/store-connected.png'
import StoreNotConnected from '/static/images/store-access-denied.png'
import Image from 'next/image'
import style from './style'

const useStyles = style

const Success = ({ isBtnDisabled = false, isAccessDenied = false }) => {
  const classes = useStyles()
  return (
    <div className={classes.bgStore}>
      <div>
        <Typography variant='h3' style={{ color: '#4c5156' }}>
          Stores
        </Typography>
      </div>
      <div className={classes.storeConnect_Flex}>
        <Image src={isAccessDenied ? StoreNotConnected : successImg} alt='No Store' />
      </div>
      <div className={classes.labelStore}>
        <Button
          disabled={isBtnDisabled}
          type='submit'
          variant='contained'
          onClick={() =>
            isAccessDenied ? router.push('/store/ecommerceList') : router.push('/store')
          }
          className={classes.btn_Store}
        >
          Back
        </Button>
      </div>
    </div>
  )
}
export default Success
