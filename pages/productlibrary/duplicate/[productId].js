import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change as changeFieldValue, formValueSelector } from 'redux-form'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import { PRODUCT_LIBRARY_DUPLICATE } from 'constants/fields'
import TextInput from 'components/TextInput'
import { style } from 'styles/addProduct'
import DataTable from 'components/dataTable'
import {
  deleteProductLibrary,
  duplicateProductLibrary,
  getProductLibraryDetail,
  storeDuplicateProductDetails
} from 'redux/actions/productLibraryActions'
import { useRouter } from 'next/router'
import { TABLE_TITLES } from 'constants/tableValue'
import { NotificationManager } from 'react-notifications'
import { validateFields } from 'utils/helpers'
import { ISSERVER } from 'constants/routePaths'
import Loader from 'components/loader'
import ToggleDrawer from 'components/toggleDrawer'
import EditProductLibrary from 'components/productLibraryCard/EditProductLibrary'
const useStyles = style

/**
 * DuplicateProductLibrary
 * @param {*} param0
 * @returns
 */
let DuplicateProductLibrary = ({
  getProductLibraryDetail,
  productLibrary,
  handleSubmit,
  title,
  description,
  changeFieldValue,
  storeDuplicateProductDetails
}) => {
  const classes = useStyles()
  const route = useRouter()
  const [errors, setErrors] = useState({})
  const [loaderBtn, setloaderBtn] = useState(false)
  const [loader, setloader] = useState(false)

  const [open, setopen] = useState(false)
  const [toggleModal, settoggleModal] = useState(false)
  const [data, setdata] = useState({})
  const [variant, setvariant] = useState(productLibrary?.productLibraryVariants || [])
  /**
   * initial get call
   */
  useEffect(async () => {
    setloader(true)
    const res = await getProductLibraryDetail(route?.query?.productId)
    if (res) {
      setloader(false)
      setvariant(res?.response?.productLibraryVariants)
    }
  }, [route?.query?.productId])

  /**
   * set field values
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue('DuplicateProductLibraryForm', 'title', values.title)
      changeFieldValue('DuplicateProductLibraryForm', 'description', values.description)
    }
    if (productLibrary && Object.getOwnPropertyNames(productLibrary).length !== 0) {
      setFieldValues(productLibrary)
    }
  }, [route?.query?.productId, productLibrary, changeFieldValue])

  /**
   * On change field values
   */
  useEffect(() => {
    const values = { title, description }
    const error = validateFields(values, PRODUCT_LIBRARY_DUPLICATE)
    setErrors(error)
  }, [title, description])

  /**
   * handleMoreOption
   * @param {*} status
   * @param {*} item
   */
  const handleMoreOption = (status, item) => {
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
  }

  /**
   * saveHandler
   * @param {*} values
   */
  const saveHandler = async (values) => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      storeDuplicateProductDetails({
        title,
        description,
        productLibraryVariants: variant.map((v) => ({
          productVarientId: v?.productVariantId,
          price: v?.retailPrice,
          designDetails: v?.designDetails,
          variantImages: v?.productLibraryVariantImages?.map((val, i) => ({
            imageType: val?.imageType,
            displayOrder: val?.displayOrder || i,
            image: { fileName: val?.fileName, filePath: val?.imagePath },
            libraryImageId: val?.libraryVariantImageId
          }))
        }))
      })
      route.push({
        pathname: '/designTool',
        query: {
          productLibraryId: productLibrary?.id,
          productLibraryVariantId: 0,
          mode: 'duplicate',
          productName: route?.query?.productName
        }
      })
    }
  }
  //HTML
  return (
    <Layout>
      {loader && <Loader />}

      <div className={classes.bgAddProduct}>
        <Typography variant='h3' className={classes.productTitle}>
          Duplicate product
        </Typography>
        <BreadCrumb
          routes={[
            { name: 'Product library', link: '/productlibrary' },
            { name: 'Duplicate product' }
          ]}
        />
        <form name='DuplicateProductLibraryForm' onSubmit={handleSubmit(saveHandler)}>
          <Grid container spacing={3} direction='row' className={classes.root}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container spacing={3}>
                {PRODUCT_LIBRARY_DUPLICATE?.map((field, i) => (
                  <Grid item {...field.size} key={i}>
                    <Field
                      {...field}
                      label={field?.label}
                      id={field?.name}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      helperText={errors?.[field?.name]}
                      type={field?.type || 'text'}
                      component={TextInput}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <div className={classes.duplicateBtn}>
              <Button
                disabled={!(title && description && Object.keys(errors).length === 0) || loaderBtn}
                type='submit'
                variant='contained'
                className={classes.btn_Duplicate}
              >
                Proceed to designer tool
                {loaderBtn && <CircularProgress size={18} className={classes.LoaderSession} />}
              </Button>
            </div>
          </Grid>
        </form>
        {/* <!--table--> */}
        <DataTable
          tableTitles={TABLE_TITLES.PRODUCT_VARIANT_TITLE}
          lists={variant}
          statusChanger={handleMoreOption}
          options={[{ status: 1, label: 'Edit', icon: 'edit-icon' }]}
        />
        <ToggleDrawer
          open={open}
          handleClose={() => setopen(false)}
          component={
            <EditProductLibrary
              data={data}
              duplicate={true}
              duplicateCall={(dt) => {
                setvariant(
                  variant.map((val) =>
                    val?.libraryVariantId === dt?.productLibraryVariantId
                      ? {
                          ...val,
                          retailPrice: dt?.price,
                          profit: dt?.profit,
                          profitPercentage: dt?.profitPercentage,
                          productLibraryVariantImages: dt?.libraryImages
                        }
                      : { ...val }
                  )
                )
              }}
              handleClose={() => {
                setopen(false)
              }}
            />
          }
        />
      </div>
    </Layout>
  )
}
const mapStateToProps = (state) => ({
  productLibrary: state.productLibrary.productLibraryDetails?.response
})

const mapDispatchToProps = {
  getProductLibraryDetail,
  duplicateProductLibrary,
  changeFieldValue,
  deleteProductLibrary,
  storeDuplicateProductDetails
}

const selector = formValueSelector('DuplicateProductLibraryForm') // <-- same as form name
DuplicateProductLibrary = connect((state) => {
  const title = selector(state, 'title')
  const description = selector(state, 'description')
  return {
    title,
    description
  }
})(DuplicateProductLibrary)

export default reduxForm({
  form: 'DuplicateProductLibraryForm'
})(connect(mapStateToProps, mapDispatchToProps)(DuplicateProductLibrary))
