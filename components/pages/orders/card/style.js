import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  cardRoot: {
    '& .MuiCard-root': {
      boxShadow: '0 5px 9px 3px rgba(37, 40, 44, 0.1)',
      borderRadius: 10,
      minHeight: 307,
      '@media screen and (min-width:1700px)': {
        minHeight: 377
      },
      '@media screen and (min-width:1600px) and (max-width:1699px)': {
        minHeight: 360
      },
      '@media screen and (min-width:1500px) and (max-width:1599px)': {
        minHeight: 345
      },
      '@media screen and (min-width:1400px) and (max-width:1499px)': {
        minHeight: 326
      }
    },
    '& .MuiCardMedia-root': {
      position: 'relative',
      cursor: 'auto'
    },
    '& .MuiCardActionArea-focusHighlight': {
      backgroundColor: '#fff!important'
    },
    '& .MuiTouchRipple-root': {
      color: 'transparent'
    }
  },
  pdtContent: {
    cursor: 'auto',
    marginBottom: theme.spacing(2)
  },
  LinkFocus: {
    width: '100%'
  },
  productLabel: {
    '&.MuiTypography-h3': {
      color: '#4b4e54',
      fontFamily: 'Inter SemiBold',
      fontSize: 18,
      fontWeight: 400
    }
  },
  productPrice: {
    '&.MuiTypography-h4': {
      color: '#6c7985',
      marginTop: theme.spacing(2)
    }
  },
  productAmount: {
    '&.MuiTypography-body2': {
      color: '#303337',
      fontFamily: 'Inter Medium',
      fontWeight: 500,
      marginTop: theme.spacing(1)
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
  },
  variantFlex: {
    display: 'flex',
    width: '100%',
    alignItems: 'baseline'
  },
  variantGrow: {
    flexGrow: 1,
    width: '50%'
  },
  variantEnd: {
    width: '50%'
  },
  leftItem: {
    width: '70%'
  },
  rightItem: {
    width: '30%'
  }
}))
export default style
