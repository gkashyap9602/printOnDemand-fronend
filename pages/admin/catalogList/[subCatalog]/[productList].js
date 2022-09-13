import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import {
  getAllProducts,
  updateProductQuery,
  updateField,
  deleteProduct
} from 'redux/actions/productActions'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import SearchArea from 'components/searchArea'
import AlertImg from '/static/images/alert-image.png'
import { MoreActions } from 'components/formElements'
import Modal from 'components/modal'
import { style } from 'styles/catalogList'
import Loader from 'components/loader'
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications'
import Nodata from 'components/nodata'
import ImageContainer from 'components/imageContainer'
import Image from 'next/image'
import { getAllCategory } from 'redux/actions/categoryActions'
import ImageNotFound from '/static/images/Image-no-found.png'
import Icon from 'icomoons/Icon'
import { isActiveInternet } from '../../../../utils/helpers'

const useStyles = style

const options = [
  { id: 1, label: 'Edit', icon: 'edit-icon' },
  {
    id: 2,
    label: 'Delete',
    icon: 'delete'
  }
]

const ProductList = ({
  getAllProducts,
  updateField,
  param,
  updateProductQuery,
  productItems,
  deleteProduct,
  categories,
  getAllCategory
}) => {
  const router = useRouter()
  const classes = useStyles()
  const [toggleModal, setToggleModal] = useState(false)
  const [loader, setLoader] = useState(true)
  const [itemList, setItemList] = useState([])
  const [loaderBtn, setLoaderBtn] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  /**
   * set global state
   */
  useEffect(() => {
    const {
      query: { productList }
    } = router
    if (productList) {
      updateProductQuery({ ...param, categoryFilter: [productList] })
    }
  }, [router?.query])

  /**
   * Fetch all category
   */
  useEffect(async () => {
    if (!categories) {
      const res = await getAllCategory()
      if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
        setLoader(false)
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
    }
  }, [])

  /**
   * Fetch all products
   */
  useEffect(async () => {
    let res
    if (param?.categoryFilter && !param?.searchKey) {
      res = await getAllProducts(param)
    }
    if (param?.searchKey) {
      const delayDebounceFn = setTimeout(async () => {
        res = await getAllProducts(param)
        if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
          setLoader(false)
          NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
        }
      }, 500)

      return () => clearTimeout(delayDebounceFn)
    }
    if (res) {
      if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
        setLoader(false)
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
    }
  }, [param, loader])

  /**
   * handle delete popup
   */
  const handleModalClose = () => {
    setToggleModal(false)
  }

  /**
   * set item list
   */
  useEffect(() => {
    if (
      productItems?.statusCode >= 200 &&
      productItems?.statusCode <= 300 &&
      productItems?.response?.items
    ) {
      const {
        response: { items }
      } = productItems
      setItemList(items)
      setLoader(false)
    }
  }, [productItems])

  /**
   * handle edit
   * @param {*} e
   * @param {*} item
   */
  const editHandler = (e, item) => {
    e.stopPropagation()
    if (navigator.onLine) {
      router.push({
        pathname: '/admin/addProduct',
        query: {
          id: item.guid,
          categoryId: router.query.categoryId,
          productList: router.query.productList
        }
      })
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }

  /**
   * handle delete confirm
   * @param {*} e
   * @param {*} item
   */
  const confirmDelete = (e, item) => {
    e.stopPropagation()
    setToggleModal(true)
    setDeleteItem(item)
  }

  /**
   * handle delete product
   */
  const deleteHandler = async () => {
    setLoaderBtn(true)
    const data = {
      productGuid: deleteItem.guid,
      variantGuids: []
    }
    const res = await deleteProduct(data)
    if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
      setToggleModal(false)
      setDeleteItem({})
      NotificationManager.error(
        res?.Response?.Message
          ? res?.Response?.Message
          : 'Something went wrong, please refresh the page',
        '',
        10000
      )
      setLoaderBtn(false)
    }
    if (res?.statusCode >= 200 && res?.statusCode <= 300) {
      setToggleModal(false)
      setDeleteItem({})
      setLoader(true)
      NotificationManager.success('The product has been deleted successfully.', '', 2000)
      setLoaderBtn(false)
    }
  }

  /**
   * Redirect page from sidemenu click
   * @param {*} e
   * @param {*} item
   */
  const redirectPage = (e, item) => {
    if (item) {
      e.stopPropagation()
      isActiveInternet(router, {
        pathname: '/admin/addProduct',
        query: {
          id: item.guid,
          categoryId: router.query.categoryId,
          productList: router.query.productList
        }
      })
    } else {
      isActiveInternet(router, {
        pathname: '/admin/addProduct',
        query: {
          categoryId: router.query.categoryId,
          productList: router.query.productList
        }
      })
    }
  }

  /**
   * handle search
   * @param {*} e
   */
  const handleSearch = (e) => {
    if (e.target.value) {
      updateProductQuery({ ...param, searchKey: e.target.value })
    } else {
      if (param?.searchKey) {
        const newParam = { ...param }
        delete newParam.searchKey
        updateProductQuery({ ...newParam })
      }
    }
  }

  /**
   * Set global state
   * @param {*} item
   */
  useEffect(() => {
    return () => {
      updateField('products', null)
      updateProductQuery({
        pageIndex: 0,
        pageSize: 100,
        sortColumn: 'title',
        sortDirection: 'asc'
      })
    }
  }, [])

  return (
    <Layout activateHide>
      {loader && <Loader />}
      <div className={classes.catalogHead}>
        <div className={classes.catalogFlex}>
          <Typography variant='h3' style={{ color: '#4c5156' }}>
            {categories?.find((val) => val.guid === router.query.categoryId)?.name}
          </Typography>

          <BreadCrumb
            routes={[
              { name: 'Catalog', link: '/admin/catalogList' },
              {
                name: categories?.find((val) => val.guid === router.query.categoryId)?.name,
                link: `/admin/catalogList/${
                  categories?.find((val) => val.guid === router.query.categoryId)?.guid
                }`
              },
              {
                name: categories
                  ?.find((val) => val.guid === router.query.categoryId)
                  ?.subCategories?.find((val) => val?.guid === router.query.productList)?.name
              }
            ]}
          />
        </div>
        <div className={classes.catalogSearch}>
          {/* <!--search bar--> */}
          <SearchArea
            handleSearch={handleSearch}
            placeholder='Search product'
            className={classes.searchCatalog}
          />
          {/* <!--search bar--> */}
          <Button
            type='submit'
            variant='contained'
            className={classes.btnCategory}
            startIcon={<Icon icon='add-icon' size={18} color='#fff' />}
            onClick={() => redirectPage()}
          >
            Add product
          </Button>
        </div>
      </div>

      <Grid container spacing={3} direction='row' className={classes.root}>
        {!loader &&
          itemList?.map((item, i) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={i}>
              <div className={classes.catalogBlock}>
                <ImageContainer
                  url={item.productImages[0]?.thumbnailPath || ImageNotFound}
                  alt={item.description}
                  h={230}
                  w={330}
                  showLoader={true}
                  isAdmin={true}
                  objectFit='contain'
                  layout='responsive'
                  onClick={(e) => redirectPage(e, item)}
                />
                <div className={classes.list_Block}>
                  <div className={classes.listFlex_Grow}>
                    <Typography variant='h3'>{item.title}</Typography>
                  </div>
                  <div>
                    <MoreActions
                      confirmDelete={(e) => confirmDelete(e, item)}
                      handleChange={(e) => editHandler(e, item)}
                      options={options}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          ))}

        {!loader && !itemList.length && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Nodata label='No products found!' />
          </Grid>
        )}
      </Grid>

      {/* <!--delete Modal--> */}
      <Modal open={toggleModal} handleClose={handleModalClose}>
        <div className={classes.deleteModal} style={{ marginBottom: '25px' }}>
          <div>
            <Image src={AlertImg} alt='Delete' height={101} width={101} />
          </div>
          <div>
            <Typography variant='h3' className={classes.modalTitle}>
              The product will be removed from all subcategories. Are you sure you want to delete
              this product?
            </Typography>
          </div>
        </div>
        <div className={classes.btnActions}>
          <Button className={classes.btnCancel} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            disabled={loaderBtn}
            className={classes.btnDelete}
            variant='contained'
            onClick={deleteHandler}
          >
            Delete
            {loaderBtn && (
              <CircularProgress
                style={{ marginLeft: 5 }}
                size={14}
                className={classes.LoaderSession}
              />
            )}
          </Button>
        </div>
      </Modal>
      {/* <!--delete Modal--> */}
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  productItems: state.product.products,
  param: state.product.productParam,
  categories: state?.category?.category?.response?.categories
})

const mapDispatchToProps = {
  getAllProducts,
  updateField,
  updateProductQuery,
  deleteProduct,
  getAllCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
