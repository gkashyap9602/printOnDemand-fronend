import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change as changeFieldValue, formValueSelector } from 'redux-form'
import { Button, Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import { PRODUCT_LIBRARY_DETAILS } from 'constants/fields'
import TextInput from 'components/TextInput'
import Modal from 'components/modal'
import { style } from 'styles/addProduct'
import DataTable from 'components/dataTable'
import {
  deleteProductLibrary,
  getProductLibraryDetail,
  updateProductLibrary
} from 'redux/actions/productLibraryActions'
import { useRouter } from 'next/router'
import { TABLE_TITLES } from 'constants/tableValue'
import ToggleDrawer from 'components/toggleDrawer'
import EditProductLibrary from 'components/productLibraryCard/EditProductLibrary'
import AlertImg from '/static/images/alert-image.png'
import Image from 'next/image'
import { NotificationManager } from 'react-notifications'
import Loader from 'components/loader'
import { checkIfEmpty, validateFields } from 'utils/helpers'
import { updateVariantsOfOrders, addCartItems } from 'redux/actions/orderActions'

const useStyles = style

/**
 * Product Library Detail
 * @param {*} param0
 * @returns
 */
let ProductLibraryDetail = ({
  getProductLibraryDetail,
  deleteProductLibrary,
  productLibrary,
  changeFieldValue,
  orderDetail,
  updateVariantsOfOrders,
  updateProductLibrary,
  addCartItems,
  variants,
  title,
  description
}) => {
  const classes = useStyles()
  const route = useRouter()
  const [open, setopen] = useState(false)
  const [toggleModal, settoggleModal] = useState(false)
  const [toggleOrderModal, setToggleOrderModal] = useState(false)
  const [data, setdata] = useState({})
  const [loader, setLoader] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const [errors, setErrors] = useState({})
  const [disabled, setdisabled] = useState(false)
  /**
   * On init get call
   */
  useEffect(async () => {
    if (route?.query?.productId) {
      setLoader(true)
      const res = await getProductLibraryDetail(route?.query?.productId)
      if (res) {
        setLoader(false)
      }
    }
  }, [route?.query?.productId])

  /**
   * Redirect to orders
   */
  useEffect(() => {
    if (route?.query?.redirect && variants) {
      const allChecked = variants.map((item) => item?.libraryVariantId)
      setIsCheck(allChecked)
    }
  }, [route?.query?.redirect && variants])

  /**
   * Validate each fields
   */
  useEffect(() => {
    const values = { title, description }
    const error = validateFields(values, PRODUCT_LIBRARY_DETAILS)
    setErrors(error)
  }, [title, description])

  /**
   * On fields change
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue('ProductLibraryDetail', 'title', values.title)
      changeFieldValue('ProductLibraryDetail', 'description', values.description)
    }
    if (productLibrary && Object.getOwnPropertyNames(productLibrary).length !== 0) {
      setFieldValues(productLibrary)
    }
  }, [route?.query?.productId, productLibrary, changeFieldValue])

  /**
   * handleMoreOption
   * @param {*} status
   * @param {*} item
   */
  const handleMoreOption = (status, item) => {
    if (navigator.onLine) {
      switch (status) {
        case 1:
          setdata(item)
          setopen(true)
          break
        case 3:
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
   * Delete handle
   */
  const handleDelete = async () => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      setdisabled(true)
      setLoader(true)
      const res = await deleteProductLibrary({
        productLibraryId: productLibrary?.id,
        productLibraryVariantIds: [data?.libraryVariantId]
      })
      if (res?.statusCode === 200) {
        if (productLibrary?.productLibraryVariants?.length <= 1) {
          route?.push('/productlibrary')
        } else {
          getProductLibraryDetail(route?.query?.productId)
          setdisabled(false)
          settoggleModal(false)
          setdata({})
          setLoader(false)
        }
        if (!productLibrary?.editable) {
          NotificationManager.success(
            'Variant deletion will not reflect in the linked stores. Please delete it from the respective stores manually.          ',
            '',
            4000
          )
          setLoader(false)
        } else {
          NotificationManager.success('Product has been deleted', '', 2000)
          setLoader(false)
        }
      }
      if (res?.StatusCode === 400) {
        settoggleModal(false)
        setdata({})
        setdisabled(true)
        setLoader(false)
        NotificationManager.error(res?.Response?.Message, '', 10000)
      }
    }
  }
  /**
   * Update product library
   */
  const handleSave = async () => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      if (title === productLibrary?.title && description === productLibrary?.description) {
        NotificationManager.warning('Nothing to update', '', 2000)
      } else {
        setLoader(true)
        const res = await updateProductLibrary({
          productLibraryGuid: productLibrary?.guid,
          title: title,
          description: description
        })
        if (res) {
          setIsCheck([])
          setLoader(false)
        }
        if (res?.statusCode === 200) {
          NotificationManager.success('Product has been successfully updated', '', 3000)
        }
        if (res?.StatusCode === 400) {
          NotificationManager.error(res?.Response.Message, '', 10000)
        }
      }
    }
  }

  /**
   * Select all
   * @param {*} e
   */
  const selectAllField = (e) => {
    if (e.target.checked) {
      const allChecked = productLibrary?.productLibraryVariants.map(
        (item) => item?.libraryVariantId
      )
      setIsCheck(allChecked)
    } else {
      setIsCheck([])
    }
  }

  /**
   * checkBoxHandler
   * @param {*} e
   * @param {*} list
   */
  const checkBoxHandler = (e, list) => {
    if (checkIfEmpty(route?.query?.orderId)) {
      const isSelected = isCheck?.includes(list.libraryVariantId)
      if (isSelected) {
        const valueUpdated = isCheck.filter((item) => item !== list.libraryVariantId)
        setIsCheck(valueUpdated)
      } else {
        setIsCheck([...isCheck, list?.libraryVariantId])
      }
    } else if (
      !checkIfEmpty(route?.query?.orderId) &&
      checkIfEmpty(
        orderDetail?.lineItems?.find(
          (val) => val?.productLibraryVarientId === list?.libraryVariantId
        )
      )
    ) {
      const isSelected = isCheck?.includes(list?.libraryVariantId)
      if (isSelected) {
        const valueUpdated = isCheck.filter((item) => item !== list?.libraryVariantId)
        setIsCheck(valueUpdated)
      } else {
        setIsCheck([...isCheck, list?.libraryVariantId])
      }
    }
  }
  /**
   * Handle New order
   */
  const handleNewOrder = async () => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      if (isCheck?.length > 0) {
        let cartItems = []
        isCheck.map((item) => {
          cartItems = [
            ...cartItems,
            {
              productLibraryVariantId: item,
              quantity: 1
            }
          ]
        })
        setLoader(true)
        const res = await addCartItems({ cartItems })
        if (res) {
          setToggleOrderModal(false)
          setLoader(false)
          setIsCheck([])
        }
        if (res?.statusCode === 200) {
          NotificationManager.success('Product added to cart', '', 2000)
        }
        if (res?.StatusCode === 400) {
          NotificationManager.error(res?.Response.Message, '', 10000)
        }
      }
    }
  }

  //HTML
  return (
    <Layout>
      {loader && <Loader />}
      <div className={classes.bgAddProduct}>
        <Typography variant='h3' className={classes.productTitle}>
          Product details
        </Typography>
        <BreadCrumb
          routes={[
            { name: 'Product library', link: '/productlibrary' },
            { name: productLibrary?.title }
          ]}
        />
        <form name='ProductLibraryDetail'>
          <Grid container spacing={3} direction='row' className={classes.root}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container spacing={3}>
                {PRODUCT_LIBRARY_DETAILS?.map((field, i) => (
                  <Grid item {...field.size} key={i}>
                    <Field
                      {...field}
                      isDisabled={!productLibrary?.editable}
                      label={field?.label}
                      id={field?.name}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      type={field?.type || 'text'}
                      helperText={errors?.[field?.name]}
                      component={TextInput}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </form>

        <Typography variant='h3' className={classes.libraryTabTitle}>
          Variables & price
        </Typography>
        {/* <!--table--> */}
        <DataTable
          isExtraFieldReq={true}
          isCheck={isCheck}
          checkBoxHandler={checkBoxHandler}
          selectAllField={selectAllField}
          tableTitles={TABLE_TITLES.PRODUCT_VARIANT_TITLE}
          lists={productLibrary?.productLibraryVariants}
          statusChanger={handleMoreOption}
          options={[
            {
              status: 1,
              label: 'Edit',
              disable: !productLibrary?.editable,
              icon: 'edit-icon',
              key: 'editable'
            },
            { status: 3, label: 'Delete', icon: 'delete' }
          ]}
        />

        <div className={classes.btnOrderProduct}>
          <Button
            type='submit'
            variant='contained'
            disabled={checkIfEmpty(isCheck)}
            onClick={() => setToggleOrderModal(true)}
            className={classes.btnOrder}
          >
            Add to order
          </Button>
          {productLibrary?.editable && (
            <Button
              type='submit'
              variant='contained'
              className={classes.btnAddStore}
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </div>

        <ToggleDrawer
          open={open}
          handleClose={() => setopen(false)}
          component={
            <EditProductLibrary
              data={data}
              handleClose={async (flag = 1) => {
                switch (flag) {
                  case 1:
                    setLoader(true)
                    const res1 = await getProductLibraryDetail(route?.query?.productId)
                    setopen(false)
                    setLoader(false)
                    break
                  case 2:
                    setLoader(true)
                    const res2 = await getProductLibraryDetail(route?.query?.productId)
                    setLoader(false)
                    break
                  case 3:
                    setopen(false)
                }
              }}
            />
          }
        />
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

        {/* <!--order Modal--> */}
        <Modal open={toggleOrderModal} handleClose={() => setToggleOrderModal(false)}>
          <div className={classes.deleteModal}>
            <div>
              <Typography variant='h3' className={classes.modalTitle}>
                Are you sure you want to add these variants to cart?
              </Typography>
            </div>
          </div>
          <div className={classes.btnActions}>
            <Button className={classes.btnCancel} onClick={() => setToggleOrderModal(false)}>
              Cancel
            </Button>
            <Button
              disabled={disabled}
              // className={classes.btnDelete}
              variant='contained'
              onClick={handleNewOrder}
            >
              Add
            </Button>
          </div>
        </Modal>
        {/* <!--order Modal--> */}
        {/* <!--table--> */}
      </div>
    </Layout>
  )
}
const mapStateToProps = (state) => ({
  productLibrary: state.productLibrary.productLibraryDetails?.response,
  variants: state.orderReducer?.variants?.variants,
  orderDetail: state?.orderReducer?.orderDetails?.response
})

const mapDispatchToProps = {
  getProductLibraryDetail,
  changeFieldValue,
  deleteProductLibrary,
  updateVariantsOfOrders,
  updateProductLibrary,
  addCartItems
}

const selector = formValueSelector('ProductLibraryDetail') // <-- same as form name
ProductLibraryDetail = connect((state) => {
  const title = selector(state, 'title')
  const description = selector(state, 'description')
  return {
    title,
    description
  }
})(ProductLibraryDetail)

export default reduxForm({
  form: 'ProductLibraryDetail'
})(connect(mapStateToProps, mapDispatchToProps)(ProductLibraryDetail))
