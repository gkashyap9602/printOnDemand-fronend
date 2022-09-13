import React, { useEffect } from 'react'
import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import Icon from 'icomoons/Icon'
import ShippingForm from './shippingForm'
import style from './style'
import BillingForm from './billingForm'
const useStyles = style
/**
 * TabPanel
 * @param {*} props
 * @returns
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
// tabs

const EditAddress = ({
  addresses,
  isChecked = false,
  handleCheck,
  handleClose,
  showBilling = true,
  billingAddressUser = {},
  orderDetail = {},
  isEdit = false,
  editActive
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  /**
   * handleChange
   * @param {*} event
   * @param {*} newValue
   */
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  /**
   * Initialy set tab to 0
   */
  useEffect(() => {
    setValue(0)
  }, [])

  // tabs
  return (
    <div className={classes.EditAddress_Popup}>
      <Tabs value={value} onChange={handleChange} aria-label='Address Tab' centered>
        <Tab
          icon={
            <div className={classes.tab_Icon}>
              <Icon icon='shipping-info' size={18} color='#8a8a9e' />
            </div>
          }
          label='Shipping information'
          {...a11yProps(0)}
        />
        <Tab label='' disabled className={classes.tabHorizonLine} />
        <Tab
          icon={
            <div className={classes.tab_Icon}>
              <Icon icon='billing-info' size={18} color='#8a8a9e' />
            </div>
          }
          label='Billing information'
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabPanel_address}>
        <ShippingForm
          shippingAddress={addresses?.shippingAddress}
          billingAddress={addresses?.billingAddress}
          billingAddressUser={billingAddressUser}
          isChecked={isChecked}
          isEdit={isEdit}
          orderDetail={orderDetail}
          handleCheck={handleCheck}
          handleClose={handleClose}
          editActive={editActive}
          showBilling={showBilling}
        />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel_address}>
        <BillingForm
          shippingAddress={addresses?.shippingAddress}
          billingAddress={addresses?.billingAddress}
          isChecked={isChecked}
          handleCheck={handleCheck}
          showBilling={showBilling}
          handleClose={handleClose}
          editActive={editActive}
        />
      </TabPanel>
    </div>
  )
}

export default EditAddress
