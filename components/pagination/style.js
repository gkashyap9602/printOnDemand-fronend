import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  PaginationBlock: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: theme.spacing(2),

    '& .MuiIconButton-root': {
      backgroundColor: '#ffffff',
      fontSize: 14,
      fontWeight: 400,
      color: '#292d2f',
      fontFamily: 'Inter Regular',
      border: '1px solid #dddddd',
      '&:hover': {
        backgroundColor: '#ffffff'
      }
    },
    '& .Mui-disabled': {
      color: 'rgb(215 222 232) !important'
    },
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      marginTop: 12
    }
  },

  buttonWrapper: {
    '&.MuiIconButton-root': {
      width: 36,
      height: 36,
      padding: 0
    }
  },
  disabled: {
    cursor: 'no-drop !important',
    pointerEvents: 'none'
  },
  mainWrapper: {
    margin: 'auto 2px'
  },
  PaginationSelect: {
    width: '50px',
    borderRadius: '18px',
    textAlign: 'center',
    backgroundColor: '#fff',
    marginLeft: theme.spacing(1),
    border: '1px solid #dddddd',
    '&::before': {
      borderBottom: 'none!important'
    },
    '&::after': {
      borderBottom: 'none!important'
    },
    '& .MuiSelect-select.MuiSelect-select': {
      paddingTop: 8,
      paddingLeft: 4,
      textOverflow: 'unset'
    }
  },
  paginationNav: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  pageRow: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center!important',
    width: 'unset!important',
    [theme.breakpoints.down('sm')]: {
      marginTop: 12
    }
  }
}))
export default style
