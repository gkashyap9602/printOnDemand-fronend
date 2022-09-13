import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import clsx from 'clsx'
import Icon from 'icomoons/Icon'
import style from './style'
import ImageContainer from 'components/imageContainer'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import {
  updateVariantsOfOrders,
  updateCartItems,
  removeCartItems
} from 'redux/actions/orderActions'
import {
  calculateAmountOfOrder,
  calculateAmountWithQuantity,
  calculateTotalAmount,
  checkIfEmpty
} from 'utils/helpers'
import Nodata from 'components/nodata'
import { NotificationManager } from 'react-notifications'
import Loader from 'components/loader'
const useStyles = style

/**
 * AddOrder
 * @param {*} param0
 * @returns
 */
const AddOrder = ({
  variants,
  productId,
  handleCount = () => {},
  updateVariantsOfOrders,
  updateCartItems,
  removeCartItems,
  isEdit = false
}) => {
  const classes = useStyles()
  const route = useRouter()
  const [productVariant, setproductVariant] = useState(variants)
  const [loader, setLoader] = useState(false)
  const [count, setCount] = useState(
    variants?.map((value) => ({
      productLibraryVarientId: value?.productLibraryVariantId,
      quantity: value?.quantity || 1,
      totalPrice: value?.productLibraryVariant?.costPrice,
      price: value?.productLibraryVariant?.costPrice,
      guid: value?.guid,
      productCode: value?.productLibraryVariant?.productCode
    }))
  )

  /**
   * On variants changes
   */
  useEffect(() => {
    setproductVariant(variants)
    setCount(
      variants?.map((value) => ({
        productLibraryVarientId: value?.productLibraryVariantId,
        quantity: value?.quantity || 1,
        totalPrice: value?.productLibraryVariant?.costPrice * (value?.quantity || 1),
        price: value?.productLibraryVariant?.costPrice,
        guid: value?.guid,
        productCode: value?.productLibraryVariant?.productCode
      }))
    )
  }, [variants])

  /**
   * handleIncrement
   * @param {*} variant
   */
  const handleIncrement = async (variant) => {
    const currentCount = count.find(
      (ele) => ele.productLibraryVarientId == variant.productLibraryVariantId
    )
    const params = {
      guid: variant?.guid,
      quantity: currentCount?.quantity + 1
    }
    const res = await updateCartItems(params)
    if (res.statusCode !== 200) {
      NotificationManager.error(res?.Response?.Message, '', 10000)
    }
    setCount(
      count.map((item) =>
        item?.productLibraryVarientId === variant.productLibraryVariantId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: calculateAmountWithQuantity(
                item?.quantity + 1,
                variant?.productLibraryVariant?.costPrice
              )
            }
          : item
      )
    )
    calculateTotalAmount(count)
  }

  /**
   * handleDecrement
   * @param {*} variant
   */
  const handleDecrement = async (variant) => {
    const currentCount = count.find(
      (ele) => ele.productLibraryVarientId == variant.productLibraryVariantId
    )
    const params = {
      guid: variant?.guid,
      quantity: currentCount?.quantity - 1
    }
    const res = await updateCartItems(params)
    if (res.statusCode !== 200) {
      NotificationManager.error(res?.Response?.Message, '', 10000)
    }
    setCount(
      count.map((item) =>
        item?.productLibraryVarientId === variant.productLibraryVariantId
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: calculateAmountWithQuantity(
                item?.quantity - 1,
                variant?.productLibraryVariant?.costPrice
              )
            }
          : item
      )
    )
  }

  /**
   * On count changes
   */
  useEffect(() => {
    handleCount(count)
  }, [count])

  /**
   * handleRemove
   * @param {*} variant
   */
  const handleRemove = async (variant) => {
    const itm = productVariant?.filter(
      (item) => item?.productLibraryVariantId !== variant?.productLibraryVariantId
    )

    setCount(
      count.filter((item) => item?.productLibraryVarientId !== variant.productLibraryVariantId)
    )
    setproductVariant(itm)
    updateVariantsOfOrders({
      variants: productVariant?.filter(
        (item) => item?.productLibraryVariantId !== variant?.productLibraryVariantId
      ),
      productId: productId
    })
    setLoader(true)
    const res = await removeCartItems({ guid: variant?.guid })
    if (res) setLoader(false)
    if (res.statusCode === 200) {
      NotificationManager.success('Product removed successfully', '', 2000)
    } else {
      NotificationManager.error(res?.Response?.Message, '', 10000)
    }
  }

  //HTML
  return (
    <div className={classes.blockOrder}>
      {loader && <Loader />}
      {checkIfEmpty(variants) || count?.length === 0 ? (
        <Grid container spacing={3} direction='row' className={classes.rootOrder}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: 40 }}>
            <Nodata label={'No Products found'} />
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
                    url={
                      variant?.productLibraryVariant?.productLibraryVariantImages?.[0]?.imagePath
                    }
                    alt='Order'
                    w={'84'}
                    h={'87'}
                    objectFit='cover'
                  />
                </div>

                <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Label)}>
                  <Typography variant='body2' className={classes.orderLabel}>
                    {variant?.title}
                  </Typography>
                  <Typography variant='h4' className={classes.orderSize}>
                    {variant?.productLibraryVariant?.productVarientOptions?.map((option) => (
                      <>
                        {option?.variableTypeName}:<span>{option?.variableOptionValue}</span>
                        &nbsp;&nbsp;
                      </>
                    ))}
                  </Typography>
                </div>
                <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Count)}>
                  <ButtonGroup size='small' aria-label='small outlined button group'>
                    <Button
                      className={classes.counterIcon}
                      onClick={() => {
                        if (!navigator?.onLine) {
                          NotificationManager.error('No active internet connection', '', 10000)
                        } else {
                          handleIncrement(variant)
                        }
                      }}
                    >
                      +
                    </Button>
                    <Button className={classes.counterField}>
                      {
                        count?.find(
                          (val) => val?.productLibraryVarientId === variant.productLibraryVariantId
                        )?.quantity
                      }
                    </Button>
                    <Button
                      className={classes.counterIcon}
                      disabled={
                        count?.find(
                          (val) => val?.productLibraryVarientId === variant?.productLibraryVariantId
                        )?.quantity <= 1
                      }
                      onClick={() => {
                        if (!navigator?.onLine) {
                          NotificationManager.error('No active internet connection', '', 10000)
                        } else {
                          handleDecrement(variant)
                        }
                      }}
                    >
                      -
                    </Button>
                  </ButtonGroup>
                </div>
                <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Price)}>
                  <Typography variant='body2'>
                    ${variant?.productLibraryVariant?.costPrice.toFixed(2)}
                  </Typography>
                </div>
                <div className={classes.btnVisibleXs}>
                  <Button
                    onClick={() => handleRemove(variant)}
                    type='button'
                    variant='contained'
                    startIcon={<Icon icon='delete' size={18} />}
                  >
                    Delete
                  </Button>
                </div>
                <div className={clsx(classes.rowOrder_Width, classes.rowOrder_Delete)}>
                  <Icon
                    icon='delete'
                    size={16}
                    color='#8a8a9e'
                    onClick={() => {
                      if (!navigator?.onLine) {
                        NotificationManager.error('No active internet connection', '', 10000)
                      } else {
                        handleRemove(variant)
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
      <div className={classes.orderAmount}>
        <div style={{ marginRight: 10 }}>
          <Icon icon='dollar-amount' size={20} />
        </div>
        <div className={classes.amountGrup}>
          <Typography variant='body1'>Total amount</Typography>
          <Typography variant='h3'>
            $
            {checkIfEmpty(count)
              ? 0
              : isEdit
              ? calculateAmountOfOrder(count)
              : calculateTotalAmount(count)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

// Mapping state to props
const mapStateToProps = (state) => ({})

//map dispatch to props
const mapDispatchToProps = {
  updateVariantsOfOrders,
  updateCartItems,
  removeCartItems
}
//export
export default connect(mapStateToProps, mapDispatchToProps)(AddOrder)
