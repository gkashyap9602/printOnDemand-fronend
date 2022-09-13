import React, { useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import style from './style'
import DataTable from 'components/dataTable'
import Modal from 'components/modal'
import { useRouter } from 'next/router'
import { TABLE_TITLES } from 'constants/tableValue'
import { checkIfEmpty } from 'utils/helpers'
import ImageContainer from 'components/imageContainer'
import { NotificationManager } from 'react-notifications'
import { isActiveInternet } from 'utils/helpers'

const useStyles = style

/**
 * Right side details of product
 * @param {*} param0
 * @returns
 */
const DetailContent = ({ product, showLoader }) => {
  const classes = useStyles()
  const route = useRouter()
  const [isCheck, setIsCheck] = useState([])
  const [toggleModal, setToggleModal] = useState(false)

  /**
   * getCheckedProductId
   * @returns
   */
  const getDefaultProductTemplate = () => {
    const products = product?.productVarients.find((item) => {
      return item.isDefaultTemplate
    })

    return [products.productId, products.designPanels]
  }

  /**
   * Navigate to designer tool
   */
  const handleRouteToDesignerTool = () => {
    const [productId, designPanels] = getDefaultProductTemplate()
    showLoader(true)
    isActiveInternet(route, {
      pathname: '/designTool',
      query: {
        productId,
        productVariantId: 0,
        mode: 'create',
        ...route.query,
        title: product?.title,
        designPanels
      }
    })
  }

  /**
   * checkBoxHandler
   * @param {*} e
   * @param {*} list
   */
  const checkBoxHandler = (e, list) => {
    if (list?.designerAvailable) {
      if (isCheck?.includes(list.guid)) {
        const valueUpdated = isCheck.filter((item) => item !== list.guid)
        setIsCheck(valueUpdated)
      } else {
        setIsCheck([list.guid])
      }
    } else {
      NotificationManager.warning(
        'Designing feature is not available for this product',
        ' ',
        ' 2000'
      )
    }
  }

  /**
   * handleModalClose
   */
  const handleModalClose = () => {
    setToggleModal(false)
  }

  // Return html
  return (
    <div className={classes.bg_detail_Head}>
      <div className={classes.typoArea}>
        <div className={classes.content_Head}>
          <div className={classes.flexMaterial}>
            <Typography variant='h3'> {product?.title}</Typography>
          </div>
          <Typography variant='h4'>{product?.parentCategoryName}</Typography>
        </div>
        <Typography variant='h4' className={classes.detailContent}>
          {product?.longDescription || '---'}
        </Typography>
      </div>
      <div className={classes.variant_wrapper}>
        <div style={{ display: 'flex' }}></div>
        <div className={classes.sizeTab}>
          <DataTable
            isExtraFieldReq={false}
            isCheck={false}
            checkBoxHandler={checkBoxHandler}
            isSelectAllReq={false}
            nodataMessage='Variants are not available'
            checkIfDisable={true}
            collapse={true}
            isProductDetail={true}
            tableTitles={TABLE_TITLES.PRODUCT_SIZE}
            lists={product?.productVarients}
            className={classes.tablePad}
          />
        </div>
      </div>
      <div className={classes.bordBtm} />
      {!checkIfEmpty(product?.productionDuration) && (
        <div className={classes.typoArea}>
          <div className={classes.content_Item}>
            <div className={classes.iconRight}>
              <Icon icon='time-icon' size={20} color='#6a7075' />
            </div>
            <div className={classes.flexProp}>
              <Typography variant='h4'>Production time</Typography>
            </div>
          </div>
          <div className={classes.flexMrTop}>
            <Typography variant='h4'>{product?.productionDuration || '--'}</Typography>
          </div>
        </div>
      )}
      {!checkIfEmpty(product?.construction) && (
        <div className={classes.typoArea}>
          <div className={classes.content_Item}>
            <div className={classes.iconRight}>
              <Icon icon='time-icon' size={20} color='#6a7075' />
            </div>
            <div className={classes.flexProp}>
              <Typography variant='h4'>Construction</Typography>
            </div>
          </div>
          <div className={classes.flexMrTop}>
            <Typography variant='h4'>{product?.construction || '---'}</Typography>
          </div>
        </div>
      )}

      <div className={classes.bordBtm} />
      <div className={classes.typoArea}>
        <div style={{ marginTop: 16, marginBottom: 8 }}>
          <Button
            type='submit'
            variant='contained'
            onClick={handleRouteToDesignerTool}
            className={classes.pdtDesignTool}
            startIcon={<Icon icon='design_service' size={20} />}
          >
            Start designing
          </Button>
        </div>
      </div>

      {/* <!--size chart modal--> */}
      {toggleModal && (
        <Modal
          open={toggleModal}
          handleClose={handleModalClose}
          title='Size chart'
          className={classes.sizeChartModal}
        >
          <ImageContainer url={product?.sizeChart?.imageUrl} alt='Size chart' w='400' h='400' />
        </Modal>
      )}
      {/* <!--size chart modal--> */}
    </div>
  )
}
// export
export default DetailContent
