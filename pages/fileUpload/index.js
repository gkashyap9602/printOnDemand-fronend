import React, { useEffect, useState } from 'react'
import { post } from 'axios'
import { getConfig } from 'utils/fetchResponseHandler'
import { NotificationManager } from 'react-notifications'
import Icon from 'icomoons/Icon'
import CsvBanner from '/static/images/csv-upload.png'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { checkIfEmpty } from 'utils/helpers'
import { Button, Typography } from '@material-ui/core'
import Loader from 'components/loader'
import { style } from 'styles/orderList'
import Image from 'next/image'
const useStyles = style

/**
 *FileUpload
 * @param {*} param0
 * @returns
 */
const FileUpload = ({ handleClose, bulkOrder, shopifyAuth }) => {
  const [file, setfile] = useState([])
  const classes = useStyles()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({})
  const [loader, setloader] = useState(false)
  const onFormSubmit = async (targetFile) => {
    if (navigator?.onLine) {
      setloader(true)
      fileUpload(targetFile)
        .then((res) => {
          setloader(false)
          if (res?.data?.statusCode === 200) {
            NotificationManager.success('Orders have been successfully uploaded', '', '2000')
            handleClose()
            setfile([])
          }
        })
        .catch((error) => {
          setloader(false)
          NotificationManager.error(error.response.data?.Response?.Message, '', 10000)
          handleClose()
          setfile([])
        })
    } else {
      NotificationManager.error('No active internet connection', '', 10000)
    }
  }
  /**
   * fileUpload
   * @param {*} file
   * @returns
   */
  const fileUpload = (file) => {
    const url = `${process.env.BASE_URL}api/Orders/BulkImport`
    const formData = new FormData()
    formData.append('ExcelFile', file)
    formData.append('SaveFile', true)
    formData.append('SubmitImmediately', true)
    const config = shopifyAuth?.accessToken ? getConfig(shopifyAuth?.accessToken) : getConfig(false)
    return post(url, formData, config)
  }

  /**
   * bulk order handle
   */
  useEffect(() => {
    setfile(acceptedFiles)
    return () => setfile([])
  }, [acceptedFiles])
  useEffect(() => {
    setfile([])
  }, [bulkOrder])

  //HTML
  return (
    <>
      {loader && <Loader />}
      <div {...getRootProps({ className: 'dropzone' })}>
        <div className={classes.csvUploadWrapper}>
          <div>
            <Image src={CsvBanner} alt='Csv Upload' />
          </div>
          <div className={classes.csv_PadLeft}>
            <input {...getInputProps()} accept='.csv, .xlsx' />

            <Typography variant='body2'>
              Drag and drop your excel file here or
              <Button
                variant='outlined'
                endIcon={<Icon icon='upload-icon' size={18} />}
                className={classes.btn_Upload}
              >
                <span>Browse file</span>
              </Button>
            </Typography>
          </div>
        </div>
      </div>

      {!checkIfEmpty(file) && (
        <>
          <ul className={classes.bulkUpload_Files}>
            <li key={file?.[0]?.path}>
              {file?.[0]?.path} - {file?.[0]?.size} bytes
            </li>
          </ul>
        </>
      )}
      <div className={classes.bulk_Upload_Action}>
        <Button
          disabled={checkIfEmpty(file)}
          variant='contained'
          onClick={() => onFormSubmit(acceptedFiles[0])}
        >
          Submit
        </Button>
      </div>
    </>
  )
}
/**
 * mapStateToProps
 * @param {*} state
 * @returns
 */
const mapStateToProps = (state) => ({
  shopifyAuth: state?.shopify?.shopifyAuth
})

/**
 * mapDispatchToProps
 */
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)
