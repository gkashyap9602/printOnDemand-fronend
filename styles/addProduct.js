import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  bgAddProduct: {
    boxShadow: '0 2px 9px 5px rgba(37, 40, 44, 0.04)',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    width: '100%'
  },
  productTitle: {
    fontWeight: 400,
    fontFamily: 'Inter SemiBold',
    color: '#303337'
  },
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  tabActionAlign: {
    '&.MuiTableCell-body': {
      textAlign: 'right',
      width: '4%'
    }
  },
  tabHeadAlign: {
    '&.MuiTableCell-head': {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },

  tableTitle: {
    color: '#303337',
    fontFamily: 'Inter SemiBold',
    fontWeight: 600
  },
  libraryTabTitle: {
    color: '#303337',
    fontFamily: 'Inter Medium',
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 16
  },
  btnAddTab: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    paddingTop: theme.spacing(1),
    '& .MuiIconButton-root': {
      border: '1px solid #dddddd',
      background: 'none',
      padding: 6,
      width: 34,
      height: 34
    }
  },
  btnTabSave: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20
  },
  cancelBtn: {
    marginRight: theme.spacing(2),
    borderRadius: 40,
    padding: '0px 16px',
    '& .MuiButton-label': {
      color: '#292d2f'
    }
  },
  saveBtn: {
    minWidth: 93
  },
  variantAdd: {
    width: '25%',
    marginLeft: 16
  },

  deleteModal: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  modalTitle: {
    color: '#292d2f',
    fontFamily: 'Inter SemiBold',
    fontSize: 18,
    fontWeight: 400,
    marginLeft: theme.spacing(2),
    lineHeight: '27px'
  },
  btnActions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
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
  btnDelete: {
    backgroundColor: '#e84d4b',
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    },
    '&:hover': {
      backgroundColor: '#e14240'
    }
  },
  duplicateBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 12
  },
  btn_Duplicate: {
    '&.MuiButton-root': {
      minWidth: 110
    }
  },
  gridSpace: {
    paddingBottom: '6px!important'
  },
  productTabList: {
    marginBottom: 20
  },
  btnOrderProduct: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
    '& .MuiButton-root': {
      textTransform: 'inherit'
    }
  },
  btnOrder: {
    marginRight: theme.spacing(2),
    padding: '12px 27px'
  }
}))
