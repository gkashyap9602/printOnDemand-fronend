import { AUTH } from '../types/actions'
// import { HYDRATE } from "next-redux-wrapper";

const authReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case AUTH.SEND_SIGNUP_CREDENTIALS:
      return { ...state, token: action.payload }
    case AUTH.SEND_FORGOT_PASSWORD:
      return { ...state, data: action.payload }
    case AUTH.SEND_LOGIN_CREDENTIALS:
      return { ...state, userDetails: action.payload }
    case AUTH.ACTIVATE_ACCOUNT:
      return { ...state, data: action.payload }
    case AUTH.SIGNOUT_HANDLER:
      return { ...state, data: action.payload }
    default:
      return state
  }
}

export default authReducer
