import React from 'react'
import { TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import style from './style'

const styles = style
const TableHeadList = ({ tabHeadClassName, tableDetails }) => {
  const classes = styles()
  return (
    <TableHead>
      <TableRow>
        {tableDetails['titles']?.map((item) => {
          return (
            <TableCell key={item.title}>
              <Typography variant='body1' className={classes.TextStyle}>
                {item.title}
              </Typography>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default TableHeadList
