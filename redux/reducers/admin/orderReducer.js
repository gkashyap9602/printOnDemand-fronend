import { ADMIN } from 'redux/types/actions'

const intialState = {
  orderQuery: {},
  adminOrderQuery: {
    sortColumn: 'orderDate',
    sortDirection: 'desc',
    pageIndex: 0,
    pageSize: 10,
    customerId: null,
    createdFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
    createdTill: new Date()
  }
}

const orderReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADMIN.ADMIN_ALL_ORDERS:
      return { ...state, adminOrders: action.payload }
    case ADMIN.ADMIN_ORDER_DETAILS:
      return { ...state, adminOrderDetails: action.payload }
    case ADMIN.UPDATE_ORDER_QUERY_ADMIN:
      return { ...state, adminOrderQuery: { ...action.val } }
    default:
      return state
  }
}

export default orderReducer
