import React, { Fragment } from 'react'
import {
  TableCell,
  TableHead,
  TableRow,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import style from './style'
import Icon from 'icomoons/Icon'
import { checkIfEmpty } from 'utils/helpers'

const useStyles = style
const TableHeader = ({
  isCheck = false,
  tableTitles = [],
  sortFunction = () => {},
  isSelectAllReq = true,
  isExtraFieldReq = false,
  checkBoxHandler = () => {},
  options = [],
  lists = [],
  PageId = '',
  collapse = false,
  isSort,
  isAscDescSort = false
}) => {
  const classes = useStyles()

  return (
    <TableHead className={classes.table_Header}>
      <TableRow>
        {isExtraFieldReq && (
          <TableCell className={classes.tabCheck}>
            {isSelectAllReq && (
              <div className={classes.bgCheckBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='cutomerStatusChanger'
                      checkedIcon={<CheckIcon fontSize='medium' />}
                      icon={<RadioButtonUncheckedIcon color='primary' />}
                      onChange={(e) => checkBoxHandler(e)}
                      checked={
                        lists?.length &&
                        isCheck?.length !== 0 &&
                        isCheck?.length ===
                          (PageId === 'order_page'
                            ? lists.filter((ele) => ele?.source !== 5)?.length
                            : PageId === 'store_uploads'
                            ? lists.filter((ele) => ele?.pushStatus === 4)?.length
                            : PageId === 'product_variant'
                            ? lists.filter((ele) => !ele?.isProductVariantDeleted)?.length
                            : PageId === 'dtool_page'
                            ? lists.filter((ele) => ele?.designerAvailable)?.length
                            : lists?.length)
                      }
                    />
                  }
                />
              </div>
            )}
          </TableCell>
        )}
        {tableTitles?.map((tableTitleObj) => (
          <TableCell
            key={tableTitleObj.id}
            onClick={!isAscDescSort ? () => sortFunction(tableTitleObj) : null}
            className={
              (tableTitleObj?.lgWidth ? classes.width : '',
              tableTitleObj?.headerClassName && classes.widthMediaLg)
            }
          >
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant='body1' className={classes.TextStyle}>
                {tableTitleObj.name}
              </Typography>
              {isAscDescSort && tableTitleObj?.sortName && (
                <div style={{ display: 'flex' }}>
                  <Icon
                    style={{ cursor: 'pointer' }}
                    icon='sort-up'
                    size={14}
                    color={tableTitleObj?.isAscending === 'asc' ? '#717171' : '#9f9f9f'}
                    onClick={() => sortFunction(tableTitleObj, 'asc')}
                  />
                  <Icon
                    icon='sort-down'
                    size={14}
                    color={tableTitleObj?.isAscending === 'desc' ? '#717171' : '#9f9f9f'}
                    onClick={() => sortFunction(tableTitleObj, 'desc')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>
          </TableCell>
        ))}
        {!checkIfEmpty(options) && (
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant='body1' className={classes.TextStyle}>
                Actions
              </Typography>
            </div>
          </TableCell>
        )}
        {collapse && <TableCell className={classes.tabCheck}></TableCell>}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
