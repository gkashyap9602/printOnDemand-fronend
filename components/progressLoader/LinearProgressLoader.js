import React from 'react'
import { LinearProgress } from '@material-ui/core'
const LinearProgressLoader = React.forwardRef((props, ref) => {
  const { linearProgressRef } = ref
  const [progress, setProgress] = React.useState(props.initialValue)

  React.useImperativeHandle(
    ref,
    () => ({
      setProgress: (value) => setProgress(value),
      getProgress: () => {
        console.log('Inside get Progress', progress)
        return progress
      }
    }),
    [progress, props.message]
  )
  React.useEffect(() => {
    if (progress >= 100) props.setShowLinearProgress(false)
  }, [progress])
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '5px' }}>{props.message}</div>
      <LinearProgress variant='determinate' value={progress} />
    </div>
  )
})

export default LinearProgressLoader
