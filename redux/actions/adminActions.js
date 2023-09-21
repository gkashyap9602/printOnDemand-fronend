import { ADMIN } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const fetchCustomerList = (data) => {
  const fetchOptions = {
    url: `api/Customer/getall`,
    method: 'POST',
    actionType: ADMIN.FETCH_CUSTOMER_LIST,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateCustomerStatus = (data) => {
  const fetchOptions = {
    url: `api/User/UpdateStatus`,
    method: 'POST',
    actionType: ADMIN.UPDATE_CUSTOMER_STATUS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateWaitingList = (data) => {
  const fetchOptions = {
    url: `api/General/updatewaitingliststatus`,
    method: 'POST',
    actionType: ADMIN.UPDATE_WAITINGLIST,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const updateField = (field, val) => {
  return {
    type: ADMIN.UPDATE_FIELD,
    field,
    val
  }
}

export const updateQuery = (val) => {
  return {
    type: ADMIN.UPDATE_QUERY,
    val
  }
}

export const getWaitingListStatus = () => {
  const fetchOptions = {
    url: `api/General/GetWaitingListStatus`,
    method: 'GET',
    actionType: ADMIN.GET_WAITING_LIST_STATUS,
    secure: false
  }

  return fetchHandler(fetchOptions)
}
