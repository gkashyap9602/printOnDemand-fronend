import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1)
  },
  catalogHead: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 20
    }
  },
  catalogFlex: {
    flexGrow: 1
  },
  catalogSearch: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchCatalog: {
    '@media screen and (max-width:477px)': {
      width: '100%'
    }
  },
  btnCategory: {
    marginLeft: 16,
    '@media screen and (max-width:477px)': {
      marginLeft: 0
    }
  },
  catalogBlock: {
    boxShadow: '0 5px 9px 3px rgba(37, 40, 44, 0)',
    borderRadius: 10,
    border: '1px solid #ececec',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    overflow: 'hidden'
  },
  list_Block: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    cursor: 'auto'
  },
  listFlex_Grow: {
    flexGrow: 1,
    '& .MuiTypography-h3': {
      color: '#4b4e54',
      fontFamily: 'Inter SemiBold',
      fontSize: 18,
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '@media screen and (min-width:960px) and (max-width:1040px)': {
        width: 155
      },
      '@media screen and (min-width:1041px)': {
        width: 180
      }
    }
  },
  btnSubCatalog: {
    color: '#3374b6',
    paddingLeft: 0,
    textTransform: 'initial',
    '& .MuiButton-startIcon': {
      marginRight: 0
    },
    '&.MuiButton-textPrimary:hover': {
      backgroundColor: 'transparent!important'
    }
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
