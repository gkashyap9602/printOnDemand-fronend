import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import ImageUpload from 'components/pages/adminPortal/addProduct/uploadImage'
import TextInput from 'components/TextInput'
import { EDIT_PRODUCT_LIBRARY } from 'constants/fields'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change as changeFieldValue, formValueSelector } from 'redux-form'
import {
  calculateProfit,
  calculateProfitPercent,
  checkIfEmpty,
  validateFields
} from 'utils/helpers'
import {
  deleteProductLibraryImage,
  updateProductLibraryVariant
} from 'redux/actions/productLibraryActions'
import { NotificationManager } from 'react-notifications'
import { v4 as uuidv4 } from 'uuid'
import style from '../style'
const useStyles = style

/**
 * Edit product library variant
 * @param {*} param0
 * @returns
 */
let EditProductLibrary = ({
  data,
  changeFieldValue,
  costPrice,
  handleSubmit,
  price,
  profit,
  profitPercentage,
  updateProductLibraryVariant,
  deleteProductLibraryImage,
  duplicate = false,
  handleClose,
  duplicateCall = () => {}
}) => {
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  const [pdctVariant, setpdctVariant] = useState([])
  const [imageOrder, setimageOrder] = useState(
    data?.productLibraryVariantImages?.map((val, i) => ({
      libraryImageId: val.productLibraryImageId,
      displayOrder: i
    })) || []
  )
  const [loaderBtn, setloaderBtn] = useState(false)
  useEffect(() => {
    setpdctVariant(data?.productLibraryVariantImages)
    return () => {
      setpdctVariant([])
    }
  }, [data?.productLibraryVariantImages])

  /**
   * On init
   */
  useEffect(() => {
    const setFieldValues = (values) => {
      changeFieldValue('editVariantForm', 'costPrice', values.costPrice)
      changeFieldValue('editVariantForm', 'price', values.retailPrice)
      changeFieldValue('editVariantForm', 'profit', values.profit)
      changeFieldValue('editVariantForm', 'profitPercentage', values.profitPercentage)
    }

    if (Object.getOwnPropertyNames(data).length !== 0) {
      setFieldValues(data)
    }
  }, [data, changeFieldValue])

  /**
   * change of Field value
   */
  useEffect(() => {
    const values = {
      price,
      profitPercentage,
      profit,
      costPrice
    }
    const error = validateFields(values, EDIT_PRODUCT_LIBRARY)
    setErrors(error)
  }, [price, profitPercentage])

  /**
   * Update variants
   * @param {*} values
   */
  const saveHandler = async (values) => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      setloaderBtn(true)
      if (duplicate) {
        duplicateCall({
          productLibraryVariantId: data?.libraryVariantId,
          price: values.price,
          profit: profit,
          profitPercentage: profitPercentage,
          libraryImages: pdctVariant.map((t1) => ({
            ...t1,
            ...imageOrder.find((t2) => t2.libraryImageId === t1.productLibraryImageId)
          }))
        })
        setloaderBtn(false)
        handleClose()
      } else {
        if (
          parseFloat(values?.price) === parseFloat(data?.retailPrice) &&
          parseFloat(values?.profitPercentage) === parseFloat(data?.profitPercentage) &&
          data?.productLibraryVariantImages
            .map((img) => img.productLibraryImageId)
            .every((id, i) => imageOrder.map((img) => img.libraryImageId)[i] === id)
        ) {
          setloaderBtn(false)
          NotificationManager.warning('Nothing to update', '', 2000)
        } else {
          const res = await updateProductLibraryVariant({
            productLibraryVariantId: data?.libraryVariantId,
            price: values.price,
            libraryImages: imageOrder.filter((variant) =>
              data?.productLibraryVariantImages.some(
                (d) => d.productLibraryImageId === variant.libraryImageId
              )
            )
          })
          if (res?.statusCode === 200) {
            setloaderBtn(false)
            handleClose()
            NotificationManager.success('Variant has been successfully updated', '', 2000)
          }
          if (res?.StatusCode === 400) {
            setloaderBtn(false)
            handleClose()
            NotificationManager.error(res?.Response.Message, '', 10000)
          }
        }
      }
    }
  }

  /**
   * handleDeleteImage
   * @param {*} item
   */
  const handleDeleteImage = async (item) => {
    if (!navigator.onLine) {
      NotificationManager.error('No active internet connection.', '', 10000)
    } else {
      if (duplicate) {
        if (pdctVariant?.length <= 1) {
          NotificationManager.warning('Atleast one image is required', '', 2000)
        } else {
          setpdctVariant(pdctVariant?.filter((val) => val?.productLibraryImageId !== item?.imageId))
          NotificationManager.success('Image has been successfully deleted', '', 2000)
        }

        // handleClose()
      } else {
        const res = await deleteProductLibraryImage({
          Id: item?.imageId
        })
        if (res?.statusCode === 200) {
          NotificationManager.success('Image has been successfully deleted', '', 2000)
          setpdctVariant(pdctVariant.filter((pdt) => pdt.productLibraryImageId !== item?.imageId))
          handleClose(2)
        }
        if (res?.StatusCode === 400) {
          NotificationManager.error(res.Response.Message, '', 10000)
          handleClose(2)
        }
      }
    }
  }

  /**
   * Reorder of images
   * @param {*} items
   */
  const handlesetNewOrderOfImages = (items) => {
    setimageOrder(items?.map((val, i) => ({ libraryImageId: val.imageId, displayOrder: i })))
    setpdctVariant(
      items?.map((val, i) => ({
        productLibraryImageId: val.imageId,
        ...pdctVariant?.find((s) => s.productLibraryImageId === val.imageId)
      }))
    )
  }
  /**
   * handleOnChange
   * @param {*} value
   * @param {*} field
   */
  const handleOnChange = (value, field) => {
    if (field.name === 'price') {
      let profit = ((parseFloat(value) || 0) - parseFloat(data?.costPrice)).toFixed(2)
      const profitPercentage = calculateProfitPercent(data?.costPrice, profit)
      changeFieldValue('editVariantForm', 'profitPercentage', profitPercentage)
      changeFieldValue('editVariantForm', 'profit', profit)
    }
    if (field.name === 'profitPercentage') {
      const profit = calculateProfit(data?.costPrice, value)
      let price = (parseFloat(profit) + parseFloat(data?.costPrice)).toFixed(2)
      changeFieldValue('editVariantForm', 'profitPercentage', value)
      changeFieldValue('editVariantForm', 'profit', profit)
      changeFieldValue('editVariantForm', 'price', price)
    }
  }
  return (
    <div>
      {/* <!--new--> */}
      <Typography variant='h3' className={classes.editLabel}>
        Edit
      </Typography>
      <div className={classes.blockEditArea}>
        <ImageUpload
          hideBrowseFile={true}
          imageHeading='Drag & drop for images'
          deleteImageCB={handleDeleteImage}
          setNewOrderedItems={handlesetNewOrderOfImages}
          imageList={pdctVariant?.map((val) => ({
            imagePath: val?.imagePath,
            uuid: uuidv4(),
            imageId: val?.productLibraryImageId,
            name: val?.fileName,
            size: '',
            icon: 'delete',
            base64: '',
            isUploading: false
          }))}
        />
        <form name='editVariantForm' onSubmit={handleSubmit(saveHandler)}>
          <Grid container spacing={1} direction='row'>
            {EDIT_PRODUCT_LIBRARY?.map((field, i) => (
              <Grid item {...field.size} key={i}>
                <Field
                  {...field}
                  label={field?.label}
                  id={field?.name}
                  placeholder={field?.placeholder}
                  name={field?.name}
                  type={field?.type || 'text'}
                  onChange={(value) => handleOnChange(value, field)}
                  component={TextInput}
                  helperText={errors?.[field?.name]}
                />
              </Grid>
            ))}
          </Grid>

          <div className={classes.btnTabSave}>
            <Button className={classes.cancelBtn} onClick={() => handleClose(3)}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              className={classes.saveBtn}
              disabled={Object.keys(errors).length !== 0 || loaderBtn}
            >
              Save
              {loaderBtn && <CircularProgress size={18} className={classes.LoaderSession} />}
            </Button>
          </div>
        </form>
      </div>
      {/* <!--new--> */}
    </div>
  )
}
//map state to props
const mapStateToProps = (state) => ({})

/**
 * map Dispatch To Props
 */
const mapDispatchToProps = {
  changeFieldValue,
  updateProductLibraryVariant,
  deleteProductLibraryImage
}

const selector = formValueSelector('editVariantForm') // <-- same as form name
EditProductLibrary = connect((state) => {
  const costPrice = selector(state, 'costPrice')
  const price = selector(state, 'price')
  const profit = selector(state, 'profit')
  const profitPercentage = selector(state, 'profitPercentage')
  return {
    costPrice,
    price,
    profit,
    profitPercentage
  }
})(EditProductLibrary)

export default reduxForm({
  form: 'editVariantForm'
})(connect(mapStateToProps, mapDispatchToProps)(EditProductLibrary))
