import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  list: {
    width: 513,
    padding: '20px'
  },

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
        width: 'unset'
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
    cursor: 'pointer'
  }
}))
export default style
