import React, { useCallback } from 'react'
import { Button, FormGroup, TextField, Typography, CircularProgress } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import Image from 'next/image'
import style from './style'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { NotificationManager } from 'react-notifications'

const useStyles = style

const AddCategory = ({
  handleClose = () => {},
  title = '',
  name = '',
  saveCategory = () => {},
  uploadedFiles = [],
  categoryName = '',
  setUploadedFiles = () => {},
  setCategoryName = () => {},
  loaderBtn = false,
  deleteImage = () => {},
  isLoader = true,
  setIsLoader = () => {}
}) => {
  const classes = useStyles()

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file?.type.includes('image')) {
          if (
            file?.type === 'image/jpeg' ||
            file?.type === 'image/jpg' ||
            file?.type === 'image/png'
          ) {
            const reader = new FileReader()
            reader.onload = () => {
              const binaryStr = reader.result
              setUploadedFiles([
                ...uploadedFiles,
                {
                  uuid: uuidv4(),
                  name: file.name,
                  size: file.size,
                  imagePath: URL.createObjectURL(file),
                  base64: binaryStr.replace(/^data:image\/[a-z]+;base64,/, '')
                }
              ])
            }

            reader.readAsDataURL(file)
          } else {
            NotificationManager.warning('Please upload JPEG or PNG file', '', 3000)
          }
        } else {
          NotificationManager.warning('Please upload image file', '', 3000)
        }
      })
    },
    [acceptedFiles, uploadedFiles]
  )

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false })

  return (
    <div>
      <Typography variant='h3' className={classes.category_Title}>
        {title}
      </Typography>
      <div className={classes.categoryField}>
        <div>
          <Typography variant='body1' className={classes.labelForm}>
            {name}
          </Typography>
          <FormGroup row className={classes.fieldGroup}>
            <TextField
              variant='outlined'
              // id={name}
              placeholder={`${name.split(' ')[0]}`}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              InputLabelProps={{
                shrink: false
              }}
              FormHelperTextProps={{
                className: classes.helperText
              }}
              inputProps={{ maxLength: 60 }}
              className={classes.groupInput}
            />
            <div
              {...getRootProps({ className: 'dropzone' })}
              className={classes.addImageInput}
              style={
                uploadedFiles.length >= 1 && uploadedFiles[0].imagePath
                  ? {
                      pointerEvents: 'none',
                      cursor: 'default',
                      color: '#3374b647',
                      borderColor: '#d4d4d480'
                    }
                  : null
              }
            >
              <input {...getInputProps()} />
              <span
                style={
                  uploadedFiles.length >= 1 && uploadedFiles[0].imagePath
                    ? {
                        color: '#3374b647',
                        borderColor: '#d4d4d480'
                      }
                    : null
                }
              >
                + Add image
              </span>
            </div>
            {uploadedFiles?.map(
              (file) =>
                file.imagePath && (
                  <>
                    <div
                      style={{ cursor: 'default' }}
                      className={classes.category_Img}
                      key={file.uuid}
                    >
                      {isLoader ? (
                        <CircularProgress style={{ position: 'absolute', zIndex: '9' }} size={25} />
                      ) : (
                        ''
                      )}
                      <Image
                        loading='lazy'
                        onLoadingComplete={() => {
                          setIsLoader(false)
                        }}
                        src={file.imagePath}
                        alt='ProductImage'
                        width={45}
                        height={45}
                        objectFit='cover'
                        className={classes.imgBorder}
                      />
                    </div>

                    <div className={classes.deleteIcon} onClick={() => deleteImage(file)}>
                      <Icon icon='delete' size={20} color='#bbbbbb' />
                      <span className={classes.tooltiptext}>Delete</span>
                    </div>
                  </>
                )
            )}
          </FormGroup>
          <Typography variant='h6' className={classes.supportedImgText}>
            Supported format:PNG, JPEG, JPG
          </Typography>
        </div>
      </div>

      <div className={classes.btnDiv}>
        <Button
          type='submit'
          onClick={() => {
            handleClose()
          }}
          className={classes.btnCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={!(categoryName && uploadedFiles.length) || loaderBtn}
          type='submit'
          variant='contained'
          onClick={() => {
            saveCategory({ name: categoryName, files: uploadedFiles })
          }}
          className={classes.btnSave}
        >
          Save
          {loaderBtn && (
            <CircularProgress
              style={{ marginLeft: 5 }}
              size={14}
              className={classes.LoaderSession}
            />
          )}
        </Button>
      </div>
    </div>
  )
}

export default AddCategory
