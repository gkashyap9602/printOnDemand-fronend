import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { isActiveInternet, isShopifyApp } from '../../../utils/helpers'
import Icon from 'icomoons/Icon'
import style from '../style'
import { useRouter } from 'next/router'
import { ISSERVER } from 'constants/routePaths'

const useStyles = style

const userMenuList = (isSessionIdsFromShopify) => {
  return [
    { icon: 'orders', label: 'Orders', link: '/orders', iconFilled: 'orders-filled' },
    { icon: 'catalog', label: 'Catalog', link: '/catalog', iconFilled: 'catalog' },
    // { icon: 'design_service', label: 'Designer', link: '/designTool', iconFilled: 'design-filled' },
    {
      icon: 'product',
      label: 'Product library',
      link: '/productlibrary',
      iconFilled: 'product-filled'
    },
    !isSessionIdsFromShopify && {
      icon: 'stores',
      label: 'Stores',
      link: '/store',
      iconFilled: 'stores'
    },
    { icon: 'invoice', label: 'Invoices', link: '/comingSoon', iconFilled: 'invoice-filled' }
  ]
}
const adminMenuList = [
  {
    icon: 'total-outlined',
    label: 'Customers',
    link: '/admin/customerList',
    iconFilled: 'total-filled'
  },
  { icon: 'product', label: 'Catalog', link: '/admin/catalogList', iconFilled: 'product-filled' },
  { icon: 'orders', label: 'Orders', link: '/admin/orders', iconFilled: 'orders-filled' }
]

const MenuItem = ({
  handleOnClick = () => {},
  updateOrderQuery = () => {},
  updateProductQuery = () => {},
  updateProductLibraryQuery = () => {}
}) => {
  const classes = useStyles()
  const router = useRouter()
  const [menuList, setMenuList] = useState([])
  const [isAdminPage, setIsAdminPage] = useState(false)
  const isSessionIdsFromShopify = useSelector((state) => state?.shopify?.shopifyAuth?.shop)
  const userSessionShopify = useSelector((state) => state?.user?.userSessionShopify)
  const userDetails = useSelector((state) => state?.user?.userDetails)
  const [userSession, setUserSession] = useState()

  useEffect(() => {
    if (!ISSERVER && !isShopifyApp()) {
      JSON.parse(localStorage.getItem('userSession')) &&
        setUserSession(JSON.parse(localStorage.getItem('userSession')))
    } else if (userSessionShopify && userSessionShopify?.response) {
      setUserSession(userSessionShopify.response)
    }
  }, [userSessionShopify])

  useEffect(() => {
    if (userDetails?.userType) {
      const { userType } = userDetails
      if (userType === 2) {
        setMenuList(adminMenuList)
        setIsAdminPage(true)
      }
      if (userType === 3) {
        setMenuList(userMenuList(isSessionIdsFromShopify)?.filter((el) => el !== undefined))
        setIsAdminPage(false)
      }
    }
  }, [isSessionIdsFromShopify, userDetails])

  const routeHandler = (item) => {
    if (item.link === '/orders') {
      updateOrderQuery({
        pageIndex: 0,
        pageSize: 10,
        sortColumn: 'orderDate',
        sortDirection: 'desc',
        status: null
      })
    }
    if (item.link === '/catalog') {
      updateProductQuery(
        {
          pageIndex: 0,
          pageSize: 10,
          sortColumn: 'title',
          sortDirection: 'asc'
        },
        false
      )
    }
    if (item.link === '/productlibrary') {
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
    }
    isActiveInternet(router, item.link)
  }

  return (
    <>
      {menuList
        ?.filter((data) => data)
        ?.map((item, i) => (
          <span onClick={() => routeHandler(item)} passHref className={classes.MenuTypo} key={`menuitem-${i}`}>
            <ListItem
              onClick={() => handleOnClick(item.link)}
              button
              className={
                router.pathname === item.link || router?.asPath?.search(item.link) >= 0
                  ? classes.MenuActive
                  : ''
              }
            >
              <ListItemIcon>
                <Icon
                  icon={
                    router.pathname === item.link || router?.asPath?.search(item.link) >= 0
                      ? item.iconFilled
                      : item.icon
                  }
                  size={
                    router.pathname === item.link || router?.asPath?.search(item.link) >= 0
                      ? 34
                      : 22
                  }
                  className={
                    router.pathname === item.link || router?.asPath?.search(item.link) >= 0
                      ? classes.IconActive
                      : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary={item.label} className={classes.menuList_Label} />
            </ListItem>
          </span>
        ))}
    </>
  )
}
export default MenuItem
