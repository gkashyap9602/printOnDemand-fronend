import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField
} from '@material-ui/core'

import style from '../style'
import Icon from 'icomoons/Icon'
import Modal from 'components/modal'
import EditAddress from '../editAddress'
import { connect } from 'react-redux'
import { updateAddresses, fetchShippingMethods } from 'redux/actions/orderActions'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { checkIfEmpty } from 'utils/helpers'
import Select from 'components/select/index'
const useStyles = style

/**
 * EditOrderDetail
 * @param {*} param0
 * @returns
 */
const EditOrderDetail = ({
  updateAddresses,
  fetchShippingMethods,
  address,
  handleSubmit,
  orderDetail = {},
  isProduction = false
}) => {
  const classes = useStyles()
  const [value, setValue] = useState('test')
  const [isChecked, setisChecked] = useState(false)
  const [addresses, setaddresses] = useState({})
  const [editActive, setEditActive] = useState(false)
  const [shippingMethod, setShippingMethod] = useState()
  const [shippingMethodAccountNumber, setShippingMethodAccountNumber] = useState('')
  const [shippingOptions, setShippingOptions] = useState()
  const [toggleModal, setToggleModal] = useState(false)

  /**
   * Handle change
   * @param {*} event
   */
  const handleChange = (event) => {
    if (!isProduction) setValue(event.target.value)
  }

  /**
   * Handle edit
   */
  const handleEdit = () => {
    setEditActive(!editActive)
    setToggleModal(true)
  }
  /**
   * handle address
   */
  useEffect(() => {
    if (!checkIfEmpty(orderDetail)) {
      setValue(orderDetail?.orderType === 1 ? 'live' : 'test')
      setShippingMethodAccountNumber(orderDetail?.shippingAccountNumber)
      if (shippingOptions && shippingOptions.length) {
        const methodId = shippingOptions.find(
          (ele) => ele.label === orderDetail?.shippingMethodName
        )
        setShippingMethod(methodId?.value)
      }
      updateAddresses({
        billingAddress: {
          ...orderDetail?.billingAddress,
          contactName: orderDetail?.billingAddress?.name,
          stateName: orderDetail?.billingAddress?.state
        },
        shippingAddress: {
          ...orderDetail?.shippingAddress,
          contactName: orderDetail?.shippingAddress?.name,
          stateName: orderDetail?.shippingAddress?.state
        }
      })
    }
  }, [orderDetail, shippingOptions])

  /**
   * On change address
   */
  useEffect(() => {
    if (!checkIfEmpty(address)) {
      setaddresses({
        shippingAddress: address?.shippingAddress,
        billingAddress: address?.billingAddress
      })
    }
  }, [address])

  /**
   * On change
   */
  useEffect(async () => {
    const res = await fetchShippingMethods()
    let optionList = []
    if (200 <= res.statusCode) {
      if (res.response && res.response.length) {
        res.response.map(
          (method) =>
            (optionList = [
              ...optionList,
              { value: method?.id, label: method?.name, shipMethod: method?.shipMethod }
            ])
        )
        setShippingOptions(optionList)
        setShippingMethod(optionList.find((option) => option.shipMethod === 'GS1')?.value)
      }
    }
  }, [])

  // modal popup
  const handleModalClose = () => {
    setToggleModal(false)
  }
  /**
   * handleCheck
   * @param {*} e
   */
  const handleCheck = (e) => {
    if (!isProduction) {
      setisChecked(!isChecked)
      e?.target?.checked
        ? updateAddresses({
            shippingAddress: addresses?.shippingAddress,
            billingAddress: addresses?.shippingAddress
          })
        : updateAddresses({
            shippingAddress: address?.shippingAddress,
            billingAddress: orderDetail?.billingAddress || address?.billingAddress
          })
    }
  }

  /**
   * handleSubmitOrder
   */
  const handleSubmitOrder = () => {
    handleSubmit({
      orderType: value === 'test' ? 2 : 1,
      shippingMethodId: shippingMethod,
      shippingAccountNumber: shippingMethodAccountNumber
    })
    setShippingMethodAccountNumber('')
  }

  // modal popup
  return (
    <div className={classes.billingRow}>
      <div className={classes.row_BtmHead}>
        <div className={classes.row_Btm}>
          <div className={classes.InfoHeader}>
            <div className={classes.Info_Label}>
              <Typography variant='body2'>
                <span>
                  <Icon icon='shipping-info' size={20} color='#8a8a9e' />
                </span>
                Shipping information
              </Typography>
            </div>
            <div className={classes.Edit_XsBtn}>
              <Button
                type='submit'
                variant='outlined'
                className={classes.editBtn}
                startIcon={<Icon icon='edit-icon' size={18} color='#8a8a9e' />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className={classes.addressDetail}>
            <Typography variant='body1'>
              <div>
                {addresses?.shippingAddress?.contactName || addresses?.shippingAddress?.name}
              </div>
              <div>{addresses?.shippingAddress?.companyName}</div>
              <div>{addresses?.shippingAddress?.address1}</div>
              <div>{addresses?.shippingAddress?.address2}</div>
              <>
                {addresses?.shippingAddress?.city},
                {addresses?.shippingAddress?.stateName || addresses?.shippingAddress?.state},
                {addresses?.shippingAddress?.country},{addresses?.shippingAddress?.zipCode},
              </>
            </Typography>
            <Typography variant='body1'>
              Phone: {addresses?.shippingAddress?.contactPhone}
            </Typography>
            <Typography variant='body1'>
              Email Address: {addresses?.shippingAddress?.companyEmail}
            </Typography>
          </div>
          <div className={classes.checkedLabel}>
            <FormControlLabel
              control={
                <Checkbox
                  name={'same'}
                  checked={isChecked}
                  onChange={handleCheck}
                  checkedIcon={<CheckIcon fontSize='medium' />}
                  icon={<RadioButtonUncheckedIcon color='primary' />}
                />
              }
              label={'Billing information is same as shipping information'}
            />
          </div>
        </div>
        <div className={classes.row_Btm}>
          <div className={classes.InfoHeader}>
            <div className={classes.Info_Label}>
              <Typography variant='body2'>
                <span>
                  <Icon icon='billing-info' size={20} color='#8a8a9e' />
                </span>
                Billing information
              </Typography>
            </div>
          </div>
          {!checkIfEmpty(addresses?.billingAddress) ? (
            <div className={classes.addressDetail}>
              <Typography variant='body1'>
                <div>
                  {addresses?.billingAddress?.contactName || addresses?.billingAddress?.name}
                </div>
                <div>{addresses?.billingAddress?.companyName}</div>
                <div>{addresses?.billingAddress?.address1}</div>
                <div>{addresses?.billingAddress?.address2}</div>
                <>
                  {addresses?.billingAddress?.city},
                  {addresses?.billingAddress?.stateName || addresses?.billingAddress?.state},
                  {addresses?.billingAddress?.country},{addresses?.billingAddress?.zipCode},
                </>
              </Typography>
              <Typography variant='body1'>
                Phone: {addresses?.billingAddress?.contactPhone}
              </Typography>
              <Typography variant='body1'>
                Email Address: {addresses?.billingAddress?.companyEmail}
                {isChecked}
              </Typography>
            </div>
          ) : (
            <div className={classes.textAddress}>No address found</div>
          )}
        </div>
      </div>
      {!isProduction && (
        <>
          <div className={classes.shippingForm_Field}>
            <Select
              options={shippingOptions}
              selectedValue={shippingMethod}
              placeholder='Select method'
              label='Shipping method'
              onChange={(e) => {
                setShippingMethodAccountNumber('')
                setShippingMethod(e.target.value)
              }}
            />
            {shippingMethod !== 1 && shippingMethod !== undefined && (
              <TextField
                variant='outlined'
                type={'text'}
                onChange={(e) => setShippingMethodAccountNumber(e.target.value)}
                placeholder='Shipping account number'
                value={shippingMethodAccountNumber}
                style={{ marginTop: '10px' }}
                fullWidth
                InputLabelProps={{
                  shrink: false
                }}
              />
            )}
          </div>
          <div className={classes.btnGrup_Radio}>
            <RadioGroup aria-label='order' name='order1' value={value} onChange={handleChange}>
              <FormControlLabel
                value='test'
                control={<Radio color='primary' />}
                label='Test order'
              />
              <FormControlLabel
                value='live'
                control={<Radio color='primary' />}
                label='Live order'
              />
            </RadioGroup>
          </div>
          <div className={classes.btnPlaceOrder}>
            <Button type='submit' variant='contained' fullWidth onClick={() => handleSubmitOrder()}>
              Update order
            </Button>
          </div>
        </>
      )}

      {/* <!--modal--> */}
      {toggleModal && (
        <Modal open={toggleModal} handleClose={handleModalClose} title='Edit address'>
          <EditAddress
            addresses={addresses}
            isEdit={true}
            orderDetail={orderDetail}
            showBilling={!isProduction}
            isChecked={isChecked}
            editActive={editActive}
            handleCheck={(e) => setisChecked(e.target.checked)}
            handleClose={() => {
              setToggleModal(false)
            }}
          />
        </Modal>
      )}
      {/* <!--modal--> */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  address: state.orderReducer?.address
})

const mapDispatchToProps = {
  updateAddresses,
  fetchShippingMethods
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderDetail)
