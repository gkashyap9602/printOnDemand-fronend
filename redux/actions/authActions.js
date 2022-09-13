import { AUTH } from '../types/actions'
import fetchHandler from '../../utils/fetchResponseHandler'

export const signupCredentials = (data) => {
  const fetchOptions = {
    url: 'api/User/Register',
    method: 'POST',
    actionType: AUTH.SEND_SIGNUP_CREDENTIALS,
    body: data,
    secure: false
  }

  return fetchHandler(fetchOptions)
}

export const userAuthentication = (data) => {
  const fetchOptions = {
    url: 'api/Authentication/login',
    method: 'POST',
    actionType: AUTH.SEND_LOGIN_CREDENTIALS,
    body: data,
    secure: false
  }

  return fetchHandler(fetchOptions)
}

export const forgotPasswordHandler = (data) => {
  const fetchOptions = {
    url: 'api/Authentication/GeneratePasswordResetToken',
    method: 'POST',
    actionType: AUTH.SEND_FORGOT_PASSWORD,
    body: JSON.stringify(data),
    secure: false
  }

  return fetchHandler(fetchOptions)
}

export const resetPasswordHandler = (data) => {
  const fetchOptions = {
    url: 'api/Authentication/ResetPassword',
    method: 'POST',
    actionType: AUTH.RESET_PASSWORD,
    body: JSON.stringify(data),
    secure: false
  }

  return fetchHandler(fetchOptions)
}

export const activateAccountHandler = (data) => {
  const fetchOptions = {
    url: 'api/Authentication/ActivateAccount',
    method: 'POST',
    actionType: AUTH.ACTIVATE_ACCOUNT,
    body: JSON.stringify(data),
    secure: false
  }

  return fetchHandler(fetchOptions)
}

export const signoutHandler = () => {
  const fetchOptions = {
    url: 'api/Authentication/Logout',
    method: 'POST',
    actionType: AUTH.SIGNOUT_HANDLER,
    secure: true
  }

  return fetchHandler(fetchOptions)
}
