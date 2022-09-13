import { ADMIN } from '../../types/actions'
import fetchHandler from '../../../utils/fetchResponseHandler'

export const AddCustomer = (data) => {
  const fetchOptions = {
    url: `api/Customer/create`,
    method: 'POST',
    actionType: ADMIN.ADD_CUSTOMER,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const UpdateCustomer = (data) => {
  const fetchOptions = {
    url: `api/Customer/update`,
    method: 'POST',
    actionType: ADMIN.UPDATE_CUSTOMER,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}

export const getCustomerDetails = (guid) => {
  const fetchOptions = {
    url: `api/User/${guid}`,
    method: 'GET',
    actionType: ADMIN.GET_CUSTOMER_DETAILS,
    secure: true
  }

  return fetchHandler(fetchOptions)
}
