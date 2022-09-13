import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  downArrow: {
    boxSizing: 'border-box',
    height: '10px',
    width: '10px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: ' 0px 1px 1px 0px',
    margin: '0px 9px',
    transform: 'rotate(45deg)',
    transition: 'border-width 150ms ease-in-out',
    position: 'absolute',
    top: '11px',
    right: '-18px'
  },
  bgTab_Info: {
    boxShadow: '0 2px 20px rgba(38, 41, 44, 0.07)',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  tabFlex: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    display: 'flex',
    width: '100%'
  },
  tabInfo_Head: {
    flexGrow: 1,

    '& .MuiTypography-h3': {
      color: '#303337',
      fontFamily: 'Inter Bold',
      marginBottom: 3,
      fontWeight: 400
    },
    '& .MuiTypography-h5': {
      color: '#292d2f'
    }
  },
  filterArea: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
    flexWrap: 'wrap',

    '@media screen and (max-width:799px)': {
      width: '100%',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginTop: theme.spacing(1)
    },
    '@media screen and (min-width:800px) and (max-width:1000px)': {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    '@media screen and (min-width:1001px) and (max-width:1300px)': {
      marginTop: theme.spacing(1)
    },
    '@media screen and (max-width:1202px)': {
      width: '100%'
    },
    '@media screen and (min-width:601px)': {
      justifyContent: 'flex-end'
    }
  },
  searchStyle: {
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      marginTop: 10
    }
  },
  tabPagination: {
    '& $nav': {
      marginBottom: 0
    }
  },
  tableWrapper: {
    marginTop: 20,
    marginBottom: 24
  },
  searchFilter: {
    display: 'flex',
    justifyContent: 'flex-end',
    '@media screen and (max-width:600px)': {
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      '& $searchOrder': {
        marginBottom: '8px',
        marginRight: '0px',
        width: '100%'
      },
      '& $order_Btn': {
        marginRight: 0,
        width: '100%',
        '& .MuiButton-root': {
          marginBottom: '8px',
          width: '100%'
        }
      }
    },
    '@media screen and (min-width:435px) and (max-width:600px)': {
      '& $order_Btn': {
        marginRight: 0,
        width: '50%',
        '& .MuiButton-root': {
          marginBottom: '8px',
          width: '100%'
        }
      }
    },

    '@media screen and (max-width:799px)': {
      width: '100%',
      marginBottom: 8,
      marginRight: 0
    },
    '@media screen and (min-width:800px) and (max-width:1000px)': {
      width: 'unset',
      marginBottom: 0,
      marginRight: 8
    }
  },
  selectField: {
    width: '30%',
    '@media screen and (max-width:799px)': {
      width: '100%'
    },
    '@media screen and (min-width:800px) and (max-width:1000px)': {
      width: '50%'
    },
    '@media screen and (min-width:1001px) and (max-width:1300px)': {
      width: '40%'
    }
  },

  searchOrder: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: theme.spacing(1)
  },

  deleteModal: {
    position: 'relative'
  },
  cancelTitle: {
    '&.MuiTypography-h4': {
      color: '#303337',
      '& $span': {
        color: '#303337',
        fontFamily: 'Inter SemiBold',
        fontSize: 16,
        fontWeight: 700
      }
    }
  },
  gridRoot: {
    marginTop: 20,
    marginBottom: 20
  },
  orderLabel: {
    '&.MuiTypography-h4': {
      color: '#6c7985',
      marginBottom: 5
    }
  },
  orderContent: {
    '&.MuiTypography-body2': {
      color: '#303337',
      fontFamily: 'Inter Medium',
      fontWeight: 500
    }
  },
  ellipsisText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 142,
    overflow: 'hidden'
  },
  flex_Item: {
    display: 'flex'
  },
  orderNum: {
    borderRadius: '50%',
    border: '1px solid #dddddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3374b6',
    fontSize: 12,
    fontFamily: 'Inter SemiBold',
    fontWeight: 400,
    padding: 8,
    marginTop: -7,
    width: 45,
    height: 45
  },
  btnActions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginTop: 10
    }
  },
  btnClose: {
    borderRadius: 45,
    width: '20%',
    '& .MuiButton-label': {
      color: '#292d2f'
    },
    '&:hover': {
      background: 'none'
    }
  },
  btnCancel: {
    textTransform: 'initial',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  btnViewOrder: {
    textTransform: 'initial',
    '&.MuiButton-root': {
      color: '#3374b6',
      fontFamily: 'Inter Medium',
      paddingLeft: 0,
      paddingTop: 0,
      '&:hover': {
        background: 'none'
      }
    }
  },
  cancelIcon: {
    position: 'absolute',
    right: 0,
    color: '#fb413f',
    opacity: 0.08
  },
  order_Btn: {
    marginRight: theme.spacing(1),
    '& .MuiButton-label': {
      textTransform: 'initial'
    }
  },
  orderBtn_New: {
    '@media screen and (min-width:800px) and (max-width:914px)': {
      marginTop: 8
    },
    '@media screen and (min-width:1024px) and (max-width:1138px)': {
      marginTop: 8
    }
  },
  order_Delay: {
    '@media screen and (min-width:601px) and (max-width:630px)': {
      width: '47%',
      maxWidth: '34%'
    },
    '@media screen and (min-width:631px) and (max-width:653px)': {
      width: '47%',
      maxWidth: '32%'
    }
  },
  csvUploadWrapper: {
    display: 'flex',
    borderRadius: 16,
    border: '1px dashed #a2cefb',
    backgroundColor: '#eef5fc',
    padding: 23,
    alignItems: 'center',
    marginTop: theme.spacing(3),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    },
    '& .MuiTypography-body2': {
      fontFamily: 'Inter Medium',
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    }
  },
  csv_PadLeft: {
    marginLeft: 12,
    marginRight: 14,

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },

    '& .MuiTypography-body2': {
      color: '#303337',
      fontFamily: 'Inter Medium',
      fontWeight: 500
    }
  },
  btn_Upload: {
    background: '#fff!important',
    color: '#292d2f',
    textTransform: 'initial',
    position: 'relative',
    cursor: 'pointer',
    marginLeft: 10,
    '& $input': {
      position: 'absolute!important',
      zIndex: 1,
      left: '0px!important',
      overflow: 'visible',
      width: '100%!important',
      height: '45px!important',
      cursor: 'pointer',
      opacity: 0
    },
    '@media screen and (max-width:767px)': {
      marginTop: '10px!important'
    }
  },
  orderAmount: {
    backgroundColor: '#f3faff',
    color: '#3490ed',
    padding: theme.spacing(2),
    borderRadius: 6,
    border: '1px solid #ededed',
    display: 'flex',
    alignItems: 'center'
  },
  bulkUpload_Files: {
    marginLeft: -40,
    '& $li': {
      listStyle: 'none',
      background: '#f3f3f3',
      padding: '12px',
      borderRadius: '10px',
      marginBottom: theme.spacing(1)
    }
  },
  bulk_Upload_Action: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2)
  }
}))
