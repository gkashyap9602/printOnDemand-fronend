import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  tabImageWrap: {
    width: '100%',
    '& .MuiTab-wrapper': {
      fontWeight: 400,
      color: '#292d2f',
      textTransform: 'initial',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    '& .MuiTab-root': {
      paddingLeft: 0,
      minWidth: 'unset',
      maxWidth: 'unset',
      marginRight: 20
    },
    '& .MuiTab-root.Mui-selected': {
      '&  .MuiTab-wrapper': {
        color: '#303337',
        fontWeight: 400,
        fontFamily: 'Inter SemiBold',
        fontSize: 14
      },
      '& .MuiTabs-indicator': {
        backgroundColor: '#3374b6!important'
      }
    },
    '& .MuiTabs-root': {
      borderBottom: '1px solid #e8e8e8'
    }
  },
  panelItem: {
    marginTop: 20
  },

  bgDropzone: {
    borderRadius: 16,
    border: '1px dashed #a2cefb',
    backgroundColor: '#eef5fc',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBlock: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    '& .MuiTypography-body2': {
      fontWeight: 500,
      fontFamily: 'Inter Medium',
      color: '#303337',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    '&:focus': {
      outline: 'none'
    }
  },
  btn_Upload: {
    background: '#fff',
    color: '#292d2f',
    textTransform: 'inherit'
  },

  library_Search: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap'
  },
  library_text: {
    flexGrow: 1
  },
  photoLib_Head: {
    '&.MuiTypography-body2': {
      color: '#292d2f',
      fontFamily: 'Inter Medium',
      fontWeight: 500,
      borderBottom: '1px solid #e8e8e8',
      paddingBottom: theme.spacing(1)
    }
  },
  imageGrid: {
    marginTop: theme.spacing(1)
  },
  library_Image: {
    borderRadius: 7,
    border: '1px solid #d2d2d2',
    position: 'relative',
    cursor: 'pointer'
  },
  library_Root: {
    marginBottom: theme.spacing(2)
  },
  selectedImage: {
    left: 10,
    position: 'absolute',
    top: 8
  },
  library_Scroll: {
    maxHeight: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 6,
      height: 9
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 4,
      background: 'none'
    }
  },
  btnAddLibrary: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
    flexWrap: 'wrap'
  },
  btnAddDesign: {
    '& .MuiButton-label': {
      color: '#fff'
    }
  },
  btnCancel: {
    '&.MuiButton-root': {
      marginRight: theme.spacing(2),
      '&:hover': {
        background: 'none'
      }
    }
  },
  warningMsg: {
    background: '#fff8f0',
    width: '100%',
    display: 'flex',
    borderBottom: '1px solid #f4e9dc',
    backgroundColor: '#fffcf8',
    padding: theme.spacing(2),
    '& .MuiTypography-h4': {
      lineHeight: '19px',
      color: '#535659'
    }
  },
  warningIcon: {
    border: '1px solid #edd9c1',
    backgroundColor: '#fef6eb',
    padding: '7px 10px',
    borderRadius: '50%',
    height: 42,
    width: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
export default style
