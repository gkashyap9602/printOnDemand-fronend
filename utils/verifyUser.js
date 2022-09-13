import { ISSERVER } from 'constants/routePaths'
import { isShopifyApp } from './helpers'

export const getAuth = () => !ISSERVER && JSON.parse(localStorage.getItem('userSession'))

export const verifyUser = (auth) => {
  if (auth) {
    return auth?.token
  } else {
    auth = !ISSERVER && !isShopifyApp() && getAuth()
  }

  if (auth) {
    return auth?.token
  }
  return false
}
