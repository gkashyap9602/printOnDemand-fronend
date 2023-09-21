import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { style } from 'styles/productCatalogList'
import ImageContainer from 'components/imageContainer'

const useStyles = style

export default function CatalogBox({ name = 'd', imageUrl = '/', guid = '', url }) {
  const classes = useStyles()
  const route = useRouter()

  return (
    <>
      <div
        className={classes.pdtCatalogBlock}
        onClick={() => {
          route.push(url)
        }}
      >
        <ImageContainer
          url={imageUrl}
          alt='Catalog'
          showLoader={true}
          h={308}
          w={315}
          objectFit='cover'
          layout='responsive'
          className={classes.pdtImage}
        />
        <div className={classes.catalogLabel}>
          <Typography variant='body2'>{name}</Typography>
        </div>
      </div>
    </>
  )
}
