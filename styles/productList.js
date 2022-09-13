import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  contentPdt: {
    padding: '0px 0px 0px 0px',
    '@media screen and (max-width:1199px)': {
      padding: '0px 10px 0px 10px'
    }
  },
  productRow: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  bgFilter: {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.07)',
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    height: '100%',
    width: '25%',
    [theme.breakpoints.down('xs')]: {
      width: '100%!important'
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '40%'
    },

    '@media screen and (max-width:1199px)': {
      display: 'none'
    }
  },
  bgProductList: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%!important'
    },
    '@media screen and (max-width:1199px)': {
      width: '100%!important'
    }
  }
}))
