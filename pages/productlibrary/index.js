import Layout from 'components/layout'
import ProductFilter from 'components/pages/productLibrary/productFilter'
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import ProductLibraryCard from 'components/productLibraryCard'
import Select from 'components/select'
import { connect, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  getAllProductLibrary,
  duplicateProductLibrary,
  deleteProductLibrary,
  updateProductLibraryQuery
} from 'redux/actions/productLibraryActions'
import Modal from 'components/modal'
import { checkIfEmpty, isActiveInternet } from 'utils/helpers'
import AlertImg from '/static/images/alert-image.png'
import NoStore from '/static/images/no-store-modal.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { NotificationManager } from 'react-notifications'
import ToggleDrawer from 'components/toggleDrawer'
import Icon from 'icomoons/Icon'
import { style } from 'styles/productLibrary'
import Loader from 'components/loader'
import Nodata from 'components/nodata'
import { updateVariantsOfOrders } from 'redux/actions/orderActions'
import { getProductLibraryDetail } from 'redux/actions/productLibraryActions'
import { postProductToStore } from 'redux/actions/shopifyActions'
import Pagination from 'components/pagination'
import { getAllConnectedStores } from 'redux/actions/userStoreActions'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
const useStyles = style

/**
 * ProductLibrary List page
 * @param {*} param0
 * @returns
 */
