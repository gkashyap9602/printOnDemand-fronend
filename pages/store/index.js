import React, { useState, useEffect } from 'react'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { connect } from 'react-redux'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import StoreList from 'components/pages/storeList'
import { style } from 'styles/store'
import {
  getAllConnectedStores,
  updateStoreStatus,
  deleteShop
} from 'redux/actions/userStoreActions'
import { NotificationManager } from 'react-notifications'
import Loader from 'components/loader'
import NoStore from 'components/pages/storeList/noStore'
import { updateField } from 'redux/actions/userActions'
import router from 'next/router'
import Modal from 'components/modal'
import AlertImg from '/static/images/alert-image.png'
import Image from 'next/image'
import { isActiveInternet } from 'utils/helpers'

const useStyles = style

const Store = ({
  getAllConnectedStores,
  allConnectedStores,
  updateField,
  updateStoreStatus,
  deleteShop,
  userDetails
}) => {
  const classes = useStyles()
  const [loader, setLoader] = useState(true)
  const [storeList, setStoreList] = useState([])
  const [updatedStatus, setUpdatedStatus] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [deleteBtnLoader, setDeleteBtnLoader] = useState(false)
  const [isRemoveItem, setIsRemoveItem] = useState({})

  /**
   * Fetch all connected store
   */
  useEffect(() => {
    if (userDetails?.customerGuid) {
      const getAll = async () => {
        const data = {
          customerGuid: userDetails?.customerGuid,
          storeType: null
        }
        const allStoresResponse = await getAllConnectedStores(data)
        if (
          (allStoresResponse?.StatusCode >= 400 ||
            allStoresResponse?.StatusCode === 12002 ||
            allStoresResponse?.hasError) &&
          allStoresResponse?.StatusCode !== 401
        ) {
          setLoader(false)
          NotificationManager.error(
            allStoresResponse?.Response?.Message
              ? allStoresResponse?.Response?.Message
              : 'Something went wrong, please refresh the page',
            '',
            10000
          )
        }
      }
      getAll()
    }
  }, [updatedStatus, userDetails])

  /**
   * set store list
   */
  useEffect(() => {
    if (200 <= allConnectedStores?.statusCode && allConnectedStores?.statusCode <= 300) {
      setLoader(false)
      const { response } = allConnectedStores
      if (response.length) {
        const storeList = response?.map((storeItem) => {
          return {
            ...storeItem,
            label: storeItem.storeName ? storeItem.storeName : 'My store',
            store: storeItem.storeType === 1 ? 'Shopify' : 'Etsy'
          }
        })

        setStoreList(storeList)
      } else {
        setStoreList([])
      }
    }
  }, [allConnectedStores])

  /**
   * Handle toggle store status
   * @param {*} store
   */
  const toggleStoreStatus = async (store) => {
    const data = {
      guid: store.guid,
      status: store.status === 1 ? 2 : 1
    }
    const updateRes = await updateStoreStatus(data)
    setLoader(true)
    if (200 <= updateRes?.statusCode && updateRes?.statusCode <= 300) {
      setUpdatedStatus(!updatedStatus)
      NotificationManager.success(
        `Successfully ${store.status === 1 ? 'disconnected' : 'connected'} the store`,
        '',
        2000
      )
    }
    if (
      (updateRes?.StatusCode >= 400 || updateRes?.StatusCode === 12002 || updateRes?.hasError) &&
      updateRes?.StatusCode !== 401
    ) {
      setLoader(false)
      NotificationManager.error(
        updateRes?.Response?.Message
          ? updateRes?.Response?.Message
          : 'Something went wrong, please refresh the page',
        '',
        10000
      )
    }
  }

  /**
   * Handle remove store modal close
   */
  const handleModalClose = () => {
    setDeleteBtnLoader(false)
    setIsRemoveItem({})
    setIsOpenDeleteModal(false)
  }

  /**
   * Handle delete store from list
   * @param {*} list
   */
  const deleteStore = (list) => {
    setIsRemoveItem(list)
    setIsOpenDeleteModal(true)
  }

  /**
   * Handle remove store from modal
   * @param {*} list
   */
  const removeStore = async () => {
    if (navigator.onLine) {
      setDeleteBtnLoader(true)
      const deleteResponse = await deleteShop(isRemoveItem?.guid)
      if (200 <= deleteResponse?.statusCode && deleteResponse?.statusCode <= 300) {
        setUpdatedStatus(!updatedStatus)
        setLoader(true)
        handleModalClose()
        NotificationManager.success(`The store has been removed successfully.        `, '', 2000)
      }
      if (
        (deleteResponse?.StatusCode >= 400 ||
          deleteResponse?.StatusCode === 12002 ||
          deleteResponse?.hasError) &&
        deleteResponse?.StatusCode !== 401
      ) {
        handleModalClose()
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }

  /**
   * update global state
   */
  useEffect(() => {
    return () => {
      updateField('allConnectedStores', null)
    }
  }, [])

  /**
   * Re render page on sidebar click
   */
  const rerenderPage = async () => {
    if (navigator?.onLine) {
      if (userDetails?.customerGuid) {
        const data = {
          customerGuid: userDetails?.customerGuid,
          storeType: null
        }
        setLoader(true)
        const allStoresResponse = await getAllConnectedStores(data)
        allStoresResponse && setLoader(false)
      }
    }
  }

  return (
    <Layout handleOnClick={rerenderPage}>
      {loader && <Loader />}
      {storeList.length ? (
        <div className={classes.bgStore}>
          <div className={classes.rootStore}>
            <div className={classes.storeFlex}>
              <Typography variant='h3' style={{ color: '#4c5156' }}>
                Stores
              </Typography>
              <BreadCrumb route2={'List'} route1={'Stores'} />
            </div>
            <div className={classes.storeSearch}>
              <div>
                <Button
                  type='submit'
                  variant='contained'
                  className={classes.btn_Store}
                  onClick={() => isActiveInternet(router, '/store/ecommerceList')}
                >
                  Add store
                </Button>
              </div>
            </div>
          </div>
          <Grid container spacing={3} direction='row' className={classes.rootList}>
            {storeList?.map((list, i) => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <StoreList
                  deleteStore={(list) => deleteStore(list)}
                  list={list}
                  toggleStoreStatus={(list) => toggleStoreStatus(list)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : null}
      {!loader && !storeList.length ? <NoStore /> : null}

      {/* <!--delete Modal--> */}
      <Modal open={isOpenDeleteModal} handleClose={handleModalClose}>
        <div className={clsx(classes.deleteModal, classes.storeDelete_Popup)}>
          <div>
            <Image src={AlertImg} alt='Delete' height={101} width={101} />
          </div>
          <div>
            <Typography variant='h3' className={classes.modalTitle}>
              Are you sure you want to remove this store?
              <br />
              <span
                style={{
                  fontSize: 14,

                  fontFamily: 'Inter Medium'
                }}
              >
                All data related to this store will be lost and this action cannot be reversed.
              </span>
            </Typography>
          </div>
        </div>
        <div className={classes.btnActions} style={{ marginTop: 8 }}>
          <Button className={classes.btnCancel} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            disabled={deleteBtnLoader}
            className={classes.btnDelete}
            variant='contained'
            onClick={removeStore}
          >
            Remove
            {deleteBtnLoader && (
              <CircularProgress
                style={{ marginLeft: 5 }}
                size={14}
                className={classes.LoaderSession}
              />
            )}
          </Button>
        </div>
      </Modal>
      {/* <!--delete Modal--> */}
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  allConnectedStores: state.userStore.allConnectedStores,
  userDetails: state?.user?.userDetails
})

const mapDispatchToProps = {
  getAllConnectedStores,
  updateField,
  updateStoreStatus,
  deleteShop
}

export default connect(mapStateToProps, mapDispatchToProps)(Store)
