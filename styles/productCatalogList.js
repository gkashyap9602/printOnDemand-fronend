import { makeStyles } from '@material-ui/core/styles'

export const style = makeStyles((theme) => ({
  listHead: {
    marginTop: 8,
    '@media screen and (min-width:600px) and (max-width:739px)': {
      marginTop: 20
    },
    display: 'flex',
    alignItems: 'baseline',
    width: '100%',
    flexWrap: 'wrap'
  },
  categoryHeader: {
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
    alignItems: 'center'
  },
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  pdtCatalogBlock: {
    borderRadius: 10,
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0 5px 9px 3px rgba(37, 40, 44, 0.28)'
  },
  pdtImage: {
    borderRadius: 10
  },
  catalogLabel: {
    wordBreak: 'break-word',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '26%',
    borderRadius: 10,
    background:
      'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.65) 100%)',
    '& .MuiTypography-body2': {
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Inter SemiBold',
      position: 'absolute',
      bottom: 12,
      left: 16,
      right: 16
    }
  },
  search: {
    position: 'relative',
    height: 45,
    display: 'flex',
    borderRadius: 30,
    border: '1px solid #e1e1e1',
    marginLeft: 0,
    color: '#9ca9b4',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    background: '#fff',
    marginRight: '8px',
    '& .MuiIconButton-edgeEnd': {
      marginRight: '0px!important'
    }
  },
  ProjectCenter: {
    margin: '115px 0px 0px 0px'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    font: 'inherit',
    border: '0',
    margin: 0,
    display: 'block',
    minWidth: 0,
    background: 'none',
    outline: 'none',
    padding: '8px 8px 8px 24px !important',
    transition: theme.transitions.create('width'),
    width: '100%!important',
    fontFamily: 'Inter Regular',
    color: '#6b757f',
    '&::placeholder': {
      color: '#6b757f!important',
      opacity: '1!important'
    }
  }
}))
