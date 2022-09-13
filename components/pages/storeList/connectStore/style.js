import { makeStyles } from '@material-ui/core/styles'
const style = makeStyles((theme) => ({
  connectModal: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  modalTitle: {
    color: '#292d2f',
    fontFamily: 'Inter SemiBold',
    fontSize: 18,
    fontWeight: 400,
    marginLeft: theme.spacing(2),
    lineHeight: '27px'
  },
  storeLabel: {
    color: '#292d2f',
    fontSize: 14,
    lineHeight: '27px',
    marginBottom: '5px'
  },
  store_Valid: {
    color: '#6b757f',
    fontStyle: 'italic',
    fontSize: 'italic',
    padding: '5px 20px'
  },
  btnActions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: 10
    }
  },
  btnCancel: {
    borderRadius: 45,
    width: '20%',
    '& .MuiButton-label': {
      color: '#292d2f'
    },
    '&:hover': {
      background: 'none'
    }
  },
  btnConnect: {
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  storeConnect_Img: {
    width: 124,
    height: 124,
    border: '1px solid #e2eccf',
    backgroundColor: '#f6ffe6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10
    }
  },

  TextStyle: {
    width: '100%',

    '& .MuiFormHelperText-contained': {
      color: 'red',
      fontSize: '13px',
      fontWeight: '400',
      marginLeft: '0px',
      marginRight: '0px',
      fontFamily: 'Inter Regular'
    },
    '& .MuiFormControl-root': {
      '& .MuiInputLabel-root': {
        color: '#17243e',
        fontSize: 14
      },

      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d4d4d4'
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #d4d4d4'
      },
      '& .MuiInputLabel-outlined.Mui-focused': {
        color: '#0B2343'
      },
      '& .MuiInputAdornment-positionEnd': {
        cursor: 'pointer'
      }
    }
  }
}))
export default style
