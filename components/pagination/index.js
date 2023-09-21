import React, { Fragment, useState, useEffect } from 'react'
import { usePagination } from '@material-ui/lab/Pagination'
import IconButton from '@material-ui/core/IconButton'
import { Box, Select, MenuItem } from '@material-ui/core'

import Icon from 'icomoons/Icon'
import style from './style'

const useStyles = style

const Pagination = ({
  currentPage = 1,
  pageSize,
  handlePageNation,
  handlePageSizeChange,
  totalCount
}) => {
  const [totalPages, setTotalPages] = useState(0)
  const classes = useStyles()
  const { items } = usePagination({
    count: totalPages,
    page: currentPage + 1
  })

  useEffect(() => {
    const totalPages = Math.ceil(totalCount / pageSize)
    setTotalPages(totalPages)
  }, [totalCount, pageSize])

  return (
    <nav className={classes.paginationNav}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <div> Go to page</div>

        <ul className={classes.PaginationBlock}>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…'
            } else if (type === 'page') {
              children = (
                <IconButton
                  style={{
                    backgroundColor: selected || item.disabled ? '#e0ebf5' : undefined,
                    border: selected || item.disabled ? 'none' : '1px solid #dddddd',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    fontFamily: 'Inter Medium',
                    fontWeight: 500
                  }}
                  {...item}
                  disabled={selected || item.disabled}
                >
                  {page}
                </IconButton>
              )
            } else {
              children = (
                <IconButton className={classes.buttonWrapper} {...item}>
                  {type === 'previous' ? (
                    <Fragment>
                      <Icon icon='pagination-left' size={28} color='#b0b6ba' />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Icon icon='pagination-right' size={28} color='#b0b6ba' />
                    </Fragment>
                  )}
                </IconButton>
              )
            }
            return (
              <li
                key={index}
                className={
                  selected || item.disabled
                    ? [classes?.disabled, classes.mainWrapper].join(' ')
                    : classes.mainWrapper
                }
                onClick={() => handlePageNation(page)}
              >
                {children}
              </li>
            )
          })}
        </ul>
      </div>
      {pageSize >= 9 && (
        <div className={classes.pageRow}>
          <div>Items per page</div>
          <div style={{ width: 'unset' }}>
            <Select
              className={classes.PaginationSelect}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              value={pageSize}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </div>
        </div>
      )}
    </nav>
  )
}
export default Pagination
