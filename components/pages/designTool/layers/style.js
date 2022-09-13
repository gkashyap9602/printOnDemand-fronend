import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  layerWrap: {
    '& .MuiListItemIcon-root': {
      minWidth: 30
    },
    '&.MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0
    },
    '& .MuiCollapse-wrapperInner': {
      maxHeight: 250,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: 6,
        height: 9
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 4
      }
    }
  },
  layerItem_Text: {
    '& .MuiListItemText-primary': {
      fontSize: 16,
      fontWeight: 500,
      color: '#303337',
      fontFamily: 'Inter Medium'
    }
  },
  Layer_Count: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fcb357',
    color: '#fff',
    fontSize: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4px'
  },
  layerItem_Button: {
    '&.MuiListItem-button': {
      paddingLeft: theme.spacing(1),
      '&:hover': {
        background: 'unset'
      }
    },

    '& .MuiTouchRipple-root': {
      color: '#fff'
    }
  },
  stickyLayer: {
    position: 'fixed',

    minWidth: '22.4%',

    background: '#fff',
    paddingTop: 0,
    paddingBottom: 0,
    borderTop: '1px solid #ececec',

    borderBottom: '1px solid #ececec',
    zIndex: 1,
    bottom: 62,

    marginLeft: '-11px!important',
    width: 'calc(100% - 77.4%)',

    [theme.breakpoints.down('sm')]: {
      position: 'unset'
    },
    '@media screen and (min-width:1646px)': {
      width: '22.7%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      position: 'unset',
      marginTop: '20px!important'
    },
    '@media screen and (min-width:960px) and (max-width:1280px)': {
      width: '30.3%!important'
    }
  },
  layerContent: {
    padding: theme.spacing(1)
  },
  boxItem: {
    borderRadius: 6,
    border: '1px solid #e8e8e8',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  ImageLayer: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  },
  actionEnd: {
    justifyContent: 'flex-end'
  },
  layer_Icon: {
    marginRight: theme.spacing(1)
  },
  bgColor: {
    borderRadius: 15,
    backgroundColor: '#dd4946',
    width: 31,
    height: 31
  },
  Layer_Text: {
    border: '1px solid #e8e8e8',
    width: 31,
    height: 31,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  layerMsg: {
    marginTop: 10,
    textAlign: 'center',
    color: '#877e7e',
    marginBottom: 13
  },
  lockFlex: {
    alignItems: 'center',
    display: 'flex'
  },
  roundedFill: {
    borderRadius: '50%!important'
  }
}))
export default style
