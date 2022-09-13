export const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/resetPassword?resetPasswordToken=[...resetPasswordToken]',
  '/forgotpassword'
]
export const privateRoutes = [
  '/designTool?productId=[...productId]&productVariantId=[...productVariantId]&mode=[...mode]&productName=[...productName]',
  '/designTool?productLibraryId=[...productLibraryId]&productLibraryVariantId=[...productLibraryVariantId]&mode=[...mode]&productName=[...productName]',
  '/updatepassword',
  '/orders',
  '/orders/createOrder',
  '/orders/[...orderId]',
  '/orders/edit/[...orderId]',
  '/profile',
  '/catalog',
  '/productlibrary',
  '/catalog/[...subcatalog]',
  '/catalog/[...subcatalog]/product',
  '/productlibrary/[...productId]',
  '/productlibrary/duplicate/[...productId]?productName=[...productName]',
  '/catalog/[...subcatalog]/product/[...productName]',
  '/store',
  '/store/ecommerceList',
  '/store/success',
  '/catalog/GlobalSearch?search=[...searchValue]'
]
export const adminRoutes = [
  '/admin/customerList',
  '/admin/catalogList',
  '/admin/[...catalog]/[...subCatalog]',
  '/admin/[...catalog]/subcatalog/[...productList]',
  '/admin/addProduct',
  '/admin/addProduct?id=[...id]'
]
// mwwdev.fingent.net/resetPassword?resetPasswordToken=CfDJ8E14wirGQYJNnrMFczgElIK1Y35CK%2bZutnYIAg%2buGpinJ5p4uXrnYlhmjSA6hXhucCJr8odhnlE95%2fsbCw9oMtzqWU19KQ%2fBANUTcmHRjbDOxfOy%2fQAIbF8%2f9M20YyjMPTX%2bv4fpYfSQMVNhJyjRAXBPCumv9gDuV0bbmro2d%2bqUjyN%2f0mZOzpUOB1tXy2dteQ%3d%3d&amp;emailId=nimisha.pk%40fingent.com&amp;isReset=true
export const ISSERVER = typeof window === 'undefined'
