const { makeStyles } = require('@material-ui/core')
const style = makeStyles((theme) => ({
btn_Submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  LoaderSession: {
    color: '#3374b6',
    marginLeft: theme.spacing(2)
  }
}))
export default style
