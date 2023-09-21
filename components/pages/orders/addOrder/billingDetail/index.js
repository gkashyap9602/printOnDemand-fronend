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
import { checkIfEmpty, checkifValidUrl, hasWhiteSpace } from 'utils/helpers'
import Select from 'components/select/index'
const useStyles = style

/**
 * BillingDetail
 * @param {*} param0
 * @returns
 */
const BillingDetail = ({
  shippingAddress,
  updateAddresses,
  fetchShippingMethods,
  address,
  handleSubmit,
  billingAddress,
  isEuOrUk = false
}) => {
  const classes = useStyles()
  const [value, setValue] = useState('1')
  const [isChecked, setisChecked] = useState(false)
  const [popupChecked, setpopupChecked] = useState(false)
  const [editActive, setEditActive] = useState(false)
  const [addresses, setaddresses] = useState({
    shippingAddress: shippingAddress,
    billingAddress: billingAddress
  })
  const [shippingMethod, setShippingMethod] = useState()
  const [shippingMethodAccountNumber, setShippingMethodAccountNumber] = useState('')
  const [shippingOptions, setShippingOptions] = useState()
  const [ioss, setioss] = useState('')
  const [receipt, setreceipt] = useState('')
  const [preship, setpreship] = useState('')
  const [error, seterror] = useState({})
  const [customPreship, setcustomPreship] = useState(false)

  /**
   * handleChange
   * @param {*} event
   */
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  /**
   * Update address
   */
  useEffect(() => {
    updateAddresses({
      shippingAddress: { ...shippingAddress, contactPhone: shippingAddress?.companyPhone },
      billingAddress: { ...billingAddress, contactPhone: billingAddress?.companyPhone }
    })
  }, [])

  /**
   * set address to state
   */
  useEffect(() => {
    updateAddresses({ shippingAddress, billingAddress })
  }, [shippingAddress, billingAddress])

  /**
   * Set addresses on change
   */
  useEffect(() => {
    setaddresses({
      shippingAddress: address?.shippingAddress,
      billingAddress: address?.billingAddress
    })
  }, [address])

  useEffect(async () => {
    const res = await fetchShippingMethods()
    let optionList = []
    if (200 <= res.statusCode) {
      if (res.response && res.response.length) {
        res.response.map(
          (method) =>
            (optionList = [
              ...optionList,
              {
                id: method?.id,
                value: method?.shipMethod,
                label: method?.name,
                shipMethod: method?.shipMethod
              }
            ])
        )
        setShippingOptions(optionList)
        setShippingMethod(optionList.find((option) => option.shipMethod === 'GS1')?.shipMethod)
      }
    }
  }, [])

  // modal popup
  const [toggleModal, setToggleModal] = useState(false)

  /**
   * HAndle edit
   */
  const handleEdit = () => {
    setEditActive(!editActive)
    setToggleModal(true)
  }

  /**
   * handleModalClose
   */
  const handleModalClose = () => {
    setToggleModal(false)
  }
  /**
   * handle Check
   */
  const handleCheck = (e) => {
    setisChecked(!isChecked)
    e.target.checked
      ? updateAddresses({
          shippingAddress: address?.shippingAddress,
          billingAddress: address?.shippingAddress
        })
      : updateAddresses({
          shippingAddress: address?.shippingAddress,
          billingAddress: billingAddress
        })
  }
  const handlePopupCheck = (e) => {
    setisChecked(e.target.checked)
  }
  const handleSubmitOrder = () => {
    const shippingMethodId = shippingOptions.find(
      (option) => option.shipMethod === shippingMethod
    )?.id
    const shipMethod = shippingOptions.find(
      (option) => option.shipMethod === shippingMethod
    )?.shipMethod
    handleSubmit({
      OrderType: value,
      ioss: isEuOrUk ? ioss : null,
      receipt: receipt,
      preship: preship,
      shippingMethodId: shippingMethodId,
      shipMethod: shipMethod,
      isPreship:
        shippingOptions.find((option) => option.shipMethod === shippingMethod)?.label === 'PRESHIP',
      shippingAccountNumber: shippingMethodAccountNumber
    })
    // setShippingMethodAccountNumber('')
  }
  useEffect(() => {
    !checkifValidUrl(receipt) && !checkIfEmpty(receipt)
      ? seterror({ ...error, receipt: 'Invalid url' })
      : seterror({ ...error, receipt: hasWhiteSpace(receipt) ? 'Invalid url' : null })
  }, [receipt])

  useEffect(() => {
    !checkifValidUrl(preship) && !checkIfEmpty(preship)
      ? seterror({ ...error, preship: 'Invalid url' })
      : seterror({ ...error, preship: hasWhiteSpace(preship) ? 'Invalid url' : null })
  }, [preship])

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
          {!checkIfEmpty(addresses?.shippingAddress) ? (
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
                Phone:{' '}
                {addresses?.shippingAddress?.contactPhone ||
                  addresses?.shippingAddress?.companyPhone}
              </Typography>
              <Typography variant='body1'>
                Email Address: {addresses?.shippingAddress?.companyEmail}
              </Typography>
            </div>
          ) : (
            <div className={classes.textAddress}>No address found</div>
          )}
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
          {/* {JSON.stringify(Object.values(addresses?.billingAddress).every((v) => checkIfEmpty(v)))} */}
          {!checkIfEmpty(addresses?.billingAddress) ? (
            <div className={classes.addressDetail}>
              {Object.values(addresses?.billingAddress).every((v) => checkIfEmpty(v)) ? (
                <div className={classes.textAddress}>No address found</div>
              ) : (
                <>
                  <Typography variant='body1'>
                    <div>
                      {addresses?.billingAddress?.contactName || addresses?.billingAddress?.name}
                    </div>
                    <div>{addresses?.billingAddress?.companyName}</div>
                    <div>{addresses?.billingAddress?.address1}</div>
                    <div>{addresses?.billingAddress?.address2}</div>
                    <>
                      {addresses?.billingAddress?.city && `${addresses?.billingAddress?.city},`}
                      {addresses?.billingAddress?.stateName &&
                        `${
                          addresses?.billingAddress?.stateName || addresses?.billingAddress?.state
                        },`}
                      {addresses?.billingAddress?.country &&
                        `${addresses?.billingAddress?.country},`}
                      {addresses?.billingAddress?.zipCode &&
                        `${addresses?.billingAddress?.zipCode},`}
                    </>
                  </Typography>
                  <Typography variant='body1'>
                    Phone:{' '}
                    {addresses?.billingAddress?.contactPhone ||
                      addresses?.billingAddress?.companyPhone}
                  </Typography>
                  <Typography variant='body1'>
                    Email Address: {addresses?.billingAddress?.companyEmail}
                  </Typography>
                </>
              )}
            </div>
          ) : (
            <div className={classes.textAddress}>No address found</div>
          )}
        </div>
      </div>
      <Typography variant='body1' className={classes.labelForm}>
        IOSS
      </Typography>
      <TextField
        onChange={(e) => setioss(e?.target?.value)}
        name='ioss'
        type='text'
        disabled={!isEuOrUk}
        value={ioss}
        placeholder='Enter IOSS '
        variant='outlined'
        style={{ marginTop: '10px', marginBottom: 10 }}
        fullWidth
        InputLabelProps={{
          shrink: false
        }}
      />
      <div className={classes.shippingForm_Field}>
        <Select
          options={shippingOptions}
          selectedValue={shippingMethod}
          placeholder='Select method'
          label='Shipping method'
          onChange={(e) => {
            setShippingMethod(e.target.value)
            setShippingMethodAccountNumber()
            if (
              shippingOptions.find((option) => option.shipMethod === e.target.value)?.label ===
              'PRESHIP'
            ) {
              setcustomPreship(true)
            } else {
              setcustomPreship(false)
              setpreship(null)
            }
          }}
        />
        {shippingMethod !== 'GS1' &&
          shippingMethod !== undefined &&
          shippingMethod !== 'PRESHIP' && (
            <TextField
              variant='outlined'
              type={'text'}
              onChange={(e) => setShippingMethodAccountNumber(e.target.value)}
              placeholder='Shipping account number'
              defaultValue={shippingMethodAccountNumber}
              style={{ marginTop: '10px' }}
              fullWidth
              InputLabelProps={{
                shrink: false
              }}
            />
          )}
      </div>
      <div style={{ marginBottom: 10 }}>
        <Typography variant='body1' className={classes.labelForm}>
          Custom packing slips
        </Typography>
        <TextField
          onChange={(e) => setreceipt(e?.target?.value)}
          name='receipt'
          type='text'
          helperText={error?.receipt}
          error={error?.receipt}
          value={receipt}
          placeholder='Enter url '
          variant='outlined'
          style={{ marginTop: '10px' }}
          fullWidth
          InputLabelProps={{
            shrink: false
          }}
        />
      </div>
      {customPreship && (
        <div style={{ marginBottom: 10 }}>
          <Typography variant='body1' className={classes.labelForm}>
            Custom preship labels
          </Typography>
          <TextField
            onChange={(e) => setpreship(e?.target?.value)}
            name='preship'
            type='text'
            value={preship}
            error={error?.preship}
            helperText={error?.preship}
            placeholder='Enter url '
            variant='outlined'
            style={{ marginTop: '10px' }}
            fullWidth
            InputLabelProps={{
              shrink: false
            }}
          />
        </div>
      )}

      <div className={classes.btnGrup_Radio}>
        <RadioGroup aria-label='order' name='order1' value={value} onChange={handleChange}>
          <FormControlLabel value={'2'} control={<Radio color='primary' />} label='Test order' />
          <FormControlLabel value={'1'} control={<Radio color='primary' />} label='Live order' />
        </RadioGroup>
      </div>
      <div className={classes.btnPlaceOrder}>
        <Button
          disabled={error?.preship || error?.receipt}
          type='submit'
          variant='contained'
          fullWidth
          onClick={() => handleSubmitOrder()}
        >
          Place order
        </Button>
      </div>
      {/* <!--modal--> */}
      {toggleModal && (
        <Modal open={toggleModal} handleClose={handleModalClose} title='Edit address'>
          <EditAddress
            addresses={addresses}
            isChecked={isChecked}
            handleCheck={handlePopupCheck}
            billingAddressUser={billingAddress}
            handleClose={() => {
              // setisChecked(false)
              setToggleModal(false)
            }}
            editActive={editActive}
          />
        </Modal>
      )}
      {/* <!--modal--> */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  shippingAddress: state.user.userAccountDetails?.response?.shippingAddress,
  billingAddress: state.user.userAccountDetails?.response?.billingAddress,
  address: state.orderReducer?.address
})

const mapDispatchToProps = {
  updateAddresses,
  fetchShippingMethods
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingDetail)
