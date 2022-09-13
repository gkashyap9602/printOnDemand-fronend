import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  bgCardPay: {
    background: '#4b7bac',
    padding: theme.spacing(3),
    color: '#fff',
    borderRadius: 20,
    marginTop: 20,
    wordBreak: 'break-word',
    [theme.breakpoints.up('xl')]: {
      width: '85%'
    }
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  payEdit: {
    background: '#fff',
    width: 27,
    height: 26,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  cardNum: {
    marginBottom: theme.spacing(2),
    '& .MuiTypography-h2': {
      fontSize: 24,
      fontWeight: 500,
      fontFamily: 'Inter Medium',
      '& $span': {
        marginRight: 16
      }
    }
  },
  ExpiryDetails: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  expireDate: {
    width: '50%',
    '& .MuiTypography-h5': {
      fontSize: 12,
      marginBottom: 4
    },
    '& .MuiTypography-h4': {
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    }
  },
  cardName: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-h5': {
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    }
  }
}))
export default style
