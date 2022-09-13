import { PRODUCTS } from '../types/actions'

const intialState = {
  productParam: {
    pageIndex: 0,
    pageSize: 100,
    sortColumn: 'title',
    sortDirection: 'asc'
  },
  productCustomerQuery: {
    pageIndex: 0,
    pageSize: 10,
    sortColumn: 'title',
    sortDirection: 'asc'
  }
}

const productReducer = (state = intialState, action) => {
  switch (action.type) {
    case PRODUCTS.GET_ALL_PRODUCTS:
      return { ...state, products: action.payload }
    case PRODUCTS.GET_PRODUCT_DETAIL:
      return { ...state, product_details: action.payload }
    case PRODUCTS.GET_ALL_PRODUCTS:
      return { ...state, variableTypes: action.payload }
    case PRODUCTS.UPDATE_PRODUCT_QUERY:
      return action.isAdmin
        ? { ...state, productParam: { ...action.val } }
        : { ...state, productCustomerQuery: { ...action.val } }
    case PRODUCTS.UPDATE_FIELD:
      return { ...state, [action.field]: action.val }
    case PRODUCTS.CREATE_PRODUCT:
      return { ...state }
    case PRODUCTS.UPLOAD_PRODUCT_IMAGE:
      return { ...state }
    case PRODUCTS.UPLOAD_PRODUCT_VARIANT:
      return { ...state }
    case PRODUCTS.DELETE_PRODUCT_IMAGE:
      return { ...state }
    case PRODUCTS.DELETE_PRODUCT:
      return { ...state }
    case PRODUCTS.UPDATE_PRODUCT_BASIC_INFO:
      return { ...state }
    case PRODUCTS.UPDATE_PRODUCT_VARIANT:
      return { ...state }
    default:
      return state
  }
}

export default productReducer
