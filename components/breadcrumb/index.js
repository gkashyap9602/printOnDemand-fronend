import React from 'react'
import { Breadcrumbs, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

// import Icon from 'icomoons/Icon'
import style from './style'
import { isActiveInternet } from '../../utils/helpers'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

const useStyles = style

const BreadCrumb = ({ routes, updateProductQuery = () => {} }) => {
  const router = useRouter()
  const classes = useStyles()
  const redirectUser = (route) => {
    isActiveInternet(router, route.link)
    if (route?.isClearTheQuery) {
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
  }

  return (
    <div className={classes.breadCrumb_Root}>
      <Breadcrumbs separator='>>' aria-label='breadcrumb'>
        {routes?.filter(Boolean)?.map((route) =>
          route?.link ? (
            <TooltipBootstrap title={route?.name} placement='bottom'>
              <span color='inherit' onClick={() => redirectUser(route)}>
                <a className={classes.crumb_Link}>{route?.name}</a>
              </span>
            </TooltipBootstrap>
          ) : (
            <TooltipBootstrap title={route?.name} placement='bottom'>
              <Typography color='textPrimary'>{route?.name}</Typography>
            </TooltipBootstrap>
          )
        )}
      </Breadcrumbs>
    </div>
  )
}

export default React.memo(BreadCrumb)
