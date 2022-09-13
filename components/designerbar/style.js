import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  header_Wrapper: {
    '& .MuiAppBar-root': {
      background: 'transparent',
      boxShadow: 'none'
    }
  },
  toolbar_Wrapper: {
    justifyContent: 'space-between'
  },
  menuItem_Block: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    '& .MuiButton-root': {
      color: '#292d2f',
      fontFamily: 'Inter Medium',
      fontSize: 14,
      fontWeight: 500,
      marginRight: 20,
      textTransform: 'inherit',
      '&:last-child': {
        marginRight: 'unset'
      }
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))
export default style
