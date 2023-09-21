import React from 'react'
import { Button, Typography } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import StoreImg from '/static/images/store.png'
import EtsyImg from '/static/images/etsy.png'
import Image from 'next/image'
import style from './style'
import { NotificationManager } from 'react-notifications'

const useStyles = style

const StoreList = ({ list, toggleStoreStatus, deleteStore = () => {} }) => {
  const classes = useStyles()
  const { label, store, storeURL, storeType, status } = list

  const viewStore = (url) => {
    if (navigator.onLine) {
      window.open(url, '_blank')
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }

  return (
    <div className={classes.storeList}>
      <div className={classes.remove_store_btn} onClick={() => deleteStore(list)}>
        <Icon icon='pop-close' size={22} color='#8a8a9e' />
      </div>

      <div className={classes.storeList_Root}>
        <div className={classes.storeList_Label}>
          <div className={classes.bg_StoreImg}>
            <Image
              src={storeType === 1 ? StoreImg : EtsyImg}
              alt='Store'
              width={25}
              height={25}
              objectFit='contain'
            />
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

        <div className={classes.storeBtns}>
          <div style={{ marginRight: '8px' }}>
            <Button
              type='button'
              variant={status === 1 ? 'outlined' : 'contained'}
              onClick={() => toggleStoreStatus(list)}
            >
              {status === 1 ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
          <div style={{ marginRight: ' 10px' }}>
            <Button type='button' variant='outlined'>
              <span onClick={() => viewStore(storeURL)}>Visit store</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreList
