import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  bgCreateOrder: {
    width: '100%',
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 20
    }
  },
  createHead: {
    '& .MuiTypography-h3': {
      color: '#303337'
    }
  },
  rootOrder: {
    background: '#fff',
    boxShadow: '0 2px 20px rgba(38, 41, 44, 0.07)',
    borderRadius: 6,
    margin: 0,
    width: '100%'
  },
  orderDetail: {
    backgroundColor: '#fafafa',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    padding: '16px!important',
    wordBreak: 'break-word'
  },
  orderDelay_Popup: {
    fontFamily: 'Inter Medium',
    lineHeight: '25px'
  },
  btnOrder_Close: {
    borderRadius: 45,
    width: '15%',
    '& .MuiButton-label': {
      color: '#292d2f'
    },
    '&:hover': {
      background: 'none'
    }
  },
  btnOrder: {
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  wrapper_Btn: {
    marginTop: theme.spacing(3)
  },
  order_Banner: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3)
  }
}))
