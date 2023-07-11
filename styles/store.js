import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  storeDelete_Popup: {
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  },
  bgStore: {
    background: '#fff',
    padding: theme.spacing(2),
    boxShadow: '0 2px 20px rgba(38, 41, 44, 0.07)',
    borderRadius: 6,
    width: '100%',
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 26
    }
  },
  btn_Store: {
    '&.MuiButton-root': {
      minWidth: 148
    },
    margin: '0 5px'
  },
  rootStore: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  storeFlex: {
    flexGrow: 1
  },
  storeSearch: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap'
  },
  '@media screen and (max-width:399px)': {
    btns_Grup: {
      width: '100%',
      '&:first-child': {
        marginBottom: 10,
        marginTop: 10
      },
      '& $btn_Store.MuiButton-root': {
        width: '100%'
      }
    }
  },
  '@media screen and (max-width:500px)': {
    btns_Grup: {
      '&:first-child': {
        marginTop: 10
      }
    }
  },
  searchStore_Filter: {
    marginTop: 0
  },
  rootList: {
    marginTop: 0,
    marginBottom: 0
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
  }
}))
