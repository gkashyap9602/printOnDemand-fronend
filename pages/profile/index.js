import React, { useEffect, useState } from 'react'
import Layout from 'components/layout'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import { getAccontDetails, updateField, getCountryList } from 'redux/actions/userActions'
import TimelineStepper from 'components/stepper'
import BasicInfo from 'components/basicInfo'
import ShippingInfo from 'components/shippingInfo'
import BillingInfo from 'components/billingInfo'
import { style } from 'styles/profile'
import PaymentInfo from 'components/paymentInfo'
import Loader from 'components/loader'
import { useRouter } from 'next/router'
import { checkIfEmpty, isShopifyApp } from 'utils/helpers'
import { NotificationManager } from 'react-notifications'
const useStyles = style

/**
 * Profile Page
 * @param {*} param0
 * @returns
 */
const Profile = ({
  userAccountDetails,
  updateField,
  getAccontDetails,
  wizardIndex,
  userValueUpdated,
  getCountryList,
  shopifyAuth,
  userDetails
}) => {
  const [loader, setLoader] = useState(true)
  const [userGuid, setUserGuid] = useState('')
  const [basicInfo, setBasicInfo] = useState({})
  const [shippingInfo, setShippingInfo] = useState({})
  const [billingInfo, setBillingInfo] = useState({})
  const [ncResaleInfo, setNCResaleInfo] = useState({})
  const [paymentInfo, setpaymentInfo] = useState({})
  const route = useRouter()
  const [complitionStatus, setComplitionStatus] = useState({})

  /**
   * Get countries list
   */
  useEffect(() => {
    getCountryList()
  }, [])

  /**
   * Get Account details
   */
  useEffect(async () => {
    if (userDetails?.guid) {
      const res = await getAccontDetails(userDetails?.guid)
      if ((res.StatusCode >= 400 || res.hasError) && res?.StatusCode !== 401) {
        setLoader(false)
        NotificationManager.error('something went wrong', '', 10000)
      }
    }
  }, [userValueUpdated, getAccontDetails])

  /**
   * Update account details to state
   */
  useEffect(() => {
    if (userAccountDetails?.response) {
      setLoader(false)
      const basicInfo = {
        email: userAccountDetails?.response?.email,
        firstName: userAccountDetails?.response?.firstName,
        lastName: userAccountDetails?.response?.lastName
      }
      setUserGuid(userAccountDetails?.response?.guid)
      setBasicInfo(basicInfo)
      if (!shopifyAuth && !isShopifyApp()) {
        localStorage.setItem(
          'paytraceCustomerId',
          JSON.stringify(userAccountDetails?.response?.payTraceId)
        )
      }
      setShippingInfo(
        userAccountDetails?.response?.shippingAddress
          ? userAccountDetails?.response?.shippingAddress
          : {}
      )
      setBillingInfo(
        userAccountDetails?.response?.billingAddress
          ? userAccountDetails?.response?.billingAddress
          : {}
      )
      setpaymentInfo(
        userAccountDetails?.response?.paymentDetails
          ? userAccountDetails?.response?.paymentDetails
          : {}
      )
      setNCResaleInfo(
        userAccountDetails?.response?.ncResaleInfo ? userAccountDetails?.response?.ncResaleInfo : {}
      )
      setComplitionStatus(
        userAccountDetails?.response?.completionStaus
          ? userAccountDetails?.response?.completionStaus
          : {}
      )
    }

    // return () => {
    //   if (!shopifyAuth) {
    //     updateField('userAccountDetails', null)
    //   }
    // }
  }, [userAccountDetails, updateField])

  /**
   * Set to initial tab
   */
  useEffect(() => {
    updateField('wizardIndex', 0)
    return () => {
      // if (!shopifyAuth) {
      //   updateField('userAccountDetails', null)
      // }
      updateField('wizardIndex', 0)
    }
  }, [])

  /**
   * Payment info  redirect handle
   */
  useEffect(() => {
    if (!checkIfEmpty(route.query)) {
      updateField('wizardIndex', 3)
      route.push({ pathname: '/profile', query: route?.query })
    }
  }, [!checkIfEmpty(route.query)])

  //HTML
  return (
    <Layout>
      {loader && <Loader />}
      <Container>
        {/* <!--timeline--> */}
        <TimelineStepper info={complitionStatus} userAccountDetails={userAccountDetails} />
        {/* <!--timeline--> */}
        {wizardIndex === 0 && <BasicInfo info={basicInfo} userGuid={userGuid} />}
        {wizardIndex === 1 && <ShippingInfo info={shippingInfo} userGuid={userGuid} />}
        {wizardIndex === 2 && (
          <BillingInfo
            info={billingInfo}
            ncInfo={ncResaleInfo}
            userGuid={userGuid}
            shippingAddress={shippingInfo}
          />
        )}
        {wizardIndex === 3 && (
          <PaymentInfo info={paymentInfo} userGuid={userGuid} shippingAddress={shippingInfo} />
        )}
      </Container>
    </Layout>
  )
}
//mapStateToProps
const mapStateToProps = (state) => ({
  userAccountDetails: state.user.userAccountDetails,
  wizardIndex: state.user.wizardIndex,
  userValueUpdated: state.user.userValueUpdated,
  shopifyAuth: state?.shopify?.shopifyAuth,
  user: state,
  userDetails: state?.user?.userDetails
})

//mapDispatchToProps
const mapDispatchToProps = {
  getAccontDetails,
  updateField,
  getCountryList
}

//Export
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
