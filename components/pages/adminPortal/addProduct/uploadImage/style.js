import { makeStyles } from '@material-ui/core/styles'
const style = makeStyles((theme) => ({
  boxModel: {
    borderRadius: 12,
    border: '1px dashed #a2cefb',
    backgroundColor: '#eef5fc',
    padding: theme.spacing(2),
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    outline: 'none'
  },
  ImgText: {
    '&.MuiTypography-h5': {
      color: '#303337',
      fontWeight: 500,
      fontFamily: 'Inter Medium',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  },
  btn_Upload: {
    background: '#fff!important',
    color: '#292d2f',
    '@media screen and (max-width:767px)': {
      marginTop: '10px!important'
    }
  },
  dragText: {
    '&.MuiTypography-h5': {
      color: '#535659',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  },
  dropImage: {
    borderRadius: 10
  },
  boxImage: {
    '@media screen and (max-width:447px)': {
      margin: '0 auto!important'
    }
  },
  gridImages: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  flexImage: {
    position: 'relative',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  ImgOverlayText: {
    display: 'flex',
    position: 'absolute',
    bottom: 4,
    width: '100%',
    padding: '0px 8px',
    color: '#fff',
    borderRadius: 10,
    background:
      'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.17130602240896353) 25%, rgba(0,0,0,0.4009978991596639) 100%)'
  },
  deleteIcon: {
    cursor: 'pointer',
    marginBottom: 5
  },
  supportedText: {
    fontSize: 12,
    marginLeft: 16,
    marginRight: 16,
    color: '#7c7c7c',
    fontWeight: 500,
    fontFamily: 'Inter Medium'
  }
}))
export default style
