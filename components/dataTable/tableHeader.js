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
  collapse = false,
  isSort
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
                      checked={lists?.length && isCheck?.length === lists?.length}
                    />
                  }
                />
              </div>
            )}
          </TableCell>
        )}
        {tableTitles?.map((tableTitleObj) => (
          <TableCell
            onClick={tableTitleObj?.sortName ? () => sortFunction(tableTitleObj) : null}
            key={tableTitleObj.id}
            className={tableTitleObj?.lgWidth ? classes.width : ''}
          >
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant='body1' className={classes.TextStyle}>
                {tableTitleObj.name}
              </Typography>
              {tableTitleObj?.sortName ? (
                <span style={{ display: 'flex', cursor: 'pointer' }}>
                  {isSort === tableTitleObj?.id ? (
                    tableTitleObj?.isAscending ? (
                      <Icon icon='sort-up' size={16} color='#717171' />
                    ) : (
                      <Icon icon='sort-down' size={16} color='#717171' />
                    )
                  ) : (
                    <Fragment>
                      <Icon icon='sort-up' size={14} color='#9f9f9f' />
                      <Icon icon='sort-down' size={14} color='#9f9f9f' />
                    </Fragment>
                  )}
                </span>
              ) : null}
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
        {collapse && (
          <TableCell className={classes.tabCheck}>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
