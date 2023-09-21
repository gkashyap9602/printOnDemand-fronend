import { ADMIN } from '../../types/actions'

const customerReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN.ADD_CUSTOMER:
      return { ...state, customer: action.payload }
    case ADMIN.GET_CUSTOMER_DETAILS:
      return { ...state, customerDetails: action.payload }
    case ADMIN.UPDATE_CUSTOMER:
      return { ...state, updatecustomer: action.payload }
    default:
      return state
  }
}

export default customerReducer
