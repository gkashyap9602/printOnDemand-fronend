import { DESIGNTOOL } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const addText = (textData) => {
  return {
    type: DESIGNTOOL.ADD_TEXT,
    payload: textData
  }
}

export const removeText = (textDataID) => {
  return {
    type: DESIGNTOOL.REMOVE_TEXT,
    payload: textDataID
  }
}

export const changeViewColor = (fabricViewSelected, color) => {
  return {
    type: DESIGNTOOL.CHANGE_COLOR_VIEW,
    payload: { fabricViewSelected, color }
  }
}

export const changeAllColor = (color) => {
  return {
    type: DESIGNTOOL.CHANGE_COLOR_ALL,
    payload: color
  }
}

export const toggleApplyToAll = () => {
  return {
    type: DESIGNTOOL.TOGGLE_APPLY_TO_ALL
  }
}
export const changeView = (newView) => {
  return {
    type: DESIGNTOOL.CHANGE_VIEW,
    payload: newView
  }
}

export const updateFabricViewList = (viewList) => {
  return {
    type: DESIGNTOOL.UPDATE_FABRIC_VIEW_LIST,
    payload: viewList
  }
}
export const changeSelectedAddOn = (item) => {
  return {
    type: DESIGNTOOL.CHANGE_SELECTED_ADDON,
    payload: item
  }
}

export const changeTextColor = (textId) => {
  return {
    type: DESIGNTOOL.CHANGE_TEXT_COLOR,
    payload: textId
  }
}

export const changeTextSize = (textId) => {
  return {
    type: DESIGNTOOL.CHANGE_TEXT_SIZE,
    payload: textId
  }
}

export const changeTextFont = (textId) => {
  return {
    type: DESIGNTOOL.CHANGE_TEXT_FONT,
    payload: textId
  }
}

export const updateSelectedAddOn = (item) => {
  return {
    type: DESIGNTOOL.UPDATE_SELECTED_ADDON,
    payload: item
  }
}

export const updateAddOnsList = (type, data) => {
  return {
    type: DESIGNTOOL.UPDATE_ADDONS_LIST,
    payload: { type, data }
  }
}

export const clearAddonsList = () => {
  return {
    type: DESIGNTOOL.CLEAR_ADD_ONS_LIST
  }
}

export const clearEntireState = () => {
  return {
    type: DESIGNTOOL.CLEAR_ENTIRE_STATE
  }
}

export const reorderLayer = (layerData, destinationIndex) => {
  return {
    type: DESIGNTOOL.REORDER_LAYER,
    payload: { layerData, destinationIndex }
  }
}

export const lockLayer = (uuid, index) => {
  return {
    type: DESIGNTOOL.LOCK_LAYER,
    payload: { uuid, index }
  }
}

export const unlockLayer = (uuid, index) => {
  return {
    type: DESIGNTOOL.UNLOCK_LAYER,
    payload: { uuid, index }
  }
}
export const deleteLayer = (uuid, type) => {
  return {
    type: DESIGNTOOL.DELETE_LAYER,
    payload: { uuid, type }
  }
}

export const generateProductDetails = () => {
  return {
    type: DESIGNTOOL.SAVE_PRODUCT
  }
}

export const updateProduct = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/updateLibrary`,
    method: 'POST',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}

export const saveProduct = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/add`,
    method: 'POST',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}

export const saveSelectedProductSizes = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/create`,
    method: 'POST',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}

export const saveImageToPhotoLibrary = (data) => {
  const fetchOptions = {
    url: `api/ProductLibrary/SaveLibraryImage`,
    method: 'POST',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}
export const getLibraryImages = () => {
  const fetchOptions = {
    url: `api/ProductLibrary/GetLibraryImages`,
    method: 'GET',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    // body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}

export const storeDefaultDesignerJSON = (json) => {
  return {
    type: DESIGNTOOL.STORE_DEFAULT_DESIGNER_JSON,
    payload: json
  }
}
export const uploadImage = (img) => {
  return {
    type: DESIGNTOOL.UPLOAD_IMAGE,
    payload: img
  }
}
export const addImageToCanvas = (img) => {
  return {
    type: DESIGNTOOL.ADD_IMAGE_TO_CANVAS,
    payload: img
  }
}

export const updateSelectedObjectPosition = (position) => {
  return {
    type: DESIGNTOOL.UPDATE_SELECTED_OBJECT_POSITION,
    payload: position
  }
}

export const changePattern = (img, patternType, patternSpacing) => {
  return {
    type: DESIGNTOOL.CHANGE_PATTERN,
    payload: { img, patternType, patternSpacing }
  }
}

export const changePatternSpacing = (img, patternSpacing) => {
  return {
    type: DESIGNTOOL.CHANGE_PATTERN_SPACING,
    payload: { img, patternSpacing }
  }
}

export const changeImageDimensions = (uuid, width, height) => {
  return {
    type: DESIGNTOOL.CHANGE_IMAGE_DIMENSIONS_FROM_CANVAS,
    payload: { uuid, width, height }
  }
}

export const addImageInitialDimensions = (uuid, width, height) => {
  return {
    type: DESIGNTOOL.ADD_IMAGE_INITIAL_DIMENSIONS,
    payload: { uuid, width, height }
  }
}

export const addInitialDesign = (design) => {
  return {
    type: DESIGNTOOL.ADD_INITIAL_DESIGN,
    payload: design
  }
}

export const selectProductSizesForPrint = (sizes) => {
  return {
    type: DESIGNTOOL.SELECT_PRODUCT_SIZES,
    payload: sizes
  }
}

export const setCropStatus = (status) => {
  return {
    type: DESIGNTOOL.SET_CROP_STATUS,
    payload: status
  }
}
// initial call to get the image url
export const getUploadImageURL = (data) => {
  const fetchOptions = {
    url: 'api/ProductLibrary/GetDesignImageUrl',
    method: 'POST',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  console.log(data)
  return fetchHandler(fetchOptions)
}
export const uploadToImageURL = (url, data) => {
  const fetchOptions = {
    url,
    method: 'PUT',
    'x-ms-blob-type': 'BlockBlob',
    'Content-Type': 'image/png',
    body: data
  }
  return fetchHandler(fetchOptions)
}
// second call to save the actual image
export const saveDesignImage = (data) => {
  const fetchOptions = {
    url: 'api/ProductLibrary/SaveDesignImage',
    method: 'POST',
    // actionType: DESIGNTOOL.SAVE_PRODUCT,
    body: JSON.stringify(data),
    secure: true,
    shouldDispatch: false
  }
  return fetchHandler(fetchOptions)
}
