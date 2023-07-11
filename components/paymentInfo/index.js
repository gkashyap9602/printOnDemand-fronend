import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core'
import HeaderLogo from '/static/images/MWW-Logo.png'
import Email from '/static/images/email-1.png'
import Image from 'next/image'
import {
  Field,
  formValueSelector,
  reduxForm,
  change as changeFieldValue,
  reset as resetFrom
} from 'redux-form'
import { connect } from 'react-redux'
import PaymentBanner from '/static/images/profile/payments.png'
import { CARD_INFO, PAYMENT_INFO } from 'constants/fields'
import {
  updatePaymentInfo,
  updateField,
  getAccontDetails,
  getUserSessionShopify
} from 'redux/actions/userActions'
import { NotificationManager } from 'react-notifications'
import TextInput from 'components/TextInput'
import { style } from 'styles/profile'
import Select from 'components/select'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { checkIfEmpty, validateFields, isShopifyApp } from 'utils/helpers'
import { ISSERVER } from 'constants/routePaths'
import Loader from 'components/loader'
import Modal from 'components/modal'
const useStyles = style

/**
 * PaymentInfo page
 * @param {*} param0
 * @returns
 */
let PaymentInfo = ({
  info,
  showSameAddress = false,
  updateField,
  resetFrom,
  changeFieldValue,
  shippingAddress,
  address1,
  phone,
  stateName,
  updatePaymentInfo,
  city,
  zipCode,
  name,
  userGuid,
  ccNumber,
  expirationMonth,
  expirationYear,
  countryList,
  userAccountDetails,
  getAccontDetails,
  userId,
  customerIds,
  country,
  userDetails
}) => {
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  const route = useRouter()
  const {
    query: { ccNumber: encryptCC }
  } = route
  const [loaderBtn, setloaderBtn] = useState(false)
  const data = { name, ccNumber, expirationMonth, expirationYear }
  const [currentValue, setCurrentValue] = useState({ country: '', stateName: '' })
  const [shippingInfoForms, setShippingInfoForms] = useState(CARD_INFO)
  const [popup, setpopup] = useState(false)
  const [customerId, setCustomerId] = useState()

  /**
   * Initial useeffect
   */
  useEffect(() => {
    if (!ISSERVER && !isShopifyApp()) {
      if (localStorage.getItem('paytraceCustomerId')) {
        setCustomerId(JSON.parse(localStorage.getItem('paytraceCustomerId')))
      }
    } else {
      userAccountDetails && setCustomerId(userAccountDetails?.response?.payTraceId)
    }
  }, [])

  /**
   * Set country
   * @param {*} values
   */
  const setDefaultCountryState = (values) => {
    const { countryCode, stateCode } = values.billingAddressData

    if (countryCode && countryCode === 'US' && stateCode) {
      setCurrentValue({ ...currentValue, country: countryCode, stateName: stateCode })
      changeFieldValue('PaymentInfoForm', 'country', currentValue.countryCode)
      changeFieldValue('PaymentInfoForm', 'stateName', currentValue.stateCode)
    } else {
      setCurrentValue({ ...currentValue, country: countryCode, stateName: stateCode })
      changeFieldValue('PaymentInfoForm', 'country', currentValue.countryCode)
    }
  }

  /**
   * HAndle country change
   */
  useEffect(() => {
    let newFormsList
    if (Object.getOwnPropertyNames(info).length !== 0) {
      setDefaultCountryState(info)
    }
    if (showSameAddress && Object.getOwnPropertyNames(shippingAddress).length !== 0) {
      setDefaultCountryState(shippingAddress)
    }
    if (
      !showSameAddress &&
      Object.getOwnPropertyNames(shippingAddress).length !== 0 &&
      Object.getOwnPropertyNames(info).length === 0
    ) {
      setCurrentValue({ country: '', stateName: '' })
      newFormsList = [
        ...shippingInfoForms?.map((info) => {
          if (info.name === 'stateName') {
            return {
              ...info,
              type: 'text',
              options: []
            }
          }
          return { ...info }
        })
      ]
      newFormsList = newFormsList.filter((formInfo) => formInfo.name !== 'taxNum')
      setShippingInfoForms(newFormsList)
      changeFieldValue('PaymentInfoForm', 'stateName', '')
    }
  }, [showSameAddress])

  /**
   * Select field format
   * @param {*} list
   * @returns
   */
  const selectFieldFormat = (list) => {
    return list.map(({ id, name, code }) => ({
      id,
      label: name,
      value: code
    }))
  }

  /**
   * HAndle counties
   */
  useEffect(() => {
    if (countryList && countryList?.response?.length) {
      const options = selectFieldFormat(countryList?.response)
      const newFormsList = [
        ...shippingInfoForms?.map((formInfo) => {
          if (formInfo.name === 'country') {
            return {
              ...formInfo,
              options
            }
          }
          return { ...formInfo }
        })
      ]
      setShippingInfoForms(newFormsList)
    }
  }, [countryList])

  /**
   * Set payment form values
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue(
        'PaymentInfoForm',
        'address1',
        address1 !== undefined ? address1 : values.billingAddressData.streetAddress
      )
      changeFieldValue(
        'PaymentInfoForm',
        'name',
        name !== undefined ? name : values.billingAddressData.name
      )
      changeFieldValue(
        'PaymentInfoForm',
        'city',
        city !== undefined ? city : values.billingAddressData.city
      )
      changeFieldValue(
        'PaymentInfoForm',
        'country',
        country !== undefined ? country : values.billingAddressData.countryCode
      )
      changeFieldValue(
        'PaymentInfoForm',
        'zipCode',
        zipCode !== undefined ? zipCode : values.billingAddressData.zip
      )
      changeFieldValue(
        'PaymentInfoForm',
        'phone',
        phone !== undefined ? phone.replace(/[^0-9 ]/g, '') : values.phone.replace(/[^0-9 ]/g, '')
      )
      changeFieldValue(
        'PaymentInfoForm',
        'expirationMonth',
        expirationMonth !== undefined ? expirationMonth : values.creditCardData.expirationMonth
      )
      changeFieldValue(
        'PaymentInfoForm',
        'expirationYear',
        expirationYear !== undefined
          ? `${expirationYear}`.includes('20')
            ? expirationYear
            : `20${expirationYear}`
          : `20${values.creditCardData.expirationYear}`
      )
      changeFieldValue(
        'PaymentInfoForm',
        'stateName',
        stateName !== undefined ? stateName : values.billingAddressData.stateCode
      )

      changeFieldValue('PaymentInfoForm', 'userId', userGuid)
      changeFieldValue('PaymentInfoForm', 'customerId', customerId)
    }
    if (Object.getOwnPropertyNames(info).length !== 0) {
      setFieldValues(info)
    } else {
      if (showSameAddress) {
        setFieldValues(shippingAddress)
      } else {
        resetFrom('PaymentInfoForm')
      }
    }
    changeFieldValue('PaymentInfoForm', 'userId', userGuid)
    changeFieldValue('PaymentInfoForm', 'customerId', customerId)
  }, [info, showSameAddress, resetFrom, shippingAddress, customerId, userGuid, changeFieldValue])

  /**
   * Set card address value
   */
  // useEffect(() => {}, [])

  /**
   * Validate fields
   */
  useEffect(() => {
    const values = { name, ccNumber, expirationMonth, expirationYear, userId, customerIds }
    const error = validateFields(values, PAYMENT_INFO)
    const shippingValues = {
      address1,
      phone,
      stateName,
      country,
      city,
      zipCode
    }
    const shippingError = validateFields(shippingValues, CARD_INFO)
    setErrors({ ...error, ...shippingError })
    if (
      !checkIfEmpty(expirationMonth) &&
      !checkIfEmpty(expirationYear) &&
      parseInt(expirationYear) === new Date().getFullYear() &&
      parseInt(expirationMonth) < new Date().getMonth() + 1
    ) {
      setErrors({ ...errors, expirationMonth: 'Invalid expiry month' })
    }
  }, [
    name,
    ccNumber,
    expirationMonth,
    expirationYear,
    userId,
    customerIds,
    address1,
    stateName,
    city,
    phone,
    country,
    zipCode
  ])

  /**
   * Payment Submit
   */
  useEffect(() => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else if (!checkIfEmpty(route.query) && isShopifyApp()) {
      setTimeout(() => {
        saveHandler()
      }, 2000)
    }
  }, [encryptCC && isShopifyApp()])

  /**
   * Submit
   */
  useEffect(() => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else if (!checkIfEmpty(route.query) && !isShopifyApp()) {
      saveHandler()
    }
  }, [route.query && !isShopifyApp()])

  /**
   * Save handler
   */
  const saveHandler = async () => {
    let res = {}
    setloaderBtn(true)
    if (isShopifyApp()) {
      res = await updatePaymentInfo({
        userGuid: route.query.userId,
        paymentDetails: {
          phone: route.query.phone,
          customerId: route.query.customerId,
          creditCardData: {
            expirationMonth: route.query.expirationMonth,
            expirationYear: route.query.expirationYear,
            ccNumber: route.query.ccNumber
          },
          billingAddressData: {
            name: route.query.name,
            streetAddress: route.query.address1,
            city: route.query.city,
            stateCode: route.query.stateName,
            countryCode: route.query.country,
            zip: route.query.zipCode
          }
        }
      })
    } else {
      res = await updatePaymentInfo({
        userGuid: userDetails?.guid,
        paymentDetails: {
          phone: route.query.phone,
          customerId: route?.query.customerId,
          creditCardData: {
            expirationMonth: route.query.expirationMonth,
            expirationYear: route.query.expirationYear,
            ccNumber: route.query.ccNumber
          },
          billingAddressData: {
            name: route.query.name,
            streetAddress: route.query.address1,
            city: route.query.city,
            stateCode: route.query.stateName,
            countryCode: route.query.country,
            zip: route.query.zipCode
          }
        }
      })
    }

    if (res.StatusCode === 12002 && res.StatusCode === 401) {
      setloaderBtn(false)
      NotificationManager.error(res?.Response?.Message, '', 10000)
    } else if (res?.statusCode === 200) {
      setloaderBtn(false)
      if (checkIfEmpty(route?.query?.customerId)) {
        NotificationManager.success('Payment info updated', '', 2000)
        setpopup(true)
      } else {
        getAccontDetails(userDetails?.guid)
        NotificationManager.success('Payment info updated', '', 2000)
        route.push('/profile')
        updateField('wizardIndex', 0)
      }
    } else if (res.StatusCode === 500) {
      setloaderBtn(false)
      route.push('/profile')
      NotificationManager.error(res?.Response?.Message, '', 10000)
    } else if (res?.StatusCode === 400) {
      updateField('wizardIndex', 3)
      setloaderBtn(false)
      changeFieldValue('PaymentInfoForm', 'address1', route.query.address1)
      changeFieldValue('PaymentInfoForm', 'name', route.query.name)
      changeFieldValue('PaymentInfoForm', 'city', route.query.city)
      changeFieldValue('PaymentInfoForm', 'phone', route.query.phone)
      changeFieldValue('PaymentInfoForm', 'country', route.query.country)
      changeFieldValue('PaymentInfoForm', 'zipCode', route.query.zipCode)
      changeFieldValue('PaymentInfoForm', 'expirationMonth', route.query.expirationMonth)
      changeFieldValue('PaymentInfoForm', 'expirationYear', route.query.expirationYear)
      changeFieldValue('PaymentInfoForm', 'stateName', route.query.stateName)
      changeFieldValue('PaymentInfoForm', 'userId', route.query.userId)
      changeFieldValue('PaymentInfoForm', 'customerId', route.query.customerId)
      setCurrentValue({ country: route.query.country, stateName: route.query.stateName })
      res?.Response?.ValidationErrors?.map((val) => {
        NotificationManager.error(val, '', 10000)
      })
    }
  }
  /**
   * Close the popup
   */
  const handleModalClose = () => {
    setpopup(false)
    route.push('/orders')
  }
  /**
   * PAytrace script calling
   */
  useEffect(() => {
    $(document).ready(function () {
      paytrace.hookFormSubmit('#PaymentInfoForm')
      paytrace.setKeyAjax('/api/handler')
    })
  }, [typeof window !== 'undefined' && document])

  //HTML
  return (
    <Grid container spacing={3} direction='row' className={classes.root}>
      {loaderBtn && <Loader />}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={classes.bg_Profile}>
          <Image src={PaymentBanner} alt='Payment Info' />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
        <div className={classes.bgProfile_Wrap}>
          <Typography variant='h1'>Payment info</Typography>
          <form name='PaymentInfoForm' id='PaymentInfoForm'>
            <div className={classes.formWrapper}>
              <Grid container spacing={2}>
                {PAYMENT_INFO?.map((field, i) => (
                  <Grid item {...field.size} key={i}>
                    <Field
                      {...field}
                      label={field?.label}
                      id={field?.key}
                      placeholder={
                        field?.name === 'ccNumber' && info?.creditCardData?.ccNumber
                          ? info?.creditCardData?.ccNumber
                          : field.placeholder
                      }
                      name={field?.name}
                      iconProps={field?.iconProps}
                      className={field?.classEncrypt}
                      options={field.options}
                      type={field?.type || 'text'}
                      selectedYear={expirationYear}
                      selectedValue={field?.type === 'select' ? data[field.name] : ''}
                      component={field?.type === 'select' ? Select : TextInput}
                      helperText={errors?.[field?.name]}
                    />
                  </Grid>
                ))}
              </Grid>
              <div style={{ marginBottom: '16px', marginTop: 16 }}>
                <Typography variant='h1'>Credit card address</Typography>
              </div>
              <Grid container spacing={2}>
                {shippingInfoForms?.map((field, i) => (
                  <Grid item {...field.size} key={i}>
                    <Field
                      {...field}
                      label={field?.label}
                      id={field?.name}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      type={field?.type || 'text'}
                      component={field?.type === 'select' ? Select : TextInput}
                      helperText={errors?.[field?.name]}
                      selectedValue={field?.type === 'select' ? currentValue[field.name] : ''}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={
                  !(
                    city &&
                    zipCode &&
                    name &&
                    ccNumber &&
                    phone &&
                    expirationMonth &&
                    expirationYear &&
                    Object.keys(errors).length === 0
                  ) || loaderBtn
                }
                className={classes.btn_Submit}
              >
                Save
                {loaderBtn && <CircularProgress size={18} className={classes.LoaderSession} />}
              </Button>
            </div>
          </form>
        </div>
      </Grid>
      {/* <!--modal--> */}
      {popup && (
        <Modal open={popup} handleClose={handleModalClose}>
          <table
            width='400'
            style={{ background: '#e3eaf1', border: ' 1px solid #eae7e7', margin: '30px auto' }}
          >
            <tr>
              <th>
                <table width='500' style={{ margin: '0 auto' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '20px 0px', textAlign: 'center' }}>
                        <Image src={HeaderLogo} alt='MWW Logo' width='285' height='29' />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </th>
            </tr>
            <tr>
              <th style={{ fontWeight: 400 }}>
                <table
                  width='400'
                  style={{ background: '#fff', margin: ' 0 auto', padding: '0px 0px 30px 0px' }}
                >
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center', padding: '20px' }}>
                        <Image
                          src={Email}
                          alt='Reset Password'
                          width='600'
                          height='205'
                          style={{ marginTop: '16px' }}
                        />
                        <div style={{ textAlign: 'left' }}>
                          <div
                            style={{
                              fontSize: '20px',
                              fontWeight: 700,
                              textAlign: 'center',
                              color: '#292d2f',
                              marginTop: '25px'
                            }}
                          >
                            Thank you for completing your account profile!
                            <p
                              style={{
                                fontSize: '15px',
                                fontWeight: 400,
                                textAlign: 'center',
                                color: '#292d2f',
                                marginTop: '25px'
                              }}
                            >
                              We’ll let you know when your account is activated.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </th>
            </tr>

            <tr>
              <td style={{ height: '30px' }}></td>
            </tr>
          </table>
        </Modal>
      )}
      {/* <!--modal--> */}
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  countryList: state.user.countryList,
  userAccountDetails: state?.user?.userAccountDetails,
  userDetails: state?.user?.userDetails,
  shopifyAuth: state?.shopify?.shopifyAuth
})

const mapDispatchToProps = {
  changeFieldValue,
  updateField,
  updatePaymentInfo,
  getAccontDetails,
  resetFrom,
  getUserSessionShopify
}
const selector = formValueSelector('PaymentInfoForm') // <-- same as form name
PaymentInfo = connect((state) => {
  const address1 = selector(state, 'address1')
  const phone = selector(state, 'phone')
  const country = selector(state, 'country')
  const stateName = selector(state, 'stateName')
  const city = selector(state, 'city')
  const zipCode = selector(state, 'zipCode')
  const name = selector(state, 'name')
  const userId = selector(state, 'userId')
  const customerIds = selector(state, 'customerId')
  const ccNumber = selector(state, 'ccNumber')
  const expirationMonth = selector(state, 'expirationMonth')
  const expirationYear = selector(state, 'expirationYear')
  const showSameAddress = selector(state, 'showSameAddress')
  return {
    name,
    ccNumber,
    expirationMonth,
    stateName,
    city,
    country,
    zipCode,
    expirationYear,
    userId,
    customerIds,
    address1,
    phone,
    showSameAddress
  }
})(PaymentInfo)
export default reduxForm({
  form: 'PaymentInfoForm'
})(connect(mapStateToProps, mapDispatchToProps)(PaymentInfo))
