import { PRODUCT_LIBRARY } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const getAllProductLibrary = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/getall`,
    method: 'POST',
    actionType: PRODUCT_LIBRARY.GET_ALL_PRODUCT_LIBRARY,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const duplicateProductLibrary = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/add`,
    method: 'POST',
    actionType: PRODUCT_LIBRARY.DUPLICATE_PRODUCT_LIBRARY,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const deleteProductLibrary = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/delete`,
    method: 'DELETE',
    actionType: PRODUCT_LIBRARY.DELETE_PRODUCT_LIBRARY,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const deleteProductLibraryImage = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/DeleteProductLibraryImage?Id=${data?.Id}`,
    method: 'DELETE',
    actionType: PRODUCT_LIBRARY.DELETE_PRODUCT_LIBRARY_IMAGE,
    secure: true
  }

  return fetchHandler(fetchOptions)
}
export const getProductLibraryDetail = (id) => {
  const fetchOptions = {
    url: `api/ProductLibrary/details`,
    method: 'POST',
    actionType: PRODUCT_LIBRARY.GET_PRODUCT_LIBRARY_DETAIL,
    body: JSON.stringify({ productLibraryGuid: id }),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateProductLibraryVariant = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/UpdateLibraryVariant`,
    method: 'POST',
    actionType: PRODUCT_LIBRARY.UPDATE_VARIANT,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateProductLibrary = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/update`,
    method: 'POST',
    actionType: PRODUCT_LIBRARY.UPDATE,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const storeDuplicateProductDetails = (data) => {
  return {
    type: PRODUCT_LIBRARY.UPDATE_DETAILS,
    data
  }
}

export const updateProductLibraryQuery = (val) => {
  return {
    type: PRODUCT_LIBRARY.UPDATE_LIABRARY_QUERY,
    val
  }
}
