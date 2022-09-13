import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
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
    background: '#fff'
  },
  ProjectCenter: {
    margin: '115px 0px 0px 0px'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    padding: '8px 8px 8px 0px !important',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
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
export default style
