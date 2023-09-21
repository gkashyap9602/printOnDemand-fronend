import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  bgAccount: {
    position: 'relative'
  },
  bgCurve: {
    backgroundImage: "url('/static/images/cloud.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 244,
    height: 216
  },
  accountGrid: {
    padding: theme.spacing(4)
  },
  root: {
    marginTop: 20,
    '& a': {
      color: '#3374b6!important',
      fontFamily: 'Inter Medium',
      fontWeight: 500,
      paddingLeft: 5,
      textDecoration: 'none',
      cursor: 'pointer',

      '&:hover': {
        textDecoration: 'none',
        color: '#23619f!important'
      }
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  signup_Row: {
    '& .MuiTypography-h2': {
      lineHeight: '32px',
      marginBottom: theme.spacing(2),
      color: '#303337',
      fontWeight: 400
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  rowspan: {
    color: '#3374b6',
    marginLeft: theme.spacing(1)
  },

  bgSignup: {
    background: '#fff',
    boxShadow: '0 2px 10px 5px rgba(37, 40, 44, 0.1)',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    '& .MuiTypography-h1': {
      color: '#303337',
      fontWeight: 400
    }
  },
  formWrapper: {
    width: '100%',
    marginTop: theme.spacing(3),
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
    marginBottom: 5
  },

  checkedWrap: {
    marginTop: theme.spacing(3),

    '& .MuiFormControlLabel-root': {
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
  },

  btn_Signup: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  form_Flex: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1)
  },
  LoaderSession: {
    color: '#3374b6',
    marginLeft: theme.spacing(2)
  },

  successMsg: {
    background: '#e0ffef',
    width: '100%',
    padding: '16px 32px',
    marginTop: '16px',
    marginBottom: '16px',
    display: 'flex',
    '& .MuiTypography-h5': {
      lineHeight: '22px',
      color: '#292d2f'
    }
  }
}))
