import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  rotateSvg: {
    animation: '$rotation 3s infinite linear!important',
    transform: 'rotate(360deg)!important'
  },
  img: {
    position: 'relative !important'
  },
  admin: {
    height: '100%',
    position: 'absolute',
    top: '50%',
    left: '38%'
  },
  catalog: {
    position: 'absolute',
    height: '60px',
    top: '41%',
    left: '40%'
  },

  slide: {
    position: 'absolute',
    height: '60px',
    left: '30%',
    top: '28%'
  },
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(359deg)'
    }
  }
}))

export default style
