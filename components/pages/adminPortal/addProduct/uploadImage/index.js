import React, { useCallback } from 'react'
import Image from 'next/image'
import { Button, CircularProgress, Typography } from '@material-ui/core'

import DropzoneImg from '/static/images/dropzone-img.png'
import Icon from 'icomoons/Icon'
import style from './style'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import DragDrop from 'components/dragDrop'
import { NotificationManager } from 'react-notifications'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

const useStyles = style

const ImageUpload = ({
  item,
  index,
  hideBrowseFile = false,
  imageList = [],
  imageHeading = null,
  setImageListCB = () => {},
  deleteImageCB = () => {},
  setNewOrderedItems = () => {},
  uploadProductImageCB = () => {},
  isDragDropable = true,
  isSizeChart = false
}) => {
  const classes = useStyles()

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (!navigator.onLine) {
          NotificationManager.error('No active internet connection', '', 10000)
        }
        if (navigator.onLine) {
          if (file?.type.includes('image')) {
            if (
              file?.type === 'image/jpeg' ||
              file?.type === 'image/jpg' ||
              file?.type === 'image/png'
            ) {
              const reader = new FileReader()
              reader.onload = () => {
                const binaryStr = reader.result
                setImageListCB([
                  ...imageList,
                  {
                    uuid: uuidv4(),
                    name: file.name,
                    icon: 'delete',
                    size: file.size,
                    imagePath: URL.createObjectURL(file),
                    base64: binaryStr.replace(/^data:image\/[a-z]+;base64,/, ''),
                    isUploading: true
                  }
                ])
                uploadProductImageCB(
                  {
                    uuid: uuidv4(),
                    name: file.name,
                    icon: 'delete',
                    size: file.size,
                    imagePath: URL.createObjectURL(file),
                    base64: binaryStr.replace(/^data:image\/[a-z]+;base64,/, ''),
                    isUploading: true
                  },
                  imageList.length,
                  isSizeChart
                )
              }

              reader.readAsDataURL(file)
            } else {
              NotificationManager.warning('Please upload JPEG or PNG file', '', 5000)
            }
          } else {
            NotificationManager.warning('Please upload image file', '', 5000)
          }
        }
      })
    },
    [imageList]
  )

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false })

  return (
    <div>
      {(isSizeChart && imageList.length >= 1) ||
        (!hideBrowseFile && (
          <div
            {...getRootProps({ className: `dropzone ${classes.boxModel}` })}
            style={
              isSizeChart && imageList.length >= 1
                ? {
                    pointerEvents: 'none',
                    cursor: 'default',
                    color: '#3374b647',
                    borderColor: '#d4d4d480'
                  }
                : null
            }
          >
            <div className={classes.boxImage}>
              <Image src={DropzoneImg} alt='Upload Image' width={32} height={32} />
            </div>
            <div>
              <Typography variant='h5' className={classes.ImgText}>
                Drag and drop your file to upload or
              </Typography>
              <Typography variant='h6' className={classes.supportedText}>
                Supported format:PNG, JPEG, JPG
              </Typography>
            </div>
            <Button
              variant='outlined'
              endIcon={<Icon icon='upload-icon' size={18} />}
              className={classes.btn_Upload}
            >
              <input {...getInputProps()} />
              <span>Browse files</span>
            </Button>
          </div>
        ))}

      {isDragDropable && imageList.length > 0 && (
        <>
          <Typography variant='h5' className={classes.dragText}>
            Drag and drop the image in the required order
          </Typography>
          <DragDrop
            hideBrowseFile={hideBrowseFile}
            items={imageList}
            deleteImageCB={deleteImageCB}
            setNewOrderedItems={setNewOrderedItems}
          />
        </>
      )}
      {!isDragDropable && (
        <div style={{ display: 'flex', marginTop: 12 }}>
          {imageList?.map((item) => {
            return (
              <div style={{ position: 'relative', marginRight: 12 }} key={item.uuid}>
                <Image
                  src={item.imagePath}
                  alt='Product Image'
                  width={136}
                  height={134}
                  className={classes.dropImage}
                  objectFit='cover'
                />
                {item.isUploading && (
                  <div
                    style={{
                      width: '100%',
                      top: 0,
                      position: 'absolute',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CircularProgress
                      style={{ marginLeft: 5 }}
                      size={25}
                      className={classes.LoaderSession}
                    />
                  </div>
                )}
                <div className={classes.ImgOverlayText}>
                  {!hideBrowseFile && (
                    <div style={{ flexGrow: 1 }}>
                      {/* {item.name.substr(0, item.name.lastIndexOf('.')) || item.name} */}
                    </div>
                  )}
                  {!item.isUploading && (
                    <TooltipBootstrap title='delete' placement='right'>
                      <div className={classes.deleteIcon} onClick={() => deleteImageCB(item)}>
                        <Icon icon={item.icon} size={18} color='#fff' />
                      </div>
                    </TooltipBootstrap>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
