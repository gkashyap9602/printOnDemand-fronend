import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button, Box, CircularProgress } from '@material-ui/core'
import Image from 'next/image'
import { CREATE_FIELDS } from 'constants/fields'
import TextInput from 'components/TextInput'
import HeaderBar from 'components/appbar'
import ResetBanner from '/static/images/change-password.png'
import Icon from 'icomoons/Icon'
import { style } from 'styles/resetPassword'
import { useRouter } from 'next/router'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { checkIfEmpty, checkIfValidPwd, encryptUsingAES, validateFields } from 'utils/helpers'
import { resetPasswordHandler } from 'redux/actions/authActions'
import { NotificationManager } from 'react-notifications'
import Link from 'next/link'
import { PASSWORD_NOT_MATCH } from 'constants/text'
import { isActiveInternet } from '../../utils/helpers'
const useStyles = style

/**
 * Create Password page
 * @param {*} param0
 * @returns
 */
let CreatePassword = ({ handleSubmit, resetPasswordHandler, newPassword, confirmPassword }) => {
  const classes = useStyles()
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, seterrors] = useState({})
  const [valid, setvalid] = useState({ newPassword: false })
  const [loaderBtn, setloaderBtn] = useState(false)
  const router = useRouter()

  /**
   * reset password form submit
   */
  const handleResetPassword = async (values) => {
    const error = validateFields({ ...values, ...router.query }, CREATE_FIELDS)
    seterrors(error)
    if (checkIfEmpty(error)) {
      if (values?.newPassword !== values?.confirmPassword) {
        NotificationManager.error(PASSWORD_NOT_MATCH, '', 10000)
      } else if (!checkIfValidPwd(values?.newPassword)) {
        seterrors({ newPassword: 'Please enter a strong password' })
      } else {
        setvalid({ newPassword: false })
        setloaderBtn(true)
        const res = await resetPasswordHandler({
          newPassword: encryptUsingAES(values?.newPassword),
          resetPasswordToken: router.query.resetPasswordToken,
          emailId: router.query?.['emailId'] || router.query?.['amp;emailId']
        })
        if (res?.StatusCode === 400 || res.StatusCode === 12002) {
          setloaderBtn(false)
          NotificationManager.error(res?.Response?.Message, '', 10000)
        } else if (res?.statusCode === 200) {
          setIsSuccess(true)
          setloaderBtn(false)
          setTimeout(() => {
            isActiveInternet(router, '/login')
          }, 1000)
        } else if (res?.StatusCode === 500 || res?.StatusCode === 406) {
          NotificationManager.error(res?.Response?.Message, '', 10000)
          setloaderBtn(false)
        }
      }
    }
  }

  /**
   * Validate each fields
   */
  useEffect(() => {
    const values = { newPassword, confirmPassword }
    const error = validateFields(values, CREATE_FIELDS)
    seterrors(error)
  }, [newPassword, confirmPassword])

  //HTML
  return (
    <div className={classes.bgAccount}>
      <div className={classes.bgCurve}></div>
      {/* <!--app bar--> */}
      <HeaderBar />
      {/* <!--app bar--> */}
      {/* <!--reset section--> */}
      <Container>
        <div className={classes.accountGrid}>
          <Grid container spacing={3} direction='row' className={classes.root}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.reset_Row}>
                <Image src={ResetBanner} alt='Reset' width={475} height={305} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
              <div className={classes.bgReset}>
                <div className={classes.bgPad_Typo}>
                  <Typography variant='h1'>Reset password</Typography>
                </div>
                {/* <!--success msg--> */}
                {isSuccess && (
                  <Box display='flex' alignItems='center' className={classes.successMsg}>
                    <Box mr={2}>
                      <Icon icon='success' size={30} />
                    </Box>
                    <Box>
                      <Typography variant='h5'>Success! your password was reset</Typography>
                    </Box>
                  </Box>
                )}

                {/* <!--success msg--> */}
                {/* <!--form--> */}
                <form
                  className='reset-password-form'
                  name='ResetPasswordForm'
                  onSubmit={handleSubmit(handleResetPassword)}
                >
                  <div className={classes.bgPad_Form}>
                    <div className={classes.formWrapper}>
                      <Grid container spacing={2}>
                        {CREATE_FIELDS?.map((field, i) => (
                          <Grid item {...field?.size} key={i}>
                            <Field
                              {...field}
                              label={field?.label}
                              id={field?.name}
                              placeholder={field?.placeholder}
                              name={field?.name}
                              type={field?.type || 'text'}
                              component={TextInput}
                              validText={valid}
                              helperText={errors?.[field?.name]}
                              tooltip={field?.tooltip}
                            />
                          </Grid>
                        ))}
                      </Grid>
                      <Button
                        disabled={
                          !checkIfValidPwd(newPassword) || !checkIfEmpty(errors) || loaderBtn
                        }
                        type='submit'
                        variant='contained'
                        fullWidth
                        className={classes.btn_Signup}
                      >
                        {isSuccess && 'Redirecting to the login page...'}
                        {!isSuccess && 'Submit'}
                        {loaderBtn && (
                          <CircularProgress size={18} className={classes.LoaderSession} />
                        )}
                      </Button>
                      <Box
                        display='flex'
                        width='100%'
                        justifyContent='center'
                        className={classes.form_Link}
                      >
                        <Link href='/login'> Back to sign in</Link>
                      </Box>
                    </div>
                  </div>
                </form>
                {/* <!--form--> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* <!--reset section--> */}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  resetPasswordHandler
}

// Decorate with connect to read form values
const selector = formValueSelector('ResetPasswordForm') // <-- same as form name
CreatePassword = connect((state) => {
  const newPassword = selector(state, 'newPassword')
  const confirmPassword = selector(state, 'confirmPassword')
  return {
    newPassword,
    confirmPassword
  }
})(CreatePassword)

export default reduxForm({
  form: 'ResetPasswordForm'
})(connect(mapStateToProps, mapDispatchToProps)(CreatePassword))
