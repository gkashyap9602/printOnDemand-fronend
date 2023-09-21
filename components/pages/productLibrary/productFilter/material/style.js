import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  treeRoot: {
    width: '100%',
    '& .MuiTreeItem-group': {
      marginLeft: 0
    },
    '& .MuiTreeItem-content': {
      flexDirection: 'row-reverse'
    },
    '& .MuiTreeItem-label': {
      fontSize: 16,
      fontFamily: 'Inter Medium',
      fontWeight: 500,
      color: '#303337',
      backgroundColor: '#fff',
      paddingLeft: 0,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      }
    },
    '& .MuiTreeItem-iconContainer svg': {
      fontSize: 16
    },
    '& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: '#fff'
    },
    ' & .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label':
      {
        backgroundColor: '#fff'
      }
  },
  childItem: {
    color: '#292d2f',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '& .MuiTreeItem-label': {
      color: '#292d2f',
      fontSize: 14,
      fontFamily: 'Inter Regular',
      fontWeight: 400
    },
    '& .MuiTreeItem-root': {
      marginBottom: theme.spacing(1)
    }
  },

  pdtChecked: {
    marginTop: theme.spacing(2),
    wordBreak: 'break-word',

    '& .MuiFormControlLabel-root': {
      marginLeft: '0px!important',
      marginBottom: theme.spacing(1),
      width: '100%',

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
        width: 20,
        height: 20,
        marginRight: 10
      },

      '& .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#ccc',
        background: '#3374b6',
        width: 20,
        height: 20,
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
        width: 20,
        height: 20,
        borderRadius: 13,

        '& .MuiSvgIcon-root': {
          fill: '#fff',
          padding: 4
        }
      }
    }
  }
}))
export default style
