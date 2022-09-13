import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  contentPdt: {
    padding: '0px 0px 0px 0px',
    '@media screen and (max-width:1199px)': {
      padding: '0px 10px 0px 10px'
    }
  },
  productRow: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },

  bgProductList: {
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '100%!important'
    },
    '@media screen and (max-width:1199px)': {
      width: '100%!important'
    }
  },
  libraryLabel: {
    display: 'block!important',
    flexGrow: 1,
    width: '25%',
    '& .MuiTypography-h3': {
      color: '#4c5156',
      fontFamily: 'Inter Bold',
      fontWeight: 400
    },
    [theme.breakpoints.down('sm')]: {
      width: 'unset'
    },
    '@media screen and (max-width:360px)': {
      marginRight: 10
    }
  },
  bgFilter: {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.07)',
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    height: '100%',
    width: '25%',
    [theme.breakpoints.down('xs')]: {
      width: '100%!important'
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '40%'
    },

    '@media screen and (max-width:1199px)': {
      display: 'none'
    }
  },
  productLibrary_Wrap: {
    padding: 20
  },
  list_Header: {
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 20
    },
    display: 'flex',
    alignItems: 'baseline',
    width: '100%',
    flexWrap: 'wrap'
  },
  hiddenOnlyXs: {
    '@media screen and (min-width:1200px)': {
      display: 'none'
    },
    '@media screen and (max-width:360px)': {
      marginTop: 10
    },
    marginRight: theme.spacing(1)
  },
  crumbMbTop: {
    marginTop: 2
  },
  sortLibrary: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexWrap: 'wrap',
    width: '73%',
    alignItems: 'center',
    '@media screen and (max-width:1260px)': {
      width: '100%'
    },
    '@media screen and (max-width:1199px)': {
      marginTop: theme.spacing(1)
    },
    '@media screen and (max-width:360px)': {
      display: 'block'
    }
  },
  recentSelect: {
    marginRight: theme.spacing(1),

    alignSelf: 'baseline',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e1e1e1'
    },
    '& .MuiFormControl-root .MuiInputLabel-root': {
      color: '#303337',
      opacity: 1,
      fontWeight: 400
    },
    '@media screen and (max-width:360px)': {
      marginBottom: '10px'
    }
  },

  libraryChecked: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    '& .MuiFormControlLabel-root': {
      marginLeft: '0px!important',

      '& .MuiTypography-root': {
        color: '#292d2f',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: '22px'
      },

      '& .MuiIconButton-root': {
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
        },

        '& .MuiSvgIcon-root': {
          fill: '#fff',
          padding: 3
        }
      },

      '& .MuiIconButton-label': {
        fontSize: 24,

        border: '2px solid #d4d4d4',
        width: 23,
        height: 23,
        borderRadius: 13,

        '& .MuiSvgIcon-root': {
          padding: 3,
          fill: 'transparent'
        }
      }
    }
  },

  btnAddStore: {
    marginRight: theme.spacing(1),
    color: '#303337',
    background: '#fff',
    border: '1px solid #e1e1e1',
    '&:hover': {
      background: '#fff',
      color: '#303337'
    },
    '& .MuiButton-label': {
      fontWeight: 400,
      fontSize: 14,
      fontFamily: 'Inter Regular'
    }
  },

  deleteModal: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  modalTitle: {
    color: '#292d2f',
    fontFamily: 'Inter SemiBold',
    fontSize: 18,
    fontWeight: 400,
    marginLeft: theme.spacing(2),
    lineHeight: '27px'
  },
  btnActions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: 10
    }
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
  btnDelete: {
    backgroundColor: '#e84d4b',
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    },
    '&:hover': {
      backgroundColor: '#e14240'
    }
  },

  Filter_Width: {
    '& .MuiDrawer-paper': {
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  },

  storeList_Pop: {
    '& .MuiDialogContent-root': {
      overflow: 'visible'
    }
  },
  btnApply: {
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  storeList_Loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '40px 0px'
  },
  storeText: {
    marginTop: theme.spacing(2),
    '& .MuiTypography-body2': {
      color: '#84898f',
      fontFamily: 'Inter Medium',
      fontWeight: 400
    }
  },
  store_Root: {
    marginTop: theme.spacing(4)
  },

  hiddenMdRoot: {
    '@media screen and (min-width:700px) and (max-width:1199px)': {
      display: 'flex',
      alignItems: 'end'
    },
    display: 'contents'
  }
}))
