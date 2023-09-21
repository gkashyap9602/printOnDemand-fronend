import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  loaderBlock: {
    background: (props) =>
      props.showPreviewLoader ? 'rgb(96 96 96 / 100%)' : 'rgb(96 96 96 / 87%)',
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: '10000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0'
  },
  loadImg: {
    userSelect: 'none',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    '&:focus': {
      userSelect: 'none'
    }
  },
  progressRoot: {
    position: 'relative',
    display: 'inline-flex',
    '& .MuiCircularProgress-colorPrimary': {
      color: '#fff'
    }
  }
}))

export default style
