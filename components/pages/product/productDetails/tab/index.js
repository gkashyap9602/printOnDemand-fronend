import style from './style'
const useStyles = style
import { Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import * as React from 'react'
import { checkIfEmpty } from 'utils/helpers'

export default function ProductTab({ product }) {
  const [value, setValue] = React.useState('process')
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  React.useEffect(() => {
    if (!checkIfEmpty(product)) {
      if (!checkIfEmpty(product?.process)) setValue('process')
      else if (!checkIfEmpty(product?.features)) setValue('features')
      else if (!checkIfEmpty(product?.careInstructions)) setValue('careInstructions')
      else if (!checkIfEmpty(product?.longDescription)) setValue('longDescription')
    }
  }, [product])

  return (
    <div className={classes.tabWrapper}>
      {!checkIfEmpty(product) && (
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='product tabs'
            centered
            indicatorColor='secondary'
          >
            <Tab
              label='Process'
              value='process'
              className={checkIfEmpty(product?.process) ? classes.hide : ''}
            />
            <Tab
              label='Features'
              value='features'
              className={checkIfEmpty(product?.features) ? classes.hide : ''}
            />
            <Tab
              label='Care & cleaning'
              value='careInstructions'
              className={checkIfEmpty(product?.careInstructions) ? classes.hide : ''}
            />
            <Tab
              label='Product Details'
              value='longDescription'
              className={checkIfEmpty(product?.longDescription) ? classes.hide : ''}
            />
          </TabList>
          <div className={classes.rootPanel}>
            <TabPanel value='process'>{product?.process}</TabPanel>
            <TabPanel value='features'>{product?.features}</TabPanel>
            <TabPanel value='careInstructions'>{product?.careInstructions}</TabPanel>
            <TabPanel value='longDescription'>{product?.longDescription}</TabPanel>
          </div>
        </TabContext>
      )}
    </div>
  )
}
