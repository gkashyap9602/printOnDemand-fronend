import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { Container, Grid, Typography, Button, Box, CircularProgress } from '@material-ui/core'
import clsx from 'clsx'
import Image from 'next/image'
import SignupBanner from '/static/images/signup-banner.png'
import { style } from 'styles/signup'
import HeaderBar from 'components/appbar'
import TextInput from 'components/TextInput'
import { LOGIN_FIELDS } from 'constants/fields'
import { validateFields, encryptUsingAES, encryptId, isShopifyApp } from 'utils/helpers'
import { userAuthentication } from 'redux/actions/authActions'
import { NotificationManager } from 'react-notifications'
import { useRouter } from 'next/router'
import { updateField, getUserSessionShopify } from 'redux/actions/userActions'
import jwt_decode from 'jwt-decode'
import Loader from 'components/loader'
const useStyles = style
/**
 * LOGIN PAGE
 * @param {*} param0
 * @returns
 */
let Login = ({
  email,
  password,
  handleSubmit,
  userAuthentication,
  updateField,
  getUserSessionShopify
}) => {
  const classes = useStyles()
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [loaderBtn, setLoaderBtn] = useState(false)
  const { shopifyAuth } = useSelector((state) => state.shopify)
  const [firstCall, setFirstCall] = useState(false)
  const [loader, setLoader] = useState(true)

  /**
   * Text Field On Change
   * @param {*} event
   */

  useEffect(() => {
    const values = { email, password }
    const error = validateFields(values, LOGIN_FIELDS, false)
    setErrors(error)
  }, [email, password])

  //UseEffect to hande all shopify related login bypass
  useEffect(async () => {
    if (shopifyAuth && !firstCall) {
      const res = await getUserSessionShopify()
      const { response } = res
      const user = {
        userId: encryptId(`${response?.id}`),
        customerId: encryptId(`${response?.customerId}`),
        ...response
      }
      res.response = user
      if (res.statusCode === 200 && isShopifyApp()) {
        updateField('userDetails', user)
        updateField('userSessionShopify', res)
        router.push({
          pathname: '/orders'
        })
      }
      if (res.StatusCode === 401) {
        setFirstCall(true)
        setTimeout(() => {
          setLoader(false)
        }, 10000)
      }
    }
  }, [shopifyAuth])

  /**
   * handle if shopfiy app
   */
  useEffect(() => {
    const updateLoader = setTimeout(() => {
      setLoader(false)
    }, 10000)
    return () => clearTimeout(updateLoader)
  }, [shopifyAuth])

  /**
   * set loader to false
   */
  useEffect(() => {
    if (isShopifyApp()) {
      setLoader(true)
    } else {
      setLoader(false)
    }
  }, [])

  /**
   * Login form submit
   */
  const handleLogin = async (payload, notShopifyFlag) => {
    const res = await userAuthentication(JSON.stringify(payload))
    if (res.statusCode === 200 && res?.response) {
      const { response } = res
      const user = {
        ...response,
        guid: response.guid,
        token: response.token,
        userType: response.userType,
        userId: encryptId(`${response?.id}`),
        activeStatusId: response.status,
        customerGuid: response.customerGuid,
        customerId: encryptId(`${response?.customerId}`),
        isLoginFromShopify: response?.isLoginFromShopify,
        storeId: response?.storeId
      }
      if (response?.userType !== 1) {
        if (notShopifyFlag) {
          localStorage.setItem('userSession', JSON.stringify(user))
          localStorage.setItem('orderSubmissionDelay', response.orderSubmissionDelay || '01:00:00')
        }
        updateField('userDetails', user)
      }
      if (response?.userType === 3) {
        router.push({
          pathname: '/orders'
        })
      } else if (response?.userType === 2) {
        router.push({
          pathname: '/admin/customerList'
        })
      } else if (response?.userType === 1) {
        setLoaderBtn(false)
        setLoader(false)
        NotificationManager.error('SuperAdmin role is not yet ready', '', 10000)
      }
    } else if (res.StatusCode >= 400 || res.StatusCode === 12002) {
      setLoaderBtn(false)
      setLoader(false)
      NotificationManager.error(res?.Response?.Message, '', 10000)
    } else {
      setLoaderBtn(false)
      setLoader(false)
    }
  }

  /**
   * Login submit fn
   * @param {*} param0
   */
  const handleLoginSubmit = ({ email, password }) => {
    setLoader(true)
    if (isShopifyApp()) {
      const dataValue = {
        userName: email,
        password: encryptUsingAES(password),
        isLoginFromShopify: true,
        shopifyAppInfo: {
          accessToken: shopifyAuth?.session,
          shop: shopifyAuth?.shop,
          sid: jwt_decode(shopifyAuth?.accessToken).sid
        }
      }
      shopifyAuth?.session && shopifyAuth?.session.length
        ? handleLogin(dataValue, false)
        : setLoader(false)
    } else {
      const dataValue = {
        isLoginFromShopify: false,
        userName: email,
        password: encryptUsingAES(password)
      }
      handleLogin(dataValue, true)
    }
  }
  //HTML
  return (
    <div className={classes.bgAccount}>
      {loader && <Loader fullOpaque={true} />}
      <div className={classes.bgCurve}></div>
      {/* <!--app bar--> */}
      <HeaderBar />
      {/* <!--app bar--> */}
      {/* <!--Login section--> */}
      <Container>
        <div className={classes.accountGrid}>
          <Grid container spacing={3} direction='row' className={classes.root}>
            <Grid item xs={12} md={6}>
              <div className={classes.signup_Row}>
                <Typography variant='h2'>
                  Create and sell custom products
                  <span className={classes.rowspan}>online</span>
                </Typography>
                <Image src={SignupBanner} alt='Sign Up' width={475} height={425} />
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ zIndex: 1 }}>
              <form onSubmit={handleSubmit(handleLoginSubmit)}>
                <div className={classes.bgSignup}>
                  <Typography variant='h1'>Sign in</Typography>

                  {/* <!--form--> */}
                  <div className={classes.formWrapper}>
                    <Grid container spacing={2}>
                      {LOGIN_FIELDS?.map((field, i) => (
                        <Grid item {...field?.size} key={`loginfield-${i}`}>
                          <Field
                            {...field}
                            label={field.label}
                            id={field.name}
                            placeholder={field.placeholder}
                            name={field.name}
                            type={field.type ? field.type : 'text'}
                            component={TextInput}
                            helperText={errors?.[field?.name]}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <div className={clsx(classes.form_Link, classes.form_Flex)}>
                      <a href='/forgotpassword'> Forgot password?</a>
                    </div>
                    <Button
                      disabled={
                        !(email && password && Object.keys(errors).length === 0) || loaderBtn
                      }
                      type='submit'
                      variant='contained'
                      fullWidth
                      className={classes.btn_Signup}
                    >
                      Sign in
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
                      Don&apos;t have an account?
                      <a href='/signup'> Create new account</a>
                    </Box>
                  </div>
                  {/* <!--form--> */}
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* <!--Login section--> */}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  userAuthentication,
  updateField,
  getUserSessionShopify
}

// Decorate with connect to read form values
const selector = formValueSelector('loginForm') // <-- same as form name
Login = connect((state) => {
  const email = selector(state, 'email')
  const password = selector(state, 'password')
  return {
    email,
    password
  }
})(Login)

export default reduxForm({
  form: 'loginForm'
})(connect(mapStateToProps, mapDispatchToProps)(Login))
