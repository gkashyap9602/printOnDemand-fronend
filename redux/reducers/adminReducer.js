import { ADMIN } from '../types/actions'

const intialState = {
  token: null,
  tableLoader: false,
  adminParam: {
    pageIndex: 0,
    pageSize: 10
  }
}

const adminReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADMIN.FETCH_CUSTOMER_LIST:
      return { ...state, customerList: action.payload }
    case ADMIN.UPDATE_QUERY:
      return { ...state, adminParam: { ...action.val } }
    case ADMIN.UPDATE_FIELD:
      return { ...state, [action.field]: action.val }
    case ADMIN.UPDATE_CUSTOMER_STATUS:
      return {
        ...state,
        updatedList: action.payload
      }
    case ADMIN.UPDATE_WAITINGLIST:
      return {
        ...state
      }
    case ADMIN.GET_WAITING_LIST_STATUS:
      return {
        ...state,
        waitingListStatus: action.payload
      }
    default:
      return state
  }
}

export default adminReducer
