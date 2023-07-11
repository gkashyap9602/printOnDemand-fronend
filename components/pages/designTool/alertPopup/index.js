import React, { useState, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import Image from 'next/image'
import AlertBanner from '/static/images/alert-banner.png'
import SizeSelect from './SizeSelect'
import style from './style'

import { useSelector } from 'react-redux'

const useStyles = style
const AlertPopup = ({ onConfirm, onClose, mode }) => {
  const classes = useStyles()
  const [section, setSection] = useState(0)

  const product = useSelector((state) => state.product.product_details)
  const [isCheck, setIsCheck] = useState([])

  useEffect(() => {
    if (mode === 'edit' || mode === 'duplicate') {
      setSection(1)
    }
  }, [])
  const handleBack = () => {
    if (section > 0 && mode != 'edit' && mode != 'duplicate') setSection(0)
    else onClose()
  }

  return (
    <div>
      {section === 0 && mode != 'edit' && (
        <SizeSelect
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          onClose={onClose}
          setSection={setSection}
          productVariants={product?.response?.productVarients}
        />
      )}
      {section === 1 && (
        <>
          <div className={classes.imgBanner}>
            <Image src={AlertBanner} alt='Alert Banner' />
          </div>
          <div className={classes.textHeader}>
            <Typography variant='h3'>Online proof approval</Typography>
          </div>
          <div className={classes.contentBlock}>
            <Typography variant='h4'>
              By clicking the approve button, I agree that spelling, content and layout are correct.
              I understand that my document will print exactly as it appears above and that I cannot
              make any changes once my order has been placed.
            </Typography>
          </div>
          <div className={classes.textHeader}>
            <Typography variant='h3'>Copyright authorization</Typography>
          </div>
          <div className={classes.contentBlock}>
            <Typography variant='h4'>
              I confirm that I am the copyright or license owner of an uploaded image.
            </Typography>
          </div>

          <div className={classes.btnAlert}>
            <Button className={classes.btnCancel} onClick={handleBack}>
              Back
            </Button>
            <Button className={classes.btnApprove} variant='contained' onClick={onConfirm}>
              Approve
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(AlertPopup)
