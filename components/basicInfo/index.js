import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import Image from 'next/image'
import { Field, reduxForm, change as changeFieldValue, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import ProfileBanner from '/static/images/profile/basic-info.png'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import { updateBasicInfo, updateField } from 'redux/actions/userActions'
import { BASIC_INFO } from 'constants/fields'
import TextInput from '../TextInput'
import { style } from 'styles/profile'
import { NotificationManager } from 'react-notifications'
import { validateFields } from 'utils/helpers'
import Loader from 'components/loader'
const useStyles = style

/**
 * Profile basic info tab
 * @param {*} param0
 * @returns
 */
let BasicInfo = ({
  info,
  userGuid,
  firstName,
  lastName,
  email,
  changeFieldValue,
  handleSubmit,
  updateBasicInfo,
  updateField,
  userValueUpdated
}) => {
  const classes = useStyles()
  const [loaderBtn, setLoaderBtn] = useState(false)
  const [errors, setErrors] = useState({})

  /**
   * Submit basic information
   * @param {*} values
   */
  const saveHandler = async (values) => {
    setLoaderBtn(true)
    let data = { ...values, userGuid, companyName: null, phone: null }
    delete data.email
    let oldData = { ...info, companyName: null, userGuid, phone: null }
    delete oldData.email
    const isOldDataSame =
      Object.entries(data).sort().toString() === Object.entries(oldData).sort().toString()
    if (!isOldDataSame) {
      const res = await updateBasicInfo(data)
      if (200 <= res.statusCode && res.statusCode < 300) {
        setLoaderBtn(false)
        NotificationManager.success('Basic info updated', '', 2000)
        updateField('userValueUpdated', !userValueUpdated)
        updateField('wizardIndex', 1)
      } else if (res.StatusCode === 12002) {
        setLoaderBtn(false)
        NotificationManager.error(res?.Response?.Message, '', 10000)
      } else {
        setLoaderBtn(false)
      }
    } else {
      NotificationManager.warning('Nothing to update', '', 2000)
      updateField('wizardIndex', 1)
      setLoaderBtn(false)
    }
  }

  /**
   * Set values to fields
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue(
        'BasicInfoForm',
        'firstName',
        firstName !== undefined ? firstName : values.firstName
      )
      changeFieldValue(
        'BasicInfoForm',
        'lastName',
        lastName !== undefined ? lastName : values.lastName
      )
      changeFieldValue('BasicInfoForm', 'email', email !== undefined ? email : values.email)
    }

    if (Object.getOwnPropertyNames(info).length !== 0) {
      setFieldValues(info)
    }
  }, [info])

  /**
   * Validate each fields
   */
  useEffect(() => {
    const values = { firstName, lastName, email }
    const error = validateFields(values, BASIC_INFO)
    setErrors(error)
  }, [firstName, lastName, email])

  return (
    <Grid container spacing={3} direction='row' className={classes.root}>
      {loaderBtn && <Loader />}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className={classes.bg_Profile}>
          <Image src={ProfileBanner} alt='Basic Info' width={475} height={305} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
        <div className={classes.bgProfile_Wrap}>
          <Typography variant='h1'>Basic information</Typography>
          {/* <!--form--> */}
          <form name='BasicInfoForm' onSubmit={handleSubmit(saveHandler)}>
            <div className={classes.formWrapper}>
              <Grid container spacing={2}>
                {BASIC_INFO?.map((field, i) => {
                  console.log("field", field)
                  return (
                    <Grid item {...field.size} key={i}>
                      <Field
                        {...field}
                        label={field?.label}
                        id={field?.name}
                        placeholder={field?.placeholder}
                        name={field?.name}
                        type={field?.type || 'text'}
                        component={TextInput}
                        isDisabled={field?.name === 'email' && info.email ? true : false}
                        helperText={errors?.[field?.name]}
                      />
                    </Grid>
                  )
                }
                )}
              </Grid>

              <Button
                disabled={
                  !(firstName && lastName && email && Object.keys(errors).length === 0) || loaderBtn
                }
                type='submit'
                variant='contained'
                fullWidth
                endIcon={<ArrowRightAltIcon />}
                className={classes.btn_Submit}
              >
                Next
              </Button>
            </div>
          </form>
          {/* <!--form--> */}
        </div>
      </Grid>
    </Grid>
  )
}
//Map state to props
const mapStateToProps = (state) => ({
  userAccountDetails: state.user.userAccountDetails,
  userValueUpdated: state.user.userValueUpdated
})

//mapDispatchToProps
const mapDispatchToProps = {
  changeFieldValue,
  updateBasicInfo,
  updateField
}

const selector = formValueSelector('BasicInfoForm') // <-- same as form name
BasicInfo = connect((state) => ({
  firstName: selector(state, 'firstName'),
  lastName: selector(state, 'lastName'),
  email: selector(state, 'email')
}))(BasicInfo)

//export
export default reduxForm({
  form: 'BasicInfoForm'
})(connect(mapStateToProps, mapDispatchToProps)(BasicInfo))
