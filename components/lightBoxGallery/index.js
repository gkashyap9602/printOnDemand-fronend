import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { SRLWrapper } from 'simple-react-lightbox'
import style from './style'
import imageNoFound from '/static/images/Image-no-found.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { ClickAwayListener, Modal } from '@material-ui/core'
import ImageContainer from 'components/imageContainer'

const options = {
  buttons: {
    showAutoplayButton: false,
    showDownloadButton: false,
    showFullscreenButton: false,
    showThumbnailsButton: false
  },
  caption: {
    showCaption: false
  }
}
const ImgTag = ({ alt = 'image', className, url }) => {
  const [imgUrl, setimgUrl] = useState(url)
  return (
    <img src={imgUrl} onError={() => setimgUrl(imageNoFound)} alt={alt} className={className} />
  )
}
const LightBoxGallery = ({ images }) => {
  const classes = style()
  const [open, setopen] = useState(false)

  return (
    <div>
      <div className={classes.imagesContainer} onClick={() => setopen(true)}>
        {images?.map((item, i) => (
          <div className={classes.circularImage}>
            <ImageContainer
              alt='Catalog'
              showLoader={false}
              h={308}
              w={315}
              objectFit='cover'
              layout='responsive'
              url={item?.imagePath}
            />
          </div>
        ))}
      </div>
      <Modal onClose={() => setopen(true)} open={open} className={classes.modalCarousel}>
        <ClickAwayListener onClickAway={() => setopen(false)}>
          <div className={classes.galleryBox}>
            <Carousel
              showIndicators={false}
              showStatus={false}
              renderThumbs={(children) => children}
            >
              {images?.map((item, i) => (
                <div>
                  <ImageContainer
                    alt='Catalog'
                    showLoader={true}
                    h={308}
                    w={315}
                    objectFit='cover'
                    layout='responsive'
                    className={classes.pdtImage}
                    src={item?.imagePath}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </ClickAwayListener>
      </Modal>
    </div>
  )
}

export default LightBoxGallery
