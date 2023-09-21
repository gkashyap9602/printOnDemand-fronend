import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory
} from 'redux/actions/categoryActions'
import Layout from 'components/layout'
import AlertImg from '/static/images/alert-image.png'
import Icon from 'icomoons/Icon'
import { MoreActions } from 'components/formElements'
import AddCategory from 'components/pages/adminPortal/addCategory'
import Modal from 'components/modal'
import { style } from 'styles/catalogList'
import Loader from 'components/loader'
import ImageContainer from 'components/imageContainer'
import CatalogModal from 'components/catalogModal'
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications'
import Image from 'next/image'
import Nodata from 'components/nodata'
import { isActiveInternet } from 'utils/helpers'

const useStyles = style

const options = [
  { id: 1, label: 'Edit', icon: 'edit-icon' },
  {
    id: 2,
    label: 'Delete',
    icon: 'delete'
  }
]

const CatalogList = ({
  getAllCategory,
  categoryList,
  createCategory,
  deleteCategory,
  updateCategory
}) => {
  const classes = useStyles()
  const router = useRouter()
  const [isAddCategory, setIsAddCategory] = useState(false)
  const [toggleModal, setToggleModal] = useState(false)
  const [loader, setLoader] = useState(true)
  const [catalogList, setCatalogList] = useState([])
  const [isSubcategory, setIsSubcategory] = useState({ isSubcat: false, subItem: {} })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [loaderBtn, setLoaderBtn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})
  const [catGuid, setCatGuid] = useState('')
  const [modalImgLoader, setModalImgLoader] = useState(true)

  /**
   * Fetch all category
   */
  useEffect(async () => {
    if (loader) {
      const res = await getAllCategory()
      if (
        (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res.hasError) &&
        res?.StatusCode !== 401
      ) {
        setLoader(false)
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
    }
  }, [loader])

  /**
   * Set upload files state
   * @param {*} details
   */
  const setUploadedFilesCB = (details) => {
    setUploadedFiles(details)
  }

  /**
   * Set category name state
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
    if (!isEditing && !catGuid) {
      if (isSubcategory.isSubcat) {
        data = {
          parentCategoryId: isSubcategory.subItem.id,
          name,
          description: '',
          image: {
            fileName: files[0].name,
            fileData: files[0].base64
          }
        }
      } else {
        data = {
          parentCategoryId: 0,
          name,
          description: '',
          image: {
            fileName: files[0].name,
            fileData: files[0].base64
          }
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
    if (
      (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res.hasError) &&
      res?.StatusCode !== 401
    ) {
      setIsAddCategory(false)
      setIsSubcategory({ isSubcat: false, subItem: {} })
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
        ? NotificationManager.success(
            isSubcategory.isSubcat ? 'New subcategory added' : 'New category added',
            '',
            2000
          )
        : NotificationManager.success('Category updated', '', 2000)
      isEditing && setIsEditing(false)
      !isSubcategory.isSubcat && setLoader(true)
      setIsAddCategory(false)
      setIsSubcategory({ isSubcat: false, subItem: {} })
      setUploadedFiles([])
      setCategoryName('')
      setCatGuid('')
      setLoaderBtn(false)
    }
  }

  /**
   * handle delete popup close
   */
  const handleModalClose = () => {
    setToggleModal(false)
  }

  /**
   * handle popup close
   */
  const handleClose = () => {
    setModalImgLoader(true)
    setIsAddCategory(false)
    setIsSubcategory({ isSubcat: false, subItem: {} })
    setUploadedFiles([])
    setCategoryName('')
    setCatGuid('')
    isEditing && setIsEditing(false)
  }

  /**
   * set catelog list
   */
  useEffect(() => {
    if (
      categoryList?.statusCode >= 200 &&
      categoryList?.statusCode <= 300 &&
      categoryList?.response?.categories
    ) {
      const {
        response: { categories }
      } = categoryList
      setCatalogList(categories)
      setLoader(false)
    }
  }, [categoryList])

  /**
   * handle add sub-category
   * @param {*} e
   * @param {*} item
   * @param {*} isEdit
   */
  const addSubcategory = (e, item, isEdit = false) => {
    e.stopPropagation()
    if (navigator.onLine) {
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
          setUploadedFiles([])
        }
      } else {
        setIsSubcategory({ isSubcat: true, subItem: item })
      }
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }

  /**
   * handle redirect to page from side menu click
   * @param {*} item
   */
  const redirectPage = (item = false) => {
    if (navigator.onLine) {
      if (item) {
        router.push(`/admin/catalogList/${item.guid}`)
      } else {
        isActiveInternet(router, {
          pathname: '/admin/addProduct'
        })
      }
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
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
   * handle delete confirmation
   * @param {*} e
   * @param {*} item
   */
  const confirmDelete = (e, item) => {
    e.stopPropagation()
    setToggleModal(true)
    setDeleteItem(item)
  }

  /**
   * handle delete category
   */
  const deleteHandler = async () => {
    setLoaderBtn(true)
    const res = await deleteCategory(deleteItem.guid)
    if (
      (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res.hasError) &&
      res?.StatusCode !== 401
    ) {
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
      NotificationManager.success('Category deleted', '', 2000)
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

  return (
    <Layout activateHide>
      {loader && <Loader />}
      <div className={classes.catalogHead}>
        <div className={classes.catalogFlex}>
          <Typography variant='h3' style={{ color: '#4c5156' }}>
            Catalog
          </Typography>
        </div>
        <div className={classes.catalogSearch}>
          <Button
            type='submit'
            variant='contained'
            className={classes.btnCategory}
            startIcon={<Icon icon='add-icon' size={18} color='#fff' />}
            onClick={() => redirectPage()}
          >
            Add product
          </Button>
          <Button
            type='submit'
            variant='contained'
            className={classes.btnCategory}
            startIcon={<Icon icon='add-icon' size={18} color='#fff' />}
            onClick={() => {
              setIsAddCategory(true)
            }}
          >
            Add category
          </Button>
        </div>
      </div>

      <Grid container spacing={3} direction='row' className={classes.root}>
        {!loader &&
          catalogList?.map((item, i) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={i}>
              <div className={classes.catalogBlock}>
                <ImageContainer
                  url={item?.imageUrl}
                  alt={item.description}
                  showLoader={true}
                  isAdmin={true}
                  h={230}
                  w={330}
                  objectFit='cover'
                  layout='responsive'
                  onClick={() => redirectPage(item)}
                />
                <div className={classes.list_Block}>
                  <div className={classes.listFlex_Grow}>
                    <Typography variant='h3'>{item.name}</Typography>
                    <Button
                      color='primary'
                      startIcon={<Icon icon='add-icon' size={16} color='#3374b6' />}
                      className={classes.btnSubCatalog}
                      onClick={(e) => addSubcategory(e, item)}
                    >
                      Add subcategory
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
      </Grid>

      {!loader && !catalogList.length && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Nodata label='No category found!' />
        </Grid>
      )}

      {isAddCategory && (
        <CatalogModal
          open={isAddCategory}
          handleClose={handleClose}
          component={
            <AddCategory
              isLoader={modalImgLoader}
              title={
                isSubcategory.isSubcat
                  ? 'Add subcategory'
                  : isEditing
                  ? 'Edit category'
                  : 'Add category'
              }
              handleClose={handleClose}
              saveCategory={saveCategory}
              uploadedFiles={uploadedFiles}
              categoryName={categoryName}
              setUploadedFiles={setUploadedFilesCB}
              setCategoryName={setCategoryNameCB}
              loaderBtn={loaderBtn}
              name={isSubcategory.isSubcat ? 'Subcategory name' : 'Category name'}
              deleteImage={deleteImage}
              setIsLoader={(val) => setModalImgLoader(val)}
            />
          }
        />
      )}

      {/* <!--delete Modal--> */}
      <Modal open={toggleModal} handleClose={handleModalClose}>
        <div className={classes.deleteModal}>
          <div>
            <Image src={AlertImg} alt='Delete' height={101} width={101} />
          </div>
          <div>
            <Typography variant='h3' className={classes.modalTitle}>
              Are you sure you want to delete
              <br /> this category?
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
  categoryList: state.category.category
})

const mapDispatchToProps = {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogList)
