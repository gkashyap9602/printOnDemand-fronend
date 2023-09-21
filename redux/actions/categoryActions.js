import { CATEGORY } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const getAllCategory = (searchKey = '') => {
  const fetchOptions = {
    url: `api/Category/getall?includeSubCategory=true&searchKey=${searchKey}`,
    method: 'GET',
    actionType: CATEGORY.GET_ALL_CATEGORY,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getAllSubcategory = (id, searchKey = '') => {
  const fetchOptions = {
    url: `api/Category/getall?includeSubCategory=true&parentCategoryGuid=${id}&searchKey=${searchKey}`,
    method: 'GET',
    actionType: CATEGORY.GET_ALL_SUBCATEGORY,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getAllMaterials = (data) => {
  const fetchOptions = {
    url: `api/General/getallmaterials`,
    method: 'POST',
    actionType: CATEGORY.GET_ALL_MATERIAL,
    secure: true,
    body: JSON.stringify(data)
  }
  return fetchHandler(fetchOptions)
}

export const updateField = (field, val) => {
  return {
    type: CATEGORY.UPDATE_FIELD,
    field,
    val
  }
}

export const createCategory = (data) => {
  const fetchOptions = {
    url: `api/Category/create`,
    method: 'POST',
    actionType: CATEGORY.CREATE_CATEGORY,
    secure: true,
    body: JSON.stringify(data)
  }
  return fetchHandler(fetchOptions)
}

export const deleteCategory = (guid) => {
  const fetchOptions = {
    url: `api/Category/${guid}`,
    method: 'DELETE',
    actionType: CATEGORY.DELETE_CATEGORY,
    secure: true
  }
  return fetchHandler(fetchOptions)
}

export const updateCategory = (data) => {
  const fetchOptions = {
    url: `api/Category/update`,
    method: 'POST',
    actionType: CATEGORY.UPDATE_CATEGORY,
    secure: true,
    body: JSON.stringify(data)
  }
  return fetchHandler(fetchOptions)
}

export const globalSearchAPI = (data) => {
  const fetchOptions = {
    url: `api/General/GlobalSearch`,
    method: 'POST',
    actionType: CATEGORY.GLOBAL_SEARCH,
    secure: true,
    body: JSON.stringify(data)
  }
  return fetchHandler(fetchOptions)
}
