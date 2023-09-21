import React, { useState, useEffect } from 'react'
import {
  ClickAwayListener,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Grid
} from '@material-ui/core'

import 'react-datepicker/dist/react-datepicker.css'

import clsx from 'clsx'
import { style } from 'styles/pushDelay'
const useStyles = style

function ProductSort({ apiCall = () => {}, handleClose = () => {}, apiQuery }) {
  const [sortByName, setSortByName] = useState('asc')
  const [sortByCost, setSortByCost] = useState('')
  const classes = useStyles()

  const handleChangeName = (event) => {
    setSortByCost('')
    setSortByName(event.target.value)
  }
  const handleChangeCost = (event) => {
    setSortByName('')
    setSortByCost(event.target.value)
  }
  useEffect(() => {
    if (apiQuery?.sortColumn === 'title') {
      setSortByCost('')
      if (apiQuery?.sortDirection === 'asc') {
        setSortByName('asc')
      } else {
        setSortByName('desc')
      }
    } else {
      setSortByName('')
      if (apiQuery?.sortDirection === 'asc') {
        setSortByCost('asc')
      } else {
        setSortByCost('desc')
      }
    }
  }, [apiQuery])
  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <div className={`${classes.delayContainer} ${classes.product_Wrap_Sort}`}>
        <h2 style={{ marginTop: 8 }}>Sort</h2>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <label>Sort by name</label>
            <RadioGroup
              aria-label='order'
              name='order1'
              value={sortByName}
              onChange={handleChangeName}
              className={classes.filtRadioGrup}
            >
              <FormControlLabel value={'asc'} control={<Radio color='primary' />} label='A to Z' />
              <FormControlLabel value={'desc'} control={<Radio color='primary' />} label='Z to A' />
            </RadioGroup>
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
            <label>Sort by cost</label>
            <RadioGroup
              aria-label='order'
              name='order2'
              value={sortByCost}
              onChange={handleChangeCost}
              className={classes.filtRadioGrup}
            >
              <FormControlLabel
                value={'asc'}
                control={<Radio color='primary' />}
                label='Low to high'
              />
              <FormControlLabel
                value={'desc'}
                control={<Radio color='primary' />}
                label='High to low'
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <div className={clsx(classes.btnFormAction, classes.sort_Order_Btn)}>
          <Button
            label={'Submit'}
            variant='contained'
            onClick={() => {
              apiCall({ sortByName, sortByCost })
            }}
            className={classes.btnFiltSubmit}
          >
            Submit
          </Button>
          <Button
            label={'Submit'}
            variant='outlined'
            onClick={() => {
              setSortByName('asc')
              setSortByCost('')
              apiCall({ sortByName: 'asc', sortByCost: '' })
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

export default ProductSort
