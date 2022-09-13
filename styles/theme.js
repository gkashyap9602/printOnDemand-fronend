import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3374B6',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fcb357',
      contrastText: '#fff'
    }
  },

  typography: {
    fontFamily: ['Inter Regular'],
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
    h1: {
      fontSize: '28px',
      fontWeight: '400',
      fontFamily: ['Inter Bold']
    },
    h2: {
      fontSize: '26px',
      fontWeight: '700',
      fontFamily: ['Inter Bold']
    },
    h3: {
      fontSize: '19px',
      fontWeight: '700'
    },
    h4: {
      fontSize: '14px',
      fontWeight: '400'
    },
    h5: {
      fontSize: '13px'
    },
    body1: {
      fontSize: '14px'
    },
    body2: {
      fontSize: '16px'
    }
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Inter'],
        body: {
          overflowX: 'hidden',
          fontSize: 14
        }
      }
    },

    MuiButton: {
      root: {
        borderRadius: 4,
        textTransform: 'capitalize'
      },

      contained: {
        backgroundColor: '#3374b6',
        color: '#fff',
        boxShadow: 'none',
        fontWeight: '600',
        textTransform: 'initial',
        padding: '12px 16px',
        borderRadius: '45px',
        height: '45px',

        '&:hover': {
          backgroundColor: '#23619f'
        },
        '& .MuiButton-label': {
          fontFamily: 'Inter Medium',
          fontSize: 14,
          fontWeight: 500
        }
      },
      outlined: {
        padding: '6px 17px',
        border: '1px solid #dadada',
        color: '#50585f',
        borderRadius: '45px',
        height: '45px',
        '&:hover': {
          backgroundColor: '#fff!important'
        }
      }
    },

    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'none',
          width: '100%'
        }
      }
    },
    MuiList: {
      root: {
        width: '100%'
      }
    },
    MuiListItem: {
      root: {
        '&.Mui-selected': {
          background: '#e0dcdc!important'
        }
      }
    },

    MuiTextField: {
      root: {
        '& :-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px white inset'
        },
        '& .MuiInputBase-root': {
          height: '100%',
          minHeight: 45
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: 25
        },
        '& .MuiOutlinedInput-input': {
          padding: '0px 15px 0px 15px',
          height: '100%'
        },
        '& .MuiInputLabel-formControl': {
          top: -4
        },
        '& .MuiInputLabel-shrink': {
          top: 0,
          left: -4,
          background: '#fff'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#d4d4d4'
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          color: '#7c7e84',
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: 0.4,
          '&.Mui-error': {
            color: '#f12b1c'
          }
        },
        '& .MuiOutlinedInput-adornedEnd': {
          paddingRight: 0
        }
      }
    },

    MuiInputLabel: {
      root: {
        opacity: 0.77,
        color: '#000000',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 400
      }
    },
    cancel: {
      color: '#3b3b3b',
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 500,
      height: 44,
      marginRight: 10,
      borderRadius: 2
    },
    '& .materialui-daterange-picker-makeStyles-dateRangePicker-2': {
      position: 'absolute'
    },
    MuiSwitch: {
      root: {
        padding: 6,
        '& .MuiSwitch-track': {
          borderRadius: 20
        },
        '& .MuiSwitch-colorPrimary.Mui-checked': {
          color: '#ffffff'
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          opacity: 1
        }
      }
    },

    MuiMenu: {
      list: {
        maxHeight: 217,
        overflowY: 'auto'
      }
    },
    MuiPaper: {
      root: {
        transition: 'none!important'
      }
    }
  },

  props: {
    MuiButton: {
      disableElevation: true
    },
    MuiTooltip: {
      arrow: true
    },
    MuiSwitch: {
      color: 'primary'
    }
  }
})

export default theme
