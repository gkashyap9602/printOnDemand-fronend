import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import imageNoFound from '/static/images/Image-no-found.png'
import style from './style'
import { CircularProgress } from '@material-ui/core'
import { checkIfEmpty } from 'utils/helpers'

const ImageContainer = ({
  url,
  alt,
  h,
  w,
  objectFit,
  layout = 'responsive',
  className,
  loaderSize = 60,
  showLoader = true,
  isAdmin = false,
  ...props
}) => {
  const classes = style()

  const [imgURL, setImgURL] = useState(checkIfEmpty(url) ? imageNoFound : url)
  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setImgURL(checkIfEmpty(url) ? imageNoFound : url)
    return () => {
      setImgURL('')
    }
  }, [url])

  return (
    <div className={classes?.img}>
      {isLoader && showLoader ? (
        <CircularProgress
          size={loaderSize}
          className={
            isAdmin ? classes?.admin : loaderSize === 60 ? classes?.catalog : classes?.slide
          }
        />
      ) : (
        ''
      )}
      <Image
        src={imgURL}
        loading='lazy'
        onLoadingComplete={() => {
          setIsLoader(false)
        }}
        onError={() => setImgURL(imageNoFound)}
        alt={alt}
        height={h}
        width={w}
        objectFit={objectFit ? objectFit : 'contain'}
        layout={layout}
        className={className}
        {...props}
      />
    </div>
  )
}

export default ImageContainer
