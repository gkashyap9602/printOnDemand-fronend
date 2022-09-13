import { makeStyles } from '@material-ui/core/styles'
const style = makeStyles((theme) => ({
  storeList: {
    borderRadius: theme.spacing(1),
    border: '1px solid #e2e2e2',
    padding: theme.spacing(2)
  },
  storeList_Root: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  storeView_Label: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  bg_StoreImg: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#f5fbe8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2)
  },
  storeHead: {
    '&.MuiTypography-h4': {
      color: '#303337',
      fontSize: 15,
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    }
  },
  storeHead_Text: {
    '&.MuiTypography-h4': {
      color: '#6b757f'
    }
  },

  storeContent: {
    color: '#6b757f',
    marginTop: 16,

    [theme.breakpoints.up('md')]: {
      minHeight: 77
    },

    '& .MuiTypography-h4': {
      lineHeight: '24px'
    }
  },
  storeConnect_Btn: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  btnConnect: {
    '&.MuiButton-root': {
      color: '#3374b6',
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    }
  }
}))
export default style
