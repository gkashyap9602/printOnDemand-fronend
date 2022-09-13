import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  btn_Save: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(2),
    '& .MuiButton-root': {
      width: 125
    }
  }
}))
export default style
