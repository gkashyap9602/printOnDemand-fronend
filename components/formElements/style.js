import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  MenuMoreTab: {
    '&.MuiButton-text': {
      minWidth: 'unset'
    }
  },
  ListPop: {
    color: '#535659',
    marginLeft: 8
  },
  hvrEffect: {
    '& .MuiListItem-button': {
      '&:hover': {
        background: 'none'
      }
    }
  },
  rootPaper: {
    '&.MuiPaper-root': {
      boxShadow: ' 0 6px 16px rgba(37, 40, 44, 0.1)',
      borderRadius: 16,
      border: '1px solid #f2f2f2'
    }
  },
  popWrapper: {
    padding: theme.spacing(2)
  },
  actionButton: {
    '& .MuiButton-label': {
      textTransform: 'initial'
    }
  }
}))

export default style
