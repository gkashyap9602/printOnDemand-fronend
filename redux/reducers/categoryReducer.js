import { CATEGORY } from '../types/actions'

const intialState = {}

const categoryReducer = (state = intialState, action) => {
  switch (action.type) {
    case CATEGORY.GET_ALL_CATEGORY:
      return { ...state, category: action.payload }
    case CATEGORY.GET_ALL_SUBCATEGORY:
      return { ...state, subcategory: action.payload }
    case CATEGORY.CREATE_CATEGORY:
      return { ...state }
    case CATEGORY.DELETE_CATEGORY:
      return { ...state }
    case CATEGORY.UPDATE_CATEGORY:
      return { ...state }
    case CATEGORY.GET_ALL_MATERIAL:
      return { ...state, material: action.payload }
    case CATEGORY.UPDATE_FIELD:
      return { ...state, [action.field]: action.val }
    case CATEGORY.GLOBAL_SEARCH:
      return { ...state, globalSearchResult: action.val }
    default:
      return state
  }
}

export default categoryReducer
