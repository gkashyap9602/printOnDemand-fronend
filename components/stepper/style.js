import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  stepTimeline: {
    '& .MuiStepper-root': {
      background: 'none'
    },
    '& .MuiStepper-horizontal': {
      [theme.breakpoints.down('xs')]: {
        alignItems: 'flex-start'
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0
      }
    },
    '& .MuiStepButton-root': {
      '@media screen and (max-width:674px)': {
        width: '143%',
        marginRight: 20,
        paddingLeft: 0
      }
    },
    width: '100%',
    overflowX: 'auto'
  },
  IconStepper: {
    borderRadius: '50%',
    border: '1px solid #d4d4d4',
    backgroundColor: '#ffffff',
    padding: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnStepper: {
    '& .MuiStepLabel-label': {
      fontWeight: 500,
      fontFamily: 'Inter Medium',
      '&.MuiStepLabel-active': {
        color: '#303337',
        fontFamily: 'Inter SemiBold'
      }
    },
    '& .MuiStepLabel-labelContainer': {
      textAlign: 'left'
    },
    '& .MuiStepLabel-root': {
      alignItems: 'flex-start'
    }
  },
  stepperStatus: {
    fontSize: 12,
    fontFamily: 'Inter Medium'
  },
  stepperComplete: {
    fontSize: 12,
    color: '#75ca9e',
    fontFamily: 'Inter SemiBold',
    fontWeight: 400
  }
}))
export default style
