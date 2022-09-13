import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  productList_Wrapper: {
    padding: 20
  },

  filter_Count: {
    width: '20px',
    height: 20,

    borderRadius: 10,
    backgroundColor: '#fcb357',
    color: '#fff',
    fontSize: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '0px!important',
    marginLeft: theme.spacing(1)
  },

  labelList: {
    display: 'block!important',
    wordBreak: 'break-word',
    '& .MuiTypography-h3': {
      color: '#4c5156',
      fontFamily: 'Inter Bold',
      fontWeight: 400
    },
    [theme.breakpoints.down('sm')]: {
      width: 'unset'
    }
  },
  crumbMbTop: {
    marginTop: 2
  },
  root: {
    marginTop: '16px!important',
    marginBottom: '16px!important'
  },
  sortSelect: {
    '@media screen and (max-width:345px)': {
      marginTop: '0px!important'
    },
    '& .MuiButton-root': {
      backgroundColor: '#fff'
    }
  },
  list_Header: {
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 20
    }
  },
  hiddenOnlyXs: {
    alignSelf: 'end',
    '@media screen and (min-width:1200px)': {
      display: 'none'
    },
    marginRight: theme.spacing(1),
    '& .MuiButton-root': {
      '@media screen and (max-width:361px)': {
        width: '99px!important'
      }
    }
  },

  matchMediaSm: {
    display: 'flex',

    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      marginTop: 10
    },
    '@media screen and (min-width:507px) and (max-width:599px)': {
      flexWrap: 'unset'
    }
  }
}))
export default style
