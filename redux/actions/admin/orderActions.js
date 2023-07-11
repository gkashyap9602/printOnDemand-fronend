import { ADMIN } from '../../types/actions'
import fetchHandler from '../../../utils/fetchResponseHandler'

export const fetchAllOrders = (data) => {
  const fetchOptions = {
    url: `api/Orders/Admin/All`,
    method: 'POST',
    actionType: ADMIN.ADMIN_ALL_ORDERS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateAdminOrderQuery = (val) => {
  return {
    type: ADMIN.UPDATE_ORDER_QUERY_ADMIN,
    val
  }
}
export const fetchOrderDetails = (id) => {
  const fetchOptions = {
    url: `api/Orders/${id}`,
    method: 'GET',
    actionType: ADMIN.ADMIN_ORDER_DETAILS,
    secure: true
  }

  return fetchHandler(fetchOptions)
}
