import React from 'react'
import Image from 'next/image'
import { CircularProgress, Box } from '@material-ui/core'
import ImgIcon from '/static/images/profile/drawer-logo.png'
import style from './style'

const Loader = ({ fullOpaque = false, message = '' }) => {
  const useStyles = style
  const classes = useStyles({ showPreviewLoader: fullOpaque })

  // loader

  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  // loader

  return (
    <>
      <div className={classes.loaderBlock}>
        <div className={classes.progressRoot}>
          <CircularProgress variant='determinate' value={progress} size={70} thickness={2} />
          <div className={classes.loadImg}>
            <Image src={ImgIcon} alt='Loader' height='30' width='30' />
          </div>
        </div>
        <div
          // display='flex'
          // alignItems='center'
          // justifyContent='center'
          style={{ color: '#fff', fontSize: 15 }}
        >
          {message}
        </div>
      </div>
    </>
  )
}

export default Loader
