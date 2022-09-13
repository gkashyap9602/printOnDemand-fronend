import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import {
  getAllSubcategory,
  updateField,
  createCategory,
  deleteCategory,
  updateCategory
} from 'redux/actions/categoryActions'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import AlertImg from '/static/images/alert-image.png'
import { MoreActions } from 'components/formElements'
import AddCategory from 'components/pages/adminPortal/addCategory'
import Modal from 'components/modal'
import { style } from 'styles/catalogList'
import Loader from 'components/loader'
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications'
import Nodata from 'components/nodata'
import ImageContainer from 'components/imageContainer'
import CatalogModal from 'components/catalogModal'
import Icon from 'icomoons/Icon'
import Image from 'next/image'
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

const SubCatalogList = ({
  getAllSubcategory,
  subcategoryList,
  updateField,
  createCategory,
  deleteCategory,
  updateCategory,
  parentCategoryInfo
}) => {
  const router = useRouter()
  const classes = useStyles()
  const [isAddCategory, setIsAddCategory] = useState(false)
  const [toggleModal, setToggleModal] = useState(false)
  const [loader, setLoader] = useState(true)
  const [catalogList, setCatalogList] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [loaderBtn, setLoaderBtn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})
  const [catGuid, setCatGuid] = useState('')
  const [parentCategory, setParentCategory] = useState({})
  const [modalImgLoader, setModalImgLoader] = useState(true)

  /**
   * Fetch all sub category
   */
  useEffect(async () => {
    const {
      query: { subCatalog }
    } = router
    const isGuid =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        subCatalog
      )
    if (subCatalog && isGuid) {
      const res = await getAllSubcategory(subCatalog)
      if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
        setLoader(false)
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      } else {
        setLoader(false)
      }
    }
    if (!isGuid) {
      isActiveInternet(router, {
        pathname: '/PageNotFound'
      })
    }
  }, [router?.query, loader])

  /**
   * Set upload files
   * @param {*} details
   */
  const setUploadedFilesCB = (details) => {
    setUploadedFiles(details)
  }

  /**
   * Set category name
   * @param {*} value
   */
  const setCategoryNameCB = (value) => {
    setCategoryName(value)
  }

  /**
   * handle save category
   * @param {*} values
   */
  const saveCategory = async (values) => {
    const { name, files } = values
    let data, res
    if (!isEditing) {
      data = {
        parentCategoryId: parentCategory?.id,
        name,
        description: '',
        image: {
          fileName: files[0].name,
          fileData: files[0].base64
        }
      }
      setLoaderBtn(true)
      res = await createCategory(data)
    } else {
      data = {
        catgoryGuid: catGuid,
        name,
        description: '',
        image: files[0].base64
          ? {
              fileName: files[0].name ? files[0].name : '',
              fileData: files[0].name ? files[0].base64 : ''
            }
          : null
      }
      setLoaderBtn(true)
      res = await updateCategory(data)
    }
    if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
      setIsAddCategory(false)
      setUploadedFiles([])
      setCategoryName('')
      setCatGuid('')
      setLoaderBtn(false)
      isEditing && setIsEditing(false)
      NotificationManager.error(
        res?.Response?.Message
          ? res?.Response?.Message
          : 'Something went wrong, please refresh the page',
        '',
        10000
      )
    }
    if (res?.statusCode >= 200 && res?.statusCode <= 300) {
      !isEditing
        ? NotificationManager.success('New subcategory added', '', 2000)
        : NotificationManager.success('Subcategory updated', '', 2000)
      isEditing && setIsEditing(false)
      setLoader(true)
      setIsAddCategory(false)
      setUploadedFiles([])
      setCategoryName('')
      setCatGuid('')
      setLoaderBtn(false)
    }
  }

  /**
   * handle delete popup close
   * @param {*} e
   */
  const handleModalClose = () => {
    setToggleModal(false)
  }

  /**
   * handle catelog popup close
   */
  const handleClose = () => {
    setIsAddCategory(false)
    setModalImgLoader(true)
    setUploadedFiles([])
    setCategoryName('')
    setCatGuid('')
    isEditing && setIsEditing(false)
  }

  /**
   * Update states
   */
  useEffect(() => {
    if (
      subcategoryList?.statusCode >= 200 &&
      subcategoryList?.statusCode <= 300 &&
      subcategoryList?.response?.categories
    ) {
      const {
        response: { categories, parentCategoryInfo }
      } = subcategoryList
      setCatalogList(categories)
      setParentCategory(parentCategoryInfo)
      setLoader(false)
    }
  }, [subcategoryList])

  /**
   * handle add sub category
   * @param {*} e
   * @param {*} item
   * @param {*} isEdit
   */
  const addSubcategory = (e, item, isEdit = false) => {
    e.stopPropagation()
    setIsAddCategory(true)
    if (isEdit) {
      setIsEditing(true)
      setCategoryName(item.name)
      setCatGuid(item.guid)
      if (item?.imageUrl) {
        setUploadedFiles([
          {
            uuid: item.guid,
            name: '',
            size: '',
            imagePath: item?.imageUrl, // item.imageUrl,
            base64: ''
          }
        ])
      } else {
        setModalImgLoader(false)
        setUploadedFiles([])
      }
    }
  }

  /**
   * handle edit
   * @param {*} e
   * @param {*} item
   */
  const editHandler = (e, item) => {
    e.stopPropagation()
    if (navigator.onLine) {
      setModalImgLoader(true)
      addSubcategory(e, item, true)
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
   * handle delete sub category
   */
  const deleteHandler = async () => {
    setLoaderBtn(true)
    const res = await deleteCategory(deleteItem.guid)
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
      NotificationManager.success('Subcategory deleted', '', 2000)
      setLoaderBtn(false)
    }
  }

  /**
   * handle delete image
   * @param {*} item
   */
  const deleteImage = (item) => {
    const filteredUploadList = uploadedFiles.filter((file) => file.imagePath !== item.imagePath)
    setUploadedFiles(filteredUploadList)
  }

  /**
   * redirect to page from sidemenu click
   * @param {*} e
   * @param {*} item
   * @param {*} isProductList
   */
  const redirectPage = (e, item, isProductList = false) => {
    e.stopPropagation()
    if (isProductList) {
      isActiveInternet(
        router,
        `/admin/catalogList/subcatalog/${item.guid}?categoryId=${router.query.subCatalog}`
      )
    } else {
      isActiveInternet(router, {
        pathname: '/admin/addProduct',
        query: {
          categoryId: router.query.subCatalog,
          productList: item.guid
        }
      })
    }
  }

  /**
   * update global state
   */
  useEffect(() => {
    return () => {
      updateField('subcategory', null)
    }
  }, [])

  return (
    <Layout activateHide>
      {loader && <Loader />}
      <div className={classes.catalogHead}>
        <div className={classes.catalogFlex}>
          <Typography variant='h3' style={{ color: '#4c5156' }}>
            Subcategory
          </Typography>

          <BreadCrumb
            routes={[
              { name: 'Catalog', link: '/admin/catalogList' },
              { name: parentCategoryInfo?.name }
            ]}
          />
        </div>
        <div className={classes.catalogSearch}>
          <Button
            type='submit'
            variant='contained'
            className={classes.btnCategory}
            startIcon={<Icon icon='add-icon' size={18} color='#fff' />}
            onClick={() => {
              if (navigator.onLine) {
                setIsAddCategory(true)
              } else {
                NotificationManager.error('No active internet connection', '', 10000)
              }
            }}
          >
            Add subcategory
          </Button>
        </div>
      </div>

      <Grid container spacing={3} direction='row' className={classes.root}>
        {!loader &&
          catalogList?.map((item, i) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={i}>
              <div className={classes.catalogBlock}>
                <ImageContainer
                  url={item.imageUrl}
                  alt={item.description}
                  h={230}
                  w={330}
                  showLoader={true}
                  isAdmin={true}
                  objectFit='contain'
                  layout='responsive'
                  onClick={(e) => redirectPage(e, item, true)}
                />
                <div className={classes.list_Block}>
                  <div className={classes.listFlex_Grow}>
                    <Typography variant='h3'>{item.name}</Typography>
                    <Button
                      color='primary'
                      startIcon={<Icon icon='add-icon' size={16} color='#3374b6' />}
                      className={classes.btnSubCatalog}
                      onClick={(e) => redirectPage(e, item, false)}
                    >
                      Add product
                    </Button>
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

        {!loader && !catalogList.length && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Nodata label='No subcategories found!' />
          </Grid>
        )}
      </Grid>

      <CatalogModal
        open={isAddCategory}
        handleClose={handleClose}
        component={
          <AddCategory
            isLoader={modalImgLoader}
            title={isEditing ? 'Edit subcategory' : 'Add subcategory'}
            handleClose={handleClose}
            saveCategory={saveCategory}
            uploadedFiles={uploadedFiles}
            categoryName={categoryName}
            setUploadedFiles={setUploadedFilesCB}
            setCategoryName={setCategoryNameCB}
            loaderBtn={loaderBtn}
            name={'Subcategory name'}
            deleteImage={deleteImage}
            setIsLoader={(val) => setModalImgLoader(val)}
          />
        }
      />

      {/* <!--delete Modal--> */}
      <Modal open={toggleModal} handleClose={handleModalClose}>
        <div className={classes.deleteModal}>
          <div>
            <Image src={AlertImg} alt='Delete' height={101} width={101} />
          </div>
          <div>
            <Typography variant='h3' className={classes.modalTitle}>
              Are you sure you want to delete
              <br /> this subcategory?
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
  subcategoryList: state.category.subcategory,
  parentCategoryInfo: state?.category?.subcategory?.response?.parentCategoryInfo
})

const mapDispatchToProps = {
  getAllSubcategory,
  updateField,
  createCategory,
  deleteCategory,
  updateCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCatalogList)
