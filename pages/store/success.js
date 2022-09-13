import React, { useState, useEffect } from 'react'
import Layout from 'components/layout'
import Success from 'components/pages/storeList/storeSuccess'
import { connect } from 'react-redux'
import { saveShopInfo } from 'redux/actions/userStoreActions'
import { NotificationManager } from 'react-notifications'
import Loader from 'components/loader'

const success = ({ code, shop, saveShopInfo, isError }) => {
  const [loader, setLoader] = useState(true)
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [isAccessDenied, setIsAccessDenied] = useState(false)
  useEffect(async () => {
    if (isError === 'access_denied') {
      NotificationManager.error(
        "Access denied! Couldn't connect to the store. Please try again.",
        '',
        10000
      )
      setIsAccessDenied(true)
      setIsBtnDisabled(false)
    } else {
      let data = {}
      let store
      if (shop) {
        data = {
          code,
          shop
        }
        store = 'Shopify'
      } else {
        const API_URL = process.env.SITE_URL
        data = {
          code,
          redirectionUrl: `${API_URL}store/success`
        }
        store = 'Etsy'
      }
      setLoader(true)
      const res = await saveShopInfo(data, store)
      if (200 <= res.statusCode && res.statusCode < 300) {
        setLoader(false)
        NotificationManager.success(
          'Your MWW account has been connected successfully to the store.',
          '',
          5000
        )
        setIsBtnDisabled(false)
      }
      if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
        setLoader(false)
        setIsBtnDisabled(false)
        if (res.Response?.Message !== 'Access token generation failed.') {
          NotificationManager.error(
            res.Response?.Message
              ? res.Response?.Message
              : 'Something went wrong, please refresh the page',
            '',
            10000
          )
        }
      }
    }
  }, [])

  return (
    <Layout>
      {loader && <Loader />}
      <Success isBtnDisabled={isBtnDisabled} isAccessDenied={isAccessDenied} />
    </Layout>
  )
}

success.getInitialProps = ({ query }) => {
  return {
    code: query.code,
    hmac: query.hmac,
    host: query.host,
    shop: query.shop,
    timestamp: query.timestamp,
    isError: query.error
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  saveShopInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(success)
