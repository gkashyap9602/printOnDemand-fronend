import { makeStyles } from '@material-ui/core/styles'
const style = makeStyles((theme) => ({
  storeList: {
    borderRadius: theme.spacing(1),
    border: '1px solid #e2e2e2',
    padding: theme.spacing(2),
    position: 'relative'
  },
  storeBtns: {
    display: 'flex',
    '@media screen and (max-width:545px)': {
      justifyContent: 'flex-end',
      width: '100%'
    },
    '& .MuiButton-contained': {
      backgroundColor: '#23619f'
    }
  },
  storeList_Root: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 13
  },
  storeList_Label: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
    '@media screen and (max-width:545px)': {
      width: '100%'
    }
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
  remove_store_btn: {
    cursor: 'pointer',
    top: '8px',
    right: '12px',
    position: 'absolute',
    width: '16px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
export default style
