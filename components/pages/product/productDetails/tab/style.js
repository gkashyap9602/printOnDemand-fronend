import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  hide: {
    display: 'none'
  },
  tabWrapper: {
    width: '100%',
    wordBreak: 'break-word',
    '& .MuiTabs-root': {
      background: '#f4f4f4',
      [theme.breakpoints.down('xs')]: {
        overflowX: 'auto'
      }
    },
    '& .MuiTabs-fixed': {
      [theme.breakpoints.down('xs')]: {
        marginLeft: 52,
        overflow: 'visible!important'
      }
    },
    '& .MuiTab-wrapper': {
      fontWeight: 400,
      color: '#292d2f',
      textTransform: 'initial'
    },
    '& .MuiTab-root.Mui-selected': {
      '&  .MuiTab-wrapper': {
        color: '#303337',
        fontWeight: 400,
        fontFamily: 'Inter SemiBold',
        fontSize: 16
      },
      '& .MuiTabs-indicator': {
        backgroundColor: '#fcb357!important'
      }
    }
  },
  rootPanel: {
    margin: '0 auto',
    width: '60%',
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  panelContent: {
    '& .MuiTypography-h4': {
      color: '#535659',
      lineHeight: '22px'
    }
  }
}))
export default style
