import { ORDERS } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const fetchAllOrders = (data) => {
  const fetchOptions = {
    url: `api/Orders/All`,
    method: 'POST',
    actionType: ORDERS.GET_ALL_ORDERS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const fetchOrderDetails = (id) => {
  const fetchOptions = {
    url: `api/Orders/${id}`,
    method: 'GET',
    actionType: ORDERS.GET_ORDER_DETAILS,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const fetchOrderTemplate = (id) => {
  const fetchOptions = {
    url: `api/Orders/GetBulkImportTemplate`,
    method: 'GET',
    actionType: ORDERS.ORDER_TEMPLATE,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const cancelOrders = (data) => {
  const fetchOptions = {
    url: `api/Orders/UpdateOrderStatus`,
    method: 'POST',
    actionType: ORDERS.DELETE_ORDERS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const setDelayForOrders = (data) => {
  const fetchOptions = {
    url: `api/Customer/updateordersubmissiondelay`,
    method: 'POST',
    actionType: ORDERS.SET_DELAY,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateShippingInfo = (data) => {
  const fetchOptions = {
    url: `api/Orders/ShippingAddress/Update`,
    method: 'POST',
    actionType: ORDERS.ADDRESS_UPDATE,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}
export const bulkOrderImport = (data) => {
  const fetchOptions = {
    url: `api/Orders/BulkImport`,
    method: 'POST',
    actionType: ORDERS.BULK_ORDER,
    fileUpload: true,
    body: data,
    secure: true,
    formHeader: true
  }

  return fetchHandler(fetchOptions)
}
export const createOrders = (data) => {
  const fetchOptions = {
    url: `api/Orders/Create`,
    method: 'POST',
    actionType: ORDERS.CREATE_ORDER,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateOrder = (data) => {
  const fetchOptions = {
    url: `api/Orders/Update`,
    method: 'POST',
    actionType: ORDERS.UPDATE_ORDER,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const downloadXlsxFile = (data) => {
  const fetchOptions = {
    url: `api/Orders/DownloadOrderDetails`,
    method: 'POST',
    actionType: ORDERS.DOWNLOAD_DETAILS,
    body: JSON.stringify(data),
    secure: true,
    formHeader: true
  }

  return fetchHandler(fetchOptions)
}

export const updateVariantsOfOrders = (variants) => {
  return {
    type: ORDERS.UPDATE_VARIANT,
    variants
  }
}

export const updateAddresses = (address) => {
  return {
    type: ORDERS.UPDATE_ADDRESS,
    address
  }
}

export const updateOrderQuery = (val) => {
  return {
    type: ORDERS.UPDATE_ORDER_QUERY,
    val
  }
}

export const addCartItems = (data) => {
  const fetchOptions = {
    url: `api/Cart/AddItems`,
    method: 'POST',
    actionType: ORDERS.ADD_CART,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const fetchCartItems = () => {
  const fetchOptions = {
    url: `api/Cart/GetItems`,
    method: 'GET',
    actionType: ORDERS.GET_CART_ITEMS,
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateCartItems = (data) => {
  const fetchOptions = {
    url: `api/Cart/UpdateItem`,
    method: 'POST',
    actionType: ORDERS.UPDATE_CART,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const removeCartItems = (data) => {
  const fetchOptions = {
    url: `api/Cart/RemoveItem`,
    method: 'POST',
    actionType: ORDERS.REMOVE_CART_ITEM,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const placeOrder = (data) => {
  const fetchOptions = {
    url: `api/Cart/PlaceOrder`,
    method: 'POST',
    actionType: ORDERS.PLACE_ORDER,
    body: JSON.stringify(data),
    secure: true
  }
  return fetchHandler(fetchOptions)
}

export const fetchShippingMethods = () => {
  const fetchOptions = {
    url: `api/General/GetAllShippingMethods`,
    method: 'GET',
    actionType: ORDERS.GET_SHIPPING_METHODS,
    secure: true
  }

  return fetchHandler(fetchOptions)
}
