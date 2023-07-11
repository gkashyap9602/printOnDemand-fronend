import React, { useEffect, useState } from 'react'
import { Field, formValueSelector, reduxForm, change as changeFieldValue } from 'redux-form'
import { connect, useSelector } from 'react-redux'
import { SHIPPING_ADDRESS } from 'constants/fields'
import { Button, Checkbox, FormControlLabel, Grid } from '@material-ui/core'
import TextInput from 'components/TextInput'
import { NotificationManager } from 'react-notifications'
import style from '../style'
import { selectFieldFormat, validateFields } from 'utils/helpers'
import { fetchOrderDetails, updateAddresses, updateShippingInfo } from 'redux/actions/orderActions'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { getCountryList, getStateList } from 'redux/actions/userActions'
import { usePrevious } from 'utils/hooks'
import Select from 'components/select'
import { useRouter } from 'next/router'
const useStyles = style

/**
 * ShippingForm
 * @param {*} param0
 * @returns
 */
let ShippingForm = ({
  companyName,
  contactName,
  address1,
  address2,
  country,
  stateName,
  city,
  zipCode,
  companyEmail,
  contactPhone,
  shippingAddress = {},
  billingAddressUser = {},
  orderDetail = {},
  billingAddress = {},
  changeFieldValue,
  handleSubmit,
  updateAddresses,
  showBilling = true,
  fetchOrderDetails,
  handleCheck = () => {},
  handleClose = () => {},
  isChecked = false,
  isEdit = false,
  getStateList = () => {},
  getCountryList = () => {},
  countryList = [],
  editActive,
  updateShippingInfo = () => {}
}) => {
  const classes = useStyles()
  const [shippingForm, setshippingForm] = useState(SHIPPING_ADDRESS)
  const [errors, setErrors] = useState({})
  const [check, setcheck] = useState(isChecked)
  const route = useRouter()
  const [currentValue, setCurrentValue] = useState({ country: '', stateName: '' })
  const states = useSelector((state) => state?.user?.stateList?.response)
  const countries = useSelector((state) => state?.user?.countryList?.response)

  /**
   * Set country options in the required format
   */
  useEffect(async () => {
    if (shippingAddress?.country === 'US') {
      setshippingForm(
        shippingForm?.map((v) =>
          v?.name === 'stateName'
            ? {
                ...v,
                type: 'select',
                options: v?.name === 'stateName' && selectFieldFormat(states)
              }
            : v?.name === 'country'
            ? {
                ...v,
                type: 'select',
                options: v?.name === 'country' && selectFieldFormat(countries)
              }
            : v
        )
      )
    } else {
      setshippingForm(
        shippingForm?.map((v) =>
          v?.name === 'stateName'
            ? {
                ...v,
                type: 'text',
                options: []
              }
            : v?.name === 'country'
            ? {
                ...v,
                type: 'select',
                options: v?.name === 'country' && selectFieldFormat(countries)
              }
            : v
        )
      )
    }
  }, [shippingAddress && countries && states])

  /**
   * useEffect
   */
  useEffect(() => {
    if (shippingAddress && Object.getOwnPropertyNames(shippingAddress).length !== 0) {
      const { country, stateName } = shippingAddress
      if (country && country === 'US' && stateName) {
        setCurrentValue({ ...currentValue, country, stateName })
      } else {
        setCurrentValue({ ...currentValue, country })
      }
    }
  }, [shippingAddress && countryList])
  /**
   * handle onchange function of fields
   * @param {*} field
   * @param {*} value
   */
  const onHandleChange = async (field, value) => {
    if (field?.name === 'country' && value === 'US') {
      UpdateFormField('stateName', states)
      changeFieldValue('ShippingInfoForm', 'stateName', null)
      setCurrentValue({ ...currentValue, stateName: null })
    } else if (field?.name === 'country' && value !== 'US') {
      await UpdateFormField('stateName', [], 'text')
      await changeFieldValue('ShippingInfoForm', 'stateName', '')
    }
  }

  /**
   * Updating form fields
   * @param {*} key
   * @param {*} options
   * @param {*} type
   */
  const UpdateFormField = (key, options, type = 'select') => {
    setshippingForm(
      shippingForm?.map((v) =>
        v?.name === key
          ? {
              ...v,
              type: type,
              options: selectFieldFormat(options)
            }
          : v
      )
    )
  }
  /**
   * Set values to fields
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue('ShippingInfoForm', 'companyName', values.companyName)
      changeFieldValue('ShippingInfoForm', 'contactName', values.contactName)
      changeFieldValue('ShippingInfoForm', 'address1', values.address1)
      changeFieldValue('ShippingInfoForm', 'address2', values.address2)
      changeFieldValue('ShippingInfoForm', 'companyEmail', values.companyEmail)
      changeFieldValue(
        'ShippingInfoForm',
        'contactPhone',
        values.companyPhone || values.contactPhone
      )
      changeFieldValue('ShippingInfoForm', 'city', values.city)
      changeFieldValue('ShippingInfoForm', 'zipCode', values.zipCode)
      changeFieldValue('ShippingInfoForm', 'country', values.country)
      changeFieldValue('ShippingInfoForm', 'stateName', values.stateName)
    }

    if (shippingAddress && Object.getOwnPropertyNames(shippingAddress).length !== 0) {
      setFieldValues(shippingAddress)
    }
  }, [shippingAddress, changeFieldValue, editActive])
  useEffect(() => {
    const shippingValues = {
      companyName,
      contactName,
      address1,
      address2,
      country,
      stateName,
      contactPhone,
      companyEmail,
      city,
      zipCode
    }
    const shippingError = validateFields(shippingValues, SHIPPING_ADDRESS)
    setErrors({ ...shippingError })
  }, [
    companyName,
    contactName,
    address1,
    companyEmail,
    address2,
    country,
    contactPhone,
    stateName,
    city,
    zipCode
  ])

  /**
   * save handler
   * @param {*} values
   */
  const saveHandler = async (values) => {
    if (!showBilling) {
      const res = await updateShippingInfo({
        orderGuid: route?.query.orderId,
        shippingAddress: {
          name: values?.contactName,
          companyName: values?.companyName,
          address1: values?.address1,
          address2: values?.address2,
          city: values?.city,
          state: values?.stateName,
          country: values?.country,
          zipCode: values?.zipCode,
          companyEmail: values?.companyEmail,
          contactPhone: values?.contactPhone,
          taxId: 'null'
        }
      })
      if (res) {
        const res = await fetchOrderDetails(route.query?.orderId)
        NotificationManager.success('Shipping info updated', '', 2000)

        handleClose()
      }
    } else {
      handleCheck({ target: { checked: check } })
      const detailBilling = {
        address1: orderDetail?.billingAddress?.address1,
        address2: orderDetail?.billingAddress?.address2,
        city: orderDetail?.billingAddress?.city,
        companyEmail: orderDetail?.billingAddress?.companyEmail,
        companyName: orderDetail?.billingAddress?.companyName,
        contactName: orderDetail?.billingAddress?.name,
        contactPhone: orderDetail?.billingAddress?.contactPhone,
        country: orderDetail?.billingAddress?.country,
        stateName: orderDetail?.billingAddress?.state,
        zipCode: orderDetail?.billingAddress?.zipCode
      }
      updateAddresses({
        shippingAddress: values,
        billingAddress: check ? values : isEdit ? detailBilling : billingAddressUser
      })
      NotificationManager.success('Shipping info updated', '', 2000)
      handleClose()
    }
  }

  /**
   * handleCheckBox
   * @param {*} e
   */
  const handleCheckBox = (e) => {
    showBilling && setcheck(e.target?.checked)
  }
  return (
    <div>
      <form name='ShippingInfoForm' onSubmit={handleSubmit(saveHandler)}>
        <Grid container spacing={2} className={classes.rootLabel}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className={classes.checkedLabel}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={'same'}
                    checked={check}
                    onChange={handleCheckBox}
                    checkedIcon={<CheckIcon fontSize='medium' />}
                    icon={<RadioButtonUncheckedIcon color='primary' />}
                  />
                }
                label={'Billing information is same as shipping information'}
              />
            </div>
          </Grid>

          {shippingForm?.map((field, i) => (
            <Grid item {...field.size} key={i}>
              <Field
                {...field}
                label={field?.label}
                id={field?.name}
                placeholder={field?.placeholder}
                name={field?.name}
                onChange={(value) => onHandleChange(field, value)}
                helperText={errors?.[field?.name]}
                type={field?.type || 'text'}
                component={field?.type === 'select' ? Select : TextInput}
                selectedValue={field?.type === 'select' ? currentValue[field.name] : ''}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.btnFormAction}>
          <Button
            className={classes.btnCancel}
            style={{ marginRight: '8px' }}
            onClick={() => {
              if (!check) {
                handleCheck({ target: { checked: isChecked } })
              }
              if (check && !isChecked) setcheck(false)
              handleClose()
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.btnSave}
            variant='contained'
            type='submit'
            disabled={
              !(
                contactName &&
                country &&
                stateName &&
                city &&
                zipCode &&
                companyEmail &&
                contactPhone &&
                Object.keys(errors).length === 0
              )
            }
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  countryList: state.user.countryList
})

const mapDispatchToProps = {
  changeFieldValue,
  updateAddresses,
  getStateList,
  getCountryList,
  updateShippingInfo,
  fetchOrderDetails
}

const selector = formValueSelector('ShippingInfoForm') // <-- same as form name
ShippingForm = connect((state) => {
  const companyName = selector(state, 'companyName')
  const contactName = selector(state, 'contactName')
  const address1 = selector(state, 'address1')
  const address2 = selector(state, 'address2')
  const country = selector(state, 'country')
  const stateName = selector(state, 'stateName')
  const city = selector(state, 'city')
  const zipCode = selector(state, 'zipCode')
  const companyEmail = selector(state, 'companyEmail')
  const contactPhone = selector(state, 'contactPhone')
  return {
    companyName,
    contactName,
    address1,
    address2,
    country,
    stateName,
    city,
    zipCode,
    companyEmail,
    contactPhone
  }
})(ShippingForm)

export default reduxForm({
  form: 'ShippingInfoForm'
})(connect(mapStateToProps, mapDispatchToProps)(ShippingForm))
