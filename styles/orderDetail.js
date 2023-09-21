import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  bgOrderDetail: {
    width: '100%',
    background: '#fff',
    boxShadow: ' 0 2px 20px rgb(38 41 44 / 7%)',
    borderRadius: 6,
    padding: theme.spacing(2),
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 20
    }
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
  orderHead: {
    marginBottom: 4,
    '& .MuiTypography-h3': {
      color: '#303337'
    }
  },
  orderDetail_Head: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  btnCancel_order: {
    borderRadius: 45,
    marginRight: 16,
    color: '#6c7985',
    '& .MuiButton-label': {
      color: '#292d2f'
    },
    '&:hover': {
      background: 'none'
    }
  },
  detail_Action: {
    '& .MuiButton-root': {
      textTransform: 'inherit'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1)
    }
  },
  spanOrder: {
    background: '#ededed',
    color: '#a57fff',
    fontSize: 14,
    fontWeight: 500,
    padding: '4px 6px',
    borderRadius: 4,
    whiteSpace: 'pre'
  },
  detailTab_Pad: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  tabOrderDetail: {
    boxShadow: 'none',
    background: 'none',
    backgroundImage: 'none',
    borderBottom: '2px solid #efeff0',
    borderRadius: 0,
    paddingLeft: 0,
    paddingBottom: 12
  },
  tabFlex: {
    alignItems: 'center!important',
    minWidth: '20%',
    '& .MuiTypography-h4': {
      fontWeight: 500,
      fontFamily: 'Inter Medium!important'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset!important'
    },
    '@media screen and (min-width:1201px) and (max-width:1285px)': {
      minWidth: '23%'
    }
  },
  orderDetail_Root: {
    marginBottom: theme.spacing(3),
    '& .MuiTypography-body2': {
      color: '#303337',
      fontFamily: 'Inter SemiBold',
      fontSize: 16,
      fontWeight: 400
    }
  },
  orderGrid: {
    wordBreak: 'break-word',
    '& .MuiTypography-body1': {
      color: '#6c7985'
    },
    '& .MuiTypography-body2': {
      color: '#303337',
      fontFamily: 'Inter Medium',
      fontSize: 16,
      fontWeight: 500
    }
  },
  orderGrid_Row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  tabActivate: {
    bottom: -14
  },
  orderAmount: {
    backgroundColor: '#f3faff',
    color: '#3490ed',
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
        fontWeight: 400
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
  }
}))
