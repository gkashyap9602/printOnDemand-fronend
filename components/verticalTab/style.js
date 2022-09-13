import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  VerticalTabs_Faq: {
    padding: 6,
    '& .MuiTypography-body2': {
      fontSize: 15,
      fontWeight: 500,
      color: '#303337',
      fontFamily: 'Inter Medium'
    },
    '& $li': {
      listStyle: 'none',
      lineHeight: '25px',
      color: '#6b757f',
      fontSize: 14,
      marginBottom: theme.spacing(1)
    }
  },
  Faq_List: {
    cursor: 'pointer',
    marginLeft: '-38px',
    wordBreak: 'break-word'
  },
  Faq_list_active: {
    backgroundColor: ' #e3eaf1',
    color: '#3374b6!important',
    marginLeft: '-20px',
    paddingLeft: '20px',
    width: '257px;',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    marginBottom: 10,
    fontWeight: 500,
    fontFamily: 'Inter Medium',
    padding: '6px 6px 6px 20px'
  },
  Faq_Accordion_Head: {
    '&.MuiTypography-body2': {
      fontSize: 15,
      fontWeight: 500,
      color: '#303337',
      fontFamily: 'Inter Medium'
    }
  },
  Faq_Accordion_Content: {
    marginTop: 20,
    paddingBottom: 20,
    '& .MuiAccordion-root': {
      boxShadow: 'none',
      background: 'none',
      borderBottom: '1px solid #f5f0f0',
      borderRadius: '0px!important',
      zIndex: 1
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      '& .MuiTypography-body1': {
        color: '#3374b6',
        fontFamily: 'Inter Medium!important',
        fontWeight: 500
      }
    },
    '& .MuiAccordionSummary-root': {
      '& .MuiIconButton-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 20
        }
      }
    }
  },
  faq_detail: {
    fontSize: 13,
    '& $h1,$h4': {
      fontSize: 13
    }
  },
  accordion_FAQ: {
    marginLeft: theme.spacing(2)
  }
}))
