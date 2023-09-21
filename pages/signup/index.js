import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core'
import Image from 'next/image'
import SignupBanner from 'static/images/signup-banner.png'
import HeaderBar from 'components/appbar'
import Link from 'next/link'
import TextInput from 'components/TextInput'
import { SIGNUP_FIELDS } from 'constants/fields'
import { validateFields, encryptUsingAES } from 'utils/helpers'
import CheckBoxInput from 'components/Checkbox'
import { style } from 'styles/signup'
import { signupCredentials } from 'redux/actions/authActions'
import { NotificationManager } from 'react-notifications'
import Router from 'next/router'
import { PASSWORD_NOT_MATCH } from 'constants/text'

/**
 * SignUp page
 * @returns
 */
let SignUp = ({
  handleSubmit,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  checkedC,
  signupCredentials
}) => {
  const useStyles = style
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  const [loaderBtn, setLoaderBtn] = useState(false)

  /**
   * sign up form submit
   */
  const handleSignUp = async (values) => {
    let data = { ...values }
    if (values?.password !== values?.confirmPassword) {
      NotificationManager.error(PASSWORD_NOT_MATCH, '', 10000)
    } else {
      setLoaderBtn(true)
      delete data.checkedC
      delete data.confirmPassword
      Object.keys(data).map(function (key, index) {
        if (key === 'password') {
          const value = data[key]
          data[key] = encryptUsingAES(value)
        }
      })
      const res = await signupCredentials(JSON.stringify(data))
      if (res.statusCode === 200) {
        NotificationManager.success('Account has been successfully created', '', 3000)
        Router.push('/login')
      } else if (res.StatusCode === 12002) {
        setLoaderBtn(false)
        NotificationManager.error(res?.Response?.Message, '', 10000)
      } else if (res.StatusCode >= 400) {
        setLoaderBtn(false)
        NotificationManager.error(
          res.Response?.ValidationErrors?.[0] || res?.Response?.Message,
          '',
          10000
        )
      } else {
        setLoaderBtn(false)
      }
    }
  }

  /**
   * Validation useeffect
   */
  useEffect(() => {
    const values = { firstName, lastName, email, password, confirmPassword, checkedC }
    const error = validateFields(values, SIGNUP_FIELDS, true)
    setErrors(error)
  }, [firstName, lastName, email, password, confirmPassword, checkedC])

  return (
    <div className={classes.bgAccount}>
      <div className={classes.bgCurve} />
      <HeaderBar />
      {/* <!--signup section--> */}
      <Container>
        <div className={classes.accountGrid}>
          <Grid container spacing={3} direction='row' className={classes.root}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.signup_Row}>
                <Typography variant='h2'>
                  Create and sell custom products
                  <span className={classes.rowspan}>online</span>
                </Typography>
                <Image src={SignupBanner} alt='Sign Up' width={475} height={425} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
              <form className='signup-form' name='SignupForm' onSubmit={handleSubmit(handleSignUp)}>
                <div className={classes.bgSignup}>
                  <Typography variant='h1'>Create your account</Typography>
                  {/* <!--form--> */}
                  <div className={classes.formWrapper}>
                    <Grid container spacing={2}>
                      {SIGNUP_FIELDS?.map((field, i) => (
                        <Grid item {...field?.size} key={i}>
                          <Field
                            {...field}
                            label={field.label}
                            id={field.name}
                            placeholder={field.placeholder}
                            name={field.name}
                            tooltip={field.tooltip}
                            type={field.type ? field.type : 'text'}
                            component={TextInput}
                            helperText={errors?.[field?.name]}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    {/* <!--checkbox--> */}

                    <div className={classes.checkedWrap}>
                      <FormControlLabel
                        control={<Field name='checkedC' component={CheckBoxInput} />}
                        label={
                          <div className={classes.checkedLabel}>
                            I understand that MWW On Demand is a business-to-business service, and I
                            agree to the
                            <a href='pdf/MWW_TERMS_CONDITIONS.pdf' target='__blank'>
                              Terms and Conditions
                            </a>
                          </div>
                        }
                      />
                    </div>
                    {/* <!--checkbox--> */}
                    <Button
                      disabled={
                        !(
                          firstName &&
                          lastName &&
                          email &&
                          password &&
                          confirmPassword &&
                          checkedC &&
                          Object.keys(errors).length === 0
                        ) || loaderBtn
                      }
                      type='submit'
                      variant='contained'
                      fullWidth
                      className={classes.btn_Signup}
                    >
                      Create your account
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
                      Already have an account?
                      <Link href='/login'>Sign in</Link>
                    </Box>
                  </div>
                  {/* <!--form--> */}
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* <!--signup section--> */}
    </div>
  )
}

const mapStateToProps = (state) => ({})

//Dispatch
const mapDispatchToProps = {
  signupCredentials
}

// Decorate with connect to read form values
const selector = formValueSelector('SignupForm') // <-- same as form name
SignUp = connect((state) => {
  const firstName = selector(state, 'firstName')
  const lastName = selector(state, 'lastName')
  const email = selector(state, 'email')
  const password = selector(state, 'password')
  const confirmPassword = selector(state, 'confirmPassword')
  const checkedC = selector(state, 'checkedC')
  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    checkedC
  }
})(SignUp)

//Export
export default reduxForm({
  form: 'SignupForm'
})(connect(mapStateToProps, mapDispatchToProps)(SignUp))
