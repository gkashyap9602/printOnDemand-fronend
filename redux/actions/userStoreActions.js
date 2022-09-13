import { USER_STORE } from 'redux/types/actions'
import fetchHandler from 'utils/fetchResponseHandler'

export const getAllConnectedStores = (data) => {
  const fetchOptions = {
    url: `api/Stores/all`,
    method: 'POST',
    actionType: USER_STORE.GET_ALL_CONNECTED_STORE,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getInstallationURL = (storeType, URL) => {
  const API_URL = process.env.SITE_URL
  const url =
    storeType === 'Etsy'
      ? `api/${storeType}/GetInstalltionUrl?RedirectionUrl=${API_URL}store/success`
      : `api/${storeType}/GetInstalltionUrl?${
          storeType === 'Etsy' ? 'StoreName' : 'StoreUrl'
        }=${URL}&RedirectionUrl=${API_URL}store/success`
  const fetchOptions = {
    url,
    method: 'GET',
    actionType: USER_STORE.GET_ALL_CONNECTED_STORE,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const saveShopInfo = (data, store) => {
  const fetchOptions = {
    url: `api/${store}/SaveShopInfo`,
    method: 'POST',
    actionType: USER_STORE.SAVE_SHOP_INFO,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateStoreStatus = (data) => {
  const fetchOptions = {
    url: `api/Stores/UpdateStoreStatus`,
    method: 'POST',
    actionType: USER_STORE.UPDATE_STORE_STATUS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const deleteShop = (guid) => {
  const fetchOptions = {
    url: `api/Stores/${guid}`,
    method: 'DELETE',
    actionType: USER_STORE.REMOVE_STORE,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateField = (field, val) => {
  return {
    type: USER_STORE.UPDATE_FIELD,
    field,
    val
  }
}

export const fetchAllStoreUploads = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/getpushproducttostoredetails`,
    method: 'POST',
    actionType: USER_STORE.GET_STORE_UPLOADS_LIST,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const retryStoreUploads = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/retrypushproductstatus`,
    method: 'POST',
    actionType: USER_STORE.RETRY_STORE_UPLOADS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}
