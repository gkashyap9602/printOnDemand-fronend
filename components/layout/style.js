import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  transparentContainer: { opacity: 0.65 },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#fff',
    boxShadow: '2px 0 16px 8px rgba(0, 0, 0, 0.06)',
    color: '#000'
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  drawer: {
    width: 232,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    background: '#fff',
    width: 232,
    boxShadow: '0 2px 14px 5px rgb(68 69 71 / 6%)',
    border: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    '& .MuiPaper-root': {
      background: '#fff'
    }
  },

  drawerClose: {
    background: '#fff!important',
    boxShadow: '0 2px 14px 5px rgb(68 69 71 / 6%)',
    border: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: 58
    },
    /* landscape mode sidemenu overflow */
    '& .MuiList-root': {
      '@media screen  and (orientation:landscape) and (min-width:1024px)': {
        overflow: 'hidden'
      }
    }
    /* landscape mode sidemenu overflow */
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  layoutGrid: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0, 0, 0)
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(8, 0, 0, 0)
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 0, 0, 0)
    }
  },
  bgLogo_Expand: {
    backgroundImage: "url('/static/images/profile/drawer-logo.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'unset',
    position: 'fixed',
    bottom: 30,
    left: 60,
    height: 82,
    width: 92,
    opacity: 0.2,
    zIndex: -1
  },
  privacy_Policy: {
    display: 'block',
    left: ' 60px',
    bottom: '10px',
    position: 'fixed',
    color: '#6b757f'
  },
  bgLogo_Collapse: {
    backgroundImage: "url('/static/images/profile/drawer-logo.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'unset',
    position: 'fixed',
    bottom: 20,
    left: 12,
    height: 35,
    width: 35,
    opacity: 0.2,
    zIndex: -1
  },

  bgMenu_Expand: {
    position: 'fixed',
    bottom: 20,
    left: 206,
    height: 40,
    width: 40,
    top: 71,
    zIndex: 1,
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: '4px solid #e3eaf1',
    cursor: 'pointer',
    '@media screen and (max-width:437px)': {
      top: 134
    },
    '@media screen and (min-width:438px) and (max-width:739px)': {
      top: 107
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },

  bgMenu_Collapse: {
    position: 'fixed',
    bottom: 20,
    left: 37,
    height: 40,
    width: 40,
    top: 71,
    zIndex: 1,
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: '4px solid #e3eaf1',
    cursor: 'pointer',
    '@media screen and (max-width:437px)': {
      top: 134
    },
    '@media screen and (min-width:438px) and (max-width:739px)': {
      top: 107
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },

  content: {
    width: '100%',
    padding: 20,
    overflowX: 'auto',

    [theme.breakpoints.down('xs')]: {
      marginTop: 54
    }
  },

  SpanText: {
    fontSize: 13,
    color: '#808191',
    fontFamily: 'Inter Medium',
    fontWeight: 500
  },
  HeaderProfText: {
    color: '#17243e',
    fontFamily: 'Inter Medium',
    fontWeight: 500
  },
  TypoBlock: {
    textAlign: 'right',
    marginRight: 20
  },
  NotifyBadge: {
    marginRight: 25,
    '& .MuiBadge-badge': {
      backgroundColor: '#dc282a',
      color: '#fff'
    }
  },
  btn_Activation: {
    borderRadius: '6px',
    backgroundColor: '#fcb357',
    height: '35px',
    fontSize: '12px',
    [theme.breakpoints.down('xs')]: {
      marginTop: 4,
      marginBottom: 4
    },
    '@media screen and (max-width:430px)': {
      marginBottom: '3px!important',
      height: '0px!important',
      borderRadius: 15
    },

    '@media screen and (min-width:395px) and (max-width:430px)': {
      marginLeft: '20px!important'
    },
    '& .MuiButton-label': {
      fontFamily: 'Inter Medium',
      fontSize: 13,
      fontWeight: 500
    },
    '&:hover': {
      backgroundColor: '#f5aa4b'
    },
    '&:focus': {
      backgroundColor: '#fcb357'
    }
  },
  MenuProfile: {
    '&:hover': {
      background: 'none'
    }
  },
  PopList: {
    width: 177,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.09)',
    '& .MuiListItem-button': {
      '&:hover': {
        background: 'none',
        textDecoration: 'none'
      }
    },
    '& a': {
      textDecoration: 'none'
    },
    '& .MuiList-root': {
      marginTop: 18,
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #fff',
        right: 19,
        top: -10,
        boxShadow: '0px 2px 1px -2px rgb(0 0 0 / 20%)'
      }
    },
    '& .MuiLink-root:hover': {
      textDecoration: 'none'
    }
  },
  MenuPopList: {
    '& .MuiListItemIcon-root': {
      minWidth: 28
    }
  },
  MenuTypo: {
    color: '#4a4a5a',
    textDecoration: 'none'
  },

  SideDrawer: {
    '& .MuiList-root': {
      color: '#4a4a5a',
      fontWeight: 500,
      fontFamily: 'Inter Medium',
      marginTop: theme.spacing(2)
    },
    '& .MuiListItemIcon-root': {
      color: '#4a4a5a',
      minWidth: 45
    },
    [theme.breakpoints.down('xs')]: {
      zIndex: 0
    },
    '@media screen and (max-width:1023px)': {
      display: 'none'
    }
  },

  bgMenuPopover: {
    background: '#0f1a31',
    color: '#fff',
    padding: theme.spacing(2),
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'
  },

  search: {
    position: 'relative',
    borderRadius: 6,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 263,
    height: 45,
    '&::placeholder': {
      paddingTop: 0
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 'unset',
      width: '100%',
      marginBottom: theme.spacing(2)
    }
  },
  FlexPropIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    background: '#e4eaed',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  },

  MainHead: {
    width: '100%'
  },

  menuList_Label: {
    '& .MuiTypography-body1': {
      fontFamily: 'Inter Medium',
      fontWeight: 500
    }
  },
  ToolbarMbTop: {
    '@media screen and (max-width:739px)': {
      marginTop: 10,
      marginBottom: 10
    },
    '@media screen and (max-width:415px)': {
      marginBottom: '4px!important'
    }
  },
  NotifyHeaderWrap: {
    '@media screen and (max-width:739px)': {
      width: '100%',
      justifyContent: 'flex-end',
      wordBreak: 'break-word'
    },
    flexWrap: 'wrap'
  },
  XsMenuList: {
    '& .MuiListItem-root': {
      marginBottom: theme.spacing(1),
      '&:hover': {
        boxShadow: 'inset 0 2px 3px rgba(67, 71, 75, 0.07), inset 0 0 0px rgba(43, 46, 50, 0.07)',
        backgroundColor: '#e3eaf1',
        borderTopLeftRadius: 45,
        borderBottomLeftRadius: 45,
        '& .MuiListItemIcon-root': {
          color: '#3374b6'
        },
        '& .MuiListItemText-root': {
          color: '#3374b6'
        }
      }
    }
  },

  MenuActive: {
    boxShadow: 'inset 0 2px 3px rgba(67, 71, 75, 0.07), inset 0 0 0px rgba(43, 46, 50, 0.07)',
    backgroundColor: '#e3eaf1',
    borderTopLeftRadius: 45,
    borderBottomLeftRadius: 45,
    '& .MuiListItemIcon-root': {
      color: '#3374b6'
    },
    '& .MuiListItemText-root': {
      color: '#3374b6'
    }
  },
  IconActive: {
    background: '#3374b6',
    color: ' #fff',
    borderRadius: 20,
    padding: 6
  },
  avatarSize: {
    width: '30px',
    height: '30px'
  },
  toolbarWrapper: {
    '@media screen and (max-width:739px)': {
      marginTop: 10,
      marginBottom: 10
    }
  },
  dtool_Text: {
    '& .MuiTypography-h3': {
      marginLeft: 8,
      color: '#303337',
      fontFamily: 'Inter SemiBold',
      fontWeight: 400,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: 259,
      whiteSpace: 'nowrap'
    }
  },
  backBtn: {
    display: 'flex',
    marginLeft: 30,
    position: 'relative',
    '@media screen and (min-width:1165px)': {
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        background: '#ede7e7',
        height: 71,
        top: -18,
        width: 1,
        bottom: 0
      }
    },
    '& $a': {
      marginLeft: 10,
      cursor: 'pointer',
      '@media screen and (max-width:900px)': {
        marginLeft: 0
      },
      '@media screen and (min-width:832px) and (max-width:901px)': {
        marginLeft: '0px!important'
      }
    },
    '@media screen and (max-width:900px)': {
      marginLeft: 0,
      marginTop: 12
    },
    '@media screen and (min-width:832px) and (max-width:901px)': {
      marginLeft: '10px!important'
    },
    '@media screen and (min-width:902px) and (max-width:923px)': {
      marginTop: 12,
      marginLeft: 0
    },
    '@media screen and (min-width:924px) and (max-width:1169px)': {
      marginTop: 12
    }
  },
  profBorder: {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  hiddenXs: {
    '@media screen and (min-width:1024px)': {
      display: 'none!important'
    },
    '@media screen and (max-width:739px)': {
      position: 'absolute',
      top: 42,
      left: 0
    },
    '@media screen and (min-width:740px) and (max-width:1023px)': {
      position: 'absolute',
      top: 17,
      left: 0
    }
  },
  xsHiddenLogo: {
    '@media screen and (min-width:740px) and (max-width:1023px)': {
      marginLeft: '30px!important'
    }
  },
  hideMenuClose: {
    justifyContent: 'flex-end',
    display: 'flex',
    marginTop: 10,
    padding: 10
  },

  designCrumb: {
    marginLeft: 67,
    '@media screen and (max-width:831px)': {
      marginLeft: 0
    },
    '@media screen and (min-width:832px) and (max-width:901px)': {
      marginLeft: 10
    },
    '@media screen and (min-width:901px) and (max-width:923px)': {
      marginLeft: 15
    },
    '& $li': {
      maxWidth: 115,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('md')]: {
        maxWidth: 64
      },
      '& $p.MuiTypography-body1': {
        maxWidth: 100,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('md')]: {
          maxWidth: 64
        }
      }
    }
  },

  imageHeader: {
    height: '29px!important',
    width: '285px!important',
    marginTop: 10,
    cursor: 'pointer',
    marginRight: 10
  },
  imageClick: {
    cursor: 'pointer'
  }
}))
export default style
