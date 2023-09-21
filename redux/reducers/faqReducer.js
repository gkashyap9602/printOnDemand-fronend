import { FAQ } from '../types/actions'

const intialState = {}

const faqReducer = (state = intialState, action) => {
  switch (action.type) {
    case FAQ.FAQ_CATEGORY:
      return { ...state, faq: action.category }
    case FAQ.ARTICLES:
      return { ...state, articles: action.articles }
    default:
      return state
  }
}

export default faqReducer
