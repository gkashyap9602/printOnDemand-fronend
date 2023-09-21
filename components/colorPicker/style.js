import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  colorPicker: {
    position: 'relative'
  },
  pickerClose: {
    position: 'absolute',
    top: '-17px',
    right: '-6px',
    zIndex: 1,
    cursor: 'pointer'
  }
}))
export default style
