import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  category_Title: {
    fontWeight: 400,
    fontFamily: 'Inter SemiBold',
    color: '#303337',
    marginTop: 8
  },
  labelForm: {
    color: '#6c7985',
    margin: '5px!important'
  },
  categoryField: {
    borderRadius: 6,
    border: '1px solid #dedede',
    padding: '8px 16px 16px 16px',
    marginTop: theme.spacing(2)
  },
  groupInput: {
    '& .MuiOutlinedInput-root': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      marginBottom: 8,
      '@media screen and (max-width:599px)': {
        borderRadius: 25
      }
    }
  },
  addImageInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: 'inherit',
    borderColor: '#d4d4d4',
    borderLeft: 0,
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
    color: '#3374b6',
    width: '31%',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginBottom: 8,
    pointerEvents: 'all',
    outline: 'none',
    '& $span': {
      color: '#3374b6'
    },
    '@media screen and (max-width:599px)': {
      borderRadius: 10,
      marginLeft: 4
    }
  },
  btnImage: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: 'inherit',
    borderLeft: 0,
    color: '#3374b6',
    width: '31%'
  },
  fieldGroup: {
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
    }
  },
  btnIconGrup: {
    border: '1px solid #d4d4d4',
    borderRadius: 65,
    width: 45,
    height: 45,
    marginLeft: 8
  },
  imgBorder: {
    borderRadius: '50%'
  },
  category_Img: {
    marginLeft: 8,
    marginBottom: 8,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  deleteIcon: {
    cursor: 'pointer',
    alignSelf: 'center',
    marginLeft: 8,
    border: '1px solid #ebe5e5',
    borderRadius: '50%',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&:hover $tooltiptext': {
      visibility: 'visible'
    }
  },
  /* custom tooltip*/
  tooltiptext: {
    visibility: 'hidden',
    width: 50,
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 6,
    padding: '5px 5px',
    position: 'absolute',
    zIndex: 1,
    bottom: '150%',
    left: '-14px',
    fontSize: 12,
    '&::after': {
      content: "''",
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: -5,
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: 'black transparent transparent transparent'
    }
  },
  /* custom tooltip*/

  supportedImgText: {
    fontSize: 12,
    marginLeft: 6,
    marginRight: 16,
    color: '#7c7c7c',
    fontWeight: 500,
    fontFamily: 'Inter Medium'
  },

  btnDiv: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 16,
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
  btnSave: {
    width: '20%',
    '& .MuiButton-label': {
      color: '#fff'
    },
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  }
}))
export default style
