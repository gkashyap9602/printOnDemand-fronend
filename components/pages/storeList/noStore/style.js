import { makeStyles } from '@material-ui/core/styles'
const style = makeStyles((theme) => ({
  bgStore: {
    background: '#fff',
    padding: theme.spacing(2),
    boxShadow: '0 2px 20px rgba(38, 41, 44, 0.07)',
    borderRadius: 6,
    width: '100%',
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 26
    }
  },
  storeConnect_Flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  btn_Store: {
    '&.MuiButton-root': {
      minWidth: 148
    }
  },
  labelStore: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    '& .MuiTypography-body2': {
      color: '#6b757f',
      marginBottom: theme.spacing(2)
    }
  }
}))
export default style
