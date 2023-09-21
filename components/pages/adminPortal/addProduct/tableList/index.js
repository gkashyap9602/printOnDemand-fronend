import React from 'react'
import { Paper, Table, TableContainer } from '@material-ui/core'
import TableHeadList from './tableHead'
import TableBodyList from './tableBody'
import style from './style'

const useStyles = style
const TableList = ({
  tabClassName,
  tabHeadClassName,
  tableDetails = [],
  rowCount = 1,
  deleteRow = () => {},
  tableValuesCB = () => {},
  templateUploaderCB = () => {},
  saveRowDataCB = () => {},
  removeTemplate = () => {}
}) => {
  const classes = useStyles()
  return (
    <div className={classes.TabContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHeadList tableDetails={tableDetails} tabHeadClassName={tabHeadClassName} />

          <TableBodyList
            rowCount={rowCount}
            tableDetails={tableDetails}
            tabClassName={tabClassName}
            deleteRow={deleteRow}
            tableValuesCB={tableValuesCB}
            templateUploaderCB={templateUploaderCB}
            saveRowDataCB={saveRowDataCB}
            removeTemplate={removeTemplate}
          />
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableList
