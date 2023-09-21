import React from 'react'
import Image from 'next/image'
import { CircularProgress, Box } from '@material-ui/core'
import ImgIcon from '/static/images/profile/drawer-logo.png'
import style from './style'

const Loader = ({ fullOpaque = false, message = '', useAlternatingMessage = false }) => {
  const useStyles = style
  const classes = useStyles({ showPreviewLoader: fullOpaque })
  const messages = [
    'Getting everything ready...',
    'Preparing the canvas...',
    'Image uploading is in progress...',
    'Getting there... Please wait...'
  ]
  // loader

  const [progress, setProgress] = React.useState(0)
  const [messageToShow, setMessageToShow] = React.useState(messages[0])
  const indexRef = React.useRef(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  // loader

  React.useEffect(() => {
    if (message) {
      const loop = setInterval(() => {
        if (indexRef.current < 4) setMessageToShow((message) => messages[indexRef.current + 1])

        indexRef.current++
      }, 35000)
    }
    if (indexRef.current > 3) clearInterval(loop)
    return () => {
      clearInterval(loop)
    }
  }, [])

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
          {useAlternatingMessage ? messageToShow : message}
        </div>
      </div>
    </>
  )
}

export default Loader
