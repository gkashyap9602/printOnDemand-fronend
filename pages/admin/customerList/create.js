import { Box, Button, Grid, Icon, Typography } from '@material-ui/core'
import Layout from 'components/layout'
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
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { connect, useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { AddCustomer } from 'redux/actions/admin/customerActions'
import { getCountryList, getStateList } from 'redux/actions/userActions'
import { calculateAmountOfOrder, checkIfEmpty, validateFields } from 'utils/helpers'
import style from './style'
import Image from 'next/image'
const useStyles = style

/**
 * Create customer admin ui
 * @param {*} param0
 * @returns
 */
function CreateCustomer({ getCountryList, getStateList, AddCustomer }) {
  const classes = useStyles()
  const [errors, setErrors] = useState({ basic: {}, shipping: {}, billing: {}, payment: {} })
  const [isChecked, setisChecked] = useState(false)
  const [popup, setpopup] = useState(false)

  const route = useRouter()
  const [data, setdata] = useState({
    shippingAddress: {
      country: 'US'
    },
    billingAddress: {
      country: 'US'
    },
    billingAddressDup: {
      country: 'US'
    },
    paymentDetails: { country: 'US' }
  })
  const countryList = useSelector((state) => state?.user?.countryList?.response)
  const states = useSelector((state) => state?.user?.stateList?.response)

  /**
   * handling on change events of all inputs
   * @param {*} name
   * @param {*} value
   * @param {*} key
   */
  const handleChange = (name, value, key = null) => {
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
              ? setdata({
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
          setdata({ ...data, paymentDetails: { ...data?.paymentDetails, [name]: value } })

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
  useEffect(() => {
    getCountryList()
    getStateList('US')
  }, [])

  /**
   * On change data
   */
  useEffect(() => {
    const basic = validateFields(data, BASIC_INFO)
    // const shipping = validateFields(data?.shippingAddress, SHIPPING_INFO_ADMIN)
    // const billing = validateFields(data?.billingAddress, BILLING_INFO_ADMIN)
    const payment = validateFields({ ...data?.paymentDetails, ...data?.paymentDetails }, [
      ...CARD_INFO_ADMIN,
      ...PAYMENT_INFO
    ])
    setErrors({
      ...errors,
      basic: basic,
      // shipping: shipping,
      // billing: isChecked ? {} : billing,
      payment:
        checkIfEmpty(data?.paymentDetails?.paytraceId) &&
        !checkIfEmpty(data?.paymentDetails?.ccNumber)
          ? payment
          : {}
    })

    if (
      !checkIfEmpty(data?.paymentDetails?.expirationMonth) &&
      !checkIfEmpty(data?.paymentDetails?.expirationYear) &&
      parseInt(data?.paymentDetails?.expirationYear) === new Date().getFullYear() &&
      parseInt(data?.paymentDetails?.expirationMonth) < new Date().getMonth() + 1
    ) {
      setErrors({ ...errors, payment: { ...payment, expirationMonth: 'Invalid expiry month' } })
    }
  }, [data])

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
            isExemptionEligible: false,
            NCResaleCertificate: null
          }
        })
      : setdata({
          ...data,
          billingAddress: data?.shippingAddress,
          isExemptionEligible: false,
          NCResaleCertificate: null
        })
  }

  /**
   * Handle the form submit
   */
  const handleSubmit = async () => {
    if (
      checkIfEmpty({
        ...errors?.basic
        // ...errors?.shipping,
        // ...errors?.billing,
        // ...errors?.payment
      })
    ) {
      const customer = JSON.parse(localStorage.getItem('addCustomer'))
      const res = await AddCustomer({
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        email: customer?.email,
        paymentDetails: checkIfEmpty(customer?.paymentDetails?.paytraceId)
          ? checkIfEmpty(customer?.paymentDetails?.ccNumber)
            ? null
            : {
                phone: customer?.paymentDetails?.phone,
                creditCardData: {
                  ccNumber: route?.query?.ccNumber,
                  expirationMonth: customer?.paymentDetails?.expirationMonth,
                  expirationYear: customer?.paymentDetails?.expirationYear
                },
                billingAddressData: {
                  name: customer?.paymentDetails?.name,
                  streetAddress: customer?.paymentDetails?.streetAddress,
                  city: customer?.paymentDetails?.city,
                  stateCode: customer?.paymentDetails?.stateCode,
                  countryCode: customer?.paymentDetails?.country,
                  zip: customer?.paymentDetails?.zip
                }
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
      if (res?.StatusCode === 400) {
        console.log(customer?.paymentDetails)
        setdata({
          ...customer,
          paymentDetails: {
            ...customer?.paymentDetails,
            ccNumber: customer?.paymentDetails?.ccNumber
          }
        })
        setisChecked(customer?.isChecked)
        checkIfEmpty(res?.Response?.ValidationErrors)
          ? NotificationManager.error(res?.Response?.Message, '', '2000')
          : res?.Response?.ValidationErrors?.map((val) => {
              NotificationManager.error(val, '', 10000)
            })
        localStorage.removeItem('addCustomer')
      }
      if (res?.StatusCode === 500) {
        localStorage.removeItem('addCustomer')
        NotificationManager.error(res?.Response?.Message, '', '2000')
        setdata({ ...customer, paymentDetails: { ...customer?.paymentDetails, ccNumber: null } })
      }
      if (res?.statusCode === 200) {
        if (res?.response?.isPayTraceError) {
          localStorage.removeItem('addCustomer')
          NotificationManager.success(
            'User added successfully but there was a PayTrace error. Please fill in the payment details again.',
            '',
            '3000'
          )
          // res?.response?.payTraceErrors?.map((val) =>
          //   NotificationManager.error(val?.value, '', '2000')
          // )
          route?.push(
            `/admin/customerList/${res?.response?.userGuid}?customerGuid=${res?.response?.customerGuid}`
          )
        } else {
          localStorage.removeItem('addCustomer')
          NotificationManager.success('Customer has been added', '', '2000')
          route?.push('/admin/customerList')
        }
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
      <Layout activateHide>
        {/* <!--new--> */}
        <Grid container spacing={3} direction='row' style={{ marginBottom: '8px' }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <BasicInfo handleChange={handleChange} errors={errors?.basic} data={data} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <BillingInfo
              handleChange={(name, value) => handleChange(name, value, 'billing')}
              errors={errors?.billing}
              data={data?.billingAddress}
              isNorthCarolina={data?.shippingAddress?.stateName === 'NC'}
              isChecked={isChecked}
              countryList={countryList}
              states={states}
            />
          </Grid>
        </Grid>
        <form name='createAdmin' id='createAdmin'>
          <Grid container spacing={3} direction='row' style={{ marginBottom: '8px' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <PaymentInfo
                handleChange={(name, value) => handleChange(name, value, 'payment')}
                errors={errors?.payment}
                handleSubmit={handleSubmit}
                data={{
                  creditCardData: {
                    ccNumber: data?.paymentDetails?.ccNumber,
                    expirationMonth: data?.paymentDetails?.expirationMonth,
                    expirationYear: data?.paymentDetails?.expirationYear,
                    name:
                      data?.paymentDetails?.name || data?.paymentDetails?.billingAddressData?.name
                  },
                  billingAddressData: {
                    streetAddress: data?.paymentDetails?.streetAddress,
                    city: data?.paymentDetails?.city,
                    name:
                      data?.paymentDetails?.name || data?.paymentDetails?.billingAddressData?.name,
                    stateCode: data?.paymentDetails?.stateCode,
                    countryCode: data?.paymentDetails?.country,
                    zip: data?.paymentDetails?.zip
                  },
                  phone: data?.paymentDetails?.phone,
                  paytraceId: data?.paymentDetails?.paytraceId
                }}
                countryList={countryList}
                disablePaytraceId={
                  !checkIfEmpty(data?.paymentDetails?.ccNumber) &&
                  checkIfEmpty(data?.paymentDetails?.paytraceId)
                    ? true
                    : false
                }
                disableCardValue={!checkIfEmpty(data?.paymentDetails?.paytraceId)}
              />
            </Grid>
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
                localStorage.setItem('addCustomer', JSON.stringify({ ...data, isChecked }))
              }
              variant='contained'
            >
              Save
            </Button>
          </div>
        </form>

        <Modal handleClose={() => setpopup(false)} open={popup}>
          <Box display='flex' p={1} alignItems='center' width='100%'>
            <Box mr={1}>
              <Image src={CancelPopup} alt='Cancel' height={101} width={101} />
            </Box>
            <Typography variant='h3' className={classes.popupCancel_Text}>
              Are you sure you want to cancel ?
            </Typography>
          </Box>
          <div className={classes.popupCancel_Btns}>
            <Button onClick={() => route?.push('/admin/customerList')} variant='contained'>
              Yes
            </Button>
            <Button onClick={() => setpopup(false)}>No</Button>
          </div>
        </Modal>
        {/* <!--new--> */}
      </Layout>
    </div>
  )
}

//mapDispatchToProps
const mapDispatchToProps = {
  getCountryList,
  getStateList,
  AddCustomer
}

//export
export default reduxForm({
  form: 'createAdmin'
})(connect(() => {}, mapDispatchToProps)(CreateCustomer))
