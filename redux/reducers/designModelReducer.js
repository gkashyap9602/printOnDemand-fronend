import { DESIGNMODEL } from '../types/actions'

const intialState = {}

const designModelReducer = (state = intialState, action) => {
  switch (action.type) {
    case DESIGNMODEL.ADD_MODEL_CONFIG: {
      return {
        ...action.payload
      }
    }
    case DESIGNMODEL.ADD_BASE_URL: {
      return {
        ...state,
        baseURL: action.payload
      }
    }
    case DESIGNMODEL.ADD_DESIGNER_JSON: {
      return {
        ...state,
        designerJSON: action.payload
      }
    }
    case DESIGNMODEL.ADD_PRODUCT_TITLE: {
      return {
        ...state,
        title: action.payload
      }
    }
    default:
      return state
  }
}

export default designModelReducer
