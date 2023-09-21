import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, change as changeFieldValue } from 'redux-form'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import BreadCrumb from 'components/breadcrumb'
import { ADD_PRODUCT, ADD_PRODUCT2 } from 'constants/fields'
import TextInput from 'components/TextInput'
import Select from 'components/select'
import TableList from 'components/pages/adminPortal/addProduct/tableList'
import MultiSelect from 'components/multiSelect'
import Modal from 'components/modal'
import AlertImg from '/static/images/alert-image.png'
import { style } from 'styles/addProduct'
import Image from 'next/image'
import ImageUpload from 'components/pages/adminPortal/addProduct/uploadImage'
import { getAllCategory, getAllMaterials } from 'redux/actions/categoryActions'
import {
  getAllVariableType,
  createProduct,
  updateProduct,
  getProductDetail,
  updateField,
  uploadProductImage,
  uploadProductVariant,
  updateProductVariant,
  deleteProductImage,
  deleteProduct
} from 'redux/actions/productActions'
import Loader from 'components/loader'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications'
import { checkIfEmpty, isActiveInternet } from 'utils/helpers'

const useStyles = style

const addProductTableTitles = {
  titles: [
    {
      title: 'Price',
      newId: '',
      isNewItem: false
    },
    {
      title: 'Product code',
      newId: '',
      isNewItem: false
    },
    {
      title: 'Templates',
      newId: '',
      isNewItem: false
    },
    {
      title: 'Actions',
      newId: '',
      isNewItem: false
    },
    {
      title: '',
      newId: '',
      isNewItem: false
    }
  ],
  body: [
    {
      uuid: uuidv4(),
      tableCell: [
        { uuid: uuidv4(), title: 'Price', type: 'TEXT', newId: '', isNewItem: false, value: '' },
        {
          uuid: uuidv4(),
          title: 'Product code',
          type: 'TEXT',
          newId: '',
          isNewItem: false,
          value: ''
        },
        {
          uuid: uuidv4(),
          title: 'Templates',
          type: 'UPLOADER',
          newId: '',
          isNewItem: false
        },
        {
          uuid: uuidv4(),
          title: 'Actions',
          type: 'ICON',
          newId: '',
          isNewItem: false,
          isDeletable: false
        },
        { uuid: uuidv4(), title: '', type: 'SAVE', newId: '', value: 'Save', isNewItem: false }
      ]
    }
  ]
}

