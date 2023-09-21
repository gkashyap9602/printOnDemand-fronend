import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  modalPopper: {
    '& .MuiDialog-paper': {
      maxWidth: 1000,
      width: 600,
      borderRadius: 14
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiDialog-paper': {
        maxWidth: 600
      }
    },
    [theme.breakpoints.down('xs')]: {
      '& .MuiDialog-paper': {
        maxWidth: 'calc(100% - 64px)'
      }
    },
    '@media screen and (min-width:600px) and (max-width:959px)': {
      '& .MuiDialog-paper': {
        width: 500
      }
    },

    '& .MuiDialogContent-root': {
      marginBottom: 20
    },
    '& .MuiDialogTitle-root': {
      paddingBottom: 0
    }
  },
  modalTitle: {
    '& .MuiTypography-h3': {
      fontSize: 20,
      fontFamily: 'Inter SemiBold',
      color: '#303337',
      fontWeight: 400
    }
  },
  CloseDialog: {
    cursor: 'pointer',
    '@media screen and (max-width:499px)': {
      position: 'absolute',
      top: 8,
      right: 9
    }
  },
  download_Btn: {
    display: 'flex',
    width: '68%',
    '& .MuiButton-root': {
      textTransform: 'initial'
    },
    '@media screen and (max-width:499px)': {
      width: 'unset',
      marginTop: 8
    }
  },
  samplePopup: {
    '@media screen and (max-width:499px)': {
      flexWrap: 'wrap'
    },
    '& $modalTitle': {
      marginRight: 10
    },
    '@media screen and (min-width:500px)': {
      '& $modalTitle': {
        width: '170px'
      }
    }
  }
}))
export default style
