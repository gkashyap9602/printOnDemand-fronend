import React, { useEffect, useState } from 'react'
import { Grid, Typography, TextField } from '@material-ui/core'
import { Field, change as changeFieldValue, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { CARD_INFO, CARD_INFO_ADMIN, PAYMENT_INFO } from 'constants/fields'
import { updatePaymentInfo } from 'redux/actions/userActions'
import TextInput from 'components/TextInput'
import { style } from 'styles/profile'
import Select from 'components/select'
import { useRouter } from 'next/router'
import { checkIfEmpty, selectFieldFormat } from 'utils/helpers'
const useStyles = style

/**
 * PaymentInfo Admin
 * @param {*} param0
 * @returns
 */
const PaymentInfo = ({
  handleChange,
  errors,
  countryList,
  data,
  handleSubmit,
  changeFieldValue
}) => {
  const classes = useStyles()
  const route = useRouter()
  const [FORM, setFORM] = useState(CARD_INFO_ADMIN)
  const { countryCode, ...billing } = data?.billingAddressData

  /**
   * Set country options in the required format
   */
  useEffect(async () => {
    setFORM(
      FORM?.map((v) =>
        v?.name === 'countryCode'
          ? {
              ...v,
              type: 'select',
              options: v?.name === 'countryCode' && selectFieldFormat(countryList)
            }
          : v
      )
    )
  }, [countryList])

  /**
   * Submit after refresh
   */
  useEffect(async () => {
    if (!checkIfEmpty(route?.query?.ccNumber) || !checkIfEmpty(route?.query?.paytraceId))
      handleSubmit()
  }, [route.query?.ccNumber || route.query?.paytraceId])

  /**
   * Set data options in the required format
   */
  useEffect(async () => {
    data &&
      Object.entries({ ...data?.billingAddressData, phone: data?.phone })?.map((val) =>
        changeFieldValue('PaymentInfoForm', val?.[0], val?.[1])
      )
  }, [data])

  //html
  return (
    <div className={classes.bgProfile_Wrap}>
      <Typography variant='h1'>Payment info</Typography>
      <Grid container spacing={2} style={{ marginTop: 8 }}>
        <div style={{ padding: 8, width: '100%' }} className={classes.paytrace_Field}>
          <Typography variant='body1' className={classes.labelForm}>
            Paytrace id
          </Typography>
          <TextField
            onChange={(e) => handleChange('paytraceId', e?.target?.value)}
            name='paytraceId'
            type='text'
            disabled={
              Object.values({
                ...data?.creditCardData,
                ...billing
              }).filter((v) => v)?.length > 0
            }
            value={data?.paytraceId}
            placeholder='Enter paytrace Id'
            variant='outlined'
            style={{ marginTop: '10px' }}
            fullWidth
            InputLabelProps={{
              shrink: false
            }}
          />
          <div className={classes.payment_Border}>
            <span>OR</span>
          </div>
        </div>
        {PAYMENT_INFO?.map((field, i) => (
          <Grid item {...field.size} key={i}>
            {JSON.stringify(field.placeholder)}
            <Field
              {...field}
              isDisabled={!checkIfEmpty(data?.paytraceId)}
              value={data?.creditCardData?.[field?.name] || data?.[field?.name]}
              placeholder={
                field?.name === 'ccNumber' && data?.creditCardData?.ccNumber
                  ? data?.creditCardData?.ccNumber
                  : field.placeholder
              }
              onChange={(value) => {
                handleChange(field?.name, value, 'card')
              }}
              component={field?.type === 'select' ? Select : TextInput}
              helperText={errors?.[field?.name]}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.formWrapper}>
        <div style={{ marginBottom: '16px', marginTop: 16 }}>
          <Typography variant='h1'>Credit card address</Typography>
        </div>
        <form name='PaymentInfoForm'>
          <Grid container spacing={2}>
            {FORM?.map((field, i) => (
              <Grid item {...field.size} key={i}>
                <Field
                  {...field}
                  value={data?.billingAddressData?.[field?.name]}
                  isDisabled={!checkIfEmpty(data?.paytraceId)}
                  onChange={(value) => handleChange(field?.name, value)}
                  type={field?.type || 'text'}
                  placeholder={field?.placeholder}
                  component={field?.type === 'select' ? Select : TextInput}
                  helperText={errors?.[field?.name]}
                  selectedValue={
                    field?.type === 'select' ? data?.billingAddressData?.[field.name] : ''
                  }
                />
              </Grid>
            ))}
          </Grid>
        </form>
      </div>
    </div>
  )
}

//mapDispatchToProps
const mapDispatchToProps = {
  changeFieldValue,
  updatePaymentInfo
}

//export
export default reduxForm({
  form: 'PaymentInfoForm'
})(connect(() => {}, mapDispatchToProps)(PaymentInfo))
