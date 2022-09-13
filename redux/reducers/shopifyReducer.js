import { SHOPIFY } from '../types/actions'

const initState = {
  shopifyAuth: false
}

const shopifyReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOPIFY.GET_SHOPIFY_ACCESS_DATA:
      return {
        ...state,
        shopifyAuth: action.payload
      }
    case SHOPIFY.CLEAR_ENTIRE_SHOPIFY_STATE:
      return { ...state, shopifyAuth: false }
    default:
      return state
  }
}

export default shopifyReducer
