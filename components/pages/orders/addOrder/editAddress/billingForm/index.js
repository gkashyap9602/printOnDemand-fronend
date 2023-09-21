import React, { useEffect, useState } from 'react'
import { Field, formValueSelector, reduxForm, change as changeFieldValue } from 'redux-form'
import { connect } from 'react-redux'
import { BILLING_ADDRESS } from 'constants/fields'
import { Button, Grid } from '@material-ui/core'
import TextInput from 'components/TextInput'
import { NotificationManager } from 'react-notifications'
import style from '../style'
import { validateFields } from 'utils/helpers'
import { updateAddresses } from 'redux/actions/orderActions'
import { getCountryList, getStateList } from 'redux/actions/userActions'
import Select from 'components/select'
import { usePrevious } from 'utils/hooks'
const useStyles = style

/**
 * BillingForm
 * @param {*} param0
 * @returns
 */
let BillingForm = ({
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
  billingAddress = {},
  changeFieldValue,
  handleSubmit,
  updateAddresses,
  handleClose = () => {},
  getStateList = () => {},
  getCountryList = () => {},
  countryList = [],
  isChecked,
  handleCheck,
  editActive,
  showBilling = true
}) => {
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  const [shippingForm, setshippingForm] = useState(BILLING_ADDRESS)
  const [currentValue, setCurrentValue] = useState({ country: '', stateName: '' })

  /**
   * useEffect initial call
   */
  useEffect(() => {
    getCountryList()
    if (billingAddress && Object.getOwnPropertyNames(billingAddress).length !== 0) {
      const { country, stateName, state } = billingAddress
      if (country && country === 'US' && stateName) {
        setCurrentValue({ ...currentValue, country, stateName: stateName || state })
      } else {
        setCurrentValue({ ...currentValue, country })
      }
    }
  }, [])

  /**
   * selectFieldFormat
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
   * useEffect
   */
  useEffect(() => {
    if (countryList?.response?.length) {
      const options = selectFieldFormat(countryList?.response)
      const newFormsList = [
        ...shippingForm?.map((formInfo) => {
          if (formInfo.name === 'country') {
            return {
              ...formInfo,
              options
            }
          }
          return { ...formInfo }
        })
      ]
      setshippingForm(newFormsList)
    }
  }, [countryList])

  /**
   * Fetch state
   * @param {*} code
   * @returns
   */
  const fetchStateList = async (code) => {
    const data = await getStateList(code)
    if (data?.response) {
      return selectFieldFormat(data?.response)
    }
  }

  const previousContry = usePrevious(country)

  /**
   * HAndle country and state
   */
  useEffect(async () => {
    const countryIsSelectable = shippingForm.filter(
      (formInfo) => formInfo.name === 'country' && formInfo.options?.length
    )
    let newFormsList
    if (countryIsSelectable?.length) {
      if (country === 'US') {
        if (shippingAddress?.country !== 'US') {
          changeFieldValue('BillingInfoForm', 'stateName', '')
        }
        const options = await fetchStateList(country)
        newFormsList = [
          ...shippingForm?.map((info) => {
            if (info.name === 'stateName') {
              return {
                ...info,
                type: 'select',
                options
              }
            }
            return { ...info }
          })
        ]
        setshippingForm(newFormsList)
        changeFieldValue(
          'BillingInfoForm',
          'stateName',
          billingAddress?.stateName || billingAddress?.state
        )
        setCurrentValue({ ...currentValue, country, stateName: stateName || billingAddress?.state })
      } else if (country !== 'US' && previousContry && country && previousContry !== country) {
        newFormsList = [
          ...shippingForm?.map((info) => {
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
        setshippingForm(newFormsList)
        changeFieldValue('BillingInfoForm', 'stateName', '')
      }
    }
  }, [country])

  /**
   * handle field changes
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue('BillingInfoForm', 'companyName', values.companyName)
      changeFieldValue('BillingInfoForm', 'contactName', values.contactName || values.name)
      changeFieldValue('BillingInfoForm', 'address1', values.address1)
      changeFieldValue('BillingInfoForm', 'address2', values.address2)
      changeFieldValue('BillingInfoForm', 'companyEmail', values.companyEmail)
      changeFieldValue(
        'BillingInfoForm',
        'contactPhone',
        values.contactPhone || values.companyPhone
      )
      changeFieldValue('BillingInfoForm', 'city', values.city)
      changeFieldValue('BillingInfoForm', 'zipCode', values.zipCode)
      changeFieldValue('BillingInfoForm', 'country', values.country)
      changeFieldValue('BillingInfoForm', 'stateName', values.stateName)
    }

    if (billingAddress && Object.getOwnPropertyNames(billingAddress).length !== 0) {
      setFieldValues(billingAddress)
    }
  }, [billingAddress, changeFieldValue, editActive])

  /**
   * Validate each fields
   */
  useEffect(() => {
    const shippingValues = {
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
    const shippingError = validateFields(shippingValues, BILLING_ADDRESS)
    setErrors({ ...shippingError })
  }, [
    companyName,
    contactName,
    address1,
    address2,
    country,
    contactPhone,
    companyEmail,
    stateName,
    city,
    zipCode
  ])
  const haveSameData = (obj1, obj2) => {
    if (
      obj1?.companyName === obj2?.companyName &&
      (obj1?.contactName || obj1?.name) === obj2?.contactName &&
      obj1?.address1 === obj2?.address1 &&
      obj1?.address2 === obj2?.address2 &&
      obj1?.country === obj2?.country &&
      obj1?.contactPhone === (obj2?.companyPhone || obj2?.contactPhone) &&
      obj1?.companyEmail === obj2?.companyEmail &&
      obj1?.stateName === obj2?.stateName &&
      obj1?.city === obj2?.city &&
      obj1?.zipCode === obj2?.zipCode
    )
      return true
    else return false
  }

  /**
   * saveHandler
   * @param {*} values
   */
  const saveHandler = async (values) => {
    if (showBilling) {
      if (isChecked) {
        await updateAddresses({ billingAddress: values, shippingAddress })
        await delete shippingAddress?.taxId
        ;(await haveSameData(values, shippingAddress))
          ? handleCheck({ target: { checked: true } })
          : handleCheck({ target: { checked: false } })
      } else {
        updateAddresses({ billingAddress: values, shippingAddress })
      }
      NotificationManager.success('Billing info updated', '', 2000)
      handleClose()
    } else {
      NotificationManager.error(`Billing information can't be updated`, '', 10000)
    }
  }

  //HTML
  return (
    <div>
      <form name='BillingInfoForm' onSubmit={handleSubmit(saveHandler)}>
        <Grid container spacing={2} className={classes.rootLabel} style={{ marginTop: 16 }}>
          {shippingForm?.map((field, i) => (
            <Grid item {...field.size} key={i}>
              <Field
                {...field}
                label={field?.label}
                id={field?.name}
                placeholder={field?.placeholder}
                name={field?.name}
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
            onClick={() => handleClose()}
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
  getCountryList
}

const selector = formValueSelector('BillingInfoForm') // <-- same as form name
BillingForm = connect((state) => {
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
})(BillingForm)

export default reduxForm({
  form: 'BillingInfoForm'
})(connect(mapStateToProps, mapDispatchToProps)(BillingForm))