function ProductLibrary({
  getAllProductLibrary,
  productLibrary,
  updateVariantsOfOrders,
  deleteProductLibrary,
  getProductLibraryDetail,
  postProductToStore,
  getAllConnectedStores,
  filterQuery,
  updateProductLibraryQuery,
  userDetails
}) {
  const classes = useStyles()
  const [modal, setmodal] = useState(false)
  const [open, setOpen] = useState(false)
  const [showStoreList, setShowStoreList] = useState(false)
  const [storeList, setStoreList] = useState([])
  const [storeModalLoader, setStoreModalLoader] = useState(false)
  const [selectedStore, setSelectedStore] = useState('')
  const [selected, setselected] = useState([])
  const [value, setvalue] = useState('createdOn')
  const [data, setdata] = useState([])
  const route = useRouter()
  const [loader, setloader] = useState(false)
  const [toggleModal, settoggleModal] = useState(false)
  const [rerender, setrerender] = useState(false)
  const [disabled, setdisabled] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({})
  const isSessionIdsFromShopify = useSelector((state) => state?.shopify?.shopifyAuth?.shop)
  const [isCheck, setIsCheck] = useState([])
  const [loaderMessage, setLoaderMessage] = useState()

  /**
   * handleClose
   */
  const handleClose = () => {
    setOpen(false)
  }
  /**
   * Fetch product library api
   */
  useEffect(async () => {
    const res = await getAllProductLibrary(filterQuery)
  }, [])

  /**
   * callApiOnAllFilterChange
   * @param {*} qry
   */
  const callApiOnAllFilterChange = async (qry) => {
    setloader(true)
    updateProductLibraryQuery(qry)
    const res = await getAllProductLibrary(qry)
    if (res?.statusCode === 200) {
      setloader(false)
      window.scrollTo(0, 0)
    }
  }

  /**
   * handle Search filter
   * @param {*} e
   */
  const handleSearch = async (e) => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      callApiOnAllFilterChange({
        ...filterQuery,
        pageIndex: 0,
        searchKey: e?.target?.value
      })
    }
  }

  /**
   * getApi
   * @param {*} queryData
   */
  const getApi = async (queryData) => {
    setloader(true)
    const res = await getAllProductLibrary(queryData)
    if (res?.statusCode === 200) {
      setloader(false)
    }
  }
  /**
   * handle apiCall for filters
   * @param {*} filters
   */
  const handleCallApi = (filters) => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      if (!checkIfEmpty(filters?.materialFilter)) {
        callApiOnAllFilterChange({
          ...filterQuery,
          pageIndex: 0,
          pageSize: 10,
          materialIds: filters?.materialFilter
        })
      } else {
        callApiOnAllFilterChange({
          ...filterQuery,
          pageIndex: 0,
          pageSize: 10,
          ...filters
        })
      }
    }
  }

  /**
   * handle sort filter
   * @param {*} value
   */
  const handleSortChange = (value) => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      callApiOnAllFilterChange({
        ...filterQuery,
        pageIndex: 0,
        pageSize: 10,
        sortColumn: value,
        sortDirection: 'desc'
      })
    }
  }

  /**
   * handle Select all
   * @param {*} e
   * @param {*} item
   */
  const handleSelectChange = (e, item) => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      e?.target?.checked
        ? setselected([...selected, item])
        : setselected(selected.filter((val) => val !== item))
    }
  }

  /**
   *handleDelete
   */
  const handleDelete = async () => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      setdisabled(true)
      const res = await deleteProductLibrary({
        productLibraryId: data?.productLibraryId,
        productLibraryVariantIds: []
      })
      if (res?.statusCode === 200) {
        setdisabled(false)
        settoggleModal(false)
        setdata({})
        callApiOnAllFilterChange({
          searchKey: '',
          sortColumn: 'createdOn',
          sortDirection: 'desc',
          pageIndex: 0,
          pageSize: 10,
          status: 1,
          categoryIds: [],
          materialIds: []
        })
        if (!data?.editable) {
          NotificationManager.success(
            'Product deletion will not reflect in the linked stores. Please delete it from the respective stores manually.',
            '',
            4000
          )
        } else NotificationManager.success('Product has been deleted', '', 2000)
      }
      if (res?.StatusCode === 400) {
        settoggleModal(false)
        setdisabled(false)
        setdata({})
        NotificationManager.error(res?.Response?.Message, '', 10000)
      }
    }
  }

  /**
   * handle more options
   * @param {*} status
   * @param {*} item
   */
  const handleMoreOptions = (status, item) => {
    const variantDeletedMsg =
      'Deleted variants are present in the order. Kindly remove them to proceed.'
    if (navigator.onLine) {
      switch (status) {
        case 1:
          handleNewOrder(item)
          break
        case 2:
          if (item?.isProductVariantDeleted) {
            NotificationManager.warning(variantDeletedMsg, '', 5000)
          } else {
            setselected([item.productLibraryGuid])
            if (isSessionIdsFromShopify) {
              handleAddToStore(item)
            } else {
              setShowStoreList(true)
              setStoreModalLoader(true)
              setSelectedProduct(item)
            }
          }
          break
        case 3: {
          if (item?.isProductVariantDeleted) {
            NotificationManager.warning(variantDeletedMsg, '', 5000)
          } else {
            route.push({
              pathname: '/designTool',
              query: {
                productLibraryId: item.productLibraryId,
                productLibraryVariantId: 0,
                mode: 'edit',
                productName: item.productGuid,
                designPanels: item.designPanels
              }
            })
          }
          break
        }
        case 4:
          // if (item?.isProductDeleted) {
          //   route.push(`/productlibrary/${element?.productLibraryGuid}`)
          // } else {
          route.push(`/productlibrary/${item?.productLibraryGuid}`)
          // }
          break
        case 5: {
          if (item?.isProductVariantDeleted) {
            NotificationManager.warning(variantDeletedMsg, '', 5000)
          } else {
            route.push({
              pathname: '/designTool',
              query: {
                productLibraryId: item?.productLibraryId,
                productLibraryVariantId: 0,
                mode: 'duplicate',
                productName: item?.productGuid,
                designPanels: item.designPanels
              }
            })
          }
          break
        }
        case 6:
          setdata(item)
          settoggleModal(true)
          break
        default:
          break
      }
    } else {
      NotificationManager.error('No active internet connection.', '', 10000)
    }
  }

  /**
   * handle New Order
   * @param {*} item
   */
  const handleNewOrder = async (item) => {
    const res = await getProductLibraryDetail(item?.productLibraryGuid)
    if (res) {
      updateVariantsOfOrders({
        variants: res?.response?.productLibraryVariants,
        productId: item?.productLibraryGuid
      })
      route.push(`/orders/createOrder?productId=${item?.productLibraryGuid}`)
    }
  }

  /**
   * select all fields in checkbox
   */
  const selectAllField = (e) => {
    if (e.target.checked) {
      const allChecked = productLibrary?.items?.map((val) => val?.productLibraryId)
      setIsCheck(allChecked)
    } else {
      setIsCheck([])
    }
  }

  /**
   * handle checkbox
   */
  const checkBoxHandler = (e, item) => {
    setIsCheck()
    const isSelected = isCheck?.includes(item?.productLibraryId)
    if (isSelected) {
      const valueUpdated = isCheck.filter((ele) => ele !== item?.productLibraryId)
      setIsCheck(valueUpdated)
    } else {
      setIsCheck([...isCheck, item?.productLibraryId])
    }
  }

  /**
   * Handle stores
   */
  useEffect(() => {
    if (userDetails?.customerGuid && selectedStore === '' && showStoreList) {
      const getAll = async () => {
        const data = {
          customerGuid: userDetails?.customerGuid,
          status: 1,
          storeType: null
        }
        const allStoresResponse = await getAllConnectedStores(data)
        if (
          (allStoresResponse?.StatusCode >= 400 ||
            allStoresResponse?.StatusCode === 12002 ||
            allStoresResponse?.hasError) &&
          allStoresResponse?.StatusCode !== 401
        ) {
          setStoreModalLoader(false)
          NotificationManager.error(
            allStoresResponse?.Response?.Message
              ? allStoresResponse?.Response?.Message
              : 'Something went wrong, please refresh the page',
            '',
            10000
          )
        }
        if (200 <= allStoresResponse?.statusCode && allStoresResponse?.statusCode <= 300) {
          setStoreModalLoader(false)
          const { response } = allStoresResponse
          if (response.length) {
            const storeList = response?.map((storeItem) => {
              return {
                ...storeItem,
                label: storeItem.storeName ? storeItem.storeName : 'My store',
                store: 'Shopify'
              }
            })
            setStoreList(storeList)
          } else {
            setStoreList([])
          }
        }
      }
      getAll()
    }
  }, [showStoreList, userDetails])

  /**
   * Add to store function
   * @param {*} item
   */
  const handleAddToStore = async (item) => {
    if (navigator.onLine) {
      if (item?.productLibraryId || isCheck.length > 0) {
        let libraryItems = []
        let body = {
          storeId: selectedStore !== '' ? selectedStore : userDetails?.storeId,
          productLibraryItems:
            isCheck.length > 0
              ? isCheck.map((ele) => {
                  return { productLibraryId: ele }
                })
              : [{ productLibraryId: item?.productLibraryId }]
        }
        if (body) {
          showStoreList && setShowStoreList(false)
          setLoaderMessage('Please wait.. The product is being added to the store..')
          setloader(true)
          const pushRes = await postProductToStore(body)
          if (200 <= pushRes.statusCode && pushRes.statusCode <= 300) {
            const res = await getAllProductLibrary(filterQuery)
            pushRes?.response?.isPartialPush
              ? NotificationManager.warning(
                  `One or more products couldn't be added to the store as it already exists.`,
                  '',
                  5000
                )
              : NotificationManager.success(
                  `The product${
                    isCheck.length > 1 ? 's' : ''
                  } have been added to the queue. Please click on the 'View upload status' icon to check the status`,
                  '',
                  5000
                )
            if (res?.statusCode === 200) {
              setloader(false)
              setLoaderMessage('')
              setIsCheck([])
            }
            setselected([])
            if (selectedStore !== '') {
              setSelectedStore('')
            }
          }
          if (pushRes?.StatusCode >= 400 && pushRes?.StatusCode <= 500) {
            setloader(false)
            setLoaderMessage('')
            setStoreModalLoader(false)
            setShowStoreList(false)
            setSelectedStore('')
            setIsCheck([])
            NotificationManager.error(
              pushRes?.Response?.Message
                ? pushRes?.Response?.Message
                : 'Something went wrong, please refresh the page',
              '',
              10000
            )
          }
        }
      }
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
      if (selectedStore !== '') {
        setSelectedStore('')
      }
    }
  }

  /**
   * rerenderPage function
   * @param {*} link
   */
  const rerenderPage = async (link) => {
    if (navigator?.onLine) {
      if (link === '/productlibrary') {
        setloader(true)
        const res = await getAllProductLibrary({
          ...filterQuery,
          pageIndex: 0
        })
        res && setloader(false)
      }
    }
  }
  //HTML
  return (
    <div>
      <Layout className={classes.contentPdt} handleOnClick={rerenderPage}>
        {loader && <Loader message={loaderMessage} />}
        <div className={classes.productRow}>
          <div className={classes.bgFilter}>
            <ProductFilter
              prevQuery={filterQuery}
              showCategory={false}
              rerender={rerender}
              handleSearch={handleSearch}
              apiCall={handleCallApi}
            />
          </div>
          {/* <!--hidden xs-->*/}
          {open && (
            <ToggleDrawer
              open={open}
              handleClose={handleClose}
              drawerClass={classes.Filter_Width}
              component={
                <ProductFilter
                  showCategory={false}
                  handleSearch={handleSearch}
                  apiCall={handleCallApi}
                  filterClose={handleClose}
                />
              }
            />
          )}
          {/* <!--hidden xs-->*/}
          <div className={classes.bgProductList}>
            {/* <!--new--> */}
            <div className={classes.productLibrary_Wrap}>
              <div className={classes.list_Header}>
                <div className={classes.libraryLabel}>
                  <Typography variant='h3'>Product library</Typography>
                </div>

                <div className={classes.hiddenMdRoot}>
                  {/* <!--hidden xs--> */}
                  <div className={classes.hiddenOnlyXs} style={{ alignSelf: 'flex-end' }}>
                    <Button
                      variant='outlined'
                      onClick={() => setOpen(!open)}
                      startIcon={<Icon icon='filter-list' size={18} />}
                      style={{ width: 145, background: '#fff', float: 'right' }}
                      className={classes.float_Filter}
                    >
                      Filter
                    </Button>
                  </div>
                  {/* <!--hidden xs--> */}

                  <div className={classes.sortLibrary}>
                    <div className={classes.bgCheck_Box}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name='productLibraryAddToStore'
                            checkedIcon={<CheckIcon fontSize='medium' />}
                            icon={<RadioButtonUncheckedIcon color='primary' />}
                            onChange={selectAllField}
                            checked={isCheck.length === productLibrary?.items?.length}
                          />
                        }
                        label={<div className={classes.checkedLabel}>Select all</div>}
                      />
                    </div>

                    <div className={classes.recentSelect}>
                      <Select
                        selectedValue={filterQuery?.sortColumn}
                        options={[
                          { value: 'createdOn', label: 'Recently created' },
                          { value: 'lastUpdatedOn', label: 'Recently modified' }
                        ]}
                        placeholder='Recently created'
                        onChange={(e) => {
                          setvalue(e.target.value)
                          handleSortChange(e.target.value)
                        }}
                      />
                    </div>
                    <Button
                      variant='contained'
                      onClick={() => {
                        if (navigator.onLine) {
                          route.push('/catalog')
                        } else {
                          NotificationManager.error('No active internet connection.', '', 10000)
                        }
                      }}
                    >
                      Create product
                    </Button>
                    <Button
                      variant='contained'
                      className={classes.multipleAddStoreBtn}
                      onClick={() => {
                        const deletedProduct = (element) =>
                          element.isProductDeleted && isCheck.includes(element.productLibraryId)
                        const deletedProductVariant = (element) =>
                          element.isProductVariantDeleted &&
                          isCheck.includes(element.productLibraryId)
                        if (productLibrary?.items?.some(deletedProduct)) {
                          NotificationManager.warning(
                            'One or more product has been discontinued from the product catalog',
                            '',
                            5000
                          )
                        } else if (productLibrary?.items?.some(deletedProductVariant)) {
                          NotificationManager.warning(
                            'Deleted variants are present in the order. Kindly remove them to proceed.',
                            '',
                            5000
                          )
                        } else {
                          if (userDetails?.isLoginFromShopify) {
                            setSelectedStore(userDetails?.storeId)
                            handleAddToStore(selectedProduct)
                          } else {
                            setShowStoreList(true)
                            setStoreModalLoader(true)
                          }
                        }
                      }}
                      disabled={isCheck.length ? false : true}
                    >
                      Add to store
                    </Button>
                    <Button
                      title='View upload status'
                      type='submit'
                      variant='outlined'
                      startIcon={<Icon icon='upload-icon' size={18} />}
                      className={classes.btn_Store}
                      style={{ background: '#fff' }}
                      onClick={() => isActiveInternet(route, '/store/uploads')}
                    >
                      View upload status
                    </Button>
                  </div>
                </div>
              </div>
              {checkIfEmpty(productLibrary?.items) && <Nodata label='No products found!' />}
              {productLibrary?.items?.map((value) => (
                <ProductLibraryCard
                  item={value}
                  isCheck={isCheck}
                  handleMoreOptions={(status) => handleMoreOptions(status, value)}
                  handleSelectChange={handleSelectChange}
                  selected={selected?.filter((val) => val === value?.productLibraryGuid)}
                  checkBoxHandler={checkBoxHandler}
                />
              ))}
              {!checkIfEmpty(productLibrary?.items) && (
                <div className={classes.tabPagination}>
                  <Pagination
                    pageSize={filterQuery?.pageSize}
                    currentPage={filterQuery?.pageIndex}
                    handleOnClick={async (index) => {
                      if (!navigator.onLine) {
                        NotificationManager.error('No active internet connection.', '', 10000)
                      } else {
                        setloader(true)
                        callApiOnAllFilterChange({ ...filterQuery, pageIndex: index - 1 })
                      }
                    }}
                    totalCount={productLibrary?.totalCount}
                    handlePageSizeChange={async (value) => {
                      if (!navigator.onLine) {
                        NotificationManager.error('No active internet connection.', '', 10000)
                      } else {
                        setloader(true)
                        callApiOnAllFilterChange({
                          ...filterQuery,
                          pageSize: value,
                          pageIndex: 0
                        })
                      }
                    }}
                    handlePageNation={async (index) => {
                      if (!navigator.onLine) {
                        NotificationManager.error('No active internet connection.', '', 10000)
                      } else {
                        setloader(true)
                        callApiOnAllFilterChange({ ...filterQuery, pageIndex: index - 1 })
                      }
                    }}
                  />
                </div>
              )}
              <Modal open={modal} handleClose={() => setmodal(false)} title=''>
                <h5>The below product would be added to the selected store</h5>

                <Button
                  onClick={() => {
                    if (navigator.onLine) {
                      setmodal(true)
                    } else {
                      NotificationManager.error('No active internet connection.', '', 10000)
                    }
                  }}
                >
                  Add to store
                </Button>
                <Button onClick={() => setmodal(true)}>Cancel</Button>
              </Modal>
              {/* <!--delete Modal--> */}
              <Modal open={toggleModal} handleClose={() => settoggleModal(false)}>
                <div className={classes.deleteModal}>
                  <div>
                    <Image src={AlertImg} alt='Delete' height={101} width={101} />
                  </div>
                  <div>
                    <Typography variant='h3' className={classes.modalTitle}>
                      Are you sure you want to delete
                      <br /> this variant?
                    </Typography>
                  </div>
                </div>
                <div className={classes.btnActions}>
                  <Button className={classes.btnCancel} onClick={() => settoggleModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    disabled={disabled}
                    className={classes.btnDelete}
                    variant='contained'
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </Modal>
              {/* <!--delete Modal--> */}
            </div>
            {/* <!--new--> */}
          </div>
        </div>

        {showStoreList && (
          <Modal
            open={showStoreList}
            handleClose={() => setShowStoreList(false)}
            title='Store list'
            className={classes.storeList_Pop}
          >
            {storeModalLoader && (
              <div className={classes.storeList_Loader}>
                <CircularProgress size={25} className={classes.LoaderSession} />
              </div>
            )}
            <Grid container spacing={3} direction='row' className={classes.rootList}>
              {!storeModalLoader && storeList.length !== 0 && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Select
                    selectedValue={selectedStore}
                    label='Choose a store'
                    options={storeList.map(({ label, id }) => {
                      return {
                        value: id,
                        label: label
                      }
                    })}
                    placeholder='Choose a store'
                    onChange={(e) => {
                      setSelectedStore(e.target.value)
                    }}
                  />
                  <div className={classes.btnActions} style={{ marginTop: 16 }}>
                    <Button
                      className={classes.btnCancel}
                      onClick={() => {
                        setShowStoreList(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={selectedStore === ''}
                      variant='contained'
                      onClick={() => handleAddToStore(selectedProduct)}
                      className={classes.btnApply}
                    >
                      Apply
                    </Button>
                  </div>
                </Grid>
              )}
            </Grid>
            {!storeModalLoader && !storeList.length && (
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                className={classes.store_Root}
              >
                <div>
                  <Image src={NoStore} alt='No store' height={101} width={130} />
                </div>
                <div className={classes.storeText}>
                  <Typography variant='body2'>No store found.</Typography>
                </div>
              </Grid>
            )}
          </Modal>
        )}
      </Layout>
    </div>
  )
}

const mapStateToProps = (state) => ({
  productLibrary: state.productLibrary.productLibrary?.response,
  filterQuery: state.productLibrary.libraryQuery,
  userDetails: state?.user?.userDetails
})

const mapDispatchToProps = {
  getAllProductLibrary,
  duplicateProductLibrary,
  deleteProductLibrary,
  updateVariantsOfOrders,
  getProductLibraryDetail,
  postProductToStore,
  getAllConnectedStores,
  updateProductLibraryQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLibrary)
