import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  customer_Tab: {
    position: 'relative',
    boxShadow: '0 2px 20px rgba(38, 41, 44, 0.07)',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),

    backgroundImage: "url('/static/images/bg-pattern.png')",
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto',
    backgroundPosition: 'center',

    '@media screen and (max-width:1200px)': {
      overflowX: 'scroll',
      overflowY: 'hidden'
    },
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 20
    }
  },
  tab_Block: {
    width: '25%',
    wordBreak: 'break-word',
    alignItems: 'flex-start!important',
    justifyContent: 'flex-start!important',
    marginRight: '0px!important',
    cursor: 'pointer',
    position: 'relative',

    '@media screen and (max-width:1200px)': {
      width: '100%'
    },

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      right: 19,
      width: '89%',
      bottom: -17
    }
  },
  tab_ActiveCustomer: {
    height: 2,
    width: 199,
    position: 'absolute',
    bottom: -16
  },
  tabIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    border: '1px solid #dcdcdc',
    marginRight: '8px!important'
  },
  tabArea: {
    display: 'block!important',
    '@media screen and (max-width:1200px)': {
      width: '200px'
    },
    '& .MuiTypography-body2': {
      color: '#303337',
      fontFamily: 'Inter SemiBold',
      fontWeight: 400
    },
    '& .MuiTypography-h4': {
      color: '#292d2f'
    }
  }
}))
export default style
