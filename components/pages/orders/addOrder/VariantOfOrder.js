import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Grid, TextField, Typography } from '@material-ui/core'
import clsx from 'clsx'
import Icon from 'icomoons/Icon'
import style from './style'
import ImageContainer from 'components/imageContainer'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { updateVariantsOfOrders } from 'redux/actions/orderActions'
import { calculateAmountOfOrder, calculateAmountWithQuantity, checkIfEmpty, validateDecimal } from 'utils/helpers'
import { NotificationManager } from 'react-notifications'
import Nodata from 'components/nodata'
const useStyles = style

/**
 * Variant Of Order component
 * @param {*} param0
 * @returns
 */
const VariantOfOrder = ({
  variants,
  orderDetail,
  productId,
  productLibraryVariantLength,
  handleCount = () => { },
  updateVariantsOfOrders,
  isProduction = false,
  isEuOrUk = false

}) => { 
  const classes = useStyles()
  const [count, setCount] = useState(
    variants?.map((value) => ({
      productLibraryVarientId: value?.libraryVariantId,
      quantity: value?.quantity || 1,
      totalPrice: value?.costPrice,
      price: value?.costPrice,
      guid: value?.guid,
      productCode: value?.productCode,
      hsCode: orderDetail?.lineItems?.find(
        (val) => val?.productLibraryVarientId === value?.libraryVariantId
      )?.hsCode,
    declaredValue: orderDetail?.lineItems?.find(
      (val) => val?.productLibraryVarientId === value?.libraryVariantId
    )?.declaredValue,
    }))
  )
  const route = useRouter()
  const [productVariant, setproductVariant] = useState(variants)

  /**
   * Set variant details
   */
  useEffect(() => {
    setproductVariant(variants?.map((value) => ({
     ...value,
      hsCode: orderDetail?.lineItems?.find(
        (val) => val?.productLibraryVarientId === value?.libraryVariantId
      )?.hsCode,
    declaredValue: orderDetail?.lineItems?.find(
      (val) => val?.productLibraryVarientId === value?.libraryVariantId
    )?.declaredValue,
    })))
    setCount(
      variants?.map((value) => ({
        productLibraryVarientId: value?.libraryVariantId,
        quantity: value?.quantity || 1,
        totalPrice: value?.costPrice,
        price: value?.costPrice,
        guid: value?.guid,
        productCode: value?.productCode,
        hsCode: orderDetail?.lineItems?.find(
            (val) => val?.productLibraryVarientId === value?.libraryVariantId
          )?.hsCode,
        declaredValue: orderDetail?.lineItems?.find(
          (val) => val?.productLibraryVarientId === value?.libraryVariantId
        )?.declaredValue,
      }))
    )
  }, [variants])

  /**
   * handle count increment
   * @param {*} variant
   */
  const handleIncrement = (variant) => {
    setCount(
      count.map((item) =>
        item?.productLibraryVarientId === variant.libraryVariantId
          ? {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: calculateAmountWithQuantity(item?.quantity + 1, variant?.costPrice)
          }
          : item
      )
    )
    setproductVariant(
      productVariant.map((item) =>
        item?.libraryVariantId === variant.libraryVariantId
          ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
      )
    )
  }
  /**
   * handle count decrement
   * @param {*} variant
   */
  const handleDecrement = (variant) => {
    setCount(
      count.map((item) =>
        item?.productLibraryVarientId === variant.libraryVariantId
          ? {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: calculateAmountWithQuantity(item?.quantity - 1, variant?.costPrice)
          }
          : item
      )
    )

    setproductVariant(
      productVariant.map((item) =>
        item?.libraryVariantId === variant.libraryVariantId
          ? {
            ...item,
            quantity: item.quantity - 1
          }
          : item
      )
    )
  }

  /**
   * On count change
   */
  useEffect(() => {
    handleCount(count)
  }, [count])

  /**
   * Handel remove variant
   */
  const handleRemove = (variant) => {
    if (
      !checkIfEmpty(
        orderDetail?.lineItems?.find(
          (val) => val?.productLibraryVarientId === variant?.libraryVariantId
        )
      )
    ) {
      const itm = productVariant?.filter(
        (item) => item?.libraryVariantId !== variant?.libraryVariantId
      )
      setCount(count.filter((item) => item?.productLibraryVarientId !== variant.libraryVariantId))
      setproductVariant(itm)
      updateVariantsOfOrders({
        variants: productVariant?.filter(
          (item) => item?.libraryVariantId !== variant?.libraryVariantId
        ),
        productId: productId
      })
    }
  }
  
  const handleChange = (e, variant) => {
    setCount(
      count.map((item) =>
        item?.productLibraryVarientId === variant.libraryVariantId
          ? {
              ...item,
              [e?.target?.name]: e?.target?.value
            }
          : item
      )
    )
    setproductVariant(
      variants.map((item) =>
        item?.guid === variant?.guid
          ? {
              ...item,
              [e?.target?.name]: e?.target?.value
            }
          : item
      )
    )
  }

  //HTML
  return (
    <div className={classes.blockOrder}>
      <Typography variant='body2'>Your order(s)</Typography>
      {checkIfEmpty(variants) ? (
        <Grid container spacing={3} direction='row' className={classes.rootOrder}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: 40 }}>
            <Nodata label={'No variants found'} />
          </Grid>
        </Grid>
      ) : (
        <div className={classes.orderRow_Wrap}>
          <div className={classes.rowHeader}>
            <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Img)}></div>
            <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Label)}></div>
            <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Count)}>
              <Typography variant='body1' style={{ color: '#6c7985' }}>
                Quantity
              </Typography>
            </div>
            <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Price)}>
              <Typography variant='body1' style={{ color: '#6c7985' }}>
                Item price
              </Typography>
            </div>
            <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Delete)}></div>
          </div>
          <div className={classes.rowOrder_Root}>
            {productVariant?.map((variant) => (
              <div className={classes.rowOrder}>
                <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Img)}>
                  <ImageContainer
                    url={variant?.productLibraryVariantImages?.[0]?.imagePath}
                    alt='Order'
                    w={84}
                    h={87}
                    objectFit='cover'
                  />
                </div>

                <div className={clsx(classes.rowWidth, classes.rowOrder_Label)}>
                  <Typography variant='body2' className={classes.orderLabel}>
                    {variant?.name}
                  </Typography>
                  <Typography variant='h4' className={classes.orderSize}>
                    {variant?.productVarientOptions?.map((option) => (
                      <>
                        {option?.variableTypeName}:<span>{option?.variableOptionValue}</span>
                        &nbsp;&nbsp;
                      </>
                    ))}
                  </Typography>
                  <div className={classes?.flexClass}>
                      <div style={{ marginRight: 10 }} className={classes.mbBottom}>
                        <Typography variant='body1' className={classes.labelForm}>
                          HS code
                        </Typography>
                        <TextField
                          name='hsCode'
                          onInput={(e) => {
                            if (`${e.target.value}`.length > 15) {
                              e.target.value = e.target.value.slice(0, 15)
                            }
                          }}
                          type='text'
                          disabled={!isEuOrUk}
                          onChange={(e) => handleChange(e, variant)}
                          value={variant.hsCode || null}
                          placeholder='Enter HS code'
                          variant='outlined'
                          style={{ marginTop: '10px' }}
                          fullWidth
                          InputLabelProps={{
                            shrink: false
                          }}
                        />
                      </div>
                      <div>
                        <Typography variant='body1' className={classes.labelForm}>
                          Declared value
                        </Typography>
                        <TextField
                          onChange={(e) => handleChange(e, variant)}
                          name='declaredValue'
                          type='text'
                          disabled={!isEuOrUk}
                          value={variant.declaredValue || null}
                          placeholder='Enter declared value'
                           onInput={(e) => {
                            e?.target?.value=  validateDecimal(e?.target?.value)
                          }}
                          variant='outlined'
                          style={{ marginTop: '10px' }}
                          fullWidth
                          InputLabelProps={{
                            shrink: false
                          }}
                        />
                      </div>
                  </div>
                </div>
                
                
                <div
                  className={clsx(
                    classes.rowOrder_Width,
                    classes.rowOrder_Count,
                    isProduction && classes?.pointerEvent
                  )}
                >
                  <ButtonGroup size='small' aria-label='small outlined button group'>
                    <Button
                      className={classes.counterIcon}
                      onClick={() => handleIncrement(variant)}
                    >
                      +
                    </Button>
                    <Button className={classes.counterField}>
                      {
                        count?.find(
                          (val) => val?.productLibraryVarientId === variant.libraryVariantId
                        )?.quantity
                      }
                    </Button>
                    <Button
                      className={classes.counterIcon}
                      disabled={
                        count?.find(
                          (val) => val?.productLibraryVarientId === variant.libraryVariantId
                        )?.quantity <= 1
                      }
                      onClick={() => handleDecrement(variant)}
                    >
                      -
                    </Button>
                  </ButtonGroup>
                </div>
                <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Price)}>
                  <Typography variant='body2'>${variant?.costPrice}</Typography>
                </div>
                <div
                  className={[isProduction && classes?.pointerEvent, classes.btnVisibleXs].join(
                    ' '
                  )}
                >
                  <Button
                    onClick={() => handleRemove(variant)}
                    type='button'
                    variant='contained'
                    startIcon={<Icon icon='delete' size={18} />}
                  >
                    Delete
                  </Button>
                </div>
                <div
                  className={clsx(
                    classes.rowOrder_Width,
                    classes.rowOrder_Delete,
                    isProduction && classes?.pointerEvent
                  )}
                >
                  <Icon
                    icon='delete'
                    size={16}
                    color='#8a8a9e'
                    onClick={() => handleRemove(variant)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Hided the 'Add more products' button */}

      {/* {!isProduction && (
        <div className={classes.addProduct_Btn}>
          <Button
            type='submit'
            variant='outlined'
            startIcon={<Icon icon='add-icon' size={18} color='#8a8a9e' />}
            onClick={() => {
              if (navigator?.onLine) {
                route.push(`/productlibrary`)
              } else {
                NotificationManager.error('No active internet connection', '', 10000)
              }
            }}
          >
            Add more products
          </Button>
        </div>
      )} */}
      <div className={classes.orderAmount}>
        <div style={{ marginRight: '10px' }}>
          <Icon icon='dollar-amount' size={20} />
        </div>
        <div className={classes.amountGrup}>
          <Typography variant='body1'>Total amount</Typography>
          <Typography variant='h3'>
            ${checkIfEmpty(count) ? 0 : calculateAmountOfOrder(count)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  orderDetail: state?.orderReducer?.orderDetails?.response,
  productLibraryVariantLength:
    state.productLibrary.productLibraryDetails?.response?.productLibraryVariants?.length
})

const mapDispatchToProps = {
  updateVariantsOfOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(VariantOfOrder)
