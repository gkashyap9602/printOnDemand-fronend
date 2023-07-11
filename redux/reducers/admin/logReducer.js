import { ADMIN } from '../../types/actions'

const logReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN.GET_ALL_ADMIN_LOGS:
      return { ...state, logs: action.payload }
    default:
      return state
  }
}

export default logReducer
