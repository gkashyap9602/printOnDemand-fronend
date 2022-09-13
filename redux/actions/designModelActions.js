import { DESIGNMODEL } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const getProductDesignDetails = (data) => {
  const { productId, productVariantId } = data
  const fetchOptions = {
    url: `api/Products/GetDesignerDetails?productId=${productId}&productVariantId=${productVariantId}`,
    method: 'GET',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    // body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}

export const getProductLibraryDesignDetails = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/GetDesignerDetails`,
    method: 'POST',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}

export const addModelConfig = (data) => {
  return {
    type: DESIGNMODEL.ADD_MODEL_CONFIG,
    payload: data
  }
}
export const addBaseURL = (baseURL) => {
  return {
    type: DESIGNMODEL.ADD_BASE_URL,
    payload: baseURL
  }
}

export const addDesignerJSON = (designerJSON) => {
  return {
    type: DESIGNMODEL.ADD_DESIGNER_JSON,
    payload: designerJSON
  }
}

export const addProductTitle = (title) => {
  return {
    type: DESIGNMODEL.ADD_PRODUCT_TITLE,
    payload: title
  }
}
