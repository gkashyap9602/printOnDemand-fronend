import { FAQ } from '../types/actions'
export const updateCategory = (category) => {
  return {
    type: FAQ.FAQ_CATEGORY,
    category
  }
}

export const getHelpCenter = (articles) => {
  return {
    type: FAQ.ARTICLES,
    articles
  }
}
