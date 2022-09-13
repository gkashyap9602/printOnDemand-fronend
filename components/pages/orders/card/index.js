import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import Image from 'next/image'
import clsx from 'clsx'

import Icon from 'icomoons/Icon'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import style from './style'
import { checkIfEmpty } from 'utils/helpers'
import imageNoFound from '/static/images/Image-no-found.png'
import ImageContainer from 'components/imageContainer'

const useStyles = style

const CardBlock = ({ item, isAdmin = false, country }) => {
  const classes = useStyles()

  const SliderNextArrow = ({ onClick }) => {
    return (
      <div className={clsx(classes.sliderArrow, classes.sliderNext)} onClick={onClick}>
        <Icon icon='drop-right' size={18} color='#697880' />
      </div>
    )
  }
  const SliderPreviousArrow = ({ onClick }) => {
    return (
      <div className={clsx(classes.sliderArrow, classes.sliderPrev)} onClick={onClick}>
        <Icon icon='drop-left' size={18} color='#697880' />
      </div>
    )
  }

  const productSetting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPreviousArrow />,
    customPaging: (i) => (
      <div>
        <ImageContainer
          url={item?.images?.[i]?.imagePath}
          alt='Product Image'
          w='29'
          h='29'
          showLoader={false}
          className={classes.imageThumb}
          objectFit='cover'
        />
      </div>
    ),

    dotsClass: 'slick-dots slick-thumb'
  }
  return (
    <div className={classes.cardRoot} style={{ pointerEvents: 'none' }}>
      <Card>
        <CardActionArea>
          <CardMedia className={classes.media}>
            <ImageContainer
              url={checkIfEmpty(item?.images) ? imageNoFound : `${item?.images?.[0]?.imagePath}`}
              alt={item?.title}
              height='230'
              width='330'
              layout='responsive'
              objectFit='contain'
            />
          </CardMedia>
          <CardContent style={{ cursor: 'auto' }}>
            <div className={classes.pdtContent}>
              <Typography variant='h3' className={classes.productLabel}>
                {item?.productTitle}
              </Typography>
              {item?.variantOptions?.map((value) => (
                <div className={classes.variantFlex}>
                  <div className={clsx(classes.variantGrow, classes.leftItem)}>
                    <Typography variant='h4' className={classes.productPrice}>
                      {value?.variableTypeName}
                    </Typography>
                    <Typography variant='body2' className={classes.productAmount}>
                      {value?.variableOptionValue}
                    </Typography>
                  </div>
                  <div className={clsx(classes.variantGrow, classes.rightItem)}>
                    <Typography variant='h4' className={classes.productPrice}>
                      Quantity
                    </Typography>
                    <Typography variant='body2' className={classes.productAmount}>
                      {item?.quantity}
                    </Typography>
                  </div>
                </div>
              ))}

              {isAdmin && (country === 'EU' || country === 'UK') && (
                <div className={classes.variantFlex}>
                  <div className={clsx(classes.variantGrow, classes.leftItem)}>
                    <Typography variant='h4' className={classes.productPrice}>
                      HS code
                    </Typography>
                    <Typography variant='body2' className={classes.productAmount}>
                      {item?.HsCode || '---'}
                    </Typography>
                  </div>
                  <div className={clsx(classes.variantGrow, classes.rightItem)}>
                    <Typography variant='h4' className={classes.productPrice}>
                      Declared value
                    </Typography>
                    <Typography variant='body2' className={classes.productAmount}>
                      {item?.DeclaredValue || '---'}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default CardBlock
