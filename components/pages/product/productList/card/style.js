import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  cardRoot: {
    '& .MuiCard-root': {
      boxShadow: '0 5px 9px 3px rgba(37, 40, 44, 0.1)',
      borderRadius: 10,
      minHeight: 417,

      wordBreak: 'break-word',
      outline: 'none',
      [theme.breakpoints.down('xs')]: {
        minHeight: 'unset'
      },

      '@media screen and (min-width:1600px) and (max-width:1699px)': {
        minHeight: 375
      },
      '@media screen and (min-width:1500px) and (max-width:1599px)': {
        minHeight: 360
      },
      '@media screen and (min-width:1400px) and (max-width:1499px)': {
        minHeight: 350
      },
      '@media screen and (min-width:1300px) and (max-width:1399px)': {
        minHeight: 340
      },
      '@media screen and (min-width:1279px) and (max-width:1299px)': {
        minHeight: 336
      },
      '@media screen and (min-width:1200px) and (max-width:1278px)': {
        minHeight: 400
      },
      '@media screen and (min-width:1160px) and (max-width:1199px)': {
        minHeight: 465
      },
      '@media screen and (min-width:1080px) and (max-width:1159px)': {
        minHeight: 446
      }
    },
    '& .MuiCardMedia-root': {
      position: 'relative'
    },
    '& .MuiCardActionArea-focusHighlight': {
      backgroundColor: '#fff!important'
    },
    '& .MuiTouchRipple-root': {
      color: 'transparent'
    }
  },
  pdtContent: {
    marginBottom: theme.spacing(2)
  },
  LinkFocus: {
    width: '100%',
    outline: 'none'
  },
  productLabel: {
    '&.MuiTypography-h3': {
      color: '#4b4e54',
      fontFamily: 'Inter SemiBold',
      fontSize: 18,
      fontWeight: 400,

      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word'
    }
  },
  productPrice: {
    '&.MuiTypography-h4': {
      color: '#50595e',
      marginTop: theme.spacing(2)
    }
  },
  productAmount: {
    '&.MuiTypography-h3': {
      color: '#303337',
      fontFamily: 'Inter Bold',
      fontSize: 18,
      marginTop: theme.spacing(1),
      fontWeight: 400
    }
  },
  sliderArrow: {
    border: '3px solid #ffffff',
    backgroundColor: '#f1f7fc',
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderNext: {
    position: 'absolute',
    bottom: -11,
    zIndex: 1,
    right: 13,
    cursor: 'pointer'
  },
  sliderPrev: {
    position: 'absolute',
    bottom: -11,
    zIndex: 1,
    right: 60,
    cursor: 'pointer'
  },
  imageThumb: {
    borderRadius: '50%'
  }
}))
export default style
