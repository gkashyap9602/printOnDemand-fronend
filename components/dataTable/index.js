import React from 'react'
import { Paper, Table, TableContainer } from '@material-ui/core'
import TableHeader from './tableHeader'
import TableBodyContent from './tableBody'
import style from './style'

const useStyles = style
const DataTable = ({
  sortFunction = () => {},
  statusChanger = () => {},
  lists = [],
  tableTitles = [],
  statusLoader = 0,
  options = [],
  tableLoader = false,
  isExtraFieldReq = false,
  isSelectAllReq = true,
  nodataMessage = null,
  isCheck = false,
  checkBoxHandler = () => {},
  selectAllField = () => {},
  isSort,
  className,
  isProductDetail = false,
  PageId = '',
  collapse = false,
  isAscDescSort = false
}) => {
  const classes = useStyles()
  return (
    <div className={classes.TabContainer}>
      <TableContainer component={Paper}>
        <Table className={`${classes.table} ${className}`}>
          <TableHeader
            tableTitles={tableTitles}
            collapse={collapse}
            isSelectAllReq={isSelectAllReq}
            sortFunction={sortFunction}
            isExtraFieldReq={isExtraFieldReq}
            checkBoxHandler={selectAllField}
            isCheck={isCheck}
            isProductDetail={isProductDetail}
            PageId={PageId}
            lists={lists}
            options={options}
            isSort={isSort}
            isAscDescSort={isAscDescSort}
          />

          <TableBodyContent
            lists={lists}
            statusChanger={statusChanger}
            statusLoader={statusLoader}
            options={options}
            collapse={collapse}
            nodataMessage={nodataMessage}
            tableTitles={tableTitles}
            isExtraFieldReq={isExtraFieldReq}
            tableLoader={tableLoader}
            isCheck={isCheck}
            checkBoxHandler={checkBoxHandler}
          />
        </Table>
      </TableContainer>
    </div>
  )
}

export default DataTable
