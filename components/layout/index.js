import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Badge,
  Button,
  Avatar,
  Grid,
  ClickAwayListener,
  Grow,
  Paper,
  MenuList,
  Popper,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Typography
} from '@material-ui/core'
import BreadCrumb from 'components/breadcrumb'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import Icon from 'icomoons/Icon'
import logo from '/static/images/MWW-Logo.png'
import Image from 'next/image'
import SideMenu from './sideMenu'
import style from './style'
import { useRouter } from 'next/router'
import avatar from 'static/images/user-common.png'
import MoreSettings from 'components/formElements'
import { ISSERVER } from 'constants/routePaths'
import { statusTabList } from 'constants/fields'
import {
  getAccontDetails,
  updateField,
  getUserSessionShopify,
  getStatusApi
} from 'redux/actions/userActions'
import { connect, useSelector } from 'react-redux'
import Loader from 'components/loader'
import { NotificationManager } from 'react-notifications'
import { checkIfEmpty, isActiveInternet, isShopifyApp } from '../../utils/helpers'
import { getAllCategory } from 'redux/actions/categoryActions'
import { useDispatch } from 'react-redux'
import { getProductDetail, updateProductQuery } from 'redux/actions/productActions'
import { updateOrderQuery } from 'redux/actions/orderActions'
import { updateProductLibraryQuery } from 'redux/actions/productLibraryActions'
import { TooltipBootstrap } from 'components/bootstrapTooltip'
import { clearEntireState } from 'redux/actions/designToolActions'
import { signoutHandler } from 'redux/actions/authActions'

const useStyles = style

