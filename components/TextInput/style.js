const { makeStyles } = require('@material-ui/core')
const style = makeStyles((theme) => ({
  labelForm: {
    color: '#6c7985',
    margin: '5px!important'
  },
  hide: {
    display: 'none'
  },
  pswdIconButton: {
    '&.MuiIconButton-root': {
      cursor: 'pointer!important',
      '&:hover': {
        background: '#f1f1f1!important'
      }
    }
  },
  rootInput: {
    '& .MuiFormHelperText-contained': {
      color: 'red',
      fontSize: '13px',
      fontWeight: '400',
      marginLeft: '0px',
      marginRight: '0px',
      fontFamily: 'Inter Regular'
    },
    '& .MuiFormControl-root': {
      '& .MuiButtonBase-root:hover ': {
        backgroundColor: 'unset',
        cursor: 'auto'
      },
      '& .MuiTouchRipple-root': {
        color: '#fff'
      },

      '& .MuiInputLabel-root': {
        color: '#17243e',
        fontSize: 14
      },

      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d4d4d4!important'
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
    },
    '& .MuiFormControlLabel-root': {
      '& .MuiTypography-root': {
        color: '#0b2343',
        fontSize: 14,
        fontWeight: '300'
      },
      '& .MuiIconButton-root': {
        '&:hover': {
          backgroundColor: '#f5f5f5'
        },
        '&:focus': {
          background: '#f5f5f5'
        }
      },
      '& .MuiCheckbox-root': {
        color: '#CACED7'
      },
      '& .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#ccc'
      },
      '& .MuiIconButton-label': {
        fontSize: 24,
        border: '1px solid #bbbbbb',
        width: 20,
        height: 20,
        borderRadius: 3,
        '& .MuiSvgIcon-root': {
          fill: '#fff'
        }
      }
    },

    '& .MuiOutlinedInput-inputMultiline': {
      paddingLeft: '0px!important',
      borderColor: '#d4d4d4',
      color: '#000'
    }
  }
}))
export default style
