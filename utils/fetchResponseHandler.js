import { verifyUser as getToken } from './verifyUser'
import { publicRoutes } from 'constants/routePaths'
import { isShopifyApp } from './helpers'

const API_URL = process.env.BASE_URL

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export default function fetchHandler({
  url,
  method,
  actionType,
  fileUpload,
  body,
  secure = true,
  shouldDispatch = true
}) {
  return async (dispatch, getState) => {
    let headersData = fileUpload
      ? {
          'Content-Type': 'multipart/form-data'
        }
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }

    async function delayedApiCall() {
      const state = getState()
      //do something here
      // isShopifyApp() ? await sleep(4000) : true //wait 4 seconds
      const token = isShopifyApp() ? state?.shopify?.shopifyAuth?.accessToken : getToken()
      if (secure) {
        headersData = {
          ...headersData,
          Authorization: `Bearer ${token}`,
          TimezoneOffset: new Date().getTimezoneOffset(),
          ...(state?.shopify?.shopifyAuth && {
            store: 1
          })
        }
      }
      if (!navigator.onLine)
        return {
          StatusCode: 12002,
          Response: {
            Message: 'No active internet connection.'
          }
        }
      if (secure && !token) {
        return {
          StatusCode: 401,
          Response: {
            Message: 'The session has expired.'
          }
        }
      }

      const promise = fetch(`${API_URL}${url}`, {
        method,
        headers: headersData,
        body
      })

      const response = await promise
      return responseHandler(response, actionType, dispatch, shouldDispatch)
    }
    return delayedApiCall()
  }
}

/**
 * responseHandler
 * @param {*} response
 * @param {*} actionType
 * @param {*} dispatch
 * @param {*} shouldDispatch
 * @returns
 */
async function responseHandler(response, actionType, dispatch, shouldDispatch) {
  let json
  try {
    json = response.json && (await response.json())
  } catch (error) {
    console.log(`Response is not a json object`) // eslint-disable-line no-console
  }
  json = json || {}

  if (200 <= response.status && response.status < 300) {
    if (shouldDispatch) {
      dispatch({
        type: actionType,
        payload: json
      })
    }
    return json
  } else {
    if (json.StatusCode === 401 && !publicRoutes.includes(window?.location?.pathname)) {
      !isShopifyApp() && localStorage.removeItem('userSession')
      window.location.href = '/login'
      return {}
    }
    return { ...json, hasError: true }
  }
}

export const getConfig = (shopifyToken) => {
  const token = shopifyToken ? shopifyToken : getToken()
  let headersData = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      ...(shopifyToken && {
        store: 1
      })
    }
  }
  return headersData
}
