import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  bg_detail_Head: {
    boxShadow: '-3px 0 15px rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    wordBreak: 'break-word',

    color: '#535659',
    '& .MuiTypography-h3': {
      color: '#303337',
      fontFamily: 'Inter Bold',
      fontSize: 20,
      wordBreak: 'break-word',
      marginRight: theme.spacing(1),
      marginBottom: 6,
      fontWeight: 400
    },
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
  detailContent: {
    color: '#535659',
    paddingBottom: 12,
    whiteSpace: 'pre-wrap',
    '&.MuiTypography-h4': {
      lineHeight: '22px'
    }
  },
  content_Head: {
    marginBottom: 13,
    marginTop: 8
  },
  typoArea: {
    padding: 20
  },
  variant_wrapper: {
    padding: 20,
    paddingBottom: 0
  },
  bordBtm: {
    borderBottom: '1px solid #ccc'
  },
  flexProp: {
    alignSelf: 'center',
    '& .MuiTypography-h4': {
      color: '#535659',
      fontFamily: 'Inter Medium',
      fontWeight: 500
    }
  },
  content_Item: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  iconRight: {
    marginRight: theme.spacing(1),
    alignSelf: 'end'
  },
  flexMrTop: {
    marginTop: 5
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
    },
    '&.MuiFormControl-fullWidth': {
      [theme.breakpoints.up('lg')]: {
        width: '40%'
      }
    }
  },
  selectDropArrow: {
    paddingRight: 13
  },

  IconSize: {
    fontSize: 13
  },
  sizeWrap: {
    width: '22%',
    padding: '2px 6px',
    cursor: 'pointer'
  },
  sizeActive: {
    borderRadius: 6,
    backgroundColor: '#f69e30',
    color: '#fff'
  },
  btnSizeChart: {
    padding: '0px 8px',

    '& .MuiButton-label': {
      color: '#3374b6',
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    },
    '&:hover': {
      background: 'none'
    },
    '&:focus': {
      background: 'none'
    }
  },
  sizeChartModal: {
    '& .MuiDialog-paper': {
      '@media screen and (max-width:399px)': {
        maxWidth: '300px!important'
      },
      '@media screen and (min-width:400px) and (max-width:500px)': {
        maxWidth: '350px'
      }
    }
  },
  sizeImage: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  sizeTab: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      overflowY: 'auto',
      maxHeight: 384
    },
    '& .MuiTable-root': {
      '& .MuiTableBody-root': {
        '& $tr:nth-child(even)': {
          backgroundColor: '#fff!important'
        }
      }
    }
  },
  sizeDetail: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  sizeItems: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  li_Item: {
    lineHeight: '29px',
    '& .MuiTypography-h4': {
      color: '#535659'
    }
  },
  sizeTable: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  materialLabel: {
    borderRadius: 8,
    border: '1px solid #dcd7d7',
    padding: '3px 8px',
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'Inter Medium',
    color: '#6b757f',
    wordBreak: 'break-word'
  },
  flexMaterial: {
    display: 'flex',
    marginBottom: 5,
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  pdtDesignTool: {
    '& .MuiButton-label': {
      color: '#fff'
    }
  },
  tablePad: {
    '& .MuiTableCell-head': {
      padding: '12px 8px 12px 8px!important',
      width: '50%!important',
      [theme.breakpoints.up('md')]: {
        width: '62%!important'
      }
    },
    '& .MuiTableCell-body': {
      padding: '12px 8px 12px 8px!important',
      width: '10%'
    }
  }
}))
export default style
