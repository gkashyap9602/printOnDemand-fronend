import authReducer from './authReducer'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import designToolReducer from './designToolReducer'
import designModelReducer from './designModelReducer'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import productLibraryReducer from './productLibraryReducer'
import orderReducer from './orderReducer'
import shopifyReducer from './shopifyReducer'
import userStoreReducer from './userStoreReducer'
import faqReducer from './faqReducer'
import customerReducer from './admin/customerReducer'
import adminOrderReducer from './admin/orderReducer'
import logReducer from './admin/logReducer'

const rootReducer = combineReducers({
  log: logReducer,
  form: formReducer,
  faq: faqReducer,
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
  product: productReducer,
  category: categoryReducer,
  design: designToolReducer,
  designModel: designModelReducer,
  productLibrary: productLibraryReducer,
  orderReducer: orderReducer,
  shopify: shopifyReducer,
  userStore: userStoreReducer,
  customer: customerReducer,
  adminOrders: adminOrderReducer
})

export default rootReducer
