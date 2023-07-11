import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
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
    width: '50%',
    '@media screen and (min-width:1001px) and (max-width:1300px)': {
      width: '40%'
    },
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
    width: '50%',

    '@media screen and (max-width:799px)': {
      width: '100%',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginTop: theme.spacing(1)
    },
    '@media screen and (min-width:800px) and (max-width:1000px)': {
      width: '100%',
      justifyContent: 'flex-start',
      marginTop: theme.spacing(1)
    },
    '@media screen and (min-width:1001px) and (max-width:1300px)': {
      width: '60%',
      marginTop: theme.spacing(1)
    }
  },

  tabPagination: {
    '& $nav': {
      marginBottom: 0
    }
  },
  searchStyle: {
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      marginTop: 10
    }
  },

  searchFilter: {
    justifyContent: 'flex-end',
    width: '60%',
    marginRight: theme.spacing(2),
    '@media screen and (max-width:799px)': {
      width: '100%',
      marginBottom: 8,
      marginRight: 0
    },
    '@media screen and (min-width:800px) and (max-width:1000px)': {
      width: '45%',
      marginBottom: 0,
      marginRight: 8
    },
    '@media screen and (min-width:1001px) and (max-width:1300px)': {
      width: '60%'
    }
  },
  tableWrapper: {
    marginTop: 20,
    marginBottom: 24
  }
}))
