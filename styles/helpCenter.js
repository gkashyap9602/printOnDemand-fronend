import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  bg_HelpBlock: {
    padding: theme.spacing(3),
    boxShadow: '0 2px 20px rgb(38 41 44 / 7%)',
    borderRadius: 6,
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff',
    width: '100%',
    position: 'relative'
  },
  faqHead: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap'
  },
  faqHeader: {
    flexGrow: 1,
    alignSelf: 'center',
    wordBreak: 'break-word',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10
    }
  },
  searchArea_Pad: {
    marginTop: 0,
    marginBottom: 0
  },
  searchBlock: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  searchFaq: {
    margin: '0px 8px 0px 0px'
  },
  faq_borderBtm: {
    borderBottom: '1px solid #f1f1f1',
    marginLeft: '-22px',
    marginRight: '-22px',
    paddingBottom: theme.spacing(2)
  },
  root_Tabs: {
    marginTop: theme.spacing(3),
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      marginTop: '0px'
    }
  },
  Faq_tab_Block: {
    marginLeft: '-12px',
    background: '#fff',
    boxShadow: '0 2px 20px rgb(38 41 44 / 7%)',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  bg_FAQ_Btm: {
    backgroundImage: "url('/static/images/faq.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    position: 'absolute',
    bottom: '125px',
    right: 0,
    width: '232px',
    height: '208px',
    opacity: 0.6,
    '@media screen and (max-width:756px)': {
      position: 'revert'
    }
  },
  faqLabel: {
    margin: '5px'
  },
  textArea_Form: {
    border: '1px solid #d4d4d4',
    fontSize: 14
  },
  FAQ_Form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderRadius: 25,
    borderColor: '#d4d4d4',
    '&::placeholder': {
      fontFamily: 'Inter Regular',
      color: '#ccc'
    },
    '&:focus': {
      outline: 'none'
    },

    '& .MuiInputLabel-root': {
      color: '#17243e',
      fontSize: 14
    },

    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d4d4d4!important'
    },

    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d4d4d4!important'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #d4d4d4!important'
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#0B2343'
    },
    '& .MuiInputAdornment-positionEnd': {
      cursor: 'pointer'
    }
  },
  btnFaq_Actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10
  },
  btnFaq_Cancel: {
    marginRight: theme.spacing(1)
  },
  errorText: {
    color: '#f12929',
    marginBottom: '16px',
    display: 'flex',
    marginTop: '-4px'
  },
  tabFAQ_Vertical: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%'
    }
  },
  btnRaiseFAQ: {
    '@media screen and (max-width:460px)': {
      marginTop: 16
    }
  }
}))
