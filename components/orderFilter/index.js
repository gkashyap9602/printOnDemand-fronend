import { ClickAwayListener, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Grid } from '@material-ui/core'
import { style } from 'styles/pushDelay'
import Select from 'react-select'
const useStyles = style

/**
 * OrderFilter
 * @param {*} param0
 * @returns
 */
function OrderFilter({
  apiCall = () => {},
  handleClose = () => {},
  appliedDate,
  setfilter = () => {},
  storeList
}) {
  const [from, setFrom] = useState('')
  const [to, setto] = useState('')
  const [orderType, setOrderType] = useState('0')
  const [filterStores, setFilterStores] = useState([])
  const classes = useStyles()
  const [options, setOptions] = useState([])
  useEffect(() => {
    setFrom(appliedDate?.from)
    setto(appliedDate?.to)
    if (appliedDate && appliedDate.orderType) {
      setOrderType(appliedDate.orderType)
    } else {
      setOrderType('0')
    }
    setFilterStores(appliedDate?.filterStores)
  }, [])
  useEffect(() => {
    if (storeList && storeList.length > 0) {
      let optionList = []
      storeList.map(
        (store) => (optionList = [...optionList, { value: store?.guid, label: store?.storeName }])
      )
      setOptions(optionList)
    }
  }, [storeList])
  const handleChange = (event) => {
    setOrderType(event.target.value)
  }
  const handleChangeSelect = (value) => {
    setFilterStores(value)
  }
  /**
   * handle Select all
   * @param {*} e
   * @param {*} item
   */
  return (
    <ClickAwayListener onClickAway={() => setfilter(false)}>
      <div className={`${classes.delayContainer} ${classes.filter_Wrap}`}>
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
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // style={{ paddingTop: 0 }}
          >
            <label>Order type</label>
            <RadioGroup
              aria-label='order'
              name='order1'
              value={orderType}
              onChange={handleChange}
              className={classes.filtRadioGrup}
            >
              <FormControlLabel value={'0'} control={<Radio color='primary' />} label='All' />
              <FormControlLabel
                value={'2'}
                control={<Radio color='primary' />}
                label='Test order'
              />
              <FormControlLabel
                value={'1'}
                control={<Radio color='primary' />}
                label='Live order'
              />
            </RadioGroup>
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
              apiCall({ from, to, orderType, filterStores })
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
              setOrderType('0')
              setFilterStores([])
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

export default OrderFilter
