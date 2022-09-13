import { Button, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import Layout from 'components/layout'
import Loader from 'components/loader'
import Modal from 'components/modal'
import SearchArea from 'components/searchArea'
import { FaqAccordion, VerticalTabs } from 'components/verticalTab'
import store from 'pages/store'
import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { connect } from 'react-redux'
import { getHelpCenter, updateCategory } from 'redux/actions/faqActions'
import { checkIfEmpty, getZendeskApi, raiseTicket, validateFields } from 'utils/helpers'
import { style } from 'styles/helpCenter'
import clsx from 'clsx'
import Icon from 'icomoons/Icon'
import ToggleDrawer from 'components/toggleDrawer'
import Pagination from 'components/pagination'
// import BreadCrumb from 'components/breadcrumb'

const useStyles = style

const FIELDS = [
  {
    label: 'Subject',
    name: 'subject',
    isRequired: true
  },
  {
    label: 'Description',
    name: 'description',
    isRequired: true
  }
]
function Faq({
  updateCategory,
  category,
  getHelpCenter,
  articles,
  userAccountDetails,
  articleCount
}) {
  const classes = useStyles()
  const [search, setsearch] = useState('')
  const [loader, setloader] = useState(false)
  const [toggleModal, settoggleModal] = useState(false)
  const [query, setquery] = useState({ per_page: 10, page: 1 })
  const [data, setdata] = useState({})
  const [error, seterror] = useState({})
  const [listActive, setListActive] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)
  const [articleData, setarticleData] = useState([])
  useEffect(() => {
    !checkIfEmpty(articles) &&
      setarticleData([
        ...articles?.filter((a) => a?.promoted),
        ...articles?.filter((a) => !a?.draft && !a.promoted)
      ])
  }, [articles])

  useEffect(async () => {
    const res = await getZendeskApi('api/v2/help_center/categories')
    if (res) {
      updateCategory(res)
    }
    const result = await getZendeskApi(
      `api/v2/help_center/articles?page=${query?.page}&per_page=${query?.per_page}`
    )
    if (result) {
      getHelpCenter(result)
    }
  }, [])

  const handleSearch = async (e) => {
    setsearch(e.target.value)
    setloader(true)
    setquery({ ...query, page: 1, per_page: 10 })
    if (!checkIfEmpty(e.target.value)) {
      const res = await getZendeskApi(
        `api/v2/help_center/articles/search?query=${e?.target?.value}&page=1&per_page=10`
      )
      if (res) {
        getHelpCenter(res)
        setloader(false)
      }
    } else {
      const result = await getZendeskApi(`api/v2/help_center/articles?page=1&per_page=10`)
      if (result) {
        getHelpCenter(result)
        setloader(false)
      }
    }
  }
  const handleCategory = async (val = '') => {
    setListActive(val === '' ? '' : val?.id)
    setloader(true)
    setsearch('')

    if (val !== '') {
      setquery({ ...query, page: 1, per_page: 10 })
      const res = await getZendeskApi(
        `api/v2/help_center/categories/${val?.id}/articles?page=1&per_page=10`
      )
      if (res) {
        getHelpCenter(res)
        setloader(false)
      }
    } else {
      setquery({ ...query, page: 1, per_page: 10 })
      const result = await getZendeskApi(`api/v2/help_center/articles?page=1&per_page=10`)
      if (result) {
        getHelpCenter(result)
        setloader(false)
      }
    }
  }

  const handleModalClose = () => {
    settoggleModal(false)
    setdata({ subject: '', description: '' })
    seterror({ subject: '', description: '' })
  }
  const handleRaiseTicket = async () => {
    const err = validateFields(data, FIELDS)
    seterror(err)
    if (checkIfEmpty(err)) {
      setloader(true)
      const res = await raiseTicket(`api/v2/requests`, {
        request: {
          requester: { name: userAccountDetails?.fullName, email: userAccountDetails?.email },
          subject: data?.subject,
          comment: { body: data?.description }
        }
      })
      if (res) {
        // getHelpCenter(res)
        setloader(false)
        settoggleModal(false)
        setdata({ subject: '', description: '' })
        seterror({ subject: '', description: '' })
        NotificationManager.success('Ticket has been raised', '', '2000')
      }
    }
  }
  const handlePageSizeChange = async (val) => {
    setquery({ ...query, per_page: val, page: 1 })
    setloader(true)
    if (checkIfEmpty(listActive)) {
      if (!checkIfEmpty(search)) {
        const res = await getZendeskApi(
          `api/v2/help_center/articles/search?query=${search}&page=1&per_page=${val}`
        )
        if (res) {
          getHelpCenter(res)
          setloader(false)
        }
      } else {
        const result = await getZendeskApi(`api/v2/help_center/articles?page=1&per_page=${val}`)
        if (result) {
          getHelpCenter(result)
          setloader(false)
        }
      }
    } else {
      const result = await getZendeskApi(
        `api/v2/help_center/categories/${listActive}/articles?page=1&per_page=${val}`
      )
      if (result) {
        getHelpCenter(result)
        setloader(false)
      }
    }
  }

  const handlePageNation = async (val) => {
    setquery({ ...query, page: val })
    setloader(true)
    if (checkIfEmpty(listActive)) {
      if (!checkIfEmpty(search)) {
        const res = await getZendeskApi(
          `api/v2/help_center/articles/search?query=${search}&page=${val}&per_page=${query?.per_page}`
        )
        if (res) {
          getHelpCenter(res)
          setloader(false)
        }
      } else {
        const result = await getZendeskApi(
          `api/v2/help_center/articles?page=${val}&per_page=${query?.per_page}`
        )
        if (result) {
          getHelpCenter(result)
          setloader(false)
        }
      }
    } else {
      const result = await getZendeskApi(
        `api/v2/help_center/categories/${listActive}/articles?page=${val}&per_page=${query?.per_page}`
      )
      if (result) {
        getHelpCenter(result)
        setloader(false)
      }
    }
  }
  return (
    <div>
      {loader && <Loader />}
      <Layout>
        {/* <!--new--> */}
        <div className={classes.bg_HelpBlock}>
          <div className={classes.faqHead}>
            <div className={classes.faqHeader}>
              <Typography variant='h3'>FAQ</Typography>
            </div>
            <div className={classes.searchBlock}>
              <SearchArea
                placeholder='How can we help ?'
                handleSearch={handleSearch}
                searchValue={search}
                className={classes.searchFaq}
              />
              <Button
                type='submit'
                variant='contained'
                className={classes.btnRaiseFAQ}
                onClick={() => settoggleModal(true)}
              >
                Raise ticket
              </Button>
            </div>
          </div>
          <div className={classes.faq_borderBtm}></div>

          {/* <!--hidden xs--> */}
          <div className={classes.tabFAQ_Vertical}>
            <Button
              variant='outlined'
              onClick={() => setToggleFilter(!toggleFilter)}
              startIcon={<Icon icon='filter-list' size={18} />}
              style={{ width: 145, background: '#fff', zIndex: 1 }}
            >
              Filter
            </Button>
            <ToggleDrawer
              open={toggleFilter}
              handleClose={() => setToggleFilter(false)}
              drawerClass={classes.Filter_Width}
              faqFilter
              component={
                <VerticalTabs
                  tabName={category}
                  handleCategory={handleCategory}
                  search={search}
                  articles={articleData}
                  listActive={listActive}
                  filterClose={() => setOpen(false)}
                />
              }
            />
          </div>
          {/* <!--hidden xs--> */}

          <Grid container spacing={3} direction='row' className={classes.root_Tabs}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} className={classes.Faq_tab_Block}>
              <VerticalTabs
                tabName={category}
                handleCategory={handleCategory}
                search={search}
                articles={articleData}
                listActive={listActive}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
              <FaqAccordion search={search} articles={articleData} />
            </Grid>
          </Grid>
          <div className={classes.tabPagination}>
            <Pagination
              pageSize={query?.per_page}
              handlePageSizeChange={handlePageSizeChange}
              handlePageNation={handlePageNation}
              currentPage={query?.page - 1}
              totalCount={articleCount?.count}
            />
          </div>
          <div className={classes.bg_FAQ_Btm}></div>
        </div>
        {/* <!--new--> */}
        <Modal open={toggleModal} handleClose={handleModalClose} title='Raise a ticket'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <label className={classes.faqLabel}>Subject</label>
            <TextField
              variant='outlined'
              placeholder='Subject'
              value={data?.subject}
              fullWidth
              onChange={(e) => setdata({ ...data, subject: e.target.value })}
              InputLabelProps={{
                shrink: false
              }}
              inputProps={{ maxLength: 60 }}
              className={classes.FAQ_Form}
            />
            {error?.subject && <span className={classes.errorText}>{error?.subject}</span>}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <label className={classes.faqLabel}>Description</label>
            <TextareaAutosize
              aria-label='Description'
              placeholder='Description'
              value={data?.description}
              rows={5}
              onChange={(e) => setdata({ ...data, description: e.target.value })}
              style={{ width: '100%', padding: 10 }}
              // className={classes.FAQ_Form}
              className={clsx(classes.FAQ_Form, classes.textArea_Form)}
            />
            {error?.description && <span className={classes.errorText}>{error?.description}</span>}
          </Grid>
          <div className={classes.btnFaq_Actions}>
            <Button
              type='submit'
              variant='outlined'
              onClick={handleModalClose}
              className={classes.btnFaq_Cancel}
            >
              Cancel
            </Button>
            <Button type='submit' variant='contained' onClick={handleRaiseTicket}>
              Submit
            </Button>
          </div>
        </Modal>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state) => ({
  category: state?.faq?.faq?.categories,
  articles: state?.faq?.articles?.articles || state?.faq?.articles?.results,
  articleCount: state?.faq?.articles || state?.faq?.articles,
  userAccountDetails: state.user.userAccountDetails?.response
})

const mapDispatchToProps = {
  updateCategory,
  getHelpCenter
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq)
