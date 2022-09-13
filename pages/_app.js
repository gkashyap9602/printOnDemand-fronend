import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { ThemeProvider } from '@material-ui/core/styles'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'
import '../styles/index.css'
import theme from '../styles/theme'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { publicRoutes, privateRoutes, adminRoutes, ISSERVER } from 'constants/routePaths'
import Script from 'next/script'
import { NotificationManager } from 'react-notifications'
import { setShopifyAccessData } from '../redux/actions/shopifyActions'
import { isShopifyApp } from '../utils/helpers'

/**
 * MyApp
 * @param {*} param0
 * @returns
 */

function MyApp({ Component, pageProps = {}, cookieData, initRouter }) {
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter()
  let state = store.getState()

  /**
   * Initial path check
   */
  useEffect(() => {
    const isIframeSession = isShopifyApp()
    const mappedPrivateRoutes = privateRoutes?.map((routes) => {
      if (routes.includes('...')) {
        return routes.replaceAll('...', '')
      }
      return routes
    })
    const mappedAdminRoutes = adminRoutes?.map((routes) => {
      if (routes.includes('...')) {
        return routes.replaceAll('...', '')
      }
      return routes
    })
    if (isIframeSession) {
      if (state.user?.userSessionShopify?.response) {
        if (mappedPrivateRoutes.includes(initRouter.pathname)) {
          router.push({
            pathname: initRouter.pathname,
            query: { ...initRouter.query }
          })
        } else {
          if (
            publicRoutes.includes(initRouter.pathname) ||
            mappedPrivateRoutes.includes(initRouter.pathname) ||
            mappedAdminRoutes.includes(initRouter.pathname)
          ) {
            router.push('/orders')
          }
        }
      } else {
        if (publicRoutes.includes(initRouter.pathname) && initRouter.pathname !== '/') {
          router.push({
            pathname: initRouter.pathname
          })
        } else {
          router.push('/login')
        }
      }
    } else {
      const userSession = !ISSERVER && JSON.parse(localStorage.getItem('userSession'))
      if (userSession) {
        if (userSession?.userType === 3) {
          if (mappedPrivateRoutes.includes(initRouter.pathname)) {
            router.push({
              pathname: initRouter.pathname,
              query: { ...initRouter.query }
            })
          } else {
            if (
              publicRoutes.includes(initRouter.pathname) ||
              mappedPrivateRoutes.includes(initRouter.pathname) ||
              mappedAdminRoutes.includes(initRouter.pathname)
            ) {
              router.push('/orders')
            }
          }
        } else if (userSession?.userType === 2) {
          if (mappedAdminRoutes.includes(initRouter.pathname)) {
            router.push({
              pathname: initRouter.pathname,
              query: { ...initRouter.query }
            })
          } else {
            if (
              publicRoutes.includes(initRouter.pathname) ||
              mappedPrivateRoutes.includes(initRouter.pathname) ||
              mappedAdminRoutes.includes(initRouter.pathname)
            ) {
              router.push('/admin/customerList')
            }
          }
        }
      } else {
        if (
          mappedPrivateRoutes.includes(initRouter.pathname) ||
          mappedAdminRoutes.includes(initRouter.pathname) ||
          initRouter.pathname === '/'
        ) {
          router.push('/login')
          initRouter.pathname !== '/' &&
            NotificationManager.error('The session has expired', '', 10000)
        }
        if (publicRoutes.includes(initRouter.pathname) && initRouter.pathname !== '/') {
          router.push({
            pathname: initRouter.pathname
          })
        }
      }
    }
  }, [router?.pathname])

  //UseEffect to dispatch new Access token and data from shopify API.
  useEffect(() => {
    const getIframeMessage = ({ data }) => {
      if (data?.type === 'mww-iframe-data') {
        store?.dispatch(setShopifyAccessData(data))
      }
    }
    window.addEventListener('message', getIframeMessage)
    return () => window.removeEventListener('message', getIframeMessage)
  }, [])

  //HTML
  return (
    <Provider store={store}>
      <Script src='https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js' />
      <Script
        strategy='beforeInteractive'
        src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
      />
      <ThemeProvider theme={theme}>
        <NotificationContainer />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
//Get initial props
MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { query, pathname } = ctx
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps, initRouter: { query, pathname } }
}

//export
export default MyApp
