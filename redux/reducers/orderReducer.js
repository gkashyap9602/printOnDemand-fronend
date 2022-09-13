import { ORDERS } from '../types/actions'

const intialState = {
  orderQuery: {
    pageIndex: 0,
    pageSize: 10,
    sortColumn: 'orderDate',
    sortDirection: 'desc',
    status: null
  }
}

const orderReducer = (state = intialState, action) => {
  switch (action.type) {
    case ORDERS.GET_ALL_ORDERS:
      return { ...state, orders: action.payload }
    case ORDERS.GET_ORDER_DETAILS:
      return { ...state, orderDetails: action.payload }
    case ORDERS.UPDATE_VARIANT:
      return { ...state, variants: action.variants }
    case ORDERS.UPDATE_ADDRESS:
      return { ...state, address: action.address }
    case ORDERS.DELETE_ORDERS:
      return { ...state, orders: action.payload }
    case ORDERS.CREATE_ORDER:
      return { ...state, newOrder: action.payload }
    case ORDERS.UPDATE_ORDER:
      return { ...state, updateOrder: action.payload }
    case ORDERS.SET_DELAY:
      return { ...state, delay: action.payload }
    case ORDERS.BULK_ORDER:
      return { ...state, bulk: action.payload }
    case ORDERS.ORDER_TEMPLATE:
      return { ...state, template: action.payload }
    case ORDERS.DOWNLOAD_DETAILS:
      return { ...state, downloadResponse: action.payload }
    case ORDERS.UPDATE_ORDER_QUERY:
      return { ...state, orderQuery: { ...action.val } }
    case ORDERS.GET_CART_ITEMS:
      return { ...state, addVariants: action.payload }
    case ORDERS.GET_SHIPPING_METHODS:
      return { ...state, shippingMethods: action.payload }
    default:
      return state
  }
}

export default orderReducer
