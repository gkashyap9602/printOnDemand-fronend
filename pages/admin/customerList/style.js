import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  btn_Save: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(2),
    '& .MuiButton-root': {
      width: 125,
      borderRadius: 45
    }
  },
  popupCancel_Text: {
    color: '#292d2f',
    fontSize: 18,
    fontFamily: 'Inter SemiBold',
    fontWeight: 400,
    lineHeight: '27px',
    marginLeft: theme.spacing(2)
  },
  popupCancel_Btns: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    '& .MuiButton-root': {
      width: '20%',
      borderRadius: 45
    }
  }
}))
export default style
