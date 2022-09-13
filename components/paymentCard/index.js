import React from 'react'
import Image from 'next/image'
import Icon from 'icomoons/Icon'
import { Box, Typography } from '@material-ui/core'

import ChipCard from '/static/images/chipcard.png'
import PayCard from '/static/images/payCard.png'

import style from './style'

const useStyles = style

const PaymentCard = ({ data, handleOnClick }) => {
  const classes = useStyles()
  return (
    <div className={classes.bgCardPay}>
      <div className={classes.cardHeader}>
        <div style={{ flexGrow: 1 }}>
          <Image src={ChipCard} alt='Payment Info' width={49} height={45} />
        </div>
        <div className={classes.payEdit}>
          <Icon icon='edit-icon' size={18} color='#6d7174' onClick={handleOnClick} />
        </div>
      </div>
      <div className={classes.cardNum}>
        <Typography variant='h2'>
          <span>XXXX</span>
          <span>XXXX</span>
          <span>XXXX</span>
          <span>----</span>
        </Typography>
      </div>
      <div className={classes.ExpiryDetails}>
        <Box className={classes.expireDate}>
          <Typography variant='h5'>Expiry date</Typography>
          <Typography variant='h4'>
            {data?.expirationMonth}/{data?.expirationYear}
          </Typography>
        </Box>
      </div>

      <div className={classes.cardName}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant='h5'>{data?.name}</Typography>
        </div>
        <div>
          <Image src={PayCard} alt='Payment Info' width={76} height={25} />
        </div>
      </div>
    </div>
  )
}

export default PaymentCard
