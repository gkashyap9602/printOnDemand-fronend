import React, { useEffect, useState } from 'react'
import { Box, Typography, InputBase } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import Apparel from './apparel'
import Material from './material'
import style from './style'
import { getAllCategory, getAllMaterials } from 'redux/actions/categoryActions'
import SearchArea from 'components/searchArea'
import { connect } from 'react-redux'
import { checkIfEmpty } from 'utils/helpers'
import { useRouter } from 'next/router'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

const useStyles = style
const ProductFilter = ({
  getAllCategory,
  getAllMaterials,
  apiCall,
  material,
  categories,
  handleSearch,
  showCategory = true,
  filterClose,
  prevQuery = {}
}) => {
  const route = useRouter()
  const classes = useStyles()
  const [materialId, setmaterialId] = useState([])
  const [categoryId, setcategoryId] = useState([])
  const [materialData, setmaterialData] = useState([])
  const [categoryData, setcategoryData] = useState([])

  /**
   * Get all category and material from backend
   */
  useEffect(async () => {
    // getAllCategory()
    if (prevQuery?.materialIds) {
      setmaterialId(prevQuery?.materialIds)
    }
    const res = await getAllMaterials({ searchKey: '', categoryGuid: route.query.subcategory })
    if (res) {
      prevQuery?.materialIds
        ? setmaterialData(
            res.response?.map((val) =>
              prevQuery?.materialIds.includes(val?.materialId)
                ? { ...val, checked: true }
                : { ...val, checked: false }
            )
          )
        : setmaterialData(
            res.response?.map((val) => {
              return { ...val, checked: false }
            })
          )
    }
  }, [])

  /**
   * set the materials to usestate
   */
  // useEffect(() => {
  //   setmaterialData(material?.map((val) => ({ ...val, checked: false })))
  // }, [material])

  /**
   * Set the category to usestate
   */
  useEffect(() => {
    setcategoryData(
      categories?.map((value) => ({
        ...value,
        subCategories: value?.subCategories?.map((val) => ({ ...val, checked: false }))
      }))
    )
  }, [categories])

  /**
   * Category On change
   * @param {*} target
   * @param {*} id
   */
  const handlCategoryChange = (target, id) => {
    setcategoryData(
      categoryData?.map((value) => ({
        ...value,
        subCategories: value?.subCategories?.map((val) =>
          val.guid === id ? { ...val, checked: target.checked } : { ...val }
        )
      }))
    )
    if (target.checked) {
      setcategoryId([...categoryId, id])
      apiCall({ categoryFilter: [...categoryId, id, route.query.subcategory] })
    } else {
      setcategoryId(categoryId.filter((item) => item !== id))
      apiCall({
        categoryFilter: [...categoryId.filter((item) => item !== id), route.query.subcategory]
      })
    }
  }

  /**
   * Remove items from the filter
   * @param {*} itm
   */
  const handleRemove = (itm) => {
    if (itm === 'all') {
      setcategoryData(
        categories?.map((value) => ({
          ...value,
          subCategories: value?.subCategories?.map((val) => ({ ...val, checked: false }))
        }))
      )
      setmaterialData(material?.map((val) => ({ ...val, checked: false })))
      apiCall({
        materialFilter: null,
        materialIds: null,
        categoryFilter: [route?.query?.subcategory],
        pageIndex: 0,
        pageSize: 10
      })
      setcategoryId([])
      setmaterialId([])
    } else {
      setmaterialData(
        materialData?.map((val) =>
          val?.materialId === itm?.materialId ? { ...val, checked: false } : { ...val }
        )
      )
      setcategoryData(
        categoryData?.map((value) => ({
          ...value,
          subCategories: value?.subCategories?.map((val) =>
            val.guid === itm.guid ? { ...val, checked: false } : { ...val }
          )
        }))
      )
      setmaterialId(materialId.filter((item) => item !== itm?.materialId))
      setcategoryId(categoryId.filter((item) => item !== itm?.guid))
      apiCall({
        categoryFilter: [
          ...categoryId.filter((item) => item !== itm?.guid),
          route?.query?.subcategory
        ],
        materialFilter: materialId.filter((item) => item !== itm?.materialId),
        materialIds: materialId.filter((item) => item !== itm?.materialId)
      })
    }
  }

  /**
   * handle material on chaneg
   * @param {*} target
   * @param {*} id
   */
  const handlMaterialChange = (target, id) => {
    setmaterialData(
      materialData?.map((val) =>
        val?.materialId === id ? { ...val, checked: target.checked } : { ...val }
      )
    )
    if (target.checked) {
      setmaterialId([...materialId, id])
      apiCall({ materialFilter: [...materialId, id], materialIds: [...materialId, id] })
    } else {
      setmaterialId(materialId.filter((item) => item !== id))
      apiCall({
        materialFilter: materialId.filter((item) => item !== id),
        materialIds: materialId.filter((item) => item !== id)
      })
    }
  }
  return (
    <div>
      {/* <!--close btn--> */}
      <div className={classes.filterCloseIcon} onClick={filterClose}>
        <Icon icon='pop-close' size={22} color='#9A9AB0' />
      </div>
      {/* <!--close btn--> */}
      <div className={classes.filter_List}>
        <Box display='flex' width='100%'>
          <Box flexGrow={1} className={classes.filter_Head}>
            <Typography variant='h3'>Filter</Typography>
          </Box>
          <Box className={classes.filter_Count}>
            {checkIfEmpty(categoryId) && checkIfEmpty(materialId)
              ? 0
              : categoryId?.length + materialId.length}
          </Box>
        </Box>
        {/* <!--search bar--> */}
        {/* <!--search bar--> */}
        <div className={classes.clearWrap}>
          {categoryData?.map((value) =>
            value?.subCategories?.map((sub) =>
              categoryId?.includes(sub?.guid) ? (
                <div key={sub?.guid} className={classes.filters}>
                  <TooltipBootstrap title={sub?.name} placement='top'>
                    <span className={classes.spanName}>{sub?.name}</span>
                  </TooltipBootstrap>

                  <span className={classes.spanClass} onClick={() => handleRemove(sub)}>
                    x
                  </span>
                </div>
              ) : (
                <></>
              )
            )
          )}

          {materialData
            ?.filter((val) => materialId?.includes(val?.materialId))
            ?.map((value) => (
              <div key={value} className={classes.filters}>
                <TooltipBootstrap title={value?.materialName} placement='top'>
                  <span className={classes.spanName}>{value?.materialName}</span>
                </TooltipBootstrap>

                <span className={classes.spanClass} onClick={() => handleRemove(value)}>
                  x
                </span>
              </div>
            ))}
          {(!checkIfEmpty(materialId) || categoryId.length - 1 > 0) && (
            <div className={classes.clearFilter}>
              <Typography
                variant='h4'
                onClick={() => handleRemove('all')}
                className={classes.clearAll}
              >
                Clear All
              </Typography>
            </div>
          )}
        </div>
        <div className={classes.pdt_Scroll}>
          <div className={classes.pdtItem_Block}>
            <Material material={materialData} onMaterialChange={handlMaterialChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  categories: state?.category?.category?.response?.categories,
  material: state?.category?.material?.response
})

const mapDispatchToProps = {
  getAllCategory,
  getAllMaterials
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter)
