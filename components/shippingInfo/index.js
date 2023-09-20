import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import Image from 'next/image'
import { Field, reduxForm, formValueSelector, change as changeFieldValue } from 'redux-form'
import { connect } from 'react-redux'
import { updateShippingInfo, updateField, getStateList } from 'redux/actions/userActions'
import ShippingBanner from '/static/images/profile/shipping.png'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { SHIPPING_INFO, BILLING_INFO } from 'constants/fields'
import TextInput from '../TextInput'
import Select from '../select'
import { style } from 'styles/profile'
import { validateFields } from 'utils/helpers'
import { NotificationManager } from 'react-notifications'
import { usePrevious } from 'utils/hooks'
import Loader from 'components/loader'
const useStyles = style

/**
 *Profile ShippingInfo tab
 * @param {*} param0
 * @returns
 */
let ShippingInfo = ({
  info,
  userGuid,
  handleSubmit,
  updateShippingInfo,
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
  taxId,
  updateField,
  wizardIndex,
  userValueUpdated,
  changeFieldValue,
  countryList,
  getStateList
}) => {
  const classes = useStyles()
  const [loaderBtn, setLoaderBtn] = useState(false)
  const [shippingInfoForms, setShippingInfoForms] = useState(SHIPPING_INFO)
  const [errors, setErrors] = useState({})
  const [currentValue, setCurrentValue] = useState({ country: '', stateName: '' })
  const [countryChange, setCountryChange] = useState(false)
  /**
   * set value
   */
  useEffect(() => {
    if (Object.getOwnPropertyNames(info).length !== 0) {
      console.log("info",info)
      const { country, stateName } = info
      if (country && country === 'US' && stateName) {
        setCurrentValue({ ...currentValue, country, stateName })
      } else {
        setCurrentValue({ ...currentValue, country })
      }
    }
  }, [])
  /**
   * Change fields format
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
   * set country to fields
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
   * Fetch states
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
   * set state field
   */
  console.log("country",country)
  useEffect(async () => {
    const countryIsSelectable = shippingInfoForms.filter(
      (formInfo) => formInfo.name === 'country' && formInfo.options?.length
    )
    let newFormsList
    if (countryIsSelectable?.length) {
      if (country === 'US') {
        if (info?.country !== 'US') {
          changeFieldValue('ShippingInfoForm', 'stateName', '')
        }
        setCountryChange(true)
        const options = await fetchStateList(country)
        if (options) {
          setCountryChange(false)
        }
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
        changeFieldValue('ShippingInfoForm', 'stateName', '')
      }
    }
  }, [country])

  /**
   * Set all fields
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue(
        'ShippingInfoForm',
        'companyName',
        companyName !== undefined ? companyName : values.companyName
      )
      changeFieldValue(
        'ShippingInfoForm',
        'contactName',
        contactName !== undefined ? contactName : values.contactName
      )
      changeFieldValue(
        'ShippingInfoForm',
        'address1',
        address1 !== undefined ? address1 : values.address1
      )
      changeFieldValue(
        'ShippingInfoForm',
        'address2',
        address2 !== undefined ? address2 : values.address2
      )
      changeFieldValue(
        'ShippingInfoForm',
        'companyEmail',
        companyEmail !== undefined ? companyEmail : values.companyEmail
      )
      changeFieldValue(
        'ShippingInfoForm',
        'companyPhone',
        companyPhone !== undefined ? companyPhone : values.companyPhone
      )
      changeFieldValue('ShippingInfoForm', 'city', city !== undefined ? city : values.city)
      changeFieldValue(
        'ShippingInfoForm',
        'zipCode',
        zipCode !== undefined ? zipCode : values.zipCode
      )
      changeFieldValue(
        'ShippingInfoForm',
        'country',
        country !== undefined ? country : values.country
      )
      changeFieldValue(
        'ShippingInfoForm',
        'stateName',
        stateName !== undefined ? stateName : values.stateName
      )
      changeFieldValue('ShippingInfoForm', 'taxId', taxId !== undefined ? taxId : values.taxId)
    }
    if (Object.getOwnPropertyNames(info).length !== 0) {
      setFieldValues(info)
    }
  }, [info])

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
      zipCode
    }
    const shippingError = validateFields(shippingValues, shippingInfoForms)
    const billingValues = {
      companyEmail,
      companyPhone,
      taxId
    }
    const billingError = validateFields(billingValues, BILLING_INFO)
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
    companyEmail,
    companyPhone,
    taxId
  ])

  /**
   * Update shipping info
   * @param {*} values
   */
  const saveHandler = async (values) => {
    const data = { userGuid, shippingAddress: { ...values } }
    const oldData = { userGuid, shippingAddress: { ...info } }
    setLoaderBtn(true)
    const isOldDataSame =
      Object.entries(data.shippingAddress).sort().toString() ===
      Object.entries(oldData.shippingAddress).sort().toString()
    if (Object.keys(info).length === 0 || !isOldDataSame) {
      const res = await updateShippingInfo(data)
      if (200 <= res.statusCode && res.statusCode < 300) {
        setLoaderBtn(false)
        NotificationManager.success('Shipping info updated', '', 2000)
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
   * Go back to previous tab
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
          <Image src={ShippingBanner} alt='Shipping Info' width={490} height={316} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
        <div className={classes.bgProfile_Wrap}>
          <Typography variant='h1'>Shipping info</Typography>
          {/* <!--form--> */}
          <form name='ShippingInfoForm' onSubmit={handleSubmit(saveHandler)}>
            <div className={classes.formWrapper}>
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
                      isDisabled={field?.name === 'stateName' && countryChange ? true : false}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* <!--checkbox--> */}

              <Grid container spacing={2}>
                {BILLING_INFO?.map((field, i) => (
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
                        taxId &&
                        Object.keys(errors).length === 0
                      ) || loaderBtn
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
// mapStateToProps
const mapStateToProps = (state) => ({
  wizardIndex: state.user.wizardIndex,
  userValueUpdated: state.user.userValueUpdated,
  countryList: state.user.countryList
})
//mapDispatchToProps
const mapDispatchToProps = {
  updateShippingInfo,
  updateField,
  changeFieldValue,
  getStateList
}

const selector = formValueSelector('ShippingInfoForm') // <-- same as form name
ShippingInfo = connect((state) => {
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
  const taxId = selector(state, 'taxId')
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
    taxId
  }
})(ShippingInfo)

//Export
export default reduxForm({
  form: 'ShippingInfoForm'
})(connect(mapStateToProps, mapDispatchToProps)(ShippingInfo))
