import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  content_Detail: {
    padding: 0,
    background: '#fff'
  },
  bgProduct_Detail: {
    background: '#f4f4f4',
    width: '100%'
  },
  LinkFocus: {
    width: '100%'
  },
  imageThumb: {
    borderRadius: '50%'
  },
  ImageWrapper: {
    marginTop: theme.spacing(3)
  },
  rootProduct: {
    marginTop: 20,
    marginBottom: 12,
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 40
    }
  },
  pdtLayer: {
    width: 57,
    boxShadow: '2px 0 20px rgba(38, 41, 44, 0.07)',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    padding: theme.spacing(1),
    paddingTop: 16
  },

  pdt_avatar: {
    border: '1px solid #e6e6e6',
    borderRadius: '50%',
    marginBottom: 16,
    cursor: 'pointer',
    overflow: 'hidden'
  },
  activeBlock: {
    border: '2px solid #ffbb68'
  },
  form_Link: {
    '& .MuiLink-root': {
      color: '#3374b6',
      fontFamily: 'Inter Medium',
      fontWeight: 500,
      paddingLeft: 5,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'none',
        color: '#23619f'
      }
    }
  },

  ShedCollapseHeader: {
    flexDirection: 'row-reverse',
    color: '#263357',

    '& .MuiAccordionSummary-content': {
      margin: '12px 20px',
      '& .MuiTypography-body1': {
        fontWeight: 500,
        fontFamily: 'Roboto Medium'
      }
    },
    '& .MuiIconButton-root': {
      padding: 0,
      color: '#263357'
    }
  },
  CollapseContent: {
    padding: '8px 16px 16px 47px'
  },
  detailAccordion: {
    display: 'block!important',
    '& .MuiAccordionDetails-root': {
      whiteSpace: 'pre-line'
    },
    '@media screen and (min-width:900px)': {
      display: 'none!important'
    }
  },

  detailPdtTab: {
    display: 'block!important',
    boxShadow: '-3px 0 15px rgb(0 0 0 / 5%)',
    '@media screen and (max-width:899px)': {
      display: 'none!important'
    }
  }
}))
