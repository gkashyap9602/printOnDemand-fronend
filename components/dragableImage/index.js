import Icon from 'icomoons/Icon'
import Image from 'next/image'
import React, { useState } from 'react'
import style from '../pages/adminPortal/addProduct/uploadImage/style'
import ImageNotFound from '/static/images/Image-no-found.png'

const useStyles = style

const DragableContent = ({ item, deleteImageCB = () => {}, hideBrowseFile }) => {
  const classes = useStyles()
  const [image, setImage] = useState(item?.imagePath)
  return (
    <div style={{ position: 'relative' }}>
      <Image
        src={image}
        onError={() => setImage(ImageNotFound)}
        alt='Product Image'
        width={136}
        height={134}
        className={classes.dropImage}
        objectFit='cover'
      />
      <div className={classes.ImgOverlayText}>
        {!hideBrowseFile && (
          <div style={{ flexGrow: 1 }}>
          </div>
        )}
        <div className={classes.deleteIcon} onClick={() => deleteImageCB(item)}>
          <Icon icon={item.icon} size={18} color='#fff' />
        </div>
      </div>
    </div>
  )
}

export default DragableContent
