import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button, Box, CircularProgress } from '@material-ui/core'
import Image from 'next/image'
import { UPDATE_PWD_FIELDS } from 'constants/fields'
import TextInput from 'components/TextInput'
import HeaderBar from 'components/appbar'
import ResetBanner from '/static/images/change-password.png'
import Icon from 'icomoons/Icon'
import { style } from 'styles/updatepassword'
import { useRouter } from 'next/router'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {
  checkIfEmpty,
  checkIfValidPwd,
  decryptId,
  encryptUsingAES,
  validateFields
} from 'utils/helpers'
import { updatePasswordHandler, updateField } from 'redux/actions/userActions'
import { NotificationManager } from 'react-notifications'
import { PASSWORD_NOT_MATCH } from 'constants/text'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import { signoutHandler } from 'redux/actions/authActions'
import { isShopifyApp } from '../../utils/helpers'
const useStyles = style

/**
 * Create new Password page
 * @param {*} param0
 * @returns
 */
let CreatePassword = ({
  handleSubmit,
  updatePasswordHandler,
  newPassword,
  confirmPassword,
  oldPassword,
  updateField,
  userDetails,
  signoutHandler
}) => {
  const classes = useStyles()
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, seterrors] = useState({})
  const [valid, setvalid] = useState({ newPassword: false })
  const [loaderBtn, setloaderBtn] = useState(false)
  const router = useRouter()

  /**
   * After success
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess && !loaderBtn) {
        isShopifyApp() && localStorage.removeItem('userSession')
        signoutHandler()
        updateField('userDetails', {})
        router.push('/login')
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [isSuccess, loaderBtn])

  /**
   * reset password form submit
   */
  const handleResetPassword = async (values) => {
    const error = validateFields({ ...values, ...router.query }, UPDATE_PWD_FIELDS)
    seterrors(error)
    if (checkIfEmpty(error)) {
      if (values?.newPassword !== values?.confirmPassword) {
        NotificationManager.error(PASSWORD_NOT_MATCH, '', 10000)
      } else if (!checkIfValidPwd(values?.newPassword)) {
        seterrors({ newPassword: 'Please enter a strong password' })
      } else {
        setvalid({ newPassword: false })
        setloaderBtn(true)
        const res = await updatePasswordHandler({
          newPassword: encryptUsingAES(values?.newPassword),
          oldPassword: encryptUsingAES(values?.oldPassword),
          userId: decryptId(userDetails?.userId)
        })
        if (res?.StatusCode === 400 || res.StatusCode === 12002) {
          setloaderBtn(false)
          NotificationManager.error(res?.Response?.Message, '', 10000)
        } else if (res?.statusCode === 200) {
          setloaderBtn(false)
          setIsSuccess(true)
        }
      }
    }
  }

  /**
   * Validate each fields
   */
  useEffect(() => {
    const values = { newPassword, oldPassword, confirmPassword }
    const error = validateFields(values, UPDATE_PWD_FIELDS, false)
    seterrors(error)
  }, [newPassword, oldPassword, confirmPassword])

  return (
    <Layout>
      <Container>
        <Typography variant='h1' className={classes.updateHeader}>
          Change password
        </Typography>
        <BreadCrumb routes={[{ name: 'Profile', link: '/profile' }, { name: 'Change password' }]} />

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
                  <Typography variant='h1'>Change password</Typography>
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
                        {UPDATE_PWD_FIELDS?.map((field, i) => (
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
                          !(
                            newPassword &&
                            oldPassword &&
                            confirmPassword &&
                            Object.keys(errors).length === 0
                          ) ||
                          loaderBtn ||
                          !checkIfValidPwd(newPassword)
                        }
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
                    </div>
                  </div>
                </form>
                {/* <!--form--> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  )
}
//Map state to props
const mapStateToProps = (state) => ({
  userDetails: state?.user?.userDetails,
  shopifyAuth: state?.shopify?.shopifyAuth
})

//Dispatch
const mapDispatchToProps = {
  updatePasswordHandler,
  signoutHandler
}

// Decorate with connect to read form values
const selector = formValueSelector('ResetPasswordForm') // <-- same as form name
CreatePassword = connect((state) => {
  const newPassword = selector(state, 'newPassword')
  const oldPassword = selector(state, 'oldPassword')
  const confirmPassword = selector(state, 'confirmPassword')
  return {
    newPassword,
    oldPassword,
    confirmPassword,
    updateField
  }
})(CreatePassword)

//Export
export default reduxForm({
  form: 'ResetPasswordForm'
})(connect(mapStateToProps, mapDispatchToProps)(CreatePassword))
