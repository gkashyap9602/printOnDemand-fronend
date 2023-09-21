import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  filter_List: {
    padding: '21px 0px 8px 0px'
  },
  clearWrap: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 6
  },
  filters: {
    padding: '6px 14px',
    borderRadius: 32,
    border: '1px dashed #e4e4e4',
    backgroundColor: '#ededed',
    color: '#292d2f',
    fontSize: 12,
    fontWeight: 400,
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    '&:nth-child(odd)': {
      marginRight: 8
    }
  },
  clearFilter: {
    display: 'flex',
    alignItems: 'center'
  },
  clearAll: {
    '&.MuiTypography-h4': {
      color: '#3374b6',
      cursor: 'pointer',
      fontSize: 13
    }
  },
  spanName: {
    width: '90%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  spanClass: {
    padding: '0px 5px',
    cursor: 'pointer',
    width: '10%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  filter_Head: {
    '& .MuiTypography-h3': {
      fontWeight: 400,
      fontFamily: 'Inter SemiBold',
      color: '#303337'
    }
  },
  filter_Count: {
    width: '20px',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fcb357',
    color: '#fff',
    fontSize: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '0px!important'
  },

  pdtItem_Block: {
    borderRadius: 10,
    border: '1px solid #efefef',
    background: '#fff',
    padding: theme.spacing(1),

    marginBottom: theme.spacing(1)
  },

  pdt_Scroll: {
    height: 800,
    overflowY: 'auto',
    overflowX: 'hidden',
    marginTop: 20,
    '&::-webkit-scrollbar': {
      width: 6,
      height: 9
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 4
    }
  },
  filterCloseIcon: {
    justifyContent: 'flex-end',
    display: 'flex',
    cursor: 'pointer'
  }
}))
export default style
