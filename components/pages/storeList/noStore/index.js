import React from 'react'
import { Button, Typography } from '@material-ui/core'
import router from 'next/router'
import NoStoreImg from '/static/images/no-store-img.png'
import Image from 'next/image'
import style from './style'

const useStyles = style

const NoStore = () => {
  const classes = useStyles()
  return (
    <div className={classes.bgStore}>
      <div>
        <Typography variant='h3' style={{ color: '#4c5156' }}>
          Stores
        </Typography>
      </div>
      <div className={classes.storeConnect_Flex}>
        <Image src={NoStoreImg} alt='No Store' />
      </div>
      <div className={classes.labelStore}>
        <Typography variant='body2' style={{ color: '#6b757f' }}>
          You have not connected a store yet.
        </Typography>
        <Button
          type='submit'
          variant='contained'
          onClick={() => router.push('/store/ecommerceList')}
          className={classes.btn_Store}
        >
          Add store
        </Button>
      </div>
    </div>
  )
}
export default NoStore
