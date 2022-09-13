import React, { useState } from 'react'
import { Box, Grid, MenuItem, Typography, Button } from '@material-ui/core'
import BreadCrumb from 'components/breadcrumb'
import Icon from 'icomoons/Icon'
import CardBlock from './card'
import style from './style'
import { useRouter } from 'next/router'
import { checkIfEmpty } from 'utils/helpers'
import Nodata from 'components/nodata'
import Select from 'components/select'
import { connect } from 'react-redux'
import SearchArea from 'components/searchArea'
import ProductSort from 'components/pages/product/productSort/index'
import { updateProductQuery } from 'redux/actions/productActions'

const useStyles = style
const ProductList = ({
  items = [],
  handleSortChange,
  materialIds = [],
  handleSearch,
  openFilter,
  categories,
  isHideBreadcrumb = false,
  sortOpen,
  setSortOpen,
  apiQuery,
  updateProductQuery
}) => {
  const classes = useStyles()
  const route = useRouter()

  return (
    <div className={classes.productList_Wrapper}>
      <Box
        display='flex'
        alignItems='center'
        width='100%'
        flexWrap='wrap'
        className={classes.list_Header}
      >
        <Box flexGrow={1} className={classes.labelList}>
          <Typography variant='h3'>
            {categories?.find((val) => val.guid === route.query.subcatalog)?.name || 'Product list'}
          </Typography>
          {!isHideBreadcrumb && (
            <div className={classes.crumbMbTop}>
              <BreadCrumb
                updateProductQuery={updateProductQuery}
                routes={[
                  { name: 'Catalog', link: '/catalog', isClearTheQuery: true },
                  {
                    name: categories?.find((val) => val.guid === route.query.subcatalog)?.name,
                    link: `/catalog/${
                      categories?.find((val) => val.guid === route.query.subcatalog)?.guid
                    }`,
                    isClearTheQuery: true
                  },
                  {
                    name: categories
                      ?.find((val) => val.guid === route.query.subcatalog)
                      ?.subCategories?.find((val) => val?.guid === route.query.subcategory)?.name
                  }
                ]}
              />
            </div>
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
        </Box>
        <div className={classes.matchMediaSm}>
          {/* <!--hidden xs--> */}
          <SearchArea
            placeholder='Search products'
            handleSearch={handleSearch}
            searchValue={apiQuery.searchKey}
          />

          {/* <!--hidden xs--> */}

          <Box
            justifyContent='flex-end'
            style={{ margin: '16px 8px 0px 8px' }}
            className={classes.sortSelect}
          >
            <Button
              type='submit'
              endIcon={<Icon icon='drop-down' size={18} />}
              startIcon={<Icon icon='filter-list' size={18} />}
              onClick={() => setSortOpen(!sortOpen)}
              variant='outlined'
            >
              Sort
            </Button>
            {sortOpen && (
              <ProductSort
                apiCall={handleSortChange}
                apiQuery={apiQuery}
                handleClose={() => {
                  setSortOpen(false)
                }}
              />
            )}
          </Box>
          <div style={{ 'margin-top': '16px' }}>
            <Button
              variant='outlined'
              onClick={openFilter}
              startIcon={<Icon icon='filter-list' size={18} />}
              style={{ width: 145, background: '#fff' }}
            >
              Filter
              <Box className={classes.filter_Count}>
                {checkIfEmpty(materialIds) ? 0 : materialIds.length}
              </Box>
            </Button>
          </div>
        </div>
      </Box>
      {checkIfEmpty(items) ? (
        <Nodata label='No products found ! ' />
      ) : (
        <Grid container spacing={3} direction='row' className={classes.root}>
          {items?.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={item?.guid}>
              <CardBlock item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  categories: state?.category?.category?.response?.categories
})

const mapDispatchToProps = {
  updateProductQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
