import { ClickAwayListener } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Grid } from '@material-ui/core'
import { style } from 'styles/pushDelay'
import Select from 'react-select'

const useStyles = style

function StoreUploadsFilter({
  apiCall = () => {},
  handleClose = () => {},
  appliedDate,
  className,
  setfilter = () => {},
  storeList
}) {
  const [from, setFrom] = useState('')
  const [to, setto] = useState('')
  const classes = useStyles()
  const [options, setOptions] = useState([])
  const [filterStores, setFilterStores] = useState([])

  useEffect(() => {
    setFrom(appliedDate?.from)
    setto(appliedDate?.to)
    setFilterStores(appliedDate?.filterStores)
  }, [])

  useEffect(() => {
    if (storeList && storeList.length > 0) {
      let optionList = []
      storeList.map(
        (store) => (optionList = [...optionList, { value: store?.id, label: store?.storeName }])
      )
      setOptions(optionList)
    }
  }, [storeList])

  const handleChangeSelect = (value) => {
    setFilterStores(value)
  }
  return (
    <ClickAwayListener onClickAway={() => setfilter(false)}>
      <div className={`${classes.delayContainer} ${classes.filter_Wrap} ${className}`}>
        <h2 style={{ marginTop: 8 }}>Filter</h2>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <label>Date</label>
            <ReactDatePicker
              className={classes.ab}
              placeholderText='From'
              selected={from}
              onChange={(date) => {
                setFrom(date)
              }}
              maxDate={new Date()} // add this in your date componet
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <label className={classes.XsLabelDate}>&nbsp;</label>
            <ReactDatePicker
              maxDate={new Date()} // add this in your date componet
              minDate={from} // add this in your date componet
              placeholderText='To'
              selected={to}
              onChange={(date) => {
                setto(date)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <label>Stores</label>
            <Select
              options={options}
              placeholder='Select stores'
              value={filterStores}
              onChange={handleChangeSelect}
              isMulti
              className={classes.multiSelect_Filter}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: 'none',
                  borderColor: state.isFocused && '#e1e1e1',
                  border: '1px solid #e1e1e1!important',
                  borderRadius: 10,
                  marginTop: '8px',
                  marginBottom: '8px'
                })
              }}
            />
          </Grid>
        </Grid>
        <div className={classes.btnFormAction}>
          <Button
            label={'Submit'}
            variant='contained'
            onClick={() => {
              apiCall({ from, to, filterStores })
            }}
            className={classes.btnFiltSubmit}
          >
            Submit
          </Button>
          <Button
            label={'Submit'}
            variant='outlined'
            onClick={() => {
              setFrom('')
              setto('')
              handleClose()
            }}
            className={classes.btnFiltReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default StoreUploadsFilter
