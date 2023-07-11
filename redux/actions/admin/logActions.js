import { ADMIN } from '../../types/actions'
import fetchHandler from '../../../utils/fetchResponseHandler'

export const fetchAdminLogs = (data) => {
  const fetchOptions = {
    url: `api/General/GetAllAdminLogs `,
    method: 'POST',
    actionType: ADMIN.GET_ALL_ADMIN_LOGS,
    body: JSON.stringify(data),
    secure: true
  }

  return fetchHandler(fetchOptions)
}
