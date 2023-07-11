import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  TabContainer: {
    '& .MuiTableContainer-root': {
      boxShadow: 'none'
    }
  },
  table: {
    minWidth: 1000,
    '& .MuiTableRow-head': {
      borderRadius: 6,
      backgroundColor: '#f2f8fd',
      backgroundImage: "url('/static/images/bg-pattern.png')",
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto',
      backgroundPosition: 'center'
    },
    '& .MuiTableCell-head': {
      padding: '12px 8px 12px 16px',
      verticalAlign: 'top',
      '&$tabCheck': {
        width: '0%!important'
      },
      '& $TextStyle': {
        display: 'flex',
        '& $span': { marginLeft: 3, marginTop: 2 }
      }
    },
    '& .MuiTableCell-body': {
      padding: '16px 8px 16px 8px',
      verticalAlign: 'top',
      '&$tabCheck': {
        width: '0%!important',
        padding: '12px 16px 12px 16px!important'
      },

      [theme.breakpoints.up('lg')]: {
        wordBreak: 'break-word',
        width: '10%',
        padding: '12px 8px 12px 16px'
      }
    },
    '& .MuiTableBody-root': {
      '& $tr:nth-child(even)': {
        backgroundColor: '#f8fafc'
      },

      '& .MuiTableRow-root': {
        '&:last-child': {
          '& .MuiTableCell-body': {
            borderBottom: 'none'
          }
        }
      }
    }
  },

  TextStyle: {
    '&.MuiTypography-body1': {
      color: '#303337',
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    },
    '&.MuiTypography-h4': {
      color: '#292d2f'
    }
  },
  DataLength: {
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusColor: {
    width: 100,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Inter Medium',
    borderRadius: 6,
    padding: '3px 0px'
  },

  bgCheckBox: {
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
  },

  tabCheck: {
    width: '0%!important',
    padding: '12px 16px 12px 16px!important'
  },

  TabRowWrapper: {
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
      '& .MuiOutlinedInput-root': {
        background: '#fff'
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
  btnIconAction: {
    '&.MuiIconButton-root': {
      padding: theme.spacing(1),
      backgroundColor: '#efefef'
    }
  },
  templateFlex: {
    display: 'flex',
    borderRadius: 15,
    backgroundColor: '#f1f1f1',
    padding: '4px 10px',
    alignItems: 'center',
    width: '48%',
    marginRight: 4,
    marginBottom: theme.spacing(1),
    '@media screen and (min-width:1279px) and (max-width:1280px)': {
      width: 'unset!important'
    }
  },
  tempName: {
    width: '163px',
    '& .MuiTypography-h5': {
      color: '#62686c',
      fontFamily: 'Inter Medium',
      fontSize: 12,
      fontWeight: 500,
      width: 80,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    '@media screen and (max-width:1280px)': {
      width: 'unset'
    }
  },
  templateWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  btnIconAdd: {
    position: 'relative',
    '&:hover $tooltiptext': {
      visibility: 'visible',
      width: '200px'
    },
    '&.MuiIconButton-root': {
      border: '1px solid #dddddd',
      background: 'none',
      padding: 6
    }
  },

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
    left: '-89px',
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

  templateImg: {
    width: '35px',
    marginRight: 8,
    '@media screen and (max-width:1280px)': {
      width: '20px',
      height: '20px'
    }
  },
  templateIcon: {
    width: '27px',
    cursor: 'pointer'
  }
}))
export default style
