import { ClickAwayListener, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Grid } from '@material-ui/core'
import { style } from 'styles/pushDelay'
import Select from 'react-select'
import { checkIfEmpty, daysBtwDate } from 'utils/helpers'
import { NotificationManager } from 'react-notifications'

const useStyles = style

function OrderFilter({
  apiCall = () => {},
  handleClose = () => {},
  appliedFilters,
  setfilter = () => {},
  storeList
}) {
  const [filters, setFilters] = useState({ from: '', to: '', orderType: '0', sources: {} })
  const classes = useStyles()
  const OPTIONS = [
    { label: 'Merch maker', value: '1' },
    { label: 'MWW system', value: '2' },
    { label: 'Shopify', value: '3' },
    // { label: 'Etsy', value: '4' },
    { label: 'Excel upload', value: '5' }
  ]
  useEffect(() => {
    setFilters({
      ...appliedFilters,
      sources: OPTIONS?.find((val) => val?.value === JSON.stringify(appliedFilters?.sources))
    })
  }, [appliedFilters])

  const handleChange = (event) => {
    setFilters({ ...filters, orderType: event.target.value })
  }
  const handleChangeSelect = (value) => {
    setFilters({ ...filters, sources: value })
  }

  return (
    <ClickAwayListener onClickAway={() => setfilter(false)}>
      <div className={`${classes.delayContainer} ${classes.filter_Wrap_UI}`}>
        <h2 style={{ marginTop: 8 }}>Filter</h2>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <label>Date</label>
            <div style={{ height: 10 }} />
            <ReactDatePicker
              placeholderText='From'
              selected={filters?.from}
              onChange={(date) => {
                setFilters({ ...filters, from: date })
              }}
              maxDate={new Date()} // add this in your date componet
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <label className={classes.XsLabelDate}>&nbsp;</label>
            <div style={{ height: 10 }} />
            <ReactDatePicker
              maxDate={new Date()} // add this in your date componet
              minDate={filters?.from} // add this in your date componet
              placeholderText='To'
              selected={filters?.to}
              onChange={(date) => {
                setFilters({ ...filters, to: date })
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
              value={filters?.orderType}
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
            <label>Sources</label>
            <Select
              options={OPTIONS}
              placeholder='Select source'
              value={checkIfEmpty(filters?.sources) ? null : filters?.sources}
              onChange={handleChangeSelect}
              // isMulti
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
              if (daysBtwDate(filters?.to, filters?.from) > 90) {
                NotificationManager.warning(
                  'The maximum date difference that can be accommodated would be 90 days',
                  '',
                  '2000'
                )
              } else {
                apiCall(filters)
              }
            }}
            className={classes.btnFiltSubmit}
          >
            Submit
          </Button>
          <Button
            label={'Submit'}
            variant='outlined'
            onClick={() => {
              setFilters({
                from: new Date(new Date().setDate(new Date().getDate() - 30)),
                to: new Date(),
                orderType: '0',
                sources: {}
              })
              handleClose({
                from: new Date(new Date().setDate(new Date().getDate() - 30)),
                to: new Date(),
                orderType: '0',
                sources: {}
              })
            }}
            className={classes.btnFiltReset}
          >
            Reset
          </Button>
        </div>{' '}
      </div>
    </ClickAwayListener>
  )
}

export default OrderFilter
