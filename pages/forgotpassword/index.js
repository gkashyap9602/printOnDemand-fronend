import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button, Box, CircularProgress } from '@material-ui/core'
import Image from 'next/image'
import { FORGOT_FIELDS } from 'constants/fields'
import TextInput from 'components/TextInput'
import HeaderBar from 'components/appbar'
import ForgotBanner from '/static/images/forget-password.png'
import Icon from 'icomoons/Icon'
import { style } from 'styles/forgotPassword'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { checkIfEmpty, partialEmail, validateFields } from 'utils/helpers'
import { forgotPasswordHandler } from 'redux/actions/authActions'
import { connect } from 'react-redux'
import Link from 'next/link'
import fileUrl from 'constants/url'
const useStyles = style

/**
 * Forgot password page
 * @param {*} param0
 * @returns
 */
let Forgot = ({ handleSubmit, forgotPasswordHandler, mail }) => {
  const classes = useStyles()
  const [errors, seterrors] = useState({})
  const [email, setemail] = useState('')
  const [loaderBtn, setloaderBtn] = useState(false)

  /**
   * forgot password form submit
   */
  const handleForgotPassword = async (values) => {
    const error = validateFields(values, FORGOT_FIELDS)
    seterrors(error)
    if (checkIfEmpty(error)) {
      setloaderBtn(true)
      const res = await forgotPasswordHandler(values)
      if (res?.StatusCode === 400 || res.StatusCode === 12002 || res?.statusCode === 200) {
        setemail(values?.email)
        setloaderBtn(false)
      }
    }
  }

  /**
   * Validate each fields
   */
  useEffect(() => {
    const values = { email: mail }
    const error = validateFields(values, FORGOT_FIELDS, true)
    seterrors(error)
  }, [mail])

  //HTML
  return (
    <div className={classes.bgAccount}>
      <div className={classes.bgCurve}></div>
      {/* <!--app bar--> */}
      <HeaderBar />
      {/* <!--app bar--> */}
      {/* <!--Forgot section--> */}
      <Container>
        <div className={classes.accountGrid}>
          <Grid container spacing={3} direction='row' className={classes.root}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.forgot_Row}>
                <Image src={`${fileUrl}forget-password.png`} alt='Forgot' width={475} height={305} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
              <div className={classes.bgForgot}>
                <div className={classes.bgPad_Typo}>
                  <Typography variant='h1'>Reset password</Typography>
                  <Typography variant='h4' className={classes.text_Label}>
                    Enter your email address. We&apos;ll send an email with instructions to reset
                    your password.
                  </Typography>
                </div>
                {/* <!--success msg--> */}
                {!checkIfEmpty(email) && (
                  <Box display='flex' alignItems='center' className={classes.successMsg}>
                    <Box mr={2}>
                      <Icon icon='success' size={30} />
                    </Box>
                    <Box>
                      <Typography variant='h5'>
                        MWW On Demand sent a password reset link to {partialEmail(email)}. Follow
                        the directions to reset your password. If you don&apos;t see the email,
                        check your spam folder.
                      </Typography>
                    </Box>
                  </Box>
                )}
                {/* <!--success msg--> */}
                {/* <!--form--> */}
                <form
                  className='forgot-password-form'
                  name='ForgotPasswordForm'
                  onSubmit={handleSubmit(handleForgotPassword)}
                >
                  <div className={classes.bgPad_Form}>
                    <div className={classes.formWrapper}>
                      <Grid container spacing={2}>
                        {FORGOT_FIELDS?.map((field, i) => (
                          <Grid item {...field?.size} key={i}>
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
                      <Button
                        disabled={loaderBtn}
                        type='submit'
                        variant='contained'
                        fullWidth
                        className={classes.btn_Signup}
                      >
                        Submit
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
      {/* <!--Forgot section--> */}
    </div>
  )
}

const mapStateToProps = (state) => ({})

//Dispatch
const mapDispatchToProps = {
  forgotPasswordHandler
}

// Decorate with connect to read form values
const selector = formValueSelector('ForgotPasswordForm') // <-- same as form name
Forgot = connect((state) => {
  const mail = selector(state, 'email')
  return {
    mail
  }
})(Forgot)

//Export
export default reduxForm({
  form: 'ForgotPasswordForm'
})(connect(mapStateToProps, mapDispatchToProps)(Forgot))
