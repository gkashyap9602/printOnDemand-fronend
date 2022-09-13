import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout'
import DetailContent from 'components/pages/product/productDetails'
import { style } from 'styles/productDetail'
import imageNoFound from '/static/images/Image-no-found.png'
import { connect } from 'react-redux'
import { getProductDetail } from 'redux/actions/productActions'
import { useRouter } from 'next/router'
import Loader from 'components/loader'
import BreadCrumb from 'components/breadcrumb'
import { getAllCategory } from 'redux/actions/categoryActions'
import ImageContainer from 'components/imageContainer'
import { ProductDetailWrap } from 'components/pages/product/productList/card/slickStyle'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ProductAccordion, ProductTable } from 'components/productTable'
import { checkIfEmpty } from 'utils/helpers'
const useStyles = style

/**
 * Product Detail view
 * @param {*} param0
 * @returns
 */
const ProductDetail = ({ getProductDetail, getAllCategory, product, categories }) => {
  const [loader, setloader] = useState(false)
  const route = useRouter()
  const classes = useStyles()
  const [images, setimages] = useState([])
  const [isHideBreadcrumb, setisHideBreadcrumb] = useState(false)
  const productSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    autoplaySpeed: 4000,
    customPaging: (i) => (
      <div>
        <ImageContainer
          alt='Remy Sharp'
          url={images?.[i]?.imageUrl}
          w={39}
          h={39}
          showLoader={true}
          loaderSize={15}
          className={classes.imageThumb}
          objectFit='contain'
        />
      </div>
    ),
    dotsClass: 'slick-dots slick-thumb slick-pdt-thumb'
  }

  /**
   * Get details of  a product
   */

  useEffect(async () => {
    const {
      query: { isGlobalSearch }
    } = route
    if (isGlobalSearch) {
      setisHideBreadcrumb(true)
    }
    setloader(true)
    getAllCategory()
    const res = await getProductDetail(route?.query?.productName)
    if (res) {
      setimages(res?.response?.productImages)
      setloader(false)
    }
    return () => {
      setimages([])
    }
  }, [])

  // return Html
  return (
    <Layout menuHide className={classes.content_Detail}>
      {loader && <Loader />}
      <div className={classes.bgProduct_Detail}>
        <Container>
          <Grid container direction='row' spacing={3} className={classes.rootProduct}>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <Typography variant='h3' style={{ color: '#4c5156' }}>
                Product details
              </Typography>
              {!isHideBreadcrumb && (
                <BreadCrumb
                  routes={[
                    { name: 'Catalog', link: '/catalog' },
                    {
                      name: categories?.find((val) => val.guid === route.query.subcatalog)?.name,
                      link: `/catalog/${
                        categories?.find((val) => val.guid === route.query.subcatalog)?.guid
                      }`
                    },
                    {
                      name: categories
                        ?.find((val) => val.guid === route.query.subcatalog)
                        ?.subCategories?.find((val) => val?.guid === route.query.subcategory)?.name,
                      link: `/catalog/${
                        categories?.find((val) => val.guid === route.query.subcatalog)?.guid
                      }/product?subcategory=${route.query.subcategory}`
                    },
                    { name: product?.response?.title }
                  ]}
                />
              )}
              {isHideBreadcrumb && (
                <Typography
                  variant='p'
                  style={{ color: '#4c5156', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={route.back}
                >
                  Back to previous page
                </Typography>
              )}
              <div style={{ marginTop: 24 }}>
                {checkIfEmpty(images) ? (
                  <ImageContainer
                    url={imageNoFound}
                    alt={'1213'}
                    h='230'
                    w='330'
                    layout='responsive'
                    objectFit='contain'
                  />
                ) : (
                  <ProductDetailWrap>
                    <Slider {...productSetting}>
                      {images?.map((image, i) => (
                        <ImageContainer
                          key={i}
                          url={image?.imageUrl}
                          showLoader={true}
                          alt={'1213'}
                          h='230'
                          w='330'
                          layout='responsive'
                          objectFit='contain'
                        />
                      ))}
                    </Slider>
                  </ProductDetailWrap>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <DetailContent product={product?.response} showLoader={setloader} />
            </Grid>
          </Grid>
          {/* <!--new tab--> */}
          <Grid container direction='row' spacing={3} style={{ marginBottom: 30 }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className={classes.detailPdtTab}>
                <ProductTable product={product?.response} />
              </div>
              {/* <!--accordion--> */}
              <div className={classes.detailAccordion}>
                <ProductAccordion product={product?.response} />
              </div>
              {/* <!--accordion--> */}
            </Grid>
          </Grid>
          {/* <!--new tab--> */}
        </Container>
      </div>
    </Layout>
  )
}

/**
 *mapping State To Props
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({
  product: state.product.product_details,
  categories: state?.category?.category?.response?.categories
})

/**
 * mapDispatchToProps
 */
const mapDispatchToProps = {
  getProductDetail,
  getAllCategory
}

//export
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
