import React, { useEffect, useState } from 'react'
import Layout from 'components/layout'
import { Typography, Grid, InputBase, Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import Loader from 'components/loader'
import { globalSearchAPI } from 'redux/actions/categoryActions'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import CatalogBox from 'components/catalogBox'
import { style } from 'styles/productCatalogList'
import CardBlock from '../../components/pages/product/productList/card'
import Nodata from 'components/nodata'
import SearchIcon from '@material-ui/icons/Search'
import { isActiveInternet } from 'utils/helpers'
const useStyles = style

const GlobalSearch = ({ globalSearchAPI }) => {
  const classes = useStyles()
  const router = useRouter()
  const [loader, setLoader] = useState(true)
  const [searchList, setSearchList] = useState({})
  const [value, setvalue] = useState('')
  const [isSearched, setIsSearched] = useState(false)

  useEffect(async () => {
    const {
      query: { search }
    } = router

    if (search) {
      const data = {
        searchKey: search
      }
      setvalue(search)
      const res = await globalSearchAPI(data)
      if (res?.statusCode >= 200 && res.statusCode <= 300) {
        setLoader(false)
        setSearchList(res.response)
      }
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
    }
  }, [loader])

  useEffect(() => {
    setLoader(true)
  }, [isSearched])

  const placeItem = (title, result) => {
    return (
      <>
        <Typography variant='h3' style={{ color: '#4c5156' }}>
          {title}
        </Typography>
        <Grid
          container
          spacing={3}
          direction='row'
          style={{ marginBottom: '4rem' }}
          className={classes.root}
        >
          {result?.map((items, idx) => {
            if (title === 'Catalog' || title === 'Subcategory') {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={idx}>
                  <CatalogBox
                    name={items?.name}
                    guid={items.guid}
                    imageUrl={items?.imageUrl}
                    url={
                      title === 'Catalog'
                        ? `/catalog/${items?.guid}?isGlobalSearch=true`
                        : {
                            pathname: `/catalog/subcategory/product`,
                            query: { subcategory: items.guid, isGlobalSearch: true }
                          }
                    }
                  />
                </Grid>
              )
            }
            if (title === 'Products') {
              return (
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={idx}>
                  <CardBlock item={items} />
                </Grid>
              )
            }
          })}
        </Grid>
      </>
    )
  }

  return (
    <Layout>
      {loader && <Loader />}
      <div className={classes.listHead}>
        <div className={classes.categoryHeader}></div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            isActiveInternet(router, {
              pathname: '/catalog/GlobalSearch',
              query: { search: value }
            })
            setIsSearched(!isSearched)
          }}
        >
          <div className={classes.searchBlock}>
            <div className={`${classes.search}`}>
              <InputBase
                placeholder={'Search'}
                value={value}
                classes={{
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => {
                  setvalue(e.target.value)
                }}
              />
            </div>
            <Button disabled={!value || value.length < 4} type='submit' variant='contained'>
              <SearchIcon />
            </Button>
          </div>
        </form>
      </div>
      <div style={{ width: '100%' }}>
        {/* categories */}
        {searchList['categories']?.length > 0
          ? placeItem('Catalog', searchList['categories'])
          : null}
        {/* subCategories */}
        {searchList['subCategories']?.length > 0
          ? placeItem('Subcategory', searchList['subCategories'])
          : null}
        {/* products */}
        {searchList['products']?.length > 0 ? placeItem('Products', searchList['products']) : null}
      </div>

      {!searchList['categories']?.length > 0 &&
      !searchList['subCategories']?.length > 0 &&
      !searchList['products']?.length > 0 &&
      !loader ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Nodata label='No results found!' />
        </Grid>
      ) : null}
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  globalSearchResult: state?.category?.category?.response?.categories
})

const mapDispatchToProps = {
  globalSearchAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearch)
