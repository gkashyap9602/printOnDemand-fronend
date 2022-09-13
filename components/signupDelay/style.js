import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  bgAccount: {
    position: 'relative'
  },
  bgCurve: {
    backgroundImage: "url('/static/images/cloud.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 244,
    height: 216
  },
  accountGrid: {
    padding: theme.spacing(4)
  },
  root: {
    marginTop: 20,
    '& a': {
      color: '#3374b6!important',
      fontFamily: 'Inter Medium',
      fontWeight: 500,
      paddingLeft: 5,
      textDecoration: 'none',
      cursor: 'pointer',

      '&:hover': {
        textDecoration: 'none',
        color: '#23619f!important'
      },
      [theme.breakpoints.down('xs')]: {
        width: 100
      }
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  signup_Row: {
    '& .MuiTypography-h2': {
      lineHeight: '32px',
      marginBottom: theme.spacing(2),
      color: '#303337',
      fontWeight: 400
    }
  },
  rowspan: {
    color: '#3374b6',
    marginLeft: theme.spacing(1)
  },

  bgSignup: {
    background: '#fff',
    boxShadow: '0 2px 10px 5px rgba(37, 40, 44, 0.1)',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    '& .MuiTypography-h1': {
      color: '#303337',
      fontWeight: 400
    }
  },

  labelForm: {
    color: '#6c7985',
    marginBottom: 5
  },

  checkedWrap: {
    marginTop: theme.spacing(3),

    '& .MuiFormControlLabel-root': {
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
  },

  btn_Signup: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  form_Flex: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1)
  },
  LoaderSession: {
    color: '#3374b6',
    marginLeft: theme.spacing(2)
  },

  successMsg: {
    background: '#e0ffef',
    width: '100%',
    padding: '16px 32px',
    marginTop: '16px',
    marginBottom: '16px',
    display: 'flex',
    '& .MuiTypography-h5': {
      lineHeight: '22px',
      color: '#292d2f'
    }
  },
  row_Text: {
    color: '#292d2f'
  },
  labelText: {
    '&.MuiTypography-h4': {
      color: '#292d2f',
      lineHeight: '22px',
      marginTop: theme.spacing(1)
    }
  },

  labelHead: {
    '&.MuiTypography-body2': {
      color: '#303337',
      fontWeight: 500,
      fontFamily: 'Inter Medium'
    }
  },
  radioForm: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& .MuiFormControlLabel-root': {
      marginBottom: theme.spacing(1),
      color: '#292d2f'
    }
  },
  formWrapper: {
    maxHeight: 500,
    overflowY: 'scroll',
    marginTop: 20,
    '&::-webkit-scrollbar': {
      width: 6,
      height: 9
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4
    }
  }
}))
export default style
