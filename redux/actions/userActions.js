import { USER } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'
import { ISSERVER } from 'constants/routePaths'
import { isShopifyApp } from '../../utils/helpers'

export const getAccontDetails = (guid) => {
  const fetchOptions = {
    url: `api/User/${guid}`,
    method: 'GET',
    actionType: USER.GET_ACCOUNT_DETAILS,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateBasicInfo = (data) => {
  const fetchOptions = {
    url: `api/Customer/UpdateBasicDetails`,
    method: 'POST',
    actionType: USER.SEND_BASIC_INFO,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updatePasswordHandler = (data) => {
  const fetchOptions = {
    url: 'api/Authentication/ChangePassword',
    method: 'POST',
    actionType: USER.UPDATE_PASSWORD,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateShippingInfo = (data) => {
  const fetchOptions = {
    url: `api/Customer/UpdateShippingAddress`,
    method: 'POST',
    actionType: USER.SEND_SHIPPING_INFO,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateBillingInfo = (data) => {
  const fetchOptions = {
    url: `api/Customer/UpdateBillingAddress`,
    method: 'POST',
    actionType: USER.SEND_BILLING_INFO,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updatePaymentInfo = (data) => {
  const fetchOptions = {
    url: `api/Customer/UpdatePaymentDetails`,
    method: 'POST',
    actionType: USER.SEND_BILLING_INFO,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getCountryList = () => {
  const fetchOptions = {
    url: `api/General/GetAllCountries`,
    method: 'GET',
    actionType: USER.GET_COUNTRY_LIST,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getStateList = (data) => {
  const fetchOptions = {
    url: `api/General/GetAllStates?countryCode=${data}`,
    method: 'GET',
    actionType: USER.GET_STATE_LIST,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateField = (field, val) => {
  if (!isShopifyApp()) {
    const userSession = !ISSERVER && JSON.parse(localStorage.getItem('userSession'))
    userSession && getAccontDetails(userSession?.guid)
  }
  return {
    type: USER.UPDATE_FIELD,
    field,
    val
  }
}

export const getUserSessionShopify = () => {
  const fetchOptions = {
    url: `api/Customer/GetCurrentUserDetails`,
    method: 'GET',
    actionType: USER.FETCH_USER_SESSION_SHOPIFY,
    secure: true
  }
  return fetchHandler(fetchOptions)
}
export const clearSessionShopify = () => {
  return {
    type: USER.CLEAR_SESSION_SHOPIFY
  }
}
