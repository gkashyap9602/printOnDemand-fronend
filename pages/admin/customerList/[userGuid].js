import { Box, Button, Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import Loader from 'components/loader'
import Modal from 'components/modal'
import CancelPopup from '/static/images/customer-cancel.png'
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
import Icon from 'icomoons/Icon'
import Image from 'next/image'
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
  const [popup, setpopup] = useState(false)

  /**
   * handling on change events of all inputs
   * @param {*} name
   * @param {*} value
   * @param {*} key
   */
  const handleChange = (name, value, key = null, subKey = null) => {
    if (name === 'NcFields' && value === null) {
      setdata({
        ...data,
        billingAddress: {
          ...data?.billingAddress,
          NCResaleCertificate: null,
          isExemptionEligible: false
        }
      })
    } else {
      switch (key) {
        case 'shipping':
          isChecked
            ? name === 'stateName'
              ? value === 'NC'
                ? setdata({
                    ...data,
                    billingAddress: {
                      ...data?.shippingAddress,
                      [name]: value,
                      isExemptionEligible: customer?.ncResaleInfo?.isExemptionEligible
                        ? true
                        : false,
                      NCResaleCertificate: customer?.ncResaleInfo?.ncResaleCertificate || null
                    },
                    shippingAddress: {
                      ...data?.shippingAddress,
                      [name]: value
                    }
                  })
                : setdata({
                    ...data,
                    billingAddress: {
                      ...data?.shippingAddress,
                      [name]: value
                    },
                    shippingAddress: {
                      ...data?.shippingAddress,
                      [name]: value
                    }
                  })
              : setdata({
                  ...data,
                  billingAddress: {
                    ...data?.shippingAddress,
                    [name]: value,
                    stateName:
                      name === 'country' && value !== 'US' ? '' : data?.shippingAddress?.stateName
                  },
                  shippingAddress: {
                    ...data?.shippingAddress,
                    [name]: value,
                    stateName:
                      name === 'country' && value !== 'US' ? '' : data?.shippingAddress?.stateName
                  }
                })
            : name === 'stateName'
            ? setdata({
                ...data,
                shippingAddress: {
                  ...data?.shippingAddress,
                  [name]: value
                }
              })
            : setdata({
                ...data,
                shippingAddress: {
                  ...data?.shippingAddress,
                  [name]: value,
                  stateName:
                    name === 'country' && value !== 'US' ? '' : data?.shippingAddress?.stateName
                }
              })

          break
        case 'billing':
          isChecked &&
            data?.shippingAddress?.stateName === 'NC' &&
            data?.shippingAddress?.[name] !== value &&
            handleCheck({ target: { checked: false } })
          name !== 'stateName'
            ? setdata({
                ...data,
                billingAddress: {
                  ...data?.billingAddress,
                  [name]: value,
                  stateName:
                    name === 'country' && value !== 'US' ? null : data?.billingAddress?.stateName
                },
                billingAddressDup: {
                  ...data?.billingAddressDup,
                  [name]: value,
                  stateName:
                    name === 'country' && value !== 'US' ? null : data?.billingAddressDup?.stateName
                }
              })
            : setdata({
                ...data,
                billingAddress: {
                  ...data?.billingAddress,
                  [name]: value
                },
                billingAddressDup: { ...data?.billingAddressDup, [name]: value }
              })
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
                    [name]: value,
                    billingAddressData: {
                      ...data?.paymentDetails.billingAddressData,
                      [name]: value
                    }
                  }
                })
          }
          break
        default:
          setdata({ ...data, [name]: value })
          break
      }
    }
  }

  /**
   * fetching country and state
   */
  useEffect(async () => {
    setloader(true)
    await getCountryList()
    await getStateList('US')
    const res = await getCustomerDetails(route?.query?.userGuid)
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
      billingAddress: {
        ...customer?.billingAddress,
        isExemptionEligible: customer?.ncResaleInfo?.isExemptionEligible ? true : false,
        NCResaleCertificate:
          customer?.billingAddress?.stateName === 'NC'
            ? customer?.ncResaleInfo?.ncResaleCertificate
            : null
      },
      billingAddressDup: {
        ...customer?.billingAddress,
        isExemptionEligible: customer?.ncResaleInfo?.isExemptionEligible ? true : false,
        NCResaleCertificate:
          customer?.billingAddress?.stateName === 'NC'
            ? customer?.ncResaleInfo?.ncResaleCertificate
            : null
      },
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
    // const shipping = validateFields(data?.shippingAddress, SHIPPING_INFO_ADMIN)
    // const billing = validateFields(data?.billingAddress, BILLING_INFO_ADMIN)
    const payment = validateFields(
      { ...data?.paymentDetails.billingAddressData, ...data?.paymentDetails?.creditCardData },
      [...CARD_INFO_ADMIN, ...PAYMENT_INFO]
    )
    console.log(payment)
    console.log(!checkIfEmpty(data?.paymentDetails?.paytraceId))
    setErrors({
      ...errors,
      basic: basic,
      // shipping: shipping,
      // billing: billing,
      payment:
        checkIfEmpty(data?.paymentDetails?.creditCardData?.ccNumber) &&
        !checkIfEmpty(data?.paymentDetails?.paytraceId)
          ? {}
          : checkIfEmpty(data?.paymentDetails?.creditCardData?.ccNumber) &&
            checkIfEmpty(data?.paymentDetails?.paytraceId)
          ? {}
          : payment
      // : {}
    })
    const year = `${parseInt(data?.paymentDetails?.creditCardData?.expirationYear)}`.includes('20')
      ? parseInt(data?.paymentDetails?.creditCardData?.expirationYear)
      : parseInt(`20${data?.paymentDetails?.creditCardData?.expirationYear}`)
    console.log(year)
    if (
      !checkIfEmpty(data?.paymentDetails?.creditCardData?.expirationMonth) &&
      !checkIfEmpty(data?.paymentDetails?.creditCardData?.expirationYear) &&
      year === new Date().getFullYear() &&
      parseInt(data?.paymentDetails?.creditCardData?.expirationMonth) < new Date().getMonth() + 1
    ) {
      setErrors({
        ...errors,
        payment: {
          ...payment,
          expirationMonth: 'Invalid expiry month',
          expirationYear: 'Invalid expiry year'
        }
      })
    }
  }, [data, data])

  /**
   * handle billing same as shipping checkbox
   * @param {*} e
   */
  const handleCheck = (e) => {
    setisChecked(e?.target.checked)
    e?.target?.checked
      ? setdata({
          ...data,
          billingAddress: {
            ...data?.shippingAddress,
            isExemptionEligible:
              data?.shippingAddress?.stateName !== 'NC'
                ? false
                : data?.billingAddress?.isExemptionEligible,
            NCResaleCertificate:
              data?.shippingAddress?.stateName !== 'NC'
                ? null
                : data?.billingAddress?.NCResaleCertificate
          }
        })
      : setdata({
          ...data,
          billingAddress: checkIfEmpty(
            Object.values({ ...data?.billingAddressDup, country: null }).filter((v) => v)
          )
            ? data?.shippingAddress
            : {
                ...data?.billingAddressDup,
                isExemptionEligible: customer?.ncResaleInfo?.isExemptionEligible ? true : false,
                NCResaleCertificate: customer?.ncResaleInfo?.ncResaleCertificate || null
              }
        })
  }

  /**
   * Handle the form submit
   */
  const handleSubmit = async () => {
    if (
      checkIfEmpty({
        ...errors?.basic,
        // ...errors?.shipping,
        // ...errors?.billing,
        ...errors?.payment
      })
    ) {
      const customer = JSON.parse(localStorage.getItem('updateCustomer'))
      const res = await UpdateCustomer({
        guid: route?.query?.userGuid,
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        email: customer?.email,
        paymentDetails: !checkIfEmpty(route?.query?.ccNumber)
          ? checkIfEmpty(customer?.paymentDetails?.creditCardData?.ccNumber)
            ? null
            : {
                phone: customer?.paymentDetails?.phone,
                creditCardData: {
                  ccNumber: route?.query?.ccNumber,
                  expirationMonth: customer?.paymentDetails?.creditCardData?.expirationMonth,
                  expirationYear: customer?.paymentDetails?.creditCardData?.expirationYear
                },
                billingAddressData: {
                  name: route?.query?.name,
                  streetAddress: customer?.paymentDetails?.billingAddressData?.streetAddress,
                  city: customer?.paymentDetails?.billingAddressData?.city,
                  stateCode: customer?.paymentDetails?.billingAddressData?.stateCode,
                  countryCode: customer?.paymentDetails?.billingAddressData?.countryCode,
                  zip: customer?.paymentDetails?.billingAddressData?.zip
                },
                customerId: customer?.paymentDetails?.customerId
              }
          : null,
        shippingAddress: customer?.shippingAddress,
        billingAddress: customer?.billingAddress,
        isExemptionEligible:
          customer?.billingAddress?.stateName === 'NC'
            ? customer?.billingAddress?.isExemptionEligible
            : false,
        ncResaleCertificate:
          customer?.billingAddress?.stateName === 'NC'
            ? customer?.billingAddress?.NCResaleCertificate
            : '',
        payTraceId: customer?.paymentDetails?.paytraceId
      })
      if (res?.statusCode === 200) {
        localStorage.removeItem('updateCustomer')
        NotificationManager.success('Customer has been updated', '', '2000')
        route?.push('/admin/customerList')
      }
      if (res?.StatusCode === 400) {
        setTimeout(() => {
          setdata(customer)
          setisChecked(customer?.isChecked)
        }, 4000)
        // localStorage.removeItem('updateCustomer')
        checkIfEmpty(res?.Response?.ValidationErrors)
          ? NotificationManager.error(res?.Response?.Message, '', '2000')
          : res?.Response?.ValidationErrors?.map((val) => {
              NotificationManager.error(val, '', 10000)
            })
        route?.push(`/admin/customerList/${route?.query?.userGuid}`)
      }
      if (res?.StatusCode === 500) {
        localStorage.removeItem('updateCustomer')
        NotificationManager.error(res?.Response?.Message, '', '2000')
        setdata(customer)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && document)
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
              <BasicInfo
                handleChange={handleChange}
                isDisabled={true}
                errors={errors?.basic}
                data={data}
              />
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
                isNorthCarolina={data?.shippingAddress?.stateName === 'NC'}
                countryList={countryList}
                states={states}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <PaymentInfo
                handleChange={(name, value, key) => handleChange(name, value, 'payment', key)}
                errors={errors?.payment}
                handleSubmit={handleSubmit}
                disableFieldExceptCcNumber={
                  `${data?.paymentDetails?.creditCardData?.ccNumber}`.includes('**') ||
                  checkIfEmpty(data?.paymentDetails?.creditCardData?.ccNumber)
                }
                data={{
                  creditCardData: {
                    ccNumber: data?.paymentDetails?.creditCardData?.ccNumber,
                    expirationMonth: data?.paymentDetails?.creditCardData?.expirationMonth,
                    expirationYear:
                      `${data?.paymentDetails?.creditCardData?.expirationYear}`.includes('20')
                        ? `${data?.paymentDetails?.creditCardData?.expirationYear}`
                        : `20${data?.paymentDetails?.creditCardData?.expirationYear}`,
                    name:
                      data?.paymentDetails?.creditCardData?.name ||
                      data?.paymentDetails?.billingAddressData?.name
                  },
                  billingAddressData: {
                    streetAddress: data?.paymentDetails?.billingAddressData?.streetAddress,
                    city: data?.paymentDetails?.billingAddressData?.city,
                    stateCode: data?.paymentDetails?.billingAddressData?.stateCode,
                    countryCode: data?.paymentDetails?.billingAddressData?.countryCode || 'US',
                    zip: data?.paymentDetails?.billingAddressData?.zip,
                    phone: data?.paymentDetails?.phone
                  },
                  phone: data?.paymentDetails?.phone,
                  paytraceId: data?.paymentDetails?.paytraceId
                }}
                disablePaytraceId={!checkIfEmpty(customer?.payTraceId)}
                disableCardValue={
                  `${data?.paymentDetails?.paytraceId}` &&
                  checkIfEmpty(data?.paymentDetails?.creditCardData)
                    ? true
                    : false
                }
                countryList={countryList}
              />
            </Grid>
            <div className={classes.btn_Save}>
              <Button onClick={() => setpopup(true)} style={{ marginRight: 8 }}>
                cancel
              </Button>
              <Button
                type='submit'
                disabled={
                  !checkIfEmpty({
                    ...errors?.basic,
                    // ...errors?.shipping,
                    ...errors?.payment
                  })
                }
                onClick={() =>
                  localStorage.setItem('updateCustomer', JSON.stringify({ ...data, isChecked }))
                }
                variant='contained'
              >
                Update
              </Button>
            </div>
          </Grid>
        </form>

        <Modal handleClose={() => setpopup(false)} open={popup}>
          <Box display='flex' p={1} alignItems='center' width='100%'>
            <Box mr={1}>
              <Image src={CancelPopup} alt='Cancel' height={101} width={101} />
            </Box>
            <Typography variant='h4' className={classes.popupCancel_Text}>
              Are you sure you want to cancel ?
            </Typography>
          </Box>
          <div className={classes.popupCancel_Btns}>
            <Button
              onClick={async () => {
                route?.push('/admin/customerList')
              }}
              variant='contained'
            >
              Yes
            </Button>
            <Button onClick={() => setpopup(false)}>No</Button>
          </div>
        </Modal>
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
