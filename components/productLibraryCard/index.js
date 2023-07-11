import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import { MoreActions } from 'components/formElements'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import Image from 'next/image'
import { checkIfEmpty } from 'utils/helpers'
import NoStoreImg from '/static/images/no-store.png'
import style from './style'
import { useRouter } from 'next/router'
import ImageContainer from 'components/imageContainer'
import { NotificationManager } from 'react-notifications'
import { useEffect, useState } from 'react'
const useStyles = style

/**
 * ProductLibraryCard
 * @param {*} param0
 * @returns
 */
function ProductLibraryCard({
  item,
  handleMoreOptions,
  checkBoxHandler = () => {},
  isCheck = false
}) {
  const classes = useStyles()
  const [disable, setDisable] = useState(false)
  const options = [
    // {
    //   id: 2,
    //   status: 2,
    //   label: 'Add to store',
    //   icon: 'stores',
    //   disable: isCheck.length !== 0 ? true : disable
    // },
    item?.editable && {
      id: 3,
      status: 3,
      label: 'Edit design',
      icon: 'design_service',
      disable: disable
    },
    { id: 4, status: 4, label: 'Edit product', icon: 'edit-icon' },
    { id: 5, status: 5, label: 'Duplicate', icon: 'copy', disable: disable },
    { id: 6, status: 6, label: 'Delete', icon: 'delete' }
  ]
  useEffect(() => {
    if (item && item?.isProductDeleted) setDisable(true)
  }, [item])
  const route = useRouter()
  return (
    <div className={classes.libraryCard_Wrapper}>
      {/* <!--new--> */}
      <div className={classes.bgCheck_Box}>
        <FormControlLabel
          control={
            <Checkbox
              name='cutomerStatusChanger'
              checkedIcon={<CheckIcon fontSize='medium' />}
              icon={<RadioButtonUncheckedIcon color='primary' />}
              onChange={(e) => checkBoxHandler(e, item)}
              checked={isCheck && isCheck.includes(item.productLibraryId)}
            />
          }
        />
      </div>

      <div className={classes.productLibrary_Flex}>
        <Card className={classes.cardRoot}>
          <CardMedia
            className={classes.cover}
            onClick={() => {
              if (navigator.onLine) {
                !item?.isProductDeleted && route.push(`/productlibrary/${item?.productLibraryGuid}`)
              } else {
                NotificationManager.error('No active internet connection.', '', 10000)
              }
            }}
            title='Product Library'
          >
            <ImageContainer
              url={
                !checkIfEmpty(item?.libraryImages?.[0]?.imagePath)
                  ? item?.libraryImages?.[0]?.imagePath
                  : '/static/images/Image-no-found.png'
              }
              alt='Product'
              w={252}
              h={250}
            />
          </CardMedia>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <div
                style={{ flexGrow: 1 }}
                onClick={() => {
                  if (navigator.onLine) {
                    !item?.isProductDeleted &&
                      route.push(`/productlibrary/${item?.productLibraryGuid}`)
                  } else {
                    NotificationManager.error('No active internet connection.', '', 10000)
                  }
                }}
              >
                <Typography
                  variant='h3'
                  className={classes.contentHead}
                  style={{ textDecoration: item?.isProductDeleted && 'line-through' }}
                  onClick={() => {
                    if (navigator.onLine) {
                      !item?.isProductDeleted &&
                        route.push(`/productlibrary/${item?.productLibraryGuid}`)
                    } else {
                      NotificationManager.error('No active internet connection.', '', 10000)
                    }
                  }}
                >
                  {item?.title}
                </Typography>
                <Typography variant='h4' className={classes.contentPrice}>
                  Price starts from
                </Typography>
                <Typography variant='h3' className={classes.contentAmount}>
                  {item?.priceRange}
                </Typography>
                <div className={classes.storeItem}>
                  {/* <!--no store added--> */}
                  {item?.storeProducts?.length ? (
                    item.storeProducts.map((storeItem, index) => (
                      <div className={classes.storeFlex} key={`${index}-${storeItem.storeId}`}>
                        <Image src={NoStoreImg} alt='No Store' width='27' height='23' />
                        <Typography variant='body2' className={classes.storeText}>
                          {storeItem.storeName}
                        </Typography>
                      </div>
                    ))
                  ) : (
                    <div className={classes.storeFlex}>
                      <Image src={NoStoreImg} alt='No Store' width='27' height='23' />
                      <Typography variant='body2' className={classes.storeText}>
                        Not added to store
                      </Typography>
                    </div>
                  )}
                  {/* <!--no store added--> */}
                </div>
              </div>

              <div className={classes.moreProduct}>
                <MoreActions
                  options={options}
                  rawDteails={item}
                  isActionChange={handleMoreOptions}
                />
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
      {/* <!--new--> */}
    </div>
  )
}
//Export
export default ProductLibraryCard
