import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  blockOrder: {
    marginTop: theme.spacing(2),
    '& .MuiTypography-body2': {
      color: '#4b4e54',
      fontWeight: 400,
      fontFamily: 'Inter SemiBold'
    }
  },

  rowWidth: {
    width: '60%  !important '
  },
  flexClass: {
    display: 'flex',
    marginTop: 20,
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d4d4d4'
    },
    '@media screen and (max-width:599px)': {
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  },
  mbBottom: {
    '@media screen and (max-width:599px)': {
      marginBottom: 16
    }
  },
  labelForm: {
    color: '#6c7985'
  },
  error: {
    backgroundColor: '#fbe0e6',
    color: '#ff00006b',
    padding: theme.spacing(2),
    borderRadius: 6,
    border: '1px solid #ededed',
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-body1': {
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    },
    '& .MuiTypography-h3': {
      fontSize: 18,
      fontFamily: 'Inter Bold',
      fontWeight: 400
    }
  },

  pointerEvent: {
    pointerEvents: 'none'
  },
  orderRow_Wrap: {
    marginTop: 16,
    marginBottom: theme.spacing(5)
  },
  btnVisibleXs: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: '0 auto',
      width: '40%'
    },
    '& .MuiButton-root': {
      width: '100%'
    }
  },
  rowOrder_Root: {
    maxHeight: 362,
    overflowY: 'scroll!important',
    paddingRight: 20,
    [theme.breakpoints.down('xs')]: {
      maxHeight: 500
    },
    '&::-webkit-scrollbar': {
      width: 4,
      height: 9
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 2,
      background: '#dfdcdc'
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 4,
      background: 'none'
    }
  },
  rowOrder: {
    display: 'flex',
    borderBottom: '1px solid #e9e5e5',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    '&:last-child': {
      borderBottom: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  rowOrder_Width: {
    width: '14%'
  },
  orderLabel: {
    '&.MuiTypography-body2': {
      color: '#4b4e54',
      fontWeight: 400,
      fontFamily: 'Inter SemiBold',
      marginBottom: 4
    }
  },
  orderSize: {
    '&.MuiTypography-h4': {
      color: '#6c7985',
      '& $span': {
        fontWeight: 500,
        fontFamily: 'Inter Medium',
        color: '#303337'
      }
    }
  },
  rowOrder_Img: {
    marginRight: theme.spacing(1),
    '& $img': {
      borderRadius: 6
    },
    [theme.breakpoints.down('xs')]: {
      width: '40%',
      margin: '0 auto'
    }
  },
  rowOrder_Label: {
    width: '30%',
    '@media screen and (min-width:560px) and (max-width:599px)': {
      width: '26%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '62%!important',
      margin: '20px auto',
      textAlign: 'center'
    }
  },
  rowOrder_Count: {
    width: '26%',
    textAlign: 'center',
    '& .MuiButtonGroup-grouped': {
      height: 35
    },
    '@media screen and (min-width:560px) and (max-width:599px)': {
      width: '20%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '40%!important',
      margin: '0px auto'
    }
  },
  rowOrder_Price: {
    width: '16%',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '10px auto'
    }
  },
  rowOrder_Delete: {
    textAlign: 'right',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  rowHeader: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  addProduct_Btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '32%',
      height: 1,
      background: '#dadada',
      top: '50%',
      left: 0,
      '@media screen and (max-width:739px)': {
        display: 'none'
      },
      [theme.breakpoints.up('xl')]: {
        width: '40%'
      },
      '@media screen and (min-width:1600px) and (max-width:1919px)': {
        width: '37%'
      },
      '@media screen and (min-width:1400px) and (max-width:1599px)': {
        width: '34%'
      }
    },

    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '32%',
      height: 1,
      background: '#dadada',
      top: '50%',
      right: 0,
      '@media screen and (max-width:739px)': {
        display: 'none'
      },
      [theme.breakpoints.up('xl')]: {
        width: '40%'
      },
      '@media screen and (min-width:1600px) and (max-width:1919px)': {
        width: '37%'
      },
      '@media screen and (min-width:1400px) and (max-width:1599px)': {
        width: '34%'
      }
    },
    '& .MuiButton-label': {
      textTransform: 'initial'
    }
  },

  InfoHeader: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap'
  },
  Info_Label: {
    flexGrow: 1,
    '& .MuiTypography-body2': {
      color: '#303337',
      fontFamily: 'Inter SemiBold',
      fontWeight: 400,
      display: 'flex',
      '& $span': {
        marginRight: 8
      }
    }
  },
  editBtn: {
    '&.MuiButton-root': {
      background: '#fff'
    }
  },
  addressDetail: {
    color: '#3d4043',
    '& .MuiTypography-body1': {
      lineHeight: '24px'
    }
  },
  row_Btm: {
    borderBottom: '1px solid #dadada',
    paddingTop: 16,
    paddingBottom: 16,
    '&:first-child': {
      paddingTop: 0
    },
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  billingRow: {
    marginBottom: 20,
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
    }
  },
  row_BtmHead: {
    marginBottom: theme.spacing(5)
  },
  btnPlaceOrder: {
    marginTop: 16
  },
  Edit_XsBtn: {
    [theme.breakpoints.down('xs')]: {
      margin: '8px 0px'
    }
  },

  orderAmount: {
    borderRadius: 6,
    border: '1px solid #ededed',
    marginTop: theme.spacing(2),
    backgroundColor: '#f3faff',
    padding: theme.spacing(2),
    color: '#3490ed',
    display: 'flex',
    alignItems: 'center'
  },
  amountGrup: {
    '& .MuiTypography-body1': {
      fontFamily: 'Inter Medium',
      fontWeight: 500
    },
    '& .MuiTypography-h3': {
      fontFamily: 'Inter Bold',
      fontSize: 18,
      fontWeight: 400
    }
  },
  btnGrup_Radio: {
    '& .MuiFormGroup-root': {
      flexDirection: 'row'
    }
  },

  checkedLabel: {
    marginTop: theme.spacing(2),

    '& .MuiFormControlLabel-root': {
      marginLeft: '0px!important',
      //labelStyle
      '& .MuiTypography-root': {
        color: '#292d2f',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: '22px'
      },
      //labelStyle

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
      //checkboxCheckedColor
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
      //checkboxCheckedColor
      '& .MuiIconButton-label': {
        fontSize: 24,
        //checktick colorChange
        border: '2px solid #d4d4d4',
        width: 23,
        height: 23,
        borderRadius: 13,

        '& .MuiSvgIcon-root': {
          fill: '#fff',
          padding: 3
        }
        //checktick colorChange
      }
    }
  },

  textAddress: {
    color: '#6b757f',
    fontSize: 14,
    fontFamily: 'Inter Regular',
    fontWeight: 400,
    marginTop: theme.spacing(2)
  },
  shippingForm_Field: {
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
      }
    },
    marginBottom: 10
  }
}))
export default style
