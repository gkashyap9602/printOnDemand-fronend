import { PRODUCT_LIBRARY } from '../types/actions'

const intialState = {
  libraryQuery: {
    searchKey: '',
    sortColumn: 'createdOn',
    sortDirection: 'desc',
    pageIndex: 0,
    pageSize: 10,
    status: 1,
    categoryIds: [],
    materialIds: []
  }
}

const productLibraryReducer = (state = intialState, action) => {
  switch (action.type) {
    case PRODUCT_LIBRARY.GET_ALL_PRODUCT_LIBRARY:
      return { ...state, productLibrary: action.payload }
    case PRODUCT_LIBRARY.GET_PRODUCT_LIBRARY_DETAIL:
      return { ...state, productLibraryDetails: action.payload }
    case PRODUCT_LIBRARY.DELETE_PRODUCT_LIBRARY:
      return { ...state, deletedLibrary: action.payload }
    case PRODUCT_LIBRARY.deleteProductLibraryImage:
      return { ...state, deleteProductLibraryImage: action.payload }
    case PRODUCT_LIBRARY.UPDATE_VARIANT:
      return { ...state, deletedLibrary: action.payload }
    case PRODUCT_LIBRARY.UPDATE:
      return { ...state, update: action.payload }
    case PRODUCT_LIBRARY.UPDATE_DETAILS:
      return { ...state, updateDetails: { ...action.data } }
    case PRODUCT_LIBRARY.UPDATE_LIABRARY_QUERY:
      return { ...state, libraryQuery: { ...action.val } }
    default:
      return state
  }
}

export default productLibraryReducer
