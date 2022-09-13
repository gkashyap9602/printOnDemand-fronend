import { Grid, Typography } from '@material-ui/core'
import Select from 'components/select'
import TextInput from 'components/TextInput'
import { BILLING_INFO_ADMIN } from 'constants/fields'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change as changeFieldValue } from 'redux-form'
import { style } from 'styles/profile'
import { selectFieldFormat } from 'utils/helpers'
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
  changeFieldValue
}) {
  const classes = useStyles()
  const [FORM, setFORM] = useState(BILLING_INFO_ADMIN)

  /**
   * Set country options in the required format
   */
  useEffect(async () => {
    setFORM(
      FORM?.map((v) =>
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
              options: v?.name === 'country' && selectFieldFormat(countryList)
            }
          : v
      )
    )
  }, [countryList && states])

  /**
   * Set data options in the required format
   */
  useEffect(async () => {
    data &&
      Object.entries(data)?.map((val) => changeFieldValue('BillingInfoForm', val?.[0], val?.[1]))
  }, [data])

  /**
   * handle onchange function of fields
   * @param {*} field
   * @param {*} value
   */
  const onHandleChange = async (field, value) => {
    if (field?.name === 'country' && value === 'US') {
      UpdateFormField('stateName', states)
    } else if (field?.name === 'country' && value !== 'US') {
      UpdateFormField('stateName', [], 'text')
      changeFieldValue('BillingInfoForm', 'stateName', '')
      handleChange('stateName', '')
    } else {
      handleChange(field?.name, value)
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
  useEffect(() => {
    if (isChecked && data?.country !== 'US') {
      UpdateFormField('stateName', [], 'text')
      // changeFieldValue('BillingInfoForm', 'stateName', data?.stat)
      // changeFieldValue('BillingInfoForm', 'country', '')
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
                  isDisabled={isChecked}
                  component={field?.type === 'select' ? Select : TextInput}
                  onChange={(value) => onHandleChange(field, value)}
                  value={data?.[field?.name]}
                  selectedValue={field?.type === 'select' ? data?.[field?.name] : ''}
                  helperText={errors?.[field?.name]}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </form>
    </div>
  )
}

//export
export default reduxForm({
  form: 'BillingInfoForm'
})(connect(() => {}, { changeFieldValue })(BillingInfo))
