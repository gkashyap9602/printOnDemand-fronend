import React from 'react'
import Image from 'next/image'
import NoDataFound from '/static/images/no-data.png'
import NoImageFound from '/static/images/dtool-image.png'
import { Typography } from '@material-ui/core'

import style from './style'

const useStyles = style
function Nodata({ dtoolImage, className, labelClass, label }) {
  const classes = useStyles()
  return (
    <div className={classes.dataFlexItem}>
      <div>
        {dtoolImage ? (
          <Image src={NoImageFound} alt='no data' objectFit='contain' className={`${className}`} />
        ) : (
          <Image
            src={NoDataFound}
            alt='no data'
            height={261}
            width={255}
            objectFit='contain'
            className={`${classes.ImageNotFound} ${className}`}
          />
        )}
      </div>

      <div className={`${classes.dataText} ${labelClass}`}>
        <Typography variant='body2'>{label}</Typography>
      </div>
    </div>
  )
}

export default Nodata