const Layout = ({
  children,
  isClick,
  menuHide,
  openMenu = true,
  activateHide,
  dtoolHeader,
  className,
  userAccountDetails,
  getAccontDetails,
  updateField,
  categories,
  getAllCategory,
  userDetails,
  tabSizeClass,
  handleOnClick = () => {},
  updateOrderQuery,
  updateProductQuery,
  updateProductLibraryQuery,
  duplicateProductDetails,
  getUserSessionShopify,
  userSessionShopify,
  shopifyAuth,
  signoutHandler,
  getStatusApi
}) => {
  const router = useRouter()
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [loader, setLoader] = useState(true)
  const [open, setOpen] = React.useState(openMenu)
  const [openOver, setOpenOver] = React.useState(false)
  const [activeStatus, setActiveStatus] = useState({})
  const designModel = useSelector((state) => state.designModel)
  const [userSession, setUserSession] = useState()
  const dispatch = useDispatch()
  const [xsOpen, setXsOpen] = useState(false)

  useEffect(() => {
    if (userDetails) {
      if (userDetails?.isLoginFromShopify) {
        userSessionShopify && setUserSession(userSessionShopify.response)
      } else {
        if (!isShopifyApp()) {
          setUserSession(JSON.parse(localStorage.getItem('userSession')))
          updateField('userDetails', JSON.parse(localStorage.getItem('userSession')))
        }
      }
    }
  }, [])

  useEffect(async () => {
    if (userSession?.guid && checkIfEmpty(userAccountDetails?.response)) {
      const res = await getAccontDetails(userSession?._id)
      if (res?.StatusCode === 12002 || res.hasError) {
        setLoader(false)
        NotificationManager.error(res?.Response?.Message, '', 10000)
      }
      if (res?.StatusCode >= 400 && res?.StatusCode <= 500 && res?.StatusCode !== 401) {
        setLoader(false)
        NotificationManager.error('Something went wrong, please refresh the page', '', 10000)
      }
    }
    if (userSession?._id) {
      const resultData = await getStatusApi(userSession?._id)
      if (resultData?.response) {
        setLoader(false)
        statusTabList?.map((list) => {
          if (list.statusId === resultData?.response?.status) {
            setActiveStatus({ text: list.text, icon: list.icon, bg: list.userBG })
          }
        })
      }
    }
  }, [router?.pathname, userSession])

  useEffect(() => {
    if (userAccountDetails?.response?.status) {
      setLoader(false)
      if (userDetails?.status && userDetails?.status !== userAccountDetails?.response?.status) {
        if (!shopifyAuth && !isShopifyApp()) {
          localStorage.setItem(
            'userSession',
            JSON.stringify({
              ...userDetails,
              activeStatusId: userAccountDetails?.response?.status
            })
          )
        }
        updateField('userDetails', {
          ...userDetails,
          activeStatusId: userAccountDetails?.response?.status
        })
      }
    }
  }, [userAccountDetails, !checkIfEmpty(userDetails)])
  // useEffect(() => {
  //   if (userDetails?.status) {
  //     setLoader(false)
  //     statusTabList?.map((list) => {
  //       if (list.statusId === userDetails?.status) {
  //         setActiveStatus({ text: list.text, icon: list.icon, bg: list.userBG })
  //       }
  //     })
  //   }
  // }, [userDetails])
  useEffect(() => {
    if (userAccountDetails?.response?.status) {
      setLoader(false)
      statusTabList?.map((list) => {
        if (list.statusId === userAccountDetails?.response?.status) {
          setActiveStatus({ text: list.text, icon: list.icon, bg: list.userBG })
        }
      })
    }
  }, [userAccountDetails])

  useEffect(() => {
    if (dtoolHeader) {
      dispatch(getProductDetail(router.query.productName))
    }
    // return () => {
    //   if (!shopifyAuth) {
    //     updateField('userAccountDetails', null)
    //   }
    // }
  }, [])

  const handleToggle = () => {
    setOpenOver((prevOpen) => !prevOpen)
  }

  const handleCloser = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpenOver(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpenOver(false)
    }
  }

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleLogout = async () => {
    const res = await signoutHandler()
    if (res?.statusCode === 200) {
      setOpenOver(false)
      if (shopifyAuth) {
        updateField('userDetails', null)
        updateField('userAccountDetails', null)
        updateField('userSessionShopify', null)
        // clearSessionShopify()
        // clearTokenShopify()
        // route.reload()
      } else {
        localStorage.removeItem('userSession')
        localStorage.removeItem('paytraceCustomerId')
        updateField('userAccountDetails', null)
        localStorage.removeItem('orderSubmissionDelay')
      }

      updateOrderQuery({
        pageIndex: 0,
        pageSize: 10,
        sortColumn: 'orderDate',
        sortDirection: 'desc',
        status: null
      })
      updateProductQuery(
        {
          pageIndex: 0,
          pageSize: 10,
          sortColumn: 'title',
          sortDirection: 'asc'
        },
        false
      )
      updateProductLibraryQuery({
        searchKey: '',
        sortColumn: 'createdOn',
        sortDirection: 'desc',
        pageIndex: 0,
        pageSize: 10,
        status: 1,
        categoryIds: [],
        materialIds: []
      })
      updateField('userDetails', {})
      isActiveInternet(router, '/login')
    } else if (res.StatusCode >= 400) {
      NotificationManager.error(res?.Response?.Message, '', 10000)
    }
  }
  const handleBackClick = () => {
    if (router.query.mode === 'create') {
      dispatch(clearEntireState())
      router?.query?.isGlobalSearch
        ? router.push(
            `catalog/subcatalog/product/${router?.query?.productName}?isGlobalSearch=${router?.query?.isGlobalSearch}`
          )
        : router.push(
            `/catalog/${
              categories?.find((val) => val.guid === router.query.subcatalog)?.guid
            }/product/${router?.query?.productName}?subcategory=${router.query.subcategory}`
          )
    } else if (router.query.mode === 'edit' || router.query.mode === 'duplicate') {
      dispatch(clearEntireState())
      router.push('/productlibrary')
    }
  }
  const anchorRef = React.useRef(null)

  return (
    <>
      {loader && <Loader />}
      <div className={classes.root}>
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <div style={{ width: '100%' }} className={classes.ToolbarMbTop}>
              <Box display='flex' justifyContent='flex-start' alignItems='center' flexWrap='wrap'>
                <Box
                  style={{ flexGrow: 1 }}
                  display='flex'
                  flexWrap='wrap'
                  className={classes.xsHiddenLogo}
                >
                  {dtoolHeader ? (
                    <img
                      src='static/images/MWW-Logo.png'
                      alt='Logo'
                      className={classes.imageHeader}
                      onClick={() => router.push('/orders')}
                    />
                  ) : (
                    <Image
                      src={logo}
                      alt='Logo'
                      className={classes.imageClick}
                      onClick={() => router.push('/orders')}
                    />
                  )}
                  {dtoolHeader && (
                    <div>
                      <div className={classes.backBtn} onClick={handleBackClick}>
                        <a>
                          <Icon icon='arrow_back' size={20} color='#8a8a9e' />
                        </a>
                        <TooltipBootstrap title={designModel.title} placement='left-start'>
                          <div className={classes.dtool_Text}>
                            <Typography variant='h3'>{designModel.title}</Typography>
                          </div>
                        </TooltipBootstrap>
                      </div>
                      <div className={classes.designCrumb}>
                        {router.query.mode === 'create' ? (
                          <BreadCrumb
                            routes={[
                              // { name: 'Catalog', link: '/catalog' },
                              categories?.find((val) => val.guid === router.query.subcatalog)
                                ?.guid && {
                                name: categories?.find(
                                  (val) => val.guid === router.query.subcatalog
                                )?.name,
                                link: `/catalog/${
                                  categories?.find((val) => val.guid === router.query.subcatalog)
                                    ?.guid
                                }`
                              },
                              categories?.find((val) => val.guid === router.query.subcatalog)
                                ?.guid && {
                                name: categories
                                  ?.find((val) => val.guid === router.query.subcatalog)
                                  ?.subCategories?.find(
                                    (val) => val?.guid === router.query.subcategory
                                  )?.name,
                                link: `/catalog/${
                                  categories?.find((val) => val.guid === router.query.subcatalog)
                                    ?.guid
                                }/product?subcategory=${router.query.subcategory}`
                              },
                              {
                                name: router?.query?.title,
                                link: router?.query?.isGlobalSearch
                                  ? `catalog/subcatalog/product/${router?.query?.productName}?isGlobalSearch=${router?.query?.isGlobalSearch}`
                                  : `/catalog/${
                                      categories?.find(
                                        (val) => val.guid === router.query.subcatalog
                                      )?.guid
                                    }/product/${router?.query?.productName}?subcategory=${
                                      router.query.subcategory
                                    }`
                              },
                              { name: 'Designer tool' }
                            ]}
                          />
                        ) : (
                          <BreadCrumb
                            routes={[
                              { name: 'Product library', link: '/productlibrary' },

                              { name: 'Designer tool' }
                            ]}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Box>
                <Box
                  display='flex'
                  alignItems='center'
                  className={`${classes.NotifyHeaderWrap} ${tabSizeClass}`}
                >
                  {!activateHide && activeStatus?.text && (
                    <Box mr={2}>
                      <Button
                        style={{ background: `${activeStatus?.bg}`, cursor: 'unset' }}
                        type='submit'
                        variant='contained'
                        startIcon={<Icon icon={activeStatus?.icon} size={18} />}
                        fullWidth
                        className={classes.btn_Activation}
                        disableRipple
                      >
                        {activeStatus?.text}
                      </Button>
                    </Box>
                  )}

                  <Box className={classes.FlexPropIcon}>
                    {/* Notification icon */}
                    {userSession?.userType !== 2 ? (
                      <>
                        <TooltipBootstrap title='Help' placement='bottom'>
                          <Box
                            mr={3}
                            onClick={() => router.push('/faq')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Icon icon='help' size={22} color='#9A9AB0' />
                          </Box>
                        </TooltipBootstrap>
                        <TooltipBootstrap title='Cart' placement='bottom'>
                          <Box
                            mr={3}
                            onClick={() => router.push('/cart')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Icon icon='cart-fill' size={22} color='#9A9AB0' />
                          </Box>
                        </TooltipBootstrap>
                      </>
                    ) : (
                      <>
                        {/* Settings icon */}

                        <Box mr={3}>
                          <MoreSettings />
                        </Box>
                      </>
                    )}
                    <div>
                      <Button
                        className={classes.MenuProfile}
                        ref={anchorRef}
                        aria-controls={openOver ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        onClick={handleToggle}
                      >
                        <div className={classes.profBorder}>
                          <Image
                            src={avatar}
                            alt='profile path'
                            width={30}
                            height={30}
                            className={classes.avatarSize}
                          />
                        </div>
                      </Button>
                      <Popper
                        style={{ zIndex: 10 }}
                        placement='bottom-end'
                        open={openOver}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal={false}
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                          >
                            <Paper className={classes.PopList}>
                              <ClickAwayListener onClickAway={handleCloser}>
                                <MenuList
                                  autoFocusItem={openOver}
                                  id='menu-list-grow'
                                  onKeyDown={handleListKeyDown}
                                >
                                  {userDetails?.userType === 3 && (
                                    <MenuItem
                                      className={classes.MenuPopList}
                                      onClick={() => {
                                        setOpenOver(false)
                                        isActiveInternet(router, '/profile')
                                      }}
                                    >
                                      <ListItemIcon>
                                        <Icon icon='profile-icon' size={20} />
                                      </ListItemIcon>
                                      My profile
                                    </MenuItem>
                                  )}
                                  <MenuItem
                                    className={classes.MenuPopList}
                                    disabled={userSession?.userType === 2}
                                    onClick={() => {
                                      setOpenOver(false)
                                      isActiveInternet(router, '/updatepassword')
                                    }}
                                  >
                                    <ListItemIcon>
                                      <Icon icon='password' size={18} />
                                    </ListItemIcon>
                                    Change password
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.MenuPopList}
                                    onClick={() => handleLogout()}
                                  >
                                    <ListItemIcon>
                                      <Icon icon='logout-icon' size={20} />
                                    </ListItemIcon>
                                    Logout
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </Box>
                </Box>

                {/* <!--hidden xs--> */}
                {!menuHide && (
                  <div className={classes.hiddenXs}>
                    <Button onClick={() => setXsOpen(!xsOpen)}>
                      <MenuIcon />
                    </Button>
                  </div>
                )}
                {/* <!--hidden xs--> */}
              </Box>
            </div>
          </Toolbar>
        </AppBar>

        {!menuHide && (
          <SideMenu
            handleOnClick={handleOnClick}
            handleDrawerClose={handleDrawerClose}
            open={matches ? !open : open}
            handleDrawerOpen={handleDrawerOpen}
            hideMenuXs={xsOpen}
            handleCloseXs={() => setXsOpen(false)}
            updateOrderQuery={updateOrderQuery}
            updateProductQuery={updateProductQuery}
            updateProductLibraryQuery={updateProductLibraryQuery}
          />
        )}
        <main className={`${classes.content} ${className}`}>
          <Grid container className={classes.layoutGrid}>
            {children}
          </Grid>
        </main>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  userAccountDetails: state.user.userAccountDetails,
  userDetails: state.user.userDetails,
  categories: state?.category?.category?.response?.categories,
  duplicateProductDetails: state?.productLibrary?.updateDetails,
  userSessionShopify: state?.user?.userSessionShopify,
  shopifyAuth: state?.shopify?.shopifyAuth
})

const mapDispatchToProps = {
  getAccontDetails,
  updateField,
  getAllCategory,
  updateOrderQuery,
  updateProductQuery,
  updateProductLibraryQuery,
  getUserSessionShopify,
  signoutHandler,
  getStatusApi
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
