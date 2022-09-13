import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import CatalogBox from 'components/catalogBox'
import { connect } from 'react-redux'
import { getAllSubcategory } from 'redux/actions/categoryActions'
import { useRouter } from 'next/router'
import BreadCrumb from 'components/breadcrumb'
import { checkIfEmpty } from 'utils/helpers'
import Nodata from 'components/nodata'
import { style } from 'styles/productCatalogList'
import Loader from 'components/loader'
import { NotificationManager } from 'react-notifications'
import SearchArea from 'components/searchArea'
const useStyles = style

/**
 * Orders
 * @returns
 */
function SubCatalog({ getAllSubcategory, categories, parentCategoryInfo }) {
  const classes = useStyles()
  const route = useRouter()
  const [loader, setLoader] = useState(false)
  const [isHideBreadcrumb, setisHideBreadcrumb] = useState(false)

  /**
   * Calls api
   */

  useEffect(async () => {
    const {
      query: { isGlobalSearch }
    } = route

    if (isGlobalSearch) {
      setisHideBreadcrumb(true)
    }
  }, [])
  /**
   * Fetch sub category
   */
  useEffect(async () => {
    setLoader(true)
    if (!checkIfEmpty(route?.query?.subcatalog)) {
      const res = await getAllSubcategory(route?.query?.subcatalog)
      if (res?.StatusCode === 12002 && res?.StatusCode !== 401) {
        setLoader(false)
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
      setLoader(false)
    }
  }, [!checkIfEmpty(route?.query?.subcatalog)])

  /**
   * handle search
   * @param {*} e
   */
  const handleSearch = async (e) => {
    setLoader(true)
    const res = await getAllSubcategory(route?.query?.subcatalog, e.target.value)
    if (res) {
      setLoader(false)
    }
  }
  return (
    <Layout>
      {loader && <Loader />}

      <div className={classes.listHead}>
        <div className={classes.categoryHeader}>
          <Typography variant='h3' style={{ color: '#4c5156' }}>
            Subcategory
          </Typography>
          {!isHideBreadcrumb && (
            <BreadCrumb
              routes={[{ name: 'Catalog', link: '/catalog' }, { name: parentCategoryInfo?.name }]}
            />
          )}
          {isHideBreadcrumb && (
            <Typography
              variant='p'
              style={{ color: '#4c5156', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={route.back}
            >
              Back to previous page
            </Typography>
          )}
        </div>
        <div className={classes.searchBlock}>
          <SearchArea
            placeholder='Search subcategory'
            handleSearch={handleSearch}
            className={classes.searchArea_Pad}
          />
        </div>
      </div>

      <Grid container spacing={3} direction='row' className={classes.root}>
        {checkIfEmpty(categories) ? (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Nodata label='No subcategories found ! ' />
          </Grid>
        ) : (
          <>
            {categories?.map((cat, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={i}>
                <CatalogBox
                  name={cat?.name}
                  guid={cat.guid}
                  imageUrl={cat?.imageUrl}
                  url={{
                    pathname: `/catalog/${route.query.subcatalog}/product`,
                    query: { subcategory: cat.guid }
                  }}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  categories: state?.category?.subcategory?.response?.categories,
  parentCategoryInfo: state?.category?.subcategory?.response?.parentCategoryInfo
})

const mapDispatchToProps = {
  getAllSubcategory
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCatalog)
