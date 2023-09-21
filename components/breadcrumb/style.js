import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  breadCrumb_Root: {
    '& .MuiBreadcrumbs-root': {
      color: '#292d2f',
      fontFamily: 'Inter Regular',
      fontSize: 13,
      fontWeight: 400,
      wordBreak: 'break-word'
    },
    '& $li': {
      maxWidth: 180,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '& $p.MuiTypography-body1': {
        maxWidth: 180,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  },
  crumb_Link: {
    color: '#292d2f',
    textDecoration: 'none',
    fontSize: 14,
    cursor: 'pointer'
  }
}))
export default style
