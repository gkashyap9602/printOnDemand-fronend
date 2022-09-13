import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  TabContainer: {
    '& .MuiTableContainer-root': {
      boxShadow: 'none'
    }
  },
  linkColor: {
    color: 'blue',
    cursor: 'pointer'
  },
  linktemplate: {
    textTransform: 'uppercase !important'
  },
  disable: {
    opacity: 0.6
  },
  productTable: {
    '& .MuiTableRow-head': {
      borderRadius: 6,
      backgroundColor: '#fff'
    },
    '& .MuiTableCell-head': {
      padding: '12px 16px 12px 16px',
      verticalAlign: 'top',
      '&$tabCheck': {
        width: '1%!important'
      },
      '& $TextStyle': {
        display: 'flex',
        whiteSpace: 'pre-wrap',
        '& $span': { marginLeft: 3, marginTop: 2 }
      }
    },
    '& .MuiTableCell-body': {
      padding: '16px 8px 16px 8px',
      verticalAlign: 'top',
      '&$tabCheck': {
        width: '1%!important',
        padding: '12px 16px 12px 16px!important'
      },

      [theme.breakpoints.up('lg')]: {
        wordBreak: 'break-word',
        width: '10%',
        padding: '16px 16px 16px 16px'
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
      color: '#292d2f',
      whiteSpace: 'pre-wrap'
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

        border: '2px solid #c7c7c7',
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
    width: '1%!important',
    padding: '12px 16px 12px 16px!important'
  },
  width: {
    [theme.breakpoints.up('xl')]: {
      width: '14%'
    }
  }
}))
export default style
