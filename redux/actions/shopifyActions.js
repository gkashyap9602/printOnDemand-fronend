import { SHOPIFY } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const setShopifyAccessData = (payload) => {
  return {
    type: SHOPIFY.GET_SHOPIFY_ACCESS_DATA,
    payload
  }
}

export const postProductToStore = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/pushtostorequeue`,
    method: 'POST',
    actionType: SHOPIFY.POST_PRODUCT_TO_SHOPIFY,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const clearTokenShopify = () => {
  return {
    type: SHOPIFY.CLEAR_ENTIRE_SHOPIFY_STATE
  }
}

export const shopifyUserFlag = () => {
  return {
    type: SHOPIFY.USER_CHECK_FLAG
  }
}
