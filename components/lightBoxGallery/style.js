import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
  imagesContainer: {
    display: 'flex',

    cursor: 'pointer',
    marginLeft: 30,
    marginTop: '-7px',
    '&.SRLDownloadButton': {
      display: 'none !important'
    }
  },
  circularImage: {
    objectFit: 'cover',

    width: 35,
    height: 35,
    borderRadius: '50%',
    border: '2px solid #fff',
    '&:nth-child(2)': {
      transform: 'translateX(-50px)'
    },
    '&:nth-child(3)': {
      transform: 'translateX(-100px)'
    },
    '&:nth-child(4)': {
      transform: 'translateX(-150px)'
    },
    '&:nth-child(5)': {
      transform: 'translateX(-200px)'
    },
    '&:nth-child(6)': {
      transform: 'translateX(-250px)'
    },
    '& $img': {
      borderRadius: '20px'
    }
  },

  galleryBox: {
    width: '30%',
    display: 'block',
    margin: 'auto',
    overflow: 'auto',
    position: 'relative',
    marginTop: '79px',
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    '@media screen and (min-width:960px) and (max-width:1200px)': {
      width: '50%'
    },
    '& $ul.thumbs': {
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center'
    },
    '& $li.thumb.selected': {
      border: '1px solid #fff',
      borderRadius: 6
    },
    '& $li.thumb': {
      border: 'none',
      cursor: 'pointer',
      '&:hover': {
        border: '1px solid #fff',
        borderRadius: 6
      },
      '& $img': {
        borderRadius: 6
      }
    },
    '& .thumbs-wrapper': {
      margin: 6
    }
  },
  modalCarousel: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflowY: 'scroll',
    '& $div:first-child': {
      position: 'unset!important'
    }
  }
}))

export default style
