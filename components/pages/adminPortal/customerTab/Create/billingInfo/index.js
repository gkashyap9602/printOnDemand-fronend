import { FormControlLabel, Grid, Typography } from '@material-ui/core'
import CheckBoxInput from 'components/Checkbox'
import Select from 'components/select'
import TextInput from 'components/TextInput'
import { BILLING_INFO_ADMIN, NC_FIELD_ADMIN } from 'constants/fields'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change as changeFieldValue } from 'redux-form'
import { style } from 'styles/profile'
import { checkIfEmpty, selectFieldFormat } from 'utils/helpers'
import { usePrevious } from 'utils/hooks'
const useStyles = style

/**
 * BillingInfo Admin page
 * @param {*} param0
 * @returns
 */
function BillingInfo({
  handleChange,
  errors,
  isChecked,
  countryList,
  data,
  states,
  changeFieldValue,
  isNorthCarolina = false
}) {
  const classes = useStyles()
  const [FORM, setFORM] = useState(BILLING_INFO_ADMIN)
  const previousStateName = usePrevious(data?.stateName)

  /**
   * Set country options in the required format
   */
  useEffect(() => {
    const isFieldAdded = FORM.filter((formInfo) => formInfo.name === 'NCResaleCertificate')
    setFORM(
      [
        ...FORM?.map((v) =>
          v?.name === 'stateName'
            ? data?.country === 'US'
              ? {
                  ...v,
                  type: 'select',
                  options: v?.name === 'stateName' && selectFieldFormat(states)
                }
              : {
                  ...v,
                  type: 'text',
                  options: []
                }
            : v?.name === 'country'
            ? {
                ...v,
                type: 'select',
                options: v?.name === 'country' && selectFieldFormat(countryList)
              }
            : v
        ),
        data?.stateName === 'NC' && !isFieldAdded?.length && NC_FIELD_ADMIN
      ].filter((v) => v)
    )
  }, [countryList && states, !checkIfEmpty(data?.country)])

  /**
   * Set data options in the required format
   */
  useEffect(async () => {
    data &&
      Object.entries(data)?.map((val) => {
        console.log(val)
        changeFieldValue('BillingInfoForm', val?.[0], val?.[1])
      })
    if (checkIfEmpty(data)) {
      FORM?.map((val) => changeFieldValue('BillingInfoForm', val?.name, null))
    }
  }, [data])

  /**
   * handle onchange function of fields
   * @param {*} field
   * @param {*} value
   */
  const onHandleChange = async (field, value) => {
    if (previousStateName === 'NC' && value !== previousStateName && field?.name === 'stateName') {
      handleChange('NcFields', null)
    }
    if (field?.name === 'country' && value === 'US') {
      UpdateFormField('stateName', states)
      handleChange(field?.name, value)
    } else if (field?.name === 'country' && value !== 'US') {
      UpdateFormField('stateName', [], 'text')
      changeFieldValue('BillingInfoForm', 'stateName', '')
      await handleChange(field?.name, value)
    } else {
      handleChange(field?.name, value)
    }
  }

  /**
   * Handle sales and tax
   */
  useEffect(() => {
    handleNCchange()
  }, [data?.stateName, isChecked])

  /**
   * handle NC change in state dropdown
   */
  const handleNCchange = async () => {
    const isSelectField = FORM?.filter(
      (formInfo) => formInfo.name === 'stateName' && formInfo.type === 'select'
    )
    const isFieldAdded = FORM.filter((formInfo) => formInfo.name === 'NCResaleCertificate')
    if (isSelectField?.length && data?.stateName === 'NC' && !isFieldAdded?.length) {
      const newFormsList = [...FORM, NC_FIELD_ADMIN]
      setFORM(newFormsList)
    } else if (
      (isSelectField?.length &&
        data?.stateName !== 'NC' &&
        previousStateName &&
        data?.stateName &&
        previousStateName !== data?.stateName) ||
      (previousStateName && previousStateName !== data?.stateName && !data?.stateName)
    ) {
      const newFormsList = FORM.filter((formInfo) => formInfo.name !== 'NCResaleCertificate')
      setFORM(newFormsList)
      // setisExemptionEligible(false)
      handleChange('NcFields', null)
    }
    if (isChecked && data?.stateName !== 'NC') {
      const newFormsList = FORM.filter((formInfo) => formInfo.name !== 'NCResaleCertificate')
      setFORM(newFormsList)
      // setisExemptionEligible(false)
      handleChange('NcFields', null)
    }
  }
  /**
   * Updating form fields
   * @param {*} key
   * @param {*} options
   * @param {*} type
   */
  const UpdateFormField = (key, options, type = 'select') => {
    setFORM(
      FORM?.map((v) =>
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
   * on isCheck change
   */
  useEffect(() => {
    const isFieldAdded = FORM.filter((formInfo) => formInfo.name === 'NCResaleCertificate')

    if (isChecked) {
      if (data?.country !== 'US') {
        UpdateFormField('stateName', [], 'text')
      } else if (data?.country === 'US') {
        UpdateFormField('stateName', states, 'select')
        changeFieldValue('BillingInfoForm', 'stateName', data?.stateName)
        data?.stateName === 'NC' && !isFieldAdded?.length && setFORM([...FORM, NC_FIELD_ADMIN])
      }
    } else if (!isChecked) {
      if (data?.country !== 'US') {
        UpdateFormField('stateName', [], 'text')
      }
      Object.entries(data)?.map((val) => changeFieldValue('BillingInfoForm', val?.[0], val?.[1]))
    }
  }, [isChecked])

  //html
  return (
    <div className={classes.bgProfile_Wrap}>
      <Typography variant='h1'>Billing info</Typography>
      <form name='BillingInfoForm'>
        <div className={classes.formWrapper}>
          <Grid container spacing={2}>
            {FORM?.map((field, i) => (
              <Grid item {...field.size} key={i}>
                <Field
                  {...field}
                  isDisabled={isChecked && !isNorthCarolina}
                  component={field?.type === 'select' ? Select : TextInput}
                  onChange={(value) => onHandleChange(field, value)}
                  value={data?.[field?.name]}
                  selectedValue={field?.type === 'select' ? data?.[field?.name] : ''}
                  helperText={errors?.[field?.name]}
                />
              </Grid>
            ))}
          </Grid>

          {/* <!--checkbox--> */}
          {!checkIfEmpty(data?.NCResaleCertificate) && data?.stateName === 'NC' && (
            <div className={classes.profileCheckBox}>
              <FormControlLabel
                control={
                  <Field
                    name='exemEligibility'
                    onChange={(value) => {
                      onHandleChange({ name: 'isExemptionEligible' }, value)
                    }}
                    isChecked={data?.isExemptionEligible}
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
        </div>
      </form>
    </div>
  )
}

//export
export default reduxForm({
  form: 'BillingInfoForm'
})(connect(() => {}, { changeFieldValue })(BillingInfo))
