import { USER_STORE } from 'redux/types/actions'

const intialState = {
  storeUploadsQuery: {
    pageIndex: 0,
    pageSize: 10,
    sortColumn: 'uploadDate',
    sortDirection: 'desc',
    status: null
  }
}

const userStoreReducer = (state = intialState, action) => {
  switch (action.type) {
    case USER_STORE.GET_ALL_CONNECTED_STORE:
      return { ...state, allConnectedStores: action.payload }
    case USER_STORE.GET_INSTALLATION_URL:
      return { ...state, installationURLRes: action.payload }
    case USER_STORE.SAVE_SHOP_INFO:
      return { ...state, shopInfo: action.payload }
    case USER_STORE.UPDATE_FIELD:
      return { ...state, [action.field]: action.val }
    case USER_STORE.UPDATE_STORE_STATUS:
      return { ...state, storeStatusUpdate: action.payload }
    case USER_STORE.REMOVE_STORE:
      return { ...state }
    case USER_STORE.UPDATE_STORE_UPLOADS_QUERY:
      return { ...state, storeUploadsQuery: { ...action.val } }
    case USER_STORE.GET_STORE_UPLOADS_LIST:
      return { ...state, storeUploadsList: action.payload }
    default:
      return state
  }
}

export default userStoreReducer
