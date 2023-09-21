import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import imageNoFound from '/static/images/Image-no-found.png'

const ImageWithSkeleton = ({
  url = '/',
  alt,
  h,
  w,
  objectFit,
  layout = 'responsive',
  ...props
}) => {
  const [imgURL, setImgURL] = useState(url)
  useEffect(() => {
    setImgURL(url)
    return () => {
      setImgURL('')
    }
  }, [])

  return (
    <Image
      src={imgURL}
      loading='lazy'
      // onLoadingComplete={() => (url && url !== null ? setImgURL(url) : setImgURL(imageNoFound))}
      onError={() => setImgURL(imageNoFound)}
      alt={alt}
      height={h}
      width={w}
      objectFit={objectFit ? objectFit : 'contain'}
      layout={layout}
      placeholder='blur'
      blurDataURL={imgURL}
      {...props}
    />
  )
}

export default ImageWithSkeleton
