const { makeStyles } = require('@material-ui/core')
const style = makeStyles((theme) => ({
  dataFlexItem: {
    textAlign: 'center',
    marginTop: theme.spacing(4)
  },
  dataText: {
    '& .MuiTypography-body2': {
      color: '#84898f',
      fontWeight: 400,
      fontFamily: 'Inter SemiBold'
    }
  },
  ImageNotFound: {
    height: 261,
    width: 255
  }
}))
export default style
