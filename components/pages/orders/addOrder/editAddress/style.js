import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  EditAddress_Popup: {
    [theme.breakpoints.down('xs')]: {
      '& .MuiTabs-fixed': {
        overflowX: 'auto!important'
      },
      '& .MuiTabs-centered': {
        justifyContent: 'flex-start'
      }
    },

    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      textTransform: 'initial',
      alignItems: 'flex-start'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#75ca9e!important',
      height: 3
    },
    '& .MuiTab-root': {
      minHeight: 0,

      '&:last-child': {
        margin: '0px 12px'
      }
    },
    '& .MuiTabs-root': {
      borderBottom: '1px solid #d4d4d4',
      marginLeft: -24,
      marginRight: -24
    }
  },
  tabHorizonLine: {
    background: '#d4d4d4',
    height: 2,
    width: 40,
    padding: 0,
    display: 'flex',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'visible',
    minWidth: 80,
    marginTop: -6,
    marginLeft: theme.spacing(2),
    marginRight: '4px',
    '&::before': {
      width: 10,
      height: 10,
      content: '""',
      display: 'block',
      position: 'absolute',
      borderRadius: '50%',
      border: '1px solid #d4d4d4',
      left: -11
    },
    '&::after': {
      width: 10,
      height: 10,
      content: '""',
      display: 'block',
      position: 'absolute',
      borderRadius: '50%',
      border: '1px solid #d4d4d4',
      right: -11
    }
  },
  tab_Icon: {
    borderRadius: 15,
    border: '1px solid #d4d4d4',
    display: 'flex',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1)
  },
  rootLabel: {
    marginBottom: theme.spacing(3)
  },
  tabPanel_address: {
    '& .MuiBox-root': {
      padding: 0
    }
  },
  btnFormAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: 13,
    borderTop: '1px solid #dddddd'
  },
  btnCancel: {
    borderRadius: 45,
    width: '20%',
    '& .MuiButton-label': {
      color: '#292d2f'
    },
    '&:hover': {
      background: 'none'
    }
  },
  btnSave: {
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },

  checkedLabel: {
    marginTop: theme.spacing(2),

    '& .MuiFormControlLabel-root': {
      marginLeft: '0px!important',

      '& .MuiTypography-root': {
        color: '#292d2f',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: '22px'
      },

      '& .MuiIconButton-root': {
        '&:hover': {
          background: '#fff'
        },
        '&:focus': {
          background: '#3374b6'
        }
      },
      '& .MuiCheckbox-root': {
        color: '#CACED7',
        width: 23,
        height: 23,
        marginRight: 10
      },

      '& .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#ccc',
        background: '#3374b6',
        width: 23,
        height: 23,
        borderRadius: 13,
        '&:hover': {
          background: '#3374b6'
        },
        '& .MuiIconButton-label': {
          border: 'unset'
        }
      },

      '& .MuiIconButton-label': {
        fontSize: 24,

        border: '2px solid #d4d4d4',
        width: 23,
        height: 23,
        borderRadius: 13,

        '& .MuiSvgIcon-root': {
          fill: '#fff',
          padding: 3
        }
      }
    }
  }
}))
export default style
