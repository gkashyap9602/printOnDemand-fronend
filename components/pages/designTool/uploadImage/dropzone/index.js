import React, { useCallback, useEffect } from 'react'
import IMG from 'next/image'
import DropzoneImg from '/static/images/dropzone-img.png'
import { Button, Typography } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import style from '../style'
import { useDropzone } from 'react-dropzone'
import { NotificationManager } from 'react-notifications'
import { piexif } from 'piexifjs'
import { useDispatch, useSelector } from 'react-redux'
const { BlockBlobClient, newPipeline } = require('@azure/storage-blob')

import {
  uploadImage,
  addImageToCanvas,
  saveImageToPhotoLibrary,
  getUploadImageURL,
  saveDesignImage,
  uploadToImageURL
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
    if (Math.round(file.size / 1024) > 153600) {
      return {
        code: 'size-too-large',
        message: `Uploaded file size is greater than 150MB.`
      }
    }

    return null
  }
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      if (acceptedFiles.length > 0) showLoader(true)
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          // Do whatever you want with the file contents

          let b64Str
          const fileNameToCheckFor = file.name.toLowerCase()
          if(fileNameToCheckFor.includes(".jpg") || fileNameToCheckFor.includes(".jpeg") || fileNameToCheckFor.includes(".tif")){
            // const piexifData = piexif.load(reader.result)

            // piexifData['0th'] = {}
            // piexifData['Exif'] = {}
            // piexifData["GPS"] = {}
            // piexifData["Interop"] = {}
            // piexifData["1st"] = {}
            // const exifbytes = piexif.dump(piexifData)
            b64Str = piexif.remove(reader.result)
  
            function dataURLtoFile(dataurl, filename) {
   
              var arr = dataurl.split(','),
                  mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]), 
                  n = bstr.length, 
                  u8arr = new Uint8Array(n);
                  
              while(n--){
                  u8arr[n] = bstr.charCodeAt(n);
              }
              
              return new File([u8arr], filename, {type:mime});
            }
  
            file = dataURLtoFile(b64Str, file.name);
          }else{

            b64Str = reader.result
          }
          

          //const b64Str = piexif.remove(reader.result)

          // console.log("reader result after removing exif is ", b64Str)
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

            let imgPayLoad = {
              fileName: file.name
            }
            dispatch(getUploadImageURL(imgPayLoad)).then((res) => {
              const url = res.response.imageUrl
              const requestId = res.response.requestId
              const blockBlobClient = new BlockBlobClient(url, newPipeline())
              const uploadOptions = {
                blockSize: 1 * 1024 * 1024,
                concurrency: 10,
                maxSingleShotSize: 5
              }

              // fetch(`${url}`, {
              //   method: 'PUT',
              //   headers: { 'x-ms-blob-type': 'BlockBlob', 'Content-Type': 'image/png' },
              //   body: file
              // }).then((response) => {

              blockBlobClient.uploadData(file, uploadOptions).then((response) => {
                dispatch(saveDesignImage({ guid: uuid, uploadRequestId: requestId })).then(
                  (result) => {
                    let uploadedImage = {
                      file: result.response.imagePath,
                      fileName: file.name,
                      initialWidth,
                      initialHeight,
                      libraryImageId: result.response.libraryImageId,
                      guid: uuid
                      // fromPhotoLibrary: false
                    }
                    dispatch(uploadImage(uploadedImage))
                    // NotificationManager.success('Image uploaded successfully', '', 3000)
                    dispatch(addImageToCanvas({ uuid: uuid, ...uploadedImage }))
                  }
                )
              })
            })
            // dispatch(saveImageToPhotoLibrary(imagePayload)).then((res) => {
            //   let uploadedImage = {
            //     file: res.response.imagePath,
            //     fileName: file.name,
            //     initialWidth,
            //     initialHeight,
            //     libraryImageId: res.response.libraryImageId,
            //     guid: uuid
            //     // fromPhotoLibrary: false
            //   }
            //   dispatch(uploadImage(uploadedImage))
            //   // NotificationManager.success('Image uploaded successfully', '', 3000)
            //   dispatch(addImageToCanvas({ uuid: uuid, ...uploadedImage }))
            // })
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
        showLoader(false)
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
