import { makeStyles } from '@material-ui/core/styles'
const style = makeStyles((theme) => ({
  labelForm: {
    color: '#6c7985',
    margin: '5px!important'
  },
  SelectShrink: {
    '& .MuiInputLabel-root': {
      fontFamily: 'Inter Regular',
      color: '#6c7985'
    },
    '& .MuiSelect-select': {
      height: 'unset!important',
      paddingRight: '32px!important'
    },
    '& .MuiInputBase-root': {
      background: '#fff'
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
      '& .MuiInputLabel-root': {
        color: '#bababa',
        fontSize: 14,
        fontFamily: 'Inter Regular'
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
          background: '#f5f5f5'
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
    '& .MuiSelect-select': {
      height: 'unset'
    }
  },
  selectDropArrow: {
    paddingRight: 13
  },
  optionIcon: {
    minWidth: 30
  }
}))
export default style
