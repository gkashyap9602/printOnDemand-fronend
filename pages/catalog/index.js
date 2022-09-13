import React, { useEffect, useState } from 'react'
import { Typography, Grid, InputBase, Button } from '@material-ui/core'
import Layout from 'components/layout'
import CatalogBox from 'components/catalogBox'
import { connect } from 'react-redux'
import { getAllCategory } from 'redux/actions/categoryActions'
import { style } from 'styles/productCatalogList'
import { NotificationManager } from 'react-notifications'
import Loader from 'components/loader'
import { checkIfEmpty, isActiveInternet } from 'utils/helpers'
import Nodata from 'components/nodata'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'

const useStyles = style

/**
 * Orders
 * @returns
 */
function Catalog({ getAllCategory, categories }) {
  const classes = useStyles()
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const [value, setvalue] = useState('')

  /**
   * On init calls api
   */
  useEffect(async () => {
    setLoader(true)
    const res = await getAllCategory()
    if ((res?.StatusCode >= 400 || res?.StatusCode === 12002) && res?.StatusCode !== 401) {
      setLoader(false)
      NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
    }
    if (res.statusCode >= 200) {
      setLoader(false)
    }
  }, [])

  /**
   * Rerenderpage
   */
  const rerenderPage = () => {
    setvalue('')
    getAllCategory()
  }

  return (
    <Layout handleOnClick={rerenderPage}>
      {loader && <Loader />}
      <div className={classes.listHead}>
        <div className={classes.categoryHeader}>
          <Typography variant='h3' style={{ color: '#4c5156' }}>
            Catalog
          </Typography>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            isActiveInternet(router, {
              pathname: '/catalog/GlobalSearch',
              query: { search: value }
            })
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
                inputProps={{ 'aria-label': 'search', maxLength: 30 }}
                onChange={(e) => {
                  setvalue(e.target.value)
                }}
              />
            </div>
            <Button type='submit' disabled={!value || value.length < 4} variant='contained'>
              <SearchIcon />
            </Button>
          </div>
        </form>
      </div>

      <Grid container spacing={3} direction='row' className={classes.root}>
        {checkIfEmpty(categories) ? (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Nodata label='No categories found!' />
          </Grid>
        ) : (
          categories?.map((cat, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={i}>
              <CatalogBox
                name={cat?.name}
                guid={cat.guid}
                imageUrl={cat?.imageUrl}
                url={`/catalog/${cat?.guid}`}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  categories: state?.category?.category?.response?.categories
})

const mapDispatchToProps = {
  getAllCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
