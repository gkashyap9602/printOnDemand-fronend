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
  counterSize: {
    marginTop: theme.spacing(2)
  },
  TextPanel: {
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
  SelectShrink: {
    '& .MuiInputLabel-root': {
      fontFamily: 'Inter Regular',
      color: '#6c7985'
    },
    '& .MuiSelect-select': {
      height: 'unset!important',
      paddingRight: theme.spacing(4)
    }
  },

  multiTextField: {
    '& .MuiOutlinedInput-root': {
      height: 'unset!important'
    },
    '& .MuiOutlinedInput-input': {
      padding: 'unset!important'
    }
  },

  counterField: {
    '& .MuiButton-label': {
      fontWeight: 400
    }
  },
  counterIcon: {
    '& .MuiButton-label': {
      fontSize: 11,
      color: '#9A9AB0'
    }
  },
  colorHexCode: {
    height: 20,
    width: 20,
    marginRight: 8,
    borderRadius: '50%',
    border: '1px solid #ccc'
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
  btnAddText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  btnTextWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(2),
    flexWrap: 'wrap',
    '& .MuiButton-label': {
      textTransform: 'none'
    },

    '@media screen and (min-width:960px) and (max-width:1322px)': {
      flexDirection: 'column-reverse'
    }
  },
  btnApplyCanvas: {
    '@media screen and (min-width:960px) and (max-width:1322px)': {
      marginBottom: 16,
      '& .MuiButton-root': {
        width: '100%'
      }
    }
  },
  dtoolImage: {
    width: '153px!important',
    height: '156px!important'
  },

  textClass: {
    '& .MuiTypography-body2': {
      fontSize: 14,
      color: '#6b757f!important',
      fontWeight: '400!important',
      fontFamily: 'Inter Regular!important'
    }
  },
  addComp: {
    '&.MuiButton-root': {
      marginBottom: theme.spacing(1),
      '@media screen and (min-width:600px) and (max-width:729px)': {
        width: '45%',
        marginRight: theme.spacing(2)
      },
      '@media screen and (min-width:730px) and (max-width:959px)': {
        width: '30%',
        marginRight: theme.spacing(2)
      },
      '@media screen and (min-width:960px) and (max-width:1000px)': {
        padding: 0
      }
    }
  },
  libraryBtn: {
    '&.MuiButton-root': {
      '@media screen and (min-width:600px) and (max-width:729px)': {
        width: '45%'
      },
      '@media screen and (min-width:730px) and (max-width:959px)': {
        width: '30%'
      }
    }
  },
  dtoolImageAdd: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  dtool_Image: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'start'
  },
  btnPosition: {
    maxWidth: '100%',
    overflowX: 'auto',
    paddingBottom: 10,
    '&::-webkit-scrollbar': {
      width: 6,
      height: 4
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4,
      background: '#dbdbdb'
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 4,
      background: 'none'
    },
    '& .MuiButton-outlined': {
      height: 35
    }
  },
  patternSlider: {
    display: 'flex',
    marginLeft: 5,
    '& .MuiInput-root': {
      '&::before': {
        borderBottom: 'none'
      },
      '&::after': {
        borderBottom: 'none'
      }
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none'
    },
    '& .MuiInputBase-input': {
      padding: '6px 4px 7px'
    },
    '& .MuiSlider-rail': {
      backgroundColor: '#dbdbdb',
      opacity: 1
    },
    '& .MuiSlider-track': {
      backgroundColor: '#dbdbdb'
    }
  },
  patternTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%',
    overflowX: 'auto',
    '& $patternTypeBtn': {
      '&:first-child': {
        marginLeft: 5
      }
    },
    '&::-webkit-scrollbar': {
      width: 6,
      height: 4
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4,
      background: '#dbdbdb'
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 4,
      background: 'none'
    }
  },
  patternTypeBtn: {
    borderRadius: '4px',
    border: '1px solid rgb(232, 232, 232)',
    padding: 0,
    width: 34,
    height: 34,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: 12,
    minWidth: 32
  },
  btnClose: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '5px',
    paddingBottom: 10
  },
  add_dtool_Btn: {
    '@media screen and (min-width:600px) and (max-width:960px)': {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }
}))
export default style
