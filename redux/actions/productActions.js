import { PRODUCTS } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const getAllProducts = (data) => {
  const fetchOptions = {
    url: `api/Products/Getall`,
    method: 'POST',
    actionType: PRODUCTS.GET_ALL_PRODUCTS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getProductDetail = (id) => {
  const fetchOptions = {
    url: `api/Products/GetDetails?productGuid=${id}`,
    method: 'GET',
    actionType: PRODUCTS.GET_PRODUCT_DETAIL,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getAllVariableType = () => {
  const fetchOptions = {
    url: `api/Products/getallvariabletype`,
    method: 'GET',
    actionType: PRODUCTS.GET_ALL_VARIABLETYPES,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateField = (field, val) => {
  return {
    type: PRODUCTS.UPDATE_FIELD,
    field,
    val
  }
}

export const updateProductQuery = (val, isAdmin = true) => {
  return {
    type: PRODUCTS.UPDATE_PRODUCT_QUERY,
    val,
    isAdmin
  }
}

export const createProduct = (data) => {
  const fetchOptions = {
    url: `api/Products/Create`,
    method: 'POST',
    actionType: PRODUCTS.CREATE_PRODUCT,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateProduct = (data) => {
  const fetchOptions = {
    url: `api/Products/Update`,
    method: 'POST',
    actionType: PRODUCTS.UPDATE_PRODUCT_BASIC_INFO,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const uploadProductImage = (data) => {
  const fetchOptions = {
    url: `api/Products/SaveProductImage`,
    method: 'POST',
    actionType: PRODUCTS.UPLOAD_PRODUCT_IMAGE,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const uploadProductVariant = (data) => {
  const fetchOptions = {
    url: `api/Products/AddProductVariant`,
    method: 'POST',
    actionType: PRODUCTS.UPLOAD_PRODUCT_VARIANT,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateProductVariant = (data) => {
  const fetchOptions = {
    url: `api/Products/UpdateProductVariant`,
    method: 'POST',
    actionType: PRODUCTS.UPDATE_PRODUCT_VARIANT,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const deleteProduct = (data) => {
  const fetchOptions = {
    url: `api/Products/delete`,
    method: 'DELETE',
    actionType: PRODUCTS.DELETE_PRODUCT,
    body: JSON.stringify(data),
    secure: true
  }
  return fetchHandler(fetchOptions)
}

export const deleteProductImage = (id) => {
  const fetchOptions = {
    url: `api/Products/DeleteProductImage?Id=${id}`,
    method: 'DELETE',
    actionType: PRODUCTS.DELETE_PRODUCT_IMAGE,
    secure: true
  }
  return fetchHandler(fetchOptions)
}
