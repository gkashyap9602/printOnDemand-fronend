import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  panelHeader: {
    color: '#303337',
    marginTop: '16px!important'
  },
  scrollOverflow: {
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
      width: 6,
      height: 9
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4,
      background: '#ccc'
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 4,
      background: 'none'
    }
  },
  BgPanel: {
    width: '100%',
    paddingRight: 28,
    '& .MuiFormHelperText-contained': {
      color: 'red!important',
      fontSize: '13px',
      fontWeight: '400',
      textAlign: 'right',
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
    }
  },

  labelForm: {
    color: '#6c7985',
    margin: '5px!important'
  },

  colorBar: {
    width: 26,
    height: 26,
    borderRadius: 15,
    cursor: 'pointer'
  },
  colorActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  customDefault: {
    borderRadius: 15,
    border: '1px solid #e7e8eb',
    padding: '5px 15px 5px 7px',
    display: 'flex',
    alignItems: 'center',
    height: 29,
    fontSize: 12,
    color: '#6c7985',
    cursor: 'pointer'
  },
  colorHexCode: {
    height: 20,
    width: 20,
    marginRight: 8,
    borderRadius: '50%',
    border: '1px solid #ccc'
  },
  warningMsg: {
    background: '#fff8f0',
    width: '100%',

    display: 'flex',
    border: '1px solid #f4e9dc',
    backgroundColor: '#fffcf8',
    padding: theme.spacing(2),
    '& .MuiTypography-h5': {
      lineHeight: '19px',
      color: '#292d2f'
    }
  },
  bgPadding: {
    paddingRight: 28
  },

  bgCheckBox: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    '& .MuiFormControlLabel-root': {
      marginLeft: '0px!important',

      '& .MuiTypography-root': {
        color: '#292d2f',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: '22px'
      },

      '& .MuiIconButton-root': {
        '&:hover': {
          background: '#fff'
        },
        '&:focus': {
          background: '#3374b6'
        }
      },
      '& .MuiCheckbox-root': {
        color: '#CACED7',
        width: 23,
        height: 23,
        marginRight: 10
      },

      '& .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#ccc',
        background: '#3374b6',
        width: 23,
        height: 23,
        borderRadius: 13,
        '&:hover': {
          background: '#3374b6'
        },
        '& .MuiIconButton-label': {
          border: 'unset'
        }
      },

      '& .MuiIconButton-label': {
        fontSize: 24,

        border: '2px solid #d4d4d4',
        width: 23,
        height: 23,
        borderRadius: 13,

        '& .MuiSvgIcon-root': {
          fill: '#fff',
          padding: 3
        }
      }
    }
  }
}))
export default style
