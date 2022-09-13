import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import style from '../loader/style'
const CircularProgressWithLabel = React.forwardRef((props, ref) => {
  const useStyles = style
  const classes = useStyles({ showPreviewLoader: true })
  return (
    <Box className={classes.loaderBlock} position='relative' display='inline-flex'>
      <CircularProgress variant='determinate' {...props} size={90} color={'secondary'} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='caption'
          component='div'
          style={{ color: '#fff', fontSize: 16 }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <Box
        top={'35vh'}
        left={'1vw'}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
        style={{ color: '#fff', fontSize: 16 }}
      >
        {props.message}
      </Box>
    </Box>
  )
})

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
}
const ProgressLoader = React.forwardRef((props, ref) => {
  const { progressRef } = ref
  const [progress, setProgress] = React.useState(props.initialValue)
  const [message, setMessage] = React.useState('Loading 3D models, please wait....')

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (value) => setProgress(value),
      setMessage: (value) => setMessage(value)
    }),
    [progress, message]
  )

  return <CircularProgressWithLabel message={message} value={progress} />
})

export default ProgressLoader
