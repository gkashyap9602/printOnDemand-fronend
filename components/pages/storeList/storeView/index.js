import React from 'react'
import { Button, Typography } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import Image from 'next/image'
import style from './style'

const useStyles = style

const StoreView = ({ item, handlePopupClick, connectToStore }) => {
  const classes = useStyles()
  const { label, store } = item
  return (
    <div className={classes.storeList}>
      <div className={classes.storeList_Root}>
        <div className={classes.storeView_Label}>
          <div className={classes.bg_StoreImg}>
            <Image src={item.storeImg} alt='Store' width={25} height={25} objectFit='contain' />
          </div>
          <div className={classes.storeName}>
            <Typography variant='h4' className={classes.storeHead}>
              {label}
            </Typography>
            <Typography variant='h4' className={classes.storeHead_Text}>
              {store}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.storeContent}>
        <Typography variant='h4'>
          Connect to the {store} and display your products with one click.
        </Typography>
      </div>
      <div className={classes.storeConnect_Btn}>
        <Button
          type='button'
          className={classes.btnConnect}
          startIcon={<Icon icon='add-icon' size={16} color='#3374b6' />}
          onClick={(e) => {
            if (store === 'Etsy') {
              connectToStore(e, 'Etsy')
            } else {
              handlePopupClick(item)
            }
          }}
        >
          Connect
        </Button>
      </div>
    </div>
  )
}

export default StoreView
