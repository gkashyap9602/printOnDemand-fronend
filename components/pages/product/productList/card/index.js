import React, { useRef } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import Image from 'next/image'
import clsx from 'clsx'
import Icon from 'icomoons/Icon'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { ProductListWrap } from './slickStyle'
import style from './style'
import { useRouter } from 'next/router'
import { checkIfEmpty } from 'utils/helpers'
import imageNoFound from '/static/images/Image-no-found.png'
import ImageContainer from 'components/imageContainer'

const useStyles = style

const CardBlock = ({ item }) => {
  const classes = useStyles()
  const route = useRouter()
  const sliderRef = useRef()

  const SliderNextArrow = ({ onClick }) => {
    return (
      <div
        className={clsx(classes.sliderArrow, classes.sliderNext)}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <Icon icon='drop-right' size={18} color='#697880' />
      </div>
    )
  }
  const SliderPreviousArrow = ({ onClick }) => {
    return (
      <div
        className={clsx(classes.sliderArrow, classes.sliderPrev)}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <Icon icon='drop-left' size={18} color='#697880' />
      </div>
    )
  }
  const productSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPreviousArrow />,
    customPaging: (i) => (
      <div>
        <Image
          src={item?.productImages?.[i]?.thumbnailPath}
          alt='Product Image'
          width='29'
          height='29'
          className={classes.imageThumb}
          objectFit='cover'
          onClick={(e) => {
            e.stopPropagation()
            sliderRef.current.slickGoTo(i)
          }}
        />
      </div>
    ),

    dotsClass: 'slick-dots slick-thumb'
  }
  return (
    <div className={classes.cardRoot}>
      <Card
        onClick={() =>
          route.push({
            pathname: `/catalog/${
              route?.query.subcatalog ? route?.query.subcatalog : 'subcatalog'
            }/product/${item?.guid}`,
            query:
              route?.query.subcatalog !== 'subcategory' && route?.query.subcategory
                ? { subcategory: route?.query.subcategory }
                : { isGlobalSearch: true }
          })
        }
      >
        <CardActionArea>
          <CardMedia className={classes.media}>
            <ProductListWrap>
              <Slider {...productSetting} ref={sliderRef}>
                {checkIfEmpty(item?.productImages) && (
                  <>
                    <Image
                      src={imageNoFound}
                      alt='Image Not Found'
                      height='230'
                      width='330'
                      layout='responsive'
                      objectFit='contain'
                    />
                  </>
                )}
                {item?.productImages?.slice(0, 3).map((image, i) => (
                  <div className={classes.LinkFocus} key={i}>
                    <ImageContainer
                      url={`${image?.thumbnailPath}`}
                      alt={item?.title}
                      showLoader={true}
                      h='230'
                      w='330'
                      layout='responsive'
                      objectFit='contain'
                    />
                  </div>
                ))}
              </Slider>
            </ProductListWrap>
          </CardMedia>
          <CardContent>
            <div className={classes.pdtContent}>
              <Typography variant='h3' className={classes.productLabel}>
                {item?.title}
              </Typography>
              {checkIfEmpty(item?.priceStartsFrom) ? (
                <Typography variant='h4' className={classes.productPrice}>
                  Price is not available
                </Typography>
              ) : (
                <>
                  <Typography variant='h4' className={classes.productPrice}>
                    Prices start at
                  </Typography>
                  <Typography variant='h3' className={classes.productAmount}>
                    {item?.priceStartsFrom}
                  </Typography>
                </>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default CardBlock
