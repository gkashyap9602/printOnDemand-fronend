import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  list: {
    width: 400,
    padding: '20px',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  faqClassFilt: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 16px'
  }
}))
export default style
