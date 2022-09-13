import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  imgBanner: {
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  textHeader: {
    '& .MuiTypography-h3': {
      color: '#303337',
      fontSize: 18,
      fontFamily: 'Inter SemiBold',
      fontWeight: 400,
      marginBottom: theme.spacing(1)
    }
  },
  contentBlock: {
    marginBottom: theme.spacing(2),
    '& .MuiTypography-h4': {
      color: '#535659',
      lineHeight: '24px'
    }
  },
  btnAlert: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    flexWrap: 'wrap'
  },
  btnCancel: {
    '&.MuiButton-root': {
      marginRight: theme.spacing(2),
      borderRadius: '45px',
      '&:hover': {
        background: 'none'
      }
    }
  },
  btnApprove: {
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  }
}))
export default style