let AddProduct = ({
  title,
  description,
  fabric,
  construction,
  careInstructions,
  process,
  category,
  subcategory,
  features,
  productVariants,
  productionDuration,
  getAllCategory,
  getAllMaterials,
  getAllVariableType,
  createProduct,
  updateProduct,
  getProductDetail,
  productDetails,
  changeFieldValue,
  updateField,
  uploadProductImage,
  uploadProductVariant,
  updateProductVariant,
  deleteProductImage,
  deleteProduct,
  categories
}) => {
  const classes = useStyles()
  const router = useRouter()
  const [toggleModal, setToggleModal] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subCategoryOptions, setSubCategoryOptions] = useState([])
  const [fabricOptions, setFabricOptions] = useState([])
  const [variantOptions, setVariantOptions] = useState([])
  const [loader, setLoader] = useState(true)
  const [uploadedImage, setUploadedImages] = useState([])
  const [sizeChart, setSizeChart] = useState([])
  const [tableDetails, setTableDetails] = useState(addProductTableTitles)
  const [productGuid, setProductGuid] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [saveLoader, setSaveLoader] = useState(false)
  const [selectedValues, setSelectedValues] = useState({
    fabric: '',
    category: [],
    subcategory: [],
    productVariants: []
  })
  const [isCategoryChanged, setIsCategoryChanged] = useState(false)
  const [isMultipleSubcats, setIsMultipleSubcats] = useState(false)
  const [saveBasicInfoModal, setSaveBasicInfoModal] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(async () => {
    const res = await getAllCategory()
    const allMaterialres = await getAllMaterials({
      searchKey: ''
    })
    const allVariableTypes = await getAllVariableType()
    if (
      res?.statusCode >= 200 &&
      res?.statusCode <= 300 &&
      res?.response &&
      allMaterialres?.statusCode >= 200 &&
      allMaterialres?.statusCode <= 300 &&
      allMaterialres?.response &&
      allVariableTypes?.statusCode >= 200 &&
      allVariableTypes?.statusCode <= 300 &&
      allVariableTypes?.response
    ) {
      const {
        response: { categories }
      } = res
      const categoryOptions = categories?.map(({ id, name, subCategories }) => {
        return {
          value: id,
          label: name,
          subCategories
        }
      })
      setCategoryOptions(categoryOptions)

      const fabricOptions = allMaterialres?.response?.map(({ materialId, materialName }) => {
        return {
          value: materialId,
          label: materialName
        }
      })

      setFabricOptions(fabricOptions)
      const variantOptions = allVariableTypes?.response?.map(({ id, typeName }) => {
        return { value: id, label: typeName }
      })
      setVariantOptions(variantOptions)
      setLoader(false)
    }

    if (
      (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) ||
      (allMaterialres?.StatusCode >= 400 &&
        allMaterialres?.StatusCode <= 500 &&
        allMaterialres?.StatusCode !== 401) ||
      (allVariableTypes?.StatusCode >= 400 &&
        allVariableTypes?.StatusCode <= 500 &&
        allVariableTypes?.StatusCode !== 401)
    ) {
      setLoader(false)
      NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
    }
  }, [])

  useEffect(() => {
    if (category && category !== undefined) {
      const selectedParentCategory = categoryOptions?.filter((item) =>
        category.includes(item.value)
      )

      let subCategoryOptions = []
      selectedParentCategory.forEach((ele) => {
        ele.subCategories.map(({ id, name }) => {
          subCategoryOptions.push({
            value: id,
            label: name
          })
        })
      })
      setSubCategoryOptions(subCategoryOptions)
      if (category.length === 0) {
        changeFieldValue('AddProduct', 'subcategory', [])
        setSelectedValues({
          ...selectedValues,
          category: selectedParentCategory.map((cat) => cat.value),
          subcategory: []
        })
      } else {
        if (subcategory && subCategoryOptions.length) {
          let selectedCat = subCategoryOptions
            .filter((val) => subcategory.includes(val.value))
            .map((ele) => ele.value)

          subCategoryOptions
            .filter((val) => subcategory.includes(val.value))
            .map((ele) => ele.value)
          changeFieldValue('AddProduct', 'subcategory', selectedCat)
          setSelectedValues({
            ...selectedValues,
            category: selectedParentCategory.map((cat) => cat.value),
            subcategory: selectedCat
          })
        }
      }
    }
  }, [categoryOptions, category])

  useEffect(async () => {
    const {
      query: { id }
    } = router
    if (id) {
      setProductGuid(id)
      setLoader(true)
      const res = await getProductDetail(id)
      if (
        (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res?.hasError) &&
        res?.StatusCode !== 401
      ) {
        setLoader(false)
        NotificationManager.error(
          res?.Response?.Message
            ? res?.Response?.Message
            : 'Something went wrong, please refresh the page',
          '',
          10000
        )
      }
    } else {
      setProductGuid(false)
    }
  }, [router?.query])

  useEffect(() => {
    if (
      productDetails?.statusCode >= 200 &&
      productDetails?.statusCode <= 300 &&
      productDetails?.response
    ) {
      if (variantOptions.length) {
        const { response } = productDetails
        const { productVarients, productImages, productVariableTypes, sizeChart } = response
        setProductGuid(response.guid)
        const variants = response?.productVariableTypes?.map(({ variableTypeId }) => variableTypeId)
        const subCats = response?.productCategories?.map(({ categoryId }) => categoryId)
        let categoryListSelected = []
        categoryOptions.forEach((ele) => {
          const selectedSubCat = ele.subCategories.filter((subcat) => subCats.includes(subcat.id))
          if (selectedSubCat.length) {
            categoryListSelected.push(ele.value)
          }
        })
        setSelectedValues({
          ...selectedValues,
          subcategory: subCats,
          productVariants: variants,
          fabric: response.materialId,
          category: categoryListSelected
        })
        setIsRendered(!isRendered)
        changeFieldValue('AddProduct', 'title', response.title)
        changeFieldValue('AddProduct', 'description', response.longDescription)
        changeFieldValue('AddProduct', 'construction', response.construction)
        changeFieldValue('AddProduct', 'process', response.process)
        changeFieldValue('AddProduct', 'category', categoryListSelected)
        changeFieldValue('AddProduct', 'fabric', response.materialId)
        changeFieldValue('AddProduct', 'subcategory', subCats)
        changeFieldValue('AddProduct', 'features', response.features)
        changeFieldValue('AddProduct', 'productionDuration', response.productionDuration)
        changeFieldValue('AddProduct', 'careInstructions', response.careInstructions)
        changeFieldValue('AddProduct', 'productVariants', variants)
        if (subCats.length > 1) {
          setIsMultipleSubcats(true)
        } else {
          setIsMultipleSubcats(false)
        }
        if (sizeChart?.imageUrl) {
          setSizeChart([
            {
              imageId: sizeChart.id,
              uuid: uuidv4(),
              name: sizeChart.fileName,
              icon: 'delete',
              size: '',
              imagePath: sizeChart.imageUrl,
              base64: '',
              isUploading: false
            }
          ])
        } else {
          setSizeChart([])
        }
        if (productImages?.length >= 0) {
          const uploadedImg = productImages?.map((item) => {
            return {
              imageId: item.id,
              uuid: uuidv4(),
              name: item.fileName,
              icon: 'delete',
              size: '',
              imagePath: item.thumbnailPath,
              base64: '',
              isUploading: false
            }
          })
          setUploadedImages(uploadedImg)
        }
        if (productVarients?.length) {
          const savedRows = [
            ...productVarients.map((variant) => {
              return {
                uuid: variant.guid,
                tableCell: [
                  ...variant.varientOptions.map(
                    ({ variableOptionValue, variableTypeName, variableTypeId }) => {
                      return {
                        uuid: uuidv4(),
                        title: variableTypeName,
                        type: 'TEXT',
                        newId: variableTypeId,
                        isNewItem: true,
                        value: variableOptionValue,
                        isDisabled: true
                      }
                    }
                  ),
                  ...addProductTableTitles['body'][0]['tableCell'].map((items) => {
                    if (items.type === 'UPLOADER') {
                      return {
                        ...items,
                        uuid: uuidv4(),
                        value: '',
                        templateFiles: [
                          ...variant.productVarientTemplates.map(
                            ({ fileName, fileUrl, imageType, templateId }) => {
                              return {
                                rowId: variant.guid,
                                uuid: uuidv4(),
                                templateId,
                                name: fileName,
                                icon: ['file_download', 'pop-close'],
                                templateFormat:
                                  imageType === 1
                                    ? 'application/pdf'
                                    : imageType === 3
                                    ? 'application/postscript'
                                    : 'application/psd',
                                templateType: imageType,
                                size: '',
                                imagePath: fileUrl,
                                base64: ''
                              }
                            }
                          )
                        ]
                      }
                    }
                    if (items.title === 'Price') {
                      return {
                        ...items,
                        uuid: uuidv4(),
                        value: Number(variant.price).toFixed(2)
                      }
                    }
                    if (items.title === 'Product code') {
                      return {
                        ...items,
                        uuid: uuidv4(),
                        value: variant.productCode
                      }
                    }
                    if (items.type === 'SAVE') {
                      return {
                        ...items,
                        uuid: uuidv4(),
                        value: 'Update'
                      }
                    }
                    if (items.title === 'Actions' && items.type === 'ICON') {
                      return {
                        ...items,
                        uuid: uuidv4(),
                        isDeletable: true
                      }
                    }
                    return {
                      ...items,
                      uuid: uuidv4()
                    }
                  })
                ]
              }
            }),
            {
              uuid: uuidv4(),
              tableCell: [
                ...productVarients[0].varientOptions.map(
                  ({ variableOptionValue, variableTypeName, variableTypeId }) => {
                    return {
                      uuid: uuidv4(),
                      title: variableTypeName,
                      type: 'TEXT',
                      newId: variableTypeId,
                      isNewItem: true,
                      value: ''
                    }
                  }
                ),
                ...addProductTableTitles['body'][0]['tableCell'].map((items) => {
                  if (items.type === 'UPLOADER') {
                    return {
                      ...items,
                      uuid: uuidv4(),
                      value: '',
                      templateFiles: []
                    }
                  }
                  if (items.type === 'SAVE') {
                    return {
                      ...items,
                      uuid: uuidv4(),
                      value: 'Save'
                    }
                  }
                  return {
                    ...items,
                    uuid: uuidv4(),
                    value: ''
                  }
                })
              ]
            }
          ]
          const addedRows = {
            titles: [
              ...productVarients[0].varientOptions.map(
                ({ variableOptionValue, variableTypeName, variableTypeId }) => {
                  return {
                    title: variableTypeName,
                    newId: variableTypeId,
                    isNewItem: true
                  }
                }
              ),
              ...addProductTableTitles['titles']
            ],
            body: [...savedRows]
          }
          setTableDetails(addedRows)
        } else {
          const oldRow = [
            {
              uuid: uuidv4(),
              tableCell: [
                ...productVariableTypes.map(({ variableTypeId }) => {
                  return {
                    uuid: uuidv4(),
                    title: variantOptions?.filter(({ value }) => value === variableTypeId)[0]
                      ?.label,
                    type: 'TEXT',
                    newId: variantOptions?.filter(({ value }) => value === variableTypeId)[0]
                      ?.value,
                    isNewItem: true,
                    value: ''
                  }
                }),
                ...addProductTableTitles['body'][0]['tableCell'].map((items) => {
                  if (items.type === 'UPLOADER') {
                    return {
                      ...items,
                      uuid: uuidv4(),
                      value: '',
                      templateFiles: []
                    }
                  }
                  if (items.type === 'SAVE') {
                    return {
                      ...items,
                      uuid: uuidv4(),
                      value: 'Save'
                    }
                  }
                  return {
                    ...items,
                    uuid: uuidv4(),
                    value: ''
                  }
                })
              ]
            }
          ]
          const addedRows = {
            titles: [
              ...productVariableTypes?.map(({ variableTypeId }) => {
                return {
                  title: variantOptions?.filter(({ value }) => value === variableTypeId)[0]?.label,
                  newId: variableTypeId,
                  isNewItem: true
                }
              }),
              ...addProductTableTitles['titles']
            ],
            body: [...oldRow]
          }
          setTableDetails(addedRows)
        }
        setLoader(false)
      }
    }
  }, [productDetails, variantOptions])

  const isCategoryUpdated = () => {
    if (category && category !== undefined) {
      const selectedParentCategory = categoryOptions?.filter((item) =>
        category.includes(item.value)
      )
      const subCategoryOptions = []
      selectedParentCategory.forEach((ele) => {
        ele.subCategories.map(({ id, name }) => {
          subCategoryOptions.push({
            value: id,
            label: name
          })
        })
      })
      setSubCategoryOptions(subCategoryOptions)
    }
    if (category && category !== undefined) {
      setIsCategoryChanged(!isCategoryChanged)
    }
  }
  const handleModalClose = () => {
    setToggleModal(false)
  }

  const setImageListCB = (items) => {
    setUploadedImages(items)
  }
  const setSizeChartCB = (items) => {
    setSizeChart(items)
  }
  const tableValuesCB = (event, column, row) => {
    const {
      target: { value }
    } = event

    const tableValue = [
      ...tableDetails['body'].map((tableRow) => {
        if (tableRow.uuid === row.uuid) {
          return {
            ...tableRow,
            tableCell: tableRow['tableCell'].map((item) => {
              if (item.uuid === column.uuid) {
                return {
                  ...item,
                  value
                }
              }
              return item
            })
          }
        }
        return tableRow
      })
    ]
    setTableDetails({ titles: tableDetails['titles'], body: tableValue })
  }

  const templateUploader = (file) => {
    const tableFiles = [
      ...tableDetails['body'].map((tableRow) => {
        if (tableRow.uuid === file.rowId) {
          return {
            ...tableRow,
            tableCell: tableRow['tableCell'].map((item) => {
              if (item.type === 'UPLOADER') {
                return {
                  ...item,
                  templateFiles: item?.templateFiles?.length
                    ? [...item.templateFiles, file]
                    : [file]
                }
              }
              return item
            })
          }
        }
        return tableRow
      })
    ]

    const currentRow = tableDetails['body'].filter((rowItem) => rowItem.uuid === file.rowId)[0][
      'tableCell'
    ]

    NotificationManager.success(
      currentRow[currentRow.length - 1].value === 'Save'
        ? 'Template added'
        : 'Template added.  Please click update to save changes.',
      '',
      3000
    )
    setTableDetails({ titles: tableDetails['titles'], body: tableFiles })
  }

  // const imageOrderCB = (orderedImageList) => {
  //   setUploadedImages(orderedImageList)
  // }

  const handleSaveBasicInfoModal = () => {
    setSaveBasicInfoModal(!saveBasicInfoModal)
  }

  const saveCreateProductBasicInfo = async () => {
    const includedCatList = categoryOptions.filter((ele) => category.includes(ele.value))
    let includedCategoryList = []
    includedCatList.forEach((val) => {
      const event = (element) => subcategory.includes(element.id)
      if (val.subCategories.some(event)) {
        includedCategoryList.push(val.value)
      }
    })
    if (category.length === includedCategoryList.length) {
      setSaveLoader(true)
      setSaveBasicInfoModal(false)
      let createProductRes
      let data = {
        title,
        categoryIds: [...subcategory],
        longDescription: description,
        careInstructions,
        status: 1,
        productionDuration: '',
        productVariableTypes: productVariants && [
          ...productVariants?.map((variants) => {
            return {
              variableTypeId: variants
            }
          })
        ],
        materialId: fabric,
        process,
        construction,
        features,
        productionDuration
      }
      if (!productGuid) {
        createProductRes = await createProduct(data)
      } else {
        data = {
          ...data,
          guid: productGuid
        }
        delete data?.productVariableTypes
        const existingData = {
          ...productDetails?.response,
          categoryIds: [
            ...productDetails?.response?.productCategories?.map(({ categoryId }) => categoryId)
          ]
        }
        delete existingData?.materialName
        delete existingData?.parentCategoryId
        delete existingData?.parentCategoryName
        delete existingData?.productImages
        delete existingData?.productVariableTypes
        delete existingData?.productVarients
        delete existingData?.sizeChart
        delete existingData?.productCategories
        delete existingData?.shortDescription
        const isOldDataSame =
          Object.entries(data).sort().toString() === Object.entries(existingData).sort().toString()
        if (!isOldDataSame) {
          createProductRes = await updateProduct(data)
        } else {
          NotificationManager.warning(`Nothing to update`, '', 2000)
          setSaveLoader(false)
        }
      }
      if (
        (createProductRes?.StatusCode >= 400 ||
          createProductRes?.StatusCode === 12002 ||
          createProductRes?.hasError) &&
        createProductRes?.StatusCode !== 401
      ) {
        NotificationManager.error(
          createProductRes?.Response?.Message
            ? createProductRes?.Response?.Message
            : 'Something went wrong, please refresh the page',
          '',
          10000
        )
        setSaveLoader(false)
      }
      if (createProductRes?.statusCode >= 200 && createProductRes?.statusCode <= 300) {
        NotificationManager.success(
          `${!productGuid ? 'Product info saved' : 'Product updated'}`,
          '',
          2000
        )
        router.push({
          pathname: '/admin/addProduct',
          query: {
            id: createProductRes?.response?.productGuid || productGuid,
            categoryId: categories?.find((val) => val?.id === category)?.guid,
            productList: router.query.productList,
            redirectAfterCreate: true
          }
        })
        setSaveLoader(false)
        const res = await getProductDetail(
          !productGuid ? createProductRes?.response?.productGuid : productGuid
        )
        if (
          (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res?.hasError) &&
          res?.StatusCode !== 401
        ) {
          NotificationManager.error(
            res?.Response?.Message
              ? res?.Response?.Message
              : 'Something went wrong, please refresh the page',
            '',
            10000
          )
        }
      }
    } else {
      setSaveBasicInfoModal(false)
      NotificationManager.warning(
        'Subcategories related to one or more categories have not been selected',
        '',
        4000
      )
    }
  }

  const uploadProductImageCB = async (item, lastImageNum, isSizeChart) => {
    let data
    if (isSizeChart) {
      data = {
        productGuid: productGuid,
        imageType: 3,
        image: {
          fileName: item.name,
          fileData: item.base64
        },
        displayOrder: lastImageNum + 1
      }
    } else {
      data = {
        productGuid: productGuid,
        imageType: 1,
        image: {
          fileName: item.name,
          fileData: item.base64
        },
        displayOrder: lastImageNum + 1
      }
    }
    if (data) {
      const res = await uploadProductImage(data)
      if (
        (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res?.hasError) &&
        res?.StatusCode !== 401
      ) {
        NotificationManager.error(
          res?.Response?.Message
            ? res?.Response?.Message
            : 'Something went wrong, please refresh the page',
          '',
          10000
        )
      }
      if (res?.statusCode >= 200 && res?.statusCode <= 300) {
        const res = await getProductDetail(productGuid)
        NotificationManager.success(
          isSizeChart ? 'Size chart image is uploaded' : 'Product image is uploaded',
          '',
          5000
        )
        if (
          (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res?.hasError) &&
          res?.StatusCode !== 401
        ) {
          NotificationManager.error(
            res?.Response?.Message
              ? res?.Response?.Message
              : 'Something went wrong, please refresh the page',
            '',
            10000
          )
        }
      }
    }
  }

  const saveRowData = async (data, action) => {
    let productVarResponse
    const productCode = data['tableCell']
      .filter((filteredItem) => filteredItem.title === 'Product code')[0]
      .value?.trim()
    const prodVariant = productDetails?.response?.productVarients.filter(
      (itm) => itm?.productCode === productCode
    )
    let productVariantTable = {
      productGuid: productGuid,
      productCode: productCode,
      price: data['tableCell'].filter((filteredItem) => filteredItem.title === 'Price')[0].value,
      msrp: prodVariant[0] && prodVariant[0]?.msrp,
      designPanels: prodVariant[0] && prodVariant[0]?.designPanels,
      varientOptions: [
        ...data['tableCell']
          ?.filter((item) => item.isNewItem)
          .map((filteredItem) => {
            return {
              variableTypeId: filteredItem.newId,
              variableTypeName: filteredItem.title,
              variableOptionValue: filteredItem.value?.trim()
            }
          })
      ],
      productVarientTemplates: [
        ...data['tableCell']
          ?.filter((item) => item.type === 'UPLOADER')[0]
          .templateFiles.map((template) => {
            return {
              productTemplateId: 0,
              productTemplate: {
                fileName: template.name,
                fileData: template.base64
              },
              templateType: template.templateType
            }
          })
      ]
    }
    if (action === 'Save') {
      setLoader(true)
      productVarResponse = await uploadProductVariant(productVariantTable)
    } else {
      delete productVariantTable.productGuid
      delete productVariantTable.varientOptions
      productVariantTable = {
        ...productVariantTable,
        productVariantGuid: data?.uuid,
        productVarientTemplates: [
          ...data['tableCell']
            ?.filter((item) => item.type === 'UPLOADER')[0]
            .templateFiles.map((template) => {
              return {
                productTemplateId: template.base64 ? 0 : template.templateId,
                productTemplate: {
                  fileName: template.name,
                  fileData: template.base64 ? template.base64 : null
                },
                templateType: template.templateType
              }
            })
        ]
      }
      let existingData = productDetails?.response?.productVarients?.filter(
        (temp) => temp.guid === data?.uuid
      )[0]
      existingData = {
        ...existingData,
        productVariantGuid: existingData.guid,
        price: Number(existingData.price).toFixed(2)
      }
      delete existingData.id
      delete existingData.productId
      delete existingData.productVarientImages
      delete existingData.varientOptions
      delete existingData.guid
      delete existingData.designerAvailable
      delete existingData.dpi
      const isOldDataSame =
        Object.entries(productVariantTable).sort().toString() ===
        Object.entries(existingData).sort().toString()
      const isNewTempAdded = productVariantTable?.productVarientTemplates?.filter((temps) => {
        const {
          productTemplate: { fileData }
        } = temps
        return fileData && fileData !== ''
      })
      if (!isOldDataSame || isNewTempAdded?.length) {
        setLoader(true)
        productVarResponse = await updateProductVariant(productVariantTable)
      } else {
        NotificationManager.warning('Nothing to update', '', 2000)
      }
    }
    if (
      (productVarResponse?.StatusCode >= 400 ||
        productVarResponse?.StatusCode === 12002 ||
        productVarResponse?.hasError) &&
      productVarResponse?.StatusCode !== 401
    ) {
      setLoader(false)
      NotificationManager.error(
        productVarResponse?.Response?.Message
          ? productVarResponse?.Response?.Message
          : 'Something went wrong, please refresh the page',
        '',
        10000
      )
    }
    if (productVarResponse?.statusCode >= 200 && productVarResponse?.statusCode <= 300) {
      NotificationManager.success(
        `${action === 'Save' ? 'Product variant added' : 'Updated product variant'}`,
        '',
        2000
      )
      const res = await getProductDetail(productGuid)
      if (
        (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res?.hasError) &&
        res?.StatusCode !== 401
      ) {
        NotificationManager.error(
          res?.Response?.Message
            ? res?.Response?.Message
            : 'Something went wrong, please refresh the page',
          '',
          10000
        )
      }
    }
  }

  const deleteUplodedImage = (item) => {
    setDeleteItem(item)
    setToggleModal(true)
  }
  const deleteRow = (deletedItem) => {
    setDeleteItem(deletedItem)
    setToggleModal(true)
  }

  const deleteFunc = async () => {
    setDeleteLoader(true)
    let deletedItemRes
    if (deleteItem.imageId) {
      deletedItemRes = await deleteProductImage(deleteItem.imageId)
    } else {
      const data = {
        productGuid,
        variantGuids: [deleteItem?.uuid]
      }
      deletedItemRes = await deleteProduct(data)
    }
    if (
      (deletedItemRes?.StatusCode >= 400 ||
        deletedItemRes?.StatusCode === 12002 ||
        deletedItemRes?.hasError) &&
      deletedItemRes?.StatusCode !== 401
    ) {
      setToggleModal(false)
      setDeleteItem({})
      NotificationManager.error(
        deletedItemRes?.Response?.Message
          ? deletedItemRes?.Response?.Message
          : 'Something went wrong, please refresh the page',
        '',
        10000
      )
      setDeleteLoader(false)
    }
    if (deletedItemRes?.statusCode >= 200 && deletedItemRes?.statusCode <= 300) {
      setToggleModal(false)
      setDeleteItem({})
      NotificationManager.success(
        `${deleteItem.imageId ? 'Image deleted' : 'Product variant deleted'}`,
        '',
        2000
      )
      const res = await getProductDetail(productGuid)
      if (
        (res?.StatusCode >= 400 || res?.StatusCode === 12002 || res?.hasError) &&
        res?.StatusCode !== 401
      ) {
        NotificationManager.error(
          res?.Response?.Message
            ? res?.Response?.Message
            : 'Something went wrong, please refresh the page',
          '',
          10000
        )
      }
      setDeleteLoader(false)
    }
  }

  const removeTemplate = (template, column, row) => {
    const newRowData = tableDetails['body'].map((rowItem) => {
      if (rowItem.uuid === row.uuid) {
        return {
          ...rowItem,
          tableCell: rowItem['tableCell'].map((columnItem) => {
            if (columnItem.uuid === column.uuid) {
              return {
                ...columnItem,
                templateFiles: columnItem.templateFiles.filter(
                  (templateItem) => templateItem.uuid !== template.uuid
                )
              }
            }
            return columnItem
          })
        }
      }
      return rowItem
    })
    if (column?.templateFiles?.length === 1) {
      NotificationManager.success(
        'Template deleted. Please add a new template to proceed.',
        '',
        3000
      )
    } else {
      NotificationManager.success(
        row['tableCell'][row['tableCell'].length - 1].value === 'Save'
          ? 'Template deleted.'
          : 'Template deleted. Please click update to save changes.',
        '',
        3000
      )
    }
    setTableDetails({ titles: tableDetails['titles'], body: newRowData })
  }

  useEffect(() => {
    if (router.query.categoryId && router?.query.productList && !router.query.id) {
      const id = categories?.find((val) => val.guid === router.query.categoryId)?.id
      const selectedParentCategory = categories?.find((val) => val.guid === router.query.categoryId)
      const subCategoryOptions = selectedParentCategory?.subCategories.map(({ id, name }) => {
        return {
          value: id,
          label: name
        }
      })

      setSubCategoryOptions(subCategoryOptions)
      changeFieldValue('AddProduct', 'category', [id])
      changeFieldValue('AddProduct', 'subcategory', [
        categories
          ?.find((val) => val.guid === router.query.categoryId)
          ?.subCategories?.find((val) => val?.guid === router.query.productList)?.id
      ])

      setSelectedValues({
        ...selectedValues,
        subcategory: [
          categories
            ?.find((val) => val.guid === router.query.categoryId)
            ?.subCategories?.find((val) => val?.guid === router.query.productList)?.id
        ],
        category: [categories?.find((val) => val.guid === router.query.categoryId)?.id]
      })
    }
  }, [])

  useEffect(() => {
    return () => {
      updateField('product_details', null)
    }
  }, [])

  return (
    <Layout activateHide>
      {loader && <Loader />}
      <div className={classes.bgAddProduct}>
        {checkIfEmpty(router.query.id) && (
          <>
            <Typography variant='h3' className={classes.productTitle}>
              Add product
            </Typography>
            <BreadCrumb
              routes={[
                { name: 'Catalog', link: '/admin/catalogList' },
                Object.keys(router.query).length && {
                  name: categories?.find((val) => val.guid === router.query.categoryId)?.name,
                  link: `/admin/catalogList/${
                    categories?.find((val) => val.guid === router.query.categoryId)?.guid
                  }`
                },
                Object.keys(router.query).length && {
                  name: categories
                    ?.find((val) => val.guid === router.query.categoryId)
                    ?.subCategories?.find((val) => val?.guid === router.query.productList)?.name,
                  link: `/admin/catalogList/subcatalog/${router.query.productList}?categoryId=${router.query.categoryId}`
                }
              ]}
            />
          </>
        )}
        {!checkIfEmpty(router.query.id) && (
          <>
            <Typography variant='h3' className={classes.productTitle}>
              Edit product
            </Typography>

            <BreadCrumb
              routes={[
                { name: 'Catalog', link: '/admin/catalogList' },
                Object.keys(router.query).length && {
                  name: categories?.find((val) => val.guid === router.query.categoryId)?.name,
                  link: `/admin/catalogList/${
                    categories?.find((val) => val.guid === router.query.categoryId)?.guid
                  }`
                },
                !isMultipleSubcats &&
                  Object.keys(router.query).length && {
                    name: categories
                      ?.find((val) => val.guid === router.query.categoryId)
                      ?.subCategories?.find(
                        (val) =>
                          selectedValues['subcategory']?.length &&
                          val?.id === selectedValues['subcategory'][0]
                      )?.name,
                    link: `/admin/catalogList/subcatalog/${
                      categories
                        ?.find((val) => val.guid === router.query.categoryId)
                        ?.subCategories?.find(
                          (val) => subcategory?.length && val?.id === subcategory[0]
                        )?.guid
                    }?categoryId=${router.query.categoryId}`
                  },
                !isMultipleSubcats && Object.keys(router.query).length && { name: title }
              ]}
            />
          </>
        )}
        <form name='AddProduct'>
          <Grid
            container
            spacing={3}
            direction='row'
            className={classes.root}
            style={{ marginBottom: 100 }}
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Grid container spacing={3}>
                {ADD_PRODUCT?.map((field, i) => (
                  <Grid
                    item
                    {...field.size}
                    key={i}
                    className={field?.type === 'multiText' ? classes.gridSpace : ''}
                  >
                    <Field
                      {...field}
                      label={field?.label}
                      id={field?.name}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      type={field?.type || 'text'}
                      component={field?.type === 'select' ? Select : TextInput}
                      options={
                        field?.type === 'select' && field?.name === 'fabric' && fabricOptions
                      }
                      isRendered={isRendered}
                      selectedValue={field?.type === 'select' && selectedValues[field.name]}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Grid container spacing={3}>
                {ADD_PRODUCT2?.map((field, i) => (
                  <Grid item {...field.size} key={i}>
                    <Field
                      {...field}
                      label={field?.label}
                      id={field?.name}
                      placeholder={field?.placeholder}
                      name={field?.name}
                      type={field?.type || 'text'}
                      isCategoryUpdated={isCategoryUpdated}
                      component={
                        field?.type === 'select' &&
                        field.name !== 'subcategory' &&
                        field.name !== 'category'
                          ? Select
                          : field?.type === 'select' &&
                            (field.name === 'subcategory' || field.name === 'category')
                          ? MultiSelect
                          : TextInput
                      }
                      options={
                        field?.type === 'select' && field.name === 'category'
                          ? categoryOptions
                          : field?.type === 'select' &&
                            field.name === 'subcategory' &&
                            subCategoryOptions?.length
                          ? subCategoryOptions
                          : field?.type === 'select' && field?.name === 'fabric'
                          ? fabricOptions
                          : [{ value: 1, label: 'Please select category' }]
                      }
                      selectedValue={field?.type === 'select' && selectedValues[field.name]}
                      selectedMultipleValue={
                        (field.name === 'subcategory' || field.name === 'category') &&
                        selectedValues[field.name]
                      }
                      isCategoryChanged={isCategoryChanged}
                      isRendered={isRendered}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.multiVariant}>
                <div className={classes.variantSelect}>
                  <Field
                    label={'Product variants'}
                    id={'variant'}
                    placeholder={'Select product variants'}
                    name={'productVariants'}
                    type={'select'}
                    component={MultiSelect}
                    options={variantOptions}
                    selectedMultipleValue={productVariants}
                    isDisabled={productGuid ? true : false}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
        <div className={classes.btnTabSave}>
          <Button
            className={classes.btnCancel}
            style={{ width: '10%', marginRight: '10px' }}
            onClick={() =>
              isActiveInternet(
                router,
                `/admin/catalogList/subcatalog/${router.query.productList}?categoryId=${router.query.categoryId}`
              )
            }
          >
            Cancel
          </Button>
          <Button
            disabled={!(title && subcategory?.length && fabric && description) || saveLoader}
            type='submit'
            variant='contained'
            className={classes.saveBtn}
            onClick={productGuid ? saveCreateProductBasicInfo : handleSaveBasicInfoModal}
          >
            Save
            {saveLoader && (
              <CircularProgress
                style={{ marginLeft: 8 }}
                size={18}
                className={classes.LoaderSession}
              />
            )}
          </Button>
        </div>
        {productGuid && (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginBottom: 20 }}>
            <Typography variant='body2' className={classes.productTitle}>
              {sizeChart?.length ? 'Size chart' : 'Add size chart'}
            </Typography>
            <ImageUpload
              deleteImageCB={deleteUplodedImage}
              imageList={sizeChart}
              setImageListCB={setSizeChartCB}
              // setNewOrderedItems={imageOrderCB}
              uploadProductImageCB={uploadProductImageCB}
              isDragDropable={false}
              isSizeChart={true}
            />
          </Grid>
        )}
        {productGuid && (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ marginBottom: 20 }}>
            <Typography variant='body2' className={classes.productTitle}>
              Add product images
            </Typography>
            <ImageUpload
              deleteImageCB={deleteUplodedImage}
              imageList={uploadedImage}
              setImageListCB={setImageListCB}
              // setNewOrderedItems={imageOrderCB}
              uploadProductImageCB={uploadProductImageCB}
              isDragDropable={false}
            />
          </Grid>
        )}
        {/* <!--table--> */}
        {productGuid && (
          <div className={classes.productTabList}>
            <TableList
              tableDetails={tableDetails}
              tabClassName={classes.tabActionAlign}
              tabHeadClassName={classes.tabHeadAlign}
              deleteRow={deleteRow}
              tableValuesCB={tableValuesCB}
              templateUploaderCB={templateUploader}
              saveRowDataCB={saveRowData}
              removeTemplate={removeTemplate}
            />
          </div>
        )}
        {/* <!--table--> */}
      </div>

      {/* <!--delete Modal--> */}
      <Modal open={toggleModal} handleClose={handleModalClose}>
        <div className={classes.deleteModal}>
          <div>
            <Image src={AlertImg} alt='Delete' height={101} width={101} />
          </div>
          <div>
            <Typography variant='h3' className={classes.modalTitle}>
              Are you sure you want to delete
              <br /> this {deleteItem.imageId ? 'image' : 'variant'}
            </Typography>
          </div>
        </div>
        <div className={classes.btnActions}>
          <Button className={classes.btnCancel} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            disabled={deleteLoader}
            className={classes.btnDelete}
            variant='contained'
            onClick={deleteFunc}
          >
            Delete
            {deleteLoader && (
              <CircularProgress
                style={{ marginLeft: 8 }}
                size={18}
                className={classes.LoaderSession}
              />
            )}
          </Button>
        </div>
      </Modal>
      {/* <!--delete Modal--> */}

      {/* <!--Basic info save Modal--> */}
      <Modal open={saveBasicInfoModal} handleClose={handleSaveBasicInfoModal}>
        <div className={classes.deleteModal}>
          <div>
            <Image src={AlertImg} alt='Delete' height={101} width={101} />
          </div>
          <div>
            <Typography variant='h3' className={classes.modalTitle}>
              Product variants cannot be changed once the product is saved. Are you sure you want to
              continue?
            </Typography>
          </div>
        </div>
        <div className={classes.btnActions}>
          <Button className={classes.btnCancel} onClick={handleSaveBasicInfoModal}>
            Cancel
          </Button>
          <Button
            // disabled={deleteLoader}
            // className={classes.btnDelete}
            variant='contained'
            onClick={saveCreateProductBasicInfo}
          >
            Continue
          </Button>
        </div>
      </Modal>
      {/* <!--Basic info save Modal--> */}
    </Layout>
  )
}
const mapStateToProps = (state) => ({
  productDetails: state.product.product_details,
  categories: state?.category?.category?.response?.categories
})

const mapDispatchToProps = {
  getAllCategory,
  getAllMaterials,
  getAllVariableType,
  createProduct,
  updateProduct,
  getProductDetail,
  changeFieldValue,
  updateField,
  uploadProductImage,
  uploadProductVariant,
  updateProductVariant,
  deleteProductImage,
  deleteProduct
}

const selector = formValueSelector('AddProduct') // <-- same as form name
AddProduct = connect((state) => {
  const title = selector(state, 'title')
  const description = selector(state, 'description')
  const fabric = selector(state, 'fabric')
  const construction = selector(state, 'construction')
  const careInstructions = selector(state, 'careInstructions')
  const process = selector(state, 'process')
  const category = selector(state, 'category')
  const subcategory = selector(state, 'subcategory')
  const features = selector(state, 'features')
  const productVariants = selector(state, 'productVariants')
  const productionDuration = selector(state, 'productionDuration')
  return {
    title,
    description,
    fabric,
    construction,
    careInstructions,
    process,
    category,
    subcategory,
    features,
    productVariants,
    productionDuration
  }
})(AddProduct)

export default reduxForm({
  form: 'AddProduct'
})(connect(mapStateToProps, mapDispatchToProps)(AddProduct))
