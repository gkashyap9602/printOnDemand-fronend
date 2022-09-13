import React, { useCallback, useEffect } from 'react'
import IMG from 'next/image'
import DropzoneImg from '/static/images/dropzone-img.png'
import { Button, Typography } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import style from '../style'
import { useDropzone } from 'react-dropzone'
import { NotificationManager } from 'react-notifications'

import { useDispatch, useSelector } from 'react-redux'

import {
  uploadImage,
  addImageToCanvas,
  saveImageToPhotoLibrary
} from 'redux/actions/designToolActions'

import { v4 as uuidv4 } from 'uuid'

const useStyles = style

const Dropzone = ({ setModalClose, showLoader }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const fileSizeValidatior = (file) => {
    if (!file.type.includes('image')) {
      return {
        code: 'invalid-type',
        message: `Only image upload is allowed`
      }
    }
    if (Math.round(file.size / 1024) > 102400) {
      return {
        code: 'size-too-large',
        message: `Uploaded file size is greater than 100MB.`
      }
    }

    return null
  }
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      showLoader(true)
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          // Do whatever you want with the file contents
          const b64Str = reader.result
          // const URLObject = URL.createObjectURL(file)
          var image = new Image()

          //Set the Base64 string return from FileReader as source.
          image.src = b64Str

          //Validate the File Height and Width.
          image.onload = function () {
            let initialHeight = this.height
            let initialWidth = this.width
            // if (height > 100 || width > 100) {
            //   alert('Height and Width must not exceed 100px.')
            //   return false
            // }
            // alert('Uploaded image has valid Height and Width.')
            // return true
            let uuid = uuidv4()
            let imagePayload = {
              guid: uuid,
              imageType: 1,
              image: {
                fileName: file.name,
                fileData: b64Str.split(',')[1]
              }
            }
            dispatch(saveImageToPhotoLibrary(imagePayload)).then((res) => {
              let uploadedImage = {
                file: res.response.imagePath,
                fileName: file.name,
                initialWidth,
                initialHeight,
                libraryImageId: res.response.libraryImageId,
                guid: uuid
                // fromPhotoLibrary: false
              }
              dispatch(uploadImage(uploadedImage))
              // NotificationManager.success('Image uploaded successfully', '', 3000)
              dispatch(addImageToCanvas({ uuid: uuid, ...uploadedImage }))
            })
          }
        }

        reader.readAsArrayBuffer(file)
      })
    },
    [acceptedFiles]
  )

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    onDrop,
    accept: 'image/jpeg,image/png',
    maxFiles: 1,
    validator: fileSizeValidatior
  })
  useEffect(() => {
    const tooManyFilesUploaded = fileRejections.some((item) => {
      return item.errors[0].code === 'too-many-files'
    })
    for (let i = 0; i < fileRejections.length; i++) {
      if (tooManyFilesUploaded) {
        NotificationManager.error('Please upload a single image at once', '', 10000)
        break
      } else {
        NotificationManager.error(fileRejections[i].errors[0].message, '', 10000)
      }
    }
  }, [fileRejections])

  return (
    <div className={classes.bgDropzone}>
      <div {...getRootProps()} className={classes.imageBlock}>
        <IMG src={DropzoneImg} alt='Upload Image' width={64} height={64} />
        <input {...getInputProps()} />
        <Typography variant='body2'>
          Drag and drop your file to upload <br />
          or
        </Typography>

        <Button
          type='submit'
          variant='outlined'
          endIcon={<Icon icon='upload-icon' size={18} />}
          className={classes.btn_Upload}
        >
          Browse files
        </Button>
      </div>
    </div>
  )
}

export default Dropzone
