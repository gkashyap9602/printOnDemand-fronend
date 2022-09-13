import { ADMIN } from 'redux/types/actions'

const intialState = {
  orderQuery: {}
}

const orderReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADMIN.ADMIN_ALL_ORDERS:
      return { ...state, adminOrders: action.payload }
    case ADMIN.ADMIN_ORDER_DETAILS:
      return { ...state, adminOrderDetails: action.payload }
    default:
      return state
  }
}

export default orderReducer
