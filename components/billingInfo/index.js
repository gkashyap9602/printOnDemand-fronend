import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button, FormControlLabel } from '@material-ui/core'
import Image from 'next/image'
import {
  Field,
  reduxForm,
  formValueSelector,
  change as changeFieldValue,
  reset as resetFrom
} from 'redux-form'
import { connect } from 'react-redux'
import ShippingBanner from '/static/images/profile/shipping.png'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { updateBillingInfo, updateField, getStateList } from 'redux/actions/userActions'
import { SHIPPING_INFO, BILLING_INFO_WITHOUT_TAXID } from 'constants/fields'
import TextInput from '../TextInput'
import Select from '../select'
import CheckBoxInput from '../Checkbox'
import { style } from 'styles/profile'
import { validateFields } from 'utils/helpers'
import { NotificationManager } from 'react-notifications'
import { usePrevious } from 'utils/hooks'
import Loader from 'components/loader'
const useStyles = style
/**
 * Billing Info page
 * @param {*} param0
 * @returns
 */
let BillingInfo = ({
  info,
  ncInfo,
  userGuid,
  updateBillingInfo,
  getStateList,
  updateField,
  companyName,
  contactName,
  address1,
  address2,
  country,
  stateName,
  city,
  zipCode,
  companyEmail,
  companyPhone,
  exemEligibility,
  wizardIndex,
  userValueUpdated,
  handleSubmit,
  changeFieldValue,
  showSameAddress,
  taxNum,
  shippingAddress,
  resetFrom,
  countryList
}) => {
  const classes = useStyles()
  const [loaderBtn, setLoaderBtn] = useState(false)
  const [shippingInfoForms, setShippingInfoForms] = useState(SHIPPING_INFO)
  const [errors, setErrors] = useState({})
  const [showInput, setShowInput] = useState(false)
  const [currentValue, setCurrentValue] = useState({ country: '', stateName: '' })
  const [isEligible, setIsEligible] = useState(false)
  const [reRender, setReRender] = useState(false)
  const [isTaxNumFilled, setisTaxNumFilled] = useState(false)

  /**
   * Set country and state
   * @param {*} values
   */
  const setDefaultCountryState = (values) => {
    const { country, stateName } = values
    if (country && country === 'US' && stateName) {
      setCurrentValue({ ...currentValue, country, stateName })
      changeFieldValue(
        'billingInfoForm',
        'country',
        currentValue.country !== undefined ? currentValue.country : country
      )
      changeFieldValue(
        'billingInfoForm',
        'stateName',
        currentValue.stateName !== undefined ? currentValue.stateName : stateName
      )
    } else {
      setCurrentValue({ ...currentValue, country })
      changeFieldValue(
        'billingInfoForm',
        'country',
        currentValue.country !== undefined ? currentValue.country : country
      )
    }
  }

  /**
   * Handle country and state
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
      setIsEligible(false)
      changeFieldValue('billingInfoForm', 'stateName', ' ')
    }
  }, [showSameAddress])

  /**
   * On taxNum change
   */
  useEffect(() => {
    if (taxNum) {
      setisTaxNumFilled(true)
    } else {
      setisTaxNumFilled(false)
    }
  }, [taxNum])

  /**
   * Handle Field format
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
   * fetchStateList
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
  const previousStateName = usePrevious(stateName)
  /**
   * Set country to page state values
   */
  useEffect(() => {
    if (countryList?.response?.length) {
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
   * Handle country and state
   */
  useEffect(async () => {
    const countryIsSelectable = shippingInfoForms.filter(
      (formInfo) => formInfo.name === 'country' && formInfo.options?.length
    )
    let newFormsList
    if (countryIsSelectable?.length && !showSameAddress) {
      if (country === 'US') {
        const options = await fetchStateList(country)
        newFormsList = [
          ...shippingInfoForms?.map((info) => {
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
        setShippingInfoForms(newFormsList)
        setReRender(!reRender)
        changeFieldValue('billingInfoForm', 'stateName', currentValue.stateName)
      } else if (country !== 'US' && previousContry && country && previousContry !== country) {
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
        setShippingInfoForms(newFormsList)
        setReRender(!reRender)
        changeFieldValue('billingInfoForm', 'stateName', '')
      }
    }
  }, [country, showSameAddress])

  /**
   * Handle sales and tax
   */
  useEffect(() => {
    const isSelectField = shippingInfoForms?.filter(
      (formInfo) => formInfo.name === 'stateName' && formInfo.type === 'select'
    )
    const isFieldAdded = shippingInfoForms.filter((formInfo) => formInfo.name === 'taxNum')
    if (!showSameAddress) {
      if (isSelectField?.length && stateName === 'NC' && !isFieldAdded?.length) {
        const NCfield = {
          label: 'NC sales and tax registration number',
          name: 'taxNum',
          type: 'text',
          iconProps: {
            icon: ''
          },
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12
          },
          placeholder: 'Enter the tax registration number',
          isRequired: false
        }
        const newFormsList = [...shippingInfoForms, NCfield]
        setShippingInfoForms(newFormsList)
        setIsEligible(true)
      } else if (
        (isSelectField?.length &&
          stateName !== 'NC' &&
          previousStateName &&
          stateName &&
          previousStateName !== stateName) ||
        (previousStateName && previousStateName !== stateName && !stateName)
      ) {
        const newFormsList = shippingInfoForms.filter((formInfo) => formInfo.name !== 'taxNum')
        setShippingInfoForms(newFormsList)
        setIsEligible(false)
      }
    }
  }, [stateName, reRender, showSameAddress])

  /**
   * Handle all fields
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue(
        'billingInfoForm',
        'companyName',
        companyName !== undefined ? companyName : values.companyName
      )
      changeFieldValue(
        'billingInfoForm',
        'contactName',
        contactName !== undefined ? contactName : values.contactName
      )
      changeFieldValue(
        'billingInfoForm',
        'address1',
        address1 !== undefined ? address1 : values.address1
      )
      changeFieldValue(
        'billingInfoForm',
        'address2',
        address2 !== undefined ? address2 : values.address2
      )
      changeFieldValue(
        'billingInfoForm',
        'companyEmail',
        companyEmail !== undefined ? companyEmail : values.companyEmail
      )
      changeFieldValue(
        'billingInfoForm',
        'companyPhone',
        companyPhone !== undefined ? companyPhone : values.companyPhone
      )
      changeFieldValue('billingInfoForm', 'city', city !== undefined ? city : values.city)
      changeFieldValue(
        'billingInfoForm',
        'zipCode',
        zipCode !== undefined ? zipCode : values.zipCode
      )
      changeFieldValue(
        'billingInfoForm',
        'country',
        country !== undefined ? country : values.country
      )
      changeFieldValue(
        'billingInfoForm',
        'stateName',
        stateName !== undefined ? stateName : values.stateName
      )
    }
    const setNC_FieldValues = (values) => {
      changeFieldValue('billingInfoForm', 'taxNum', values.ncResaleCertificate)
      changeFieldValue('billingInfoForm', 'exemEligibility', values.isExemptionEligible)
    }
    if (Object.getOwnPropertyNames(info).length !== 0) {
      setFieldValues(info)
    } else {
      if (Object.keys(shippingAddress).length !== 0) {
        setShowInput(true)
        if (showSameAddress) {
          setFieldValues(shippingAddress)
        } else {
          resetFrom('billingInfoForm')
        }
      }
    }
    if (Object.getOwnPropertyNames(ncInfo).length !== 0) {
      setNC_FieldValues(ncInfo)
    }
  }, [info, showSameAddress, resetFrom, shippingAddress, changeFieldValue, ncInfo])

  /**
   * Validate each fields
   */
  useEffect(() => {
    const shippingValues = {
      companyName,
      contactName,
      address1,
      address2,
      country,
      stateName,
      city,
      zipCode,
      taxNum,
      exemEligibility
    }
    const shippingError = validateFields(shippingValues, shippingInfoForms)
    const billingValues = {
      companyEmail,
      companyPhone
    }
    const billingError = validateFields(billingValues, BILLING_INFO_WITHOUT_TAXID)
    setErrors({ ...shippingError, ...billingError })
  }, [
    companyName,
    contactName,
    address1,
    address2,
    country,
    stateName,
    city,
    zipCode,
    taxNum,
    companyEmail,
    companyPhone,
    shippingInfoForms,
    exemEligibility
  ])

  /**
   * Handle billing info update
   * @param {*} values
   */
  const saveHandler = async (values) => {
    const submissionValues = { ...values }
    const { exemEligibility, taxNum } = submissionValues
    delete submissionValues.exemEligibility
    delete submissionValues.taxNum
    const data = {
      userGuid,
      isExemptionEligible: exemEligibility && isTaxNumFilled ? exemEligibility : false,
      ncResaleCertificate: taxNum ? taxNum : '',
      billingAddress: { ...submissionValues }
    }
    setLoaderBtn(true)
    const oldData = { userGuid, ...ncInfo, billingAddress: { ...info } }
    delete oldData.billingAddress.taxId
    const isOldDataSame =
      Object.entries(data.billingAddress).sort().toString() ===
      Object.entries(oldData.billingAddress).sort().toString()
    const newNCvalues = {
      isExemptionEligible: exemEligibility && isTaxNumFilled ? exemEligibility : false,
      ncResaleCertificate: taxNum ? taxNum : ''
    }
    const isNCvaluesChange =
      Object.entries(newNCvalues).sort().toString() === Object.entries(ncInfo).sort().toString()
    if (Object.keys(info).length === 0 || !isOldDataSame || !isNCvaluesChange) {
      const res = await updateBillingInfo(data)
      if (200 <= res.statusCode && res.statusCode < 300) {
        setLoaderBtn(false)
        NotificationManager.success('Billing info updated', '', 2000)
        updateField('userValueUpdated', !userValueUpdated)
        updateField('wizardIndex', wizardIndex + 1)
      } else if (res.StatusCode === 12002) {
        setLoaderBtn(false)
        NotificationManager.error(res?.Response?.Message, '', 10000)
      } else {
        setLoaderBtn(false)
      }
    } else {
      NotificationManager.warning('Nothing to update', '', 2000)
      updateField('wizardIndex', wizardIndex + 1)
      setLoaderBtn(false)
    }
  }
  /**
   * Go back to the previous tab
   */
  const backTab = () => {
    updateField('wizardIndex', wizardIndex - 1)
  }

  //HTML
  return (
    <Grid container spacing={3} direction='row' className={classes.root}>
      {loaderBtn && <Loader />}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={classes.bg_Profile}>
          <Image src={ShippingBanner} alt='Billing Info' width={490} height={316} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
        <div className={classes.bgProfile_Wrap}>
          <Typography variant='h1'>Billing info</Typography>
          {/* <!--form--> */}
          <form name='billingInfoForm' onSubmit={handleSubmit(saveHandler)}>
            <div className={classes.formWrapper}>
              <Grid container spacing={2}>
                {shippingInfoForms?.map((field, i) => (
                  <Grid item {...field.size} key={`shippinginfoData-${i}`}>
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
              {/* <!--checkbox--> */}
              {isEligible && isTaxNumFilled && (
                <div className={classes.profileCheckBox}>
                  <FormControlLabel
                    control={
                      <Field
                        name='exemEligibility'
                        isChecked={ncInfo?.isExemptionEligible ? ncInfo.isExemptionEligible : false}
                        component={CheckBoxInput}
                      />
                    }
                    label={
                      <div className={classes.checkedLabel}>
                        I confirm that I am eligible to avail the exemption
                      </div>
                    }
                  />
                </div>
              )}
              {/* <!--checkbox--> */}
              <Grid container spacing={2}>
                {BILLING_INFO_WITHOUT_TAXID?.map((field, i) => (
                  <Grid item {...field.size} key={i}>
                    <Field
                      {...field}
                      label={field?.label}
                      id={field?.name}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      type={field?.type || 'text'}
                      component={TextInput}
                      helperText={errors?.[field?.name]}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* <!--checkbox--> */}

              {/* <!--checkbox--> */}

              <Grid container spacing={2} className={classes.btnRoot}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Button
                    onClick={backTab}
                    type='button'
                    variant='outlined'
                    fullWidth
                    startIcon={<KeyboardBackspaceIcon />}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Button
                    disabled={
                      !(
                        companyName &&
                        contactName &&
                        country &&
                        stateName &&
                        city &&
                        zipCode &&
                        companyEmail &&
                        Object.keys(errors).length === 0
                      ) ||
                      (isEligible &&
                        isTaxNumFilled &&
                        !(exemEligibility && Object.keys(errors).length === 0)) ||
                      loaderBtn
                    }
                    type='submit'
                    variant='contained'
                    fullWidth
                    endIcon={<ArrowRightAltIcon />}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
          {/* <!--form--> */}
        </div>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  wizardIndex: state.user.wizardIndex,
  userValueUpdated: state.user.userValueUpdated,
  countryList: state.user.countryList
})

const mapDispatchToProps = {
  updateBillingInfo,
  getStateList,
  updateField,
  changeFieldValue,
  resetFrom
}

const selector = formValueSelector('billingInfoForm') // <-- same as form name
BillingInfo = connect((state) => {
  const companyName = selector(state, 'companyName')
  const contactName = selector(state, 'contactName')
  const address1 = selector(state, 'address1')
  const address2 = selector(state, 'address2')
  const country = selector(state, 'country')
  const stateName = selector(state, 'stateName')
  const city = selector(state, 'city')
  const zipCode = selector(state, 'zipCode')
  const companyEmail = selector(state, 'companyEmail')
  const companyPhone = selector(state, 'companyPhone')
  const showSameAddress = selector(state, 'showSameAddress')
  const taxNum = selector(state, 'taxNum')
  const exemEligibility = selector(state, 'exemEligibility')
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
    companyPhone,
    exemEligibility,
    showSameAddress,
    taxNum
  }
})(BillingInfo)

export default reduxForm({
  form: 'billingInfoForm'
})(connect(mapStateToProps, mapDispatchToProps)(BillingInfo))
