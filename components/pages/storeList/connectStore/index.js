import React from 'react'
import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import Modal from 'components/modal'
import Image from 'next/image'
import style from './style'

const useStyles = style

const ConnectStore = ({
  open,
  handleClose,
  connectToStore,
  setStoreVal,
  storeVal,
  selectedStore,
  connectBtnLoader = false
}) => {
  const classes = useStyles()
  const isExactMatch = (storeVal) => {
    const splitVal = storeVal.split('.').slice(-2).join('.')
    return splitVal === 'myshopify.com' && !storeVal.includes('https://')
  }
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') connectToStore(e)
  }
  return (
    <div>
      {/* <!-- Modal--> */}
      <Modal open={open} handleClose={handleClose}>
        <div className={classes.connectModal}>
          <div className={classes.storeConnect_Img}>
            <Image
              src={selectedStore.modalImg}
              alt='Connect Store'
              height={55}
              width={49}
              objectFit='contain'
            />
          </div>
          <div>
            <Typography variant='h3' className={classes.modalTitle}>
              {selectedStore.modalContent}
            </Typography>
          </div>
        </div>
        <Typography
          style={{ margin: '10px 0px 20px 0px' }}
          variant='h4'
          className={classes.TextStyle}
        >
          <Typography variant='h6' className={classes.storeLabel}>
            {selectedStore.modalLabel}
          </Typography>
          <TextField
            // disabled={item.isDisabled}
            variant='outlined'
            type={'text'}
            fullWidth
            placeholder={selectedStore.placeHolder}
            InputLabelProps={{
              shrink: false
            }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            value={storeVal}
            onChange={(e) => setStoreVal(e)}
            onKeyUp={(e) =>
              connectBtnLoader ||
              (selectedStore.store === 'Shopify'
                ? !storeVal || (storeVal !== '' && !isExactMatch(storeVal))
                : !storeVal)
                ? null
                : handleEnterKey(e)
            }
          />
          {selectedStore.store === 'Shopify' && (
            <Typography className={classes.store_Valid}>
              Please only input the storename.myshopify.com. Do not include https:// or any other
              symbols after .com
            </Typography>
          )}
        </Typography>

        <div className={classes.btnActions}>
          <Button className={classes.btnCancel} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={
              connectBtnLoader ||
              (selectedStore.store === 'Shopify'
                ? !storeVal || (storeVal !== '' && !isExactMatch(storeVal))
                : !storeVal)
            }
            className={classes.btnConnect}
            variant='contained'
            onClick={(e) => connectToStore(e)}
          >
            Connect
            {connectBtnLoader && (
              <CircularProgress
                style={{ marginLeft: 5 }}
                size={14}
                className={classes.LoaderSession}
              />
            )}
          </Button>
        </div>
      </Modal>
      {/* <!-- Modal--> */}
    </div>
  )
}

export default ConnectStore
