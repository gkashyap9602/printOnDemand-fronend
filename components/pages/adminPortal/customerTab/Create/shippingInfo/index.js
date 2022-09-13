import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core'
import Select from 'components/select'
import TextInput from 'components/TextInput'
import { SHIPPING_INFO_ADMIN } from 'constants/fields'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change as changeFieldValue } from 'redux-form'
import { style } from 'styles/profile'
import { selectFieldFormat } from 'utils/helpers'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
const useStyles = style

/**
 * ShippingInfo Admin page
 * @param {*} param0
 * @returns
 */
function ShippingInfo({
  handleChange,
  errors,
  countryList,
  data,
  states,
  changeFieldValue,
  handleCheck,
  isChecked
}) {
  const classes = useStyles()
  const [FORM, setFORM] = useState(SHIPPING_INFO_ADMIN)

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
   * handle onchange function of fields
   * @param {*} field
   * @param {*} value
   */
  const onHandleChange = async (field, value) => {
    if (field?.name === 'country' && value === 'US') {
      UpdateFormField('stateName', states)
      handleChange(field?.name, value)
    } else if (field?.name === 'country' && value !== 'US') {
      await UpdateFormField('stateName', [], 'text')
      await changeFieldValue('ShippingInfoForm', 'stateName', '')
      await handleChange(field?.name, value)
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
  /**
   * Set data options in the required format
   */
  useEffect(async () => {
    data &&
      Object.entries(data)?.map((val) => changeFieldValue('ShippingInfoForm', val?.[0], val?.[1]))
  }, [data])

  //html
  return (
    <div className={classes.bgProfile_Wrap}>
      <Typography variant='h1'>Shipping info</Typography>
      <form name='ShippingInfoForm'>
        <div className={classes.formWrapper}>
          <Grid container spacing={2}>
            {FORM?.map((field, i) => (
              <Grid item {...field.size} key={i}>
                <Field
                  {...field}
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

        {/* billing info checkbox */}
        <div className={classes.profileCheckBox}>
          <FormControlLabel
            control={
              <Checkbox
                name={'same'}
                onChange={handleCheck}
                isChecked={isChecked}
                checkedIcon={<CheckIcon fontSize='medium' />}
                icon={<RadioButtonUncheckedIcon color='primary' />}
              />
            }
            label={'Billing address is same as shipping address'}
          />
        </div>
        {/* billing info checkbox end*/}
      </form>
    </div>
  )
}

// export
export default reduxForm({
  form: 'ShippingInfoForm'
})(connect(() => {}, { changeFieldValue })(ShippingInfo))
