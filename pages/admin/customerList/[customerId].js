import { Button, Grid } from '@material-ui/core'
import Layout from 'components/layout'
import Loader from 'components/loader'
import BasicInfo from 'components/pages/adminPortal/customerTab/Create/basicInfo'
import BillingInfo from 'components/pages/adminPortal/customerTab/Create/billingInfo'
import PaymentInfo from 'components/pages/adminPortal/customerTab/Create/paymentInfo'
import ShippingInfo from 'components/pages/adminPortal/customerTab/Create/shippingInfo'
import {
  BASIC_INFO,
  BILLING_INFO_ADMIN,
  CARD_INFO_ADMIN,
  PAYMENT_INFO,
  SHIPPING_INFO_ADMIN
} from 'constants/fields'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { connect, useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { UpdateCustomer, getCustomerDetails } from 'redux/actions/admin/customerActions'
import { getCountryList, getStateList } from 'redux/actions/userActions'
import { checkIfEmpty, validateFields } from 'utils/helpers'
import style from './style'
const useStyles = style

/**
 * Create customer admin ui
 * @param {*} param0
 * @returns
 */
function EditCustomer({ getCountryList, getStateList, UpdateCustomer, getCustomerDetails }) {
  const classes = useStyles()
  const [errors, setErrors] = useState({ basic: {}, shipping: {}, billing: {}, payment: {} })
  const [isChecked, setisChecked] = useState(false)
  const route = useRouter()
  const [data, setdata] = useState({
    shippingAddress: { country: 'US' },
    billingAddress: { country: 'US' },
    paymentDetails: { country: 'US' }
  })
  const countryList = useSelector((state) => state?.user?.countryList?.response)
  const states = useSelector((state) => state?.user?.stateList?.response)
  const customer = useSelector((state) => state?.customer?.customerDetails?.response)
  const [loader, setloader] = useState(true)

  /**
   * handling on change events of all inputs
   * @param {*} name
   * @param {*} value
   * @param {*} key
   */
  const handleChange = (name, value, key = null, subKey = null) => {
    switch (key) {
      case 'shipping':
        isChecked
          ? setdata({
              ...data,
              billingAddress: { ...data?.shippingAddress, [name]: value },
              shippingAddress: { ...data?.shippingAddress, [name]: value }
            })
          : setdata({ ...data, shippingAddress: { ...data?.shippingAddress, [name]: value } })

        break
      case 'billing':
        setdata({ ...data, billingAddress: { ...data?.billingAddress, [name]: value } })
        break
      case 'payment':
        if (name === 'paytraceId') {
          setdata({
            ...data,
            paymentDetails: {
              ...data?.paymentDetails,
              [name]: value
            }
          })
        } else {
          subKey === 'card'
            ? setdata({
                ...data,
                paymentDetails: {
                  ...data?.paymentDetails,
                  creditCardData: { ...data?.paymentDetails?.creditCardData, [name]: value }
                }
              })
            : setdata({
                ...data,
                paymentDetails: {
                  ...data?.paymentDetails,
                  billingAddressData: { ...data?.paymentDetails.billingAddressData, [name]: value }
                }
              })
        }
        break
      default:
        setdata({ ...data, [name]: value })
        break
    }
  }

  /**
   * fetching country and state
   */
  useEffect(async () => {
    setloader(true)
    await getCountryList()
    await getStateList('US')
    const res = await getCustomerDetails(route?.query?.customerId)
    if (res?.StatusCode === 500) {
      NotificationManager.error(res?.Response?.Message, '', '2000')
    }
    if (res) {
      setdata({
        shippingAddress: res?.response?.shippingAddress,
        billingAddress: res?.response?.billingAddress,
        paymentDetails: { ...res?.response?.paymentDetails, paytraceId: res?.response?.payTraceId },
        firstName: res?.response?.firstName,
        lastName: res?.response?.lastName,
        email: res?.response?.email
      })
      setloader(false)
    }
  }, [])

  /**
   * set state
   */
  useEffect(() => {
    setdata({
      shippingAddress: customer?.shippingAddress,
      billingAddress: customer?.billingAddress,
      paymentDetails: { ...customer?.paymentDetails, paytraceId: customer?.payTraceId },
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      email: customer?.email
    })
  }, [customer])

  /**
   * On change data
   */
  useEffect(() => {
    const basic = validateFields(data, BASIC_INFO)
    const shipping = validateFields(data?.shippingAddress, SHIPPING_INFO_ADMIN)
    const billing = validateFields(data?.billingAddress, BILLING_INFO_ADMIN)
    const payment = validateFields(
      { ...data?.paymentDetails.billingAddressData, ...data?.paymentDetails?.creditCardData },
      [...CARD_INFO_ADMIN, ...PAYMENT_INFO]
    )
    setErrors({
      ...errors,
      basic: basic,
      shipping: shipping,
      billing: billing,
      payment: checkIfEmpty(data?.paymentDetails?.paytraceId)
        ? checkIfEmpty(data?.paymentDetails?.paytraceId) &&
          !checkIfEmpty(data?.paymentDetails?.creditCardData?.ccNumber) &&
          `${data?.paymentDetails?.creditCardData?.ccNumber}`.includes('**')
          ? { ...payment, ccNumber: 'Card number is required' }
          : payment
        : {}
    })
  }, [data])

  /**
   * handle billing same as shipping checkbox
   * @param {*} e
   */
  const handleCheck = (e) => {
    setisChecked(e?.target.checked)
    e?.target?.checked
      ? setdata({ ...data, billingAddress: data?.shippingAddress })
      : setdata({ ...data, billingAddress: {} })
  }

  /**
   * Handle the form submit
   */
  const handleSubmit = async () => {
    if (
      checkIfEmpty({
        ...errors?.basic,
        ...errors?.shipping,
        ...errors?.billing,
        ...errors?.payment
      })
    ) {
      const customer = JSON.parse(localStorage.getItem('updateCustomer'))
      const res = await UpdateCustomer({
        guid: route?.query?.customerId,
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        email: customer?.email,
        paymentDetails: checkIfEmpty(customer?.paymentDetails?.paytraceId)
          ? {
              phone: customer?.paymentDetails?.phone,
              creditCardData: {
                ccNumber: route?.query?.ccNumber,
                expirationMonth: customer?.paymentDetails?.expirationMonth,
                expirationYear: customer?.paymentDetails?.expirationYear
              },
              billingAddressData: {
                name: customer?.paymentDetails?.name,
                streetAddress: customer?.paymentDetails?.address1,
                city: customer?.paymentDetails?.city,
                stateCode: customer?.paymentDetails?.stateName,
                countryCode: customer?.paymentDetails?.country,
                zip: customer?.paymentDetails?.zipCode
              }
            }
          : null,
        shippingAddress: customer?.shippingAddress,
        billingAddress: customer?.billingAddress,
        payTraceId: customer?.paymentDetails?.paytraceId
      })
      if (res?.statusCode === 200) {
        localStorage.removeItem('updateCustomer')
        NotificationManager.success('Customer has been updated', '', '2000')
        route?.push('/admin/customerList')
      }
      if (res?.StatusCode === 400) {
        localStorage.removeItem('updateCustomer')
        checkIfEmpty(res?.Response?.ValidationErrors)
          ? NotificationManager.error(res?.Response?.Message, '', '2000')
          : res?.Response?.ValidationErrors?.map((val) => {
              NotificationManager.error(val, '', 10000)
            })
        setdata(customer)
      }
      if (res?.StatusCode === 500) {
        localStorage.removeItem('updateCustomer')
        NotificationManager.error(res?.Response?.Message, '', '2000')
        setdata(customer)
      }
    }
  }

  useEffect(() => {
    $(document).ready(function () {
      paytrace.hookFormSubmit('#createAdmin')
      paytrace.setKeyAjax('/api/handler')
    })
  }, [typeof window !== 'undefined' && document])
  //html
  return (
    <div>
      {loader && <Loader />}
      <Layout activateHide>
        {/* <!--new--> */}
        <form name='createAdmin' id='createAdmin'>
          <Grid container spacing={3} direction='column' style={{ marginBottom: '8px' }}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <BasicInfo handleChange={handleChange} errors={errors?.basic} data={data} />
            </Grid>
          </Grid>
          <Grid container spacing={3} direction='row' style={{ marginBottom: '8px' }}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <ShippingInfo
                handleChange={(name, value) => handleChange(name, value, 'shipping')}
                errors={errors?.shipping}
                data={data?.shippingAddress}
                handleCheck={handleCheck}
                isChecked={isChecked}
                countryList={countryList}
                states={states}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <BillingInfo
                handleChange={(name, value) => handleChange(name, value, 'billing')}
                errors={errors?.billing}
                data={data?.billingAddress}
                isChecked={isChecked}
                countryList={countryList}
                states={states}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <PaymentInfo
                handleChange={(name, value, key) => handleChange(name, value, 'payment', key)}
                errors={errors?.payment}
                handleSubmit={handleSubmit}
                data={{
                  creditCardData: {
                    ccNumber: data?.paymentDetails?.creditCardData?.ccNumber,
                    expirationMonth: data?.paymentDetails?.creditCardData?.expirationMonth,
                    expirationYear: data?.paymentDetails?.creditCardData?.expirationYear,
                    name:
                      data?.paymentDetails?.creditCardData?.name ||
                      data?.paymentDetails?.billingAddressData?.name
                  },
                  billingAddressData: {
                    streetAddress: data?.paymentDetails?.billingAddressData?.streetAddress,
                    city: data?.paymentDetails?.billingAddressData?.city,
                    stateCode: data?.paymentDetails?.billingAddressData?.stateCode,
                    countryCode: data?.paymentDetails?.billingAddressData?.country,
                    zip: data?.paymentDetails?.billingAddressData?.zip
                  },
                  phone: data?.paymentDetails?.billingAddressData?.phone,
                  paytraceId: data?.paymentDetails?.paytraceId
                }}
                countryList={countryList}
              />
            </Grid>
            <div className={classes.btn_Save}>
              <Button
                type='submit'
                disabled={
                  !checkIfEmpty({
                    ...errors?.basic,
                    ...errors?.shipping,
                    ...errors?.billing
                  }) ||
                  (checkIfEmpty(data?.paymentDetails?.paytraceId) && !checkIfEmpty(errors?.payment))
                }
                onClick={() => localStorage.setItem('updateCustomer', JSON.stringify(data))}
                variant='contained'
              >
                Update
              </Button>
            </div>
          </Grid>
        </form>
      </Layout>
    </div>
  )
}

//mapDispatchToProps
const mapDispatchToProps = {
  getCountryList,
  getStateList,
  UpdateCustomer,
  getCustomerDetails
}

//export
export default reduxForm({
  form: 'createAdmin'
})(connect(() => {}, mapDispatchToProps)(EditCustomer))
