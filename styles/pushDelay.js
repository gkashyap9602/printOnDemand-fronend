import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  'input[type="time"]::datetime-edit-field': { display: 'none !important' },
  'input[type=time]::-webkit-clear-button': {
    '-webkit-appearance': 'none',
    ' -moz-appearance': 'none',
    ' -o-appearance': 'none',
    ' -ms-appearance': 'none',
    ' appearance': 'none',
    margin: '-10px'
  },
  Delayroot: {
    marginBottom: theme.spacing(2)
  },
  delayContainer: {
    background: 'white',
    position: 'absolute',
    top: '254px',
    right: '359px',

    border: '1px solid #00000021',
    borderRadius: '30px',
    width: '400px',
    padding: '19px',
    zIndex: 1,
    boxShadow: '0 2px 20px rgb(38 41 44 / 7%)',
    '& $input': {
      border: '1px solid #e1e1e1',
      height: 45,
      borderRadius: 10,
      padding: 10,
      width: '100%',
      '&:focus': {
        outline: 'none'
      }
    }
  },

  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
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
  btnApply: {
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  filter_label: {
    marginBottom: theme.spacing(1)
  },

  XsLabelDate: {
    '@media screen and (max-width:959px)': {
      display: 'none'
    }
  },
  filter_Wrap: {
    right: 179,
    '& .react-datepicker-wrapper': {
      marginTop: theme.spacing(1)
    },
    '& $input': {
      border: '1px solid #e1e1e1',
      height: 45,
      borderRadius: 10,
      padding: 10,
      width: '100%',
      '&:focus': {
        outline: 'none'
      }
    },
    '@media screen and (max-width:434px)': {
      right: 35,
      top: 414,
      width: 263
    },
    '@media screen and (min-width:435px) and (max-width:600px)': {
      right: 35,
      top: 361,
      width: 350
    },
    '@media screen and (min-width:601px) and (max-width:739px)': {
      right: 48,
      top: 306
    },
    '@media screen and (min-width:740px) and (max-width:1200px)': {
      right: 55,
      top: 286
    }
  },

  product_Wrap_Sort: {
    top: 86,
    right: 85,
    '@media screen and (max-width:380px)': {
      right: 35,
      top: 226,
      width: 263
    },
    '@media screen and (min-width:381px) and (max-width:439px)': {
      right: 12,
      top: 223,
      width: 350
    },
    '@media screen and (min-width:440px) and (max-width:700px)': {
      right: 8,
      top: 153
    },
    '@media screen and (min-width:701px) and (max-width:739px)': {
      right: 55,
      top: 155
    },
    '@media screen and (min-width:740px) and (max-width:876px)': {
      right: 123,
      top: 141
    },
    '@media screen and (min-width:1008px) and (max-width:1024px)': {
      right: 123,
      top: 89
    },
    '@media screen and (min-width:1025px) and (max-width:1108px)': {
      right: 123,
      top: 141
    }
  },

  filtRadioGrup: {
    '&.MuiFormGroup-root': {
      flexDirection: 'row',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  },
  btnFormAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'baseline',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  btnFiltSubmit: {
    width: '30%',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  btnFiltReset: {
    width: '30%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset'
    }
  },
  order_delay_Popup: {
    '@media screen and (max-width:434px)': {
      right: 35,
      top: 357,
      width: 263
    },
    '@media screen and (min-width:435px) and (max-width:600px)': {
      right: 35,
      top: 361,
      width: 350
    },
    '@media screen and (min-width:601px) and (max-width:739px)': {
      right: 48,
      top: 306
    },
    '@media screen and (min-width:740px) and (max-width:1200px)': {
      right: 55,
      top: 286
    }
  },
  sort_Order_Btn: {
    '& $btnFiltSubmit.MuiButton-root': {
      backgroundColor: '#3374b6'
    }
  }
}))
