import React, { useEffect, useState } from 'react'
import ProductFilter from 'components/pages/product/productFilter'
import ProductList from 'components/pages/product/productList'
import { getAllProducts, updateProductQuery } from 'redux/actions/productActions'
import Layout from 'components/layout'
import Pagination from 'components/pagination'
import { connect } from 'react-redux'
import { checkIfEmpty } from 'utils/helpers'
import ToggleDrawer from 'components/toggleDrawer'
import { style } from 'styles/productList'
import Loader from 'components/loader'
import { useRouter } from 'next/router'
const useStyles = style

const Product = ({ getAllProducts, products, productListQuery, updateProductQuery }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const route = useRouter()
  const [sortOpen, setSortOpen] = useState(false)
  const [loader, setloader] = useState(false)
  const [isHideBreadcrumb, setisHideBreadcrumb] = useState(false)

  /**
   * get call
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
   * Fetch all products
   */
  useEffect(async () => {
    setloader(true)
    const res = await getAllProducts({
      ...productListQuery,
      categoryFilter: [route.query.subcategory] || []
    })
    if (res) {
      setloader(false)
      window.scrollTo(0, 0)
    }
  }, [productListQuery || route.query.subcategory])

  /**
   * Update product query global state
   */
  useEffect(async () => {
    if (!checkIfEmpty(route.query.subcategory)) {
      setloader(true)
      updateProductQuery(
        { ...productListQuery, categoryFilter: [route.query.subcategory] || [] },
        false
      )
    }
  }, [!checkIfEmpty(route.query.subcategory)])

  /**
   * handle pagination size change
   * @param {*} value
   */
  const handlePageSizeChange = async (value) => {
    setloader(true)
    updateProductQuery({ ...productListQuery, pageSize: value, pageIndex: 0 }, false)
  }

  /**
   * handle table sort change
   * @param {*} value
   */
  const handleSortChange = (value) => {
    if (value?.sortByName === '') {
      updateProductQuery(
        { ...productListQuery, sortColumn: 'priceStartsFrom', sortDirection: value?.sortByCost },
        false
      )
    } else {
      updateProductQuery(
        { ...productListQuery, sortColumn: 'title', sortDirection: value?.sortByName },
        false
      )
    }
    setSortOpen(false)
  }

  /**
   * handle search
   * @param {*} e
   */
  const handleSearch = (e) => {
    updateProductQuery({ ...productListQuery, searchKey: e.target.value }, false)
  }

  /**
   * Handle api call
   * @param {*} value
   */
  const handleCallApi = (filters) => {
    updateProductQuery({ ...productListQuery, ...filters }, false)
  }

  return (
    <Layout openMenu={true} className={classes.contentPdt}>
      {loader && <Loader />}
      <div className={classes.productRow}>
        {/* <!--hidden xs-->*/}
        <ToggleDrawer
          open={open}
          handleClose={() => setOpen(false)}
          drawerClass={classes.Filter_Width}
          component={
            <ProductFilter
              handleSearch={handleSearch}
              apiCall={handleCallApi}
              filterClose={() => setOpen(false)}
              prevQuery={productListQuery}
            />
          }
        />
        {/* <!--hidden xs-->*/}

        <div className={classes.bgProductList}>
          <ProductList
            items={products?.response?.items}
            handleSortChange={handleSortChange}
            materialIds={productListQuery?.materialIds}
            handleSearch={handleSearch}
            openFilter={() => setOpen(!open)}
            isHideBreadcrumb={isHideBreadcrumb}
            sortOpen={sortOpen}
            setSortOpen={setSortOpen}
            apiQuery={productListQuery}
          />

          {!checkIfEmpty(products?.response?.items) && (
            <Pagination
              pageSize={productListQuery?.pageSize}
              currentPage={productListQuery?.pageIndex}
              handleOnClick={async (index) => {
                setloader(true)
                updateProductQuery({ ...productListQuery, pageIndex: index - 1 }, false)
              }}
              totalCount={products?.response?.totalCount}
              handlePageSizeChange={handlePageSizeChange}
              handlePageNation={async (index) => {
                setloader(true)
                updateProductQuery({ ...productListQuery, pageIndex: index - 1 }, false)
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  productListQuery: state.product.productCustomerQuery
})

const mapDispatchToProps = {
  getAllProducts,
  updateProductQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
