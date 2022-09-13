import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  libraryCard_Wrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  productLibrary_Flex: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16
  },

  pdtCheck: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    '& .MuiFormControlLabel-root': {
      marginLeft: '0px!important',
      marginRight: 0,

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
          fill: 'transparent',
          padding: 3
        }
      }
    }
  },

  cardRoot: {
    display: 'flex',
    minHeight: 156,
    boxShadow: '0 5px 9px 3px rgba(37, 40, 44, 0.1)',
    borderRadius: 10,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  cover: {
    width: 252,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    paddingRight: 8
  },
  contentHead: {
    '&.MuiTypography-h3': {
      color: '#4b4e54',
      fontFamily: 'Inter SemiBold',
      fontSize: 18,
      fontWeight: 400
    }
  },
  contentPrice: {
    '&.MuiTypography-h4': {
      color: '#50595e',
      marginTop: 6
    }
  },
  contentAmount: {
    '&.MuiTypography-h3': {
      color: '#303337',
      fontFamily: 'Inter Bold',
      fontSize: 18,
      marginTop: 8,
      fontWeight: 400
    }
  },
  storeItem: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 12
  },
  storeFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: 9,
    border: '1px solid #e7ebec',
    backgroundColor: '#f1fafc',
    padding: '4px 10px',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  storeText: {
    '&.MuiTypography-body2': {
      marginLeft: 5,
      color: '#6b757f',
      fontFamily: 'Inter Medium',
      fontWeight: 500
    }
  },
  moreProduct: {
    justifyContent: 'flex-end'
  },

  editLabel: {
    '&.MuiTypography-h3': {
      color: '#303337',
      fontFamily: 'Inter SemiBold',
      fontSize: 20,
      fontWeight: 400
    }
  },
  blockEditArea: {
    borderRadius: 6,
    border: '1px solid #dedede',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  btnTabSave: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20
  },
  cancelBtn: {
    marginRight: theme.spacing(2),
    '& .MuiButton-label': {
      color: '#292d2f'
    },
    '&:hover': {
      background: 'none'
    }
  },
  saveBtn: {
    minWidth: 93
  }
}))
export default style
