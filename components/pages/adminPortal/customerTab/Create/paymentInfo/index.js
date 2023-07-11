import React, { useEffect, useState } from 'react'
import { Grid, Typography, TextField, Box } from '@material-ui/core'
import { Field, change as changeFieldValue, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { CARD_INFO, CARD_INFO_ADMIN, PAYMENT_INFO } from 'constants/fields'
import { updatePaymentInfo } from 'redux/actions/userActions'
import TextInput from 'components/TextInput'
import { style } from 'styles/profile'
import Select from 'components/select'
import { useRouter } from 'next/router'
import { checkIfEmpty, selectFieldFormat } from 'utils/helpers'
import Icon from 'icomoons/Icon'

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
  changeFieldValue,
  disableCardValue,
  disablePaytraceId,
  disableFieldExceptCcNumber = false
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
      Object.entries({ ...data?.billingAddressData, phone: data?.phone })?.map((val) => {
        changeFieldValue(
          'PaymentInfoForm',
          val?.[0],
          val[0] === 'phone' ? val?.[1]?.replace(/[^0-9 ]/g, '') : val?.[1]
        )
      })
    if (checkIfEmpty(data)) {
      FORM?.map((val) => changeFieldValue('PaymentInfoForm', val?.name, null))
    }
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
            disabled={disablePaytraceId}
            value={data?.paytraceId || null}
            defaultValue={data?.paytraceId}
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
        {disableFieldExceptCcNumber && (
          <div className={classes.payment_Warning}>
            <Box m={1} className={classes.warningIcon}>
              <Icon icon='warning' size={20} />
            </Box>
            <p className={classes.para}>
              You must enter your card number before updating any other payment related information
            </p>
          </div>
        )}

        {PAYMENT_INFO?.map((field, i) => (
          <Grid item {...field.size} key={i}>
            <Field
              {...field}
              className={field?.classEncrypt}
              isPayment={true}
              isDisabled={
                (disableCardValue && field?.name !== 'ccNumber') ||
                (disableFieldExceptCcNumber && field?.name !== 'ccNumber')
              }
              selectedValue={data?.creditCardData?.[field?.name] || data?.[field?.name]}
              placeholder={
                field?.name === 'ccNumber' && data?.creditCardData?.ccNumber
                  ? data?.creditCardData?.ccNumber
                  : field.placeholder
              }
              value={data?.creditCardData?.[field?.name] || data?.[field?.name]}
              val={
                field?.name === 'ccNumber' && data?.creditCardData?.ccNumber
                  ? ''
                  : data?.creditCardData?.[field?.name] || data?.[field?.name]
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
                  value={disableCardValue ? '' : data?.billingAddressData?.[field?.name]}
                  isDisabled={
                    disableCardValue === true ||
                    (disableFieldExceptCcNumber && !disableCardValue && field?.name !== 'ccNumber')
                  }
                  onChange={(value) => handleChange(field?.name, value)}
                  type={field?.type || 'text'}
                  placeholder={disableCardValue ? '' : field?.placeholder}
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
