import React, { useState } from 'react'

import DataTable from 'components/dataTable'
import { TABLE_TITLES } from 'constants/tableValue'
import style from '../../product/productDetails/style'
import { Button, Typography } from '@material-ui/core'
import { NotificationManager } from 'react-notifications'

import { useSelector, useDispatch } from 'react-redux'

import { selectProductSizesForPrint } from 'redux/actions/designToolActions'

const useStyles = style
const SizeSelect = ({ setSection, onClose, productVariants, isCheck, setIsCheck }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const handleNext = () => {
    setSection(1)
    dispatch(selectProductSizesForPrint(isCheck))
  }
  const selectAllField = (e) => {
    if (e.target.checked) {
      const allChecked = productVariants
        .map((val) => val?.designerAvailable && val?.guid)
        ?.filter((v) => v)
      setIsCheck(allChecked)
    } else {
      setIsCheck([])
    }
  }
  const checkBoxHandler = (e, list) => {
    if (list?.designerAvailable) {
      if (isCheck?.includes(list.guid)) {
        const valueUpdated = isCheck.filter((item) => item !== list.guid)
        setIsCheck(valueUpdated)
      } else {
        setIsCheck([...isCheck, list.guid])
      }
    } else {
      NotificationManager.warning(
        'Designing feature is not available for this product',
        ' ',
        ' 2000'
      )
    }
  }
  return (
    <div>
      <div className={classes.textHeader} style={{ marginBottom: '20px' }}>
        <Typography variant='h3'>Select size(s) to print</Typography>
      </div>
      <DataTable
        isExtraFieldReq={true}
        isCheck={isCheck}
        checkBoxHandler={checkBoxHandler}
        selectAllField={selectAllField}
        isSelectAllReq={true}
        nodataMessage='Variants are not available'
        checkIfDisable={true}
        collapse={true}
        isProductDetail={true}
        tableTitles={TABLE_TITLES.PRODUCT_SIZE}
        lists={productVariants}
        className={classes.tablePad}
        PageId={'dtool_page'}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '15px'
        }}
      >
        <Button className={classes.btnCancel} onClick={onClose}>
          Cancel
        </Button>
        <Button
          className={classes.btnApprove}
          variant='contained'
          onClick={handleNext}
          disabled={isCheck.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default React.memo(SizeSelect)
