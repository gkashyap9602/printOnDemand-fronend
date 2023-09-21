import { USER } from '../types/actions'

const intialState = {
  wizardIndex: 0,
  userValueUpdated: false,
  userDetails: {}
}

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case USER.GET_ACCOUNT_DETAILS:
      return { ...state, userAccountDetails: action.payload }
    case USER.GET_STATUS:
      return { ...state, userStatus: action.payload }
    case USER.SEND_BASIC_INFO:
      return { ...state, user: action.payload }
    case USER.SEND_SHIPPING_INFO:
      return { ...state, user: action.payload }
    case USER.SEND_BILLING_INFO:
      return { ...state, user: action.payload }
    case USER.UPDATE_FIELD:
      return { ...state, [action.field]: action.val }
    case USER.GET_COUNTRY_LIST:
      return { ...state, countryList: action.payload }
    case USER.GET_STATE_LIST:
      return { ...state, stateList: action.payload }
    case USER.FETCH_USER_SESSION_SHOPIFY:
      return { ...state, userSessionShopify: action.payload, userDetails: action.payload.response }
    case USER.CLEAR_ENTIRE_SHOPIFY_STATE:
      return { ...state, userSessionShopify: {} }
    default:
      return state
  }
}

export default userReducer
