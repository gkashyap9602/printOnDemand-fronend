import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import StoreView from 'components/pages/storeList/storeView'
import { style } from 'styles/store'
import ConnectStore from 'components/pages/storeList/connectStore'
import { getInstallationURL } from 'redux/actions/userStoreActions'
import { connect } from 'react-redux'
import router from 'next/router'
import ShopifyImg from '/static/images/store.png'
import shopifyModalImg from '/static/images/connect-store.png'
import { NotificationManager } from 'react-notifications'
import Loader from 'components/loader'

const useStyles = style

const storeDetail = [
  {
    id: 1,
    label: 'Connect shopify',
    store: 'Shopify',
    storeImg: ShopifyImg,
    modalImg: shopifyModalImg,
    modalContent: (
      <>
        Add your store URL to connect <br /> with MWW
      </>
    ),
    modalLabel: 'Store URL',
    placeHolder: 'e.g. my-shop.myshopify.com'
  }
]

const EcommerceList = ({ getInstallationURL }) => {
  const classes = useStyles()
  // connect popup
  const [openModal, setOpenModal] = useState(false)
  const [storeVal, setStoreVal] = useState('')
  const [choosedStore, setChoosedStore] = useState({})
  const [connectBtnLoader, setConnectBtnLoader] = useState(false)
  const [loader, setLoader] = useState(false)

  /**
   * Handle popup click event
   * @param {*} item
   */
  const handlePopupClick = (item) => {
    setChoosedStore(item)
    setOpenModal(!openModal)
  }

  /**
   * Handle popup close
   */
  const handleModalClose = () => {
    setOpenModal(false)
    setStoreVal('')
  }

  /**
   * set store value
   * @param {*} e
   */
  const storeValue = (e) => {
    setStoreVal(e.target.value)
  }

  /**
   *handle store connection
   * @param {*} store
   */
  const connectToStore = async (e, store = false) => {
    setConnectBtnLoader(true)
    if (store) {
      setLoader(true)
    }
    const installationURL = await getInstallationURL(store ? store : choosedStore.store, storeVal)
    if (200 <= installationURL.statusCode && installationURL.statusCode <= 300) {
      installationURL.response && router.push(`${installationURL.response}`)
    }
    if (
      (installationURL?.StatusCode >= 400 ||
        installationURL?.StatusCode === 12002 ||
        installationURL?.hasError) &&
      installationURL?.StatusCode !== 401
    ) {
      setLoader(false)
      setConnectBtnLoader(false)
      NotificationManager.error(
        installationURL?.Response?.Message
          ? installationURL?.Response?.Message
          : 'Something went wrong, please refresh the page',
        '',
        10000
      )
    }
  }

  return (
    <Layout>
      {loader && <Loader />}
      <div className={classes.bgStore}>
        <div className={classes.rootStore}>
          <div className={classes.storeFlex}>
            <Typography variant='h3' style={{ color: '#4c5156' }}>
              Stores
            </Typography>
            <BreadCrumb route2={'Connect'} route1={'Stores'} />
          </div>
          <div className={classes.storeSearch}></div>
        </div>
        <Grid container spacing={3} direction='row' className={classes.rootList}>
          {storeDetail?.map((item, i) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={i}>
              <StoreView
                item={item}
                handlePopupClick={handlePopupClick}
                connectToStore={connectToStore}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      {/* <!--connect popup--> */}
      {openModal && (
        <ConnectStore
          open={openModal}
          connectToStore={connectToStore}
          handleClose={handleModalClose}
          setStoreVal={storeValue}
          storeVal={storeVal}
          selectedStore={choosedStore}
          connectBtnLoader={connectBtnLoader}
        />
      )}
      {/* <!--connect popup--> */}
    </Layout>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  getInstallationURL
}

export default connect(mapStateToProps, mapDispatchToProps)(EcommerceList)
