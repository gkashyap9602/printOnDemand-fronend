import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  pdtViewImageTab: {
    borderRadius: '50%',
    overflow: 'hidden'
  },
  dTool_content: {
    padding: 0,
    background: '#fff'
  },
  dTool_View: {
    display: 'flex',
    width: '100%'
  },
  dTool_feature: {
    width: '95%',
    background: '#fff',
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '85%'
    }
  },
  tab_Header: {
    '@media screen and (max-width:1163px)': {
      width: '100%',
      justifyContent: 'flex-end'
    }
  },
  rootPreview: {
    borderBottom: '1px solid #ececec',
    padding: '0px 16px 0px 16px',
    margin: '0px'
  },
  canvasBlock: {
    margin: '0px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  // canvas
  canvas_Preview: {
    background: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  // canvas

  // tab content
  tab_content: {
    height: '100vh'
  },

  bg_tabPanel: {
    width: '5%',
    background: '#fff',

    border: '1px solid #ececec',
    [theme.breakpoints.down('sm')]: {
      width: '10%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '15%'
    }
  },
  tabs_Field: {
    '& .MuiTab-root': {
      minWidth: 0,
      color: '#9A9AB0',
      marginBottom: theme.spacing(1)
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'unset!important'
    },
    '& .MuiTab-textColorSecondary.Mui-selected': {
      backgroundColor: '#ffbb68',
      color: '#fff'
    },
    '& .MuiTabs-flexContainer': {
      marginTop: '202px'
    }
  },
  customTooltipDtool: {
    fontSize: 12
  },
  // tab panel
  Image_Tabs: {
    width: '100%',
    justifyContent: 'flex-start',
    overflowX: 'auto',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '@media screen and (min-width:960px) and (max-width:1165px)': {
      marginTop: 42
    }
  },
  avatarBlock: {
    border: '1px solid #d3d3e3',
    borderRadius: '50%',
    position: 'relative',
    '& .MuiAvatar-root': {
      width: 45,
      height: 45
    }
  },
  activeBlock: {
    border: '2px solid #ffbb68',

    '&::after': {
      borderBottom: '2px solid #ffbb68',
      content: '""',
      position: 'absolute',
      right: 0,
      height: '1px',
      width: '50px',
      bottom: '-15px'
    }
  },
  btnPreview: {
    justifyContent: 'flex-end',
    '@media screen and (min-width:960px) and (max-width:1165px)': {
      marginTop: 42
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start'
    }
  },
  TabImage: {
    padding: '6px 12px',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 48,
    cursor: 'pointer'
  },
  viewCanvas: {
    [theme.breakpoints.down('xs')]: {
      width: '100%!important',
      height: '100%!important'
    },

    '@media screen and (min-width:1600px)': {
      height: '512px!important',
      width: '512px!important'
    },
    '@media screen and (min-width:1300px) and (max-width:1599px)': {
      height: '448px!important',
      width: '448px!important'
    },
    '@media screen and (min-width:1200px) and (max-width:1299px)': {
      height: '362px!important',
      width: '362px!important'
    },
    '@media screen and (min-width:1000px) and (max-width:1199px)': {
      height: '310px!important',
      width: '310px!important'
    },
    '@media screen and (min-width:900px) and (max-width:999px)': {
      height: '305px!important',
      width: '305px!important'
    },
    '@media screen and (min-width:710px) and (max-width:899px)': {
      height: '300px!important',
      width: '300px!important'
    },
    '@media screen and (min-width:660px) and (max-width:709px)': {
      height: '280px!important',
      width: '280px!important'
    },
    '@media screen and (min-width:600px) and (max-width:659px)': {
      height: '250px!important',
      width: '250px!important'
    },
    '@media screen and (min-width:500px) and (max-width:599px)': {
      height: '230px!important',
      width: '230px!important'
    },
    '@media screen and (min-width:230px) and (max-width:499px)': {
      height: '210px!important',
      width: '210px!important'
    }
  },
  warningMsg: {
    maxHeight: '50px',
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
  },
  bgSaveRoot: {
    background: '#fff',
    position: 'fixed',
    bottom: 0,
    height: 63,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderTop: '1px solid #ececec'
  },
  workspaceArea: {
    flexGrow: 1
  },
  btnProduct_Wrapper: {
    display: 'flex',
    marginRight: 16,
    flexWrap: 'wrap'
  },
  saveProduct: {
    '&.MuiButton-root': {
      marginRight: theme.spacing(2),
      textTransform: 'inherit'
    }
  },
  sizeChartTop: {
    '@media screen and (max-width:576px)': {
      marginTop: 100
    },
    '@media screen and (min-width:577px) and (max-width:599px)': {
      marginTop: 85
    },
    '@media screen and (min-width:600px) and (max-width:769px)': {
      marginTop: 100
    },
    '@media screen and (min-width:740px) and (max-width:769px)': {
      marginTop: '66px!important'
    },

    '@media screen and (min-width:770px) and (max-width:959px)': {
      marginTop: 45
    },

    '@media screen and (min-width:960px) and (max-width:1165px)': {
      marginTop: 40
    }
  }
}))
