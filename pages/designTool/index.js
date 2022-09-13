import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  makeStyles,
  Grid,
  Tabs,
  Tab,
  Box,
  Avatar,
  Tooltip,
  Button,
  Typography
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Icon from 'icomoons/Icon'
import Link from 'next/link'
import clsx from 'clsx'
import { connect } from 'react-redux'

import DCanvas from 'components/canvas'
import BuildText from '/components/pages/designTool/BuildText'
import BuildBackground from '/components/pages/designTool/BuildBackground'
import BuildImage from 'components/pages/designTool/BuildImage'
import Layout from 'components/layout'
import { style } from 'styles/designerTool'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

import Image from 'next/image'

import { checkIfEmpty, isShopifyApp } from 'utils/helpers'
import {
  saveProduct,
  generateProductDetails,
  updateFabricViewList,
  setCropStatus
} from 'redux/actions/designToolActions'

import ImageContainer from 'components/imageContainer'

import { useDispatch, useSelector } from 'react-redux'
import { ISSERVER } from 'constants/routePaths'

import {
  changeView,
  changeAllColor,
  updateSelectedAddOn,
  clearEntireState
} from 'redux/actions/designToolActions'

import Loader from '../../components/loader/index'

import Layers from 'components/pages/designTool/layers'

import NotificationManager from 'react-notifications/lib/NotificationManager'
import { throttle } from '../../utils/helpers'
import Preview from 'components/pages/designTool/Preview'
import Modal from 'components/modal'
import AlertPopup from 'components/pages/designTool/alertPopup'
import productLibraryReducer from 'redux/reducers/productLibraryReducer'
import ProgressLoader from 'components/progressLoader'

const useStyles = style

//tab

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

//tab

const DesignerTool = ({
  productId,
  productVariantId,
  mode,
  productLibraryId,
  productLibraryVariantId,
  designPanels
}) => {
  const classes = useStyles()

  const [toggleAlert, setToggleAlert] = useState(false)
  const [collapseLayer, setCollapseLayer] = useState(false)
  const handleModalClose = () => {
    setToggleAlert(false)
  }

  // tab
  const [value, setValue] = useState(0)
  //Text props
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const design = useSelector((state) => state.design)
  const designModel = useSelector((state) => state.designModel)
  const product = useSelector((state) => state.product.product_details?.response)
  const [toggleSizeChartModal, setToggleSizeChartModal] = useState(false)
  const duplicateProductDetails = useSelector((state) => state?.productLibrary?.updateDetails)
  let unParsedDesignerJSON
  if (mode === 'create') {
    unParsedDesignerJSON = designModel?.productVariants?.find(
      (item) => item.isDefaultTemplate
    )?.designerJSON
  } else if (mode === 'edit' || mode === 'duplicate')
    unParsedDesignerJSON = designModel?.savedDesign?.designerJSON
  // const [designerJSON, setDesignerJSON] = useState({})
  let designerJSON
  if (unParsedDesignerJSON)
    designerJSON = mode === 'create' ? JSON.parse(unParsedDesignerJSON) : unParsedDesignerJSON

  const [textColor, setTextColor] = useState('#000000')
  const [textFont, setTextFont] = useState('Arial')
  const [fontSize, setFontSize] = useState(35)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const progressRef = useRef(0)
  const refs = { sceneRef, canvasRef, progressRef }
  //Background color props
  const [fabricViewSelectedColor, setFabricViewSelectedColor] = useState('#000000')
  const [allFabricColor, setAllFabricColor] = useState('#000000')
  //fabric view props
  const [selectedView, setSelectedView] = useState('')

  const [loader, showLoader] = useState(false)
  const [progressLoader, showProgressLoader] = useState(false)

  const [toggleImageUploadModal, setToggleImageUploadModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showPreviewLoader, setShowPreviewLoader] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const viewNameFilterArray = ['panel']
  //Canvas props
  const handleChange = (event, newValue) => {
    setValue(newValue)
    layerCloseHandler()
  }

  // layer close when clicking outside
  const layerCloseHandler = () => {
    setCollapseLayer(false)
  }
  // layer close when clicking outside

  useEffect(() => {
    if (mode === 'create') {
      setFabricViewSelectedColor('#FFFFFF')
    } else {
      if (design.fabricEntireProduct.applyToAll)
        dispatch(changeAllColor(design.fabricEntireProduct.color))
      else {
        setFabricViewSelectedColor(
          designModel?.savedDesign?.fabricViewColor[designModel?.savedDesign?.fabricViewSelected]
        )
      }
    }
  }, [designModel])

  useEffect(() => {
    if (designerJSON?.types) {
      dispatch(updateFabricViewList(Object.keys(designerJSON?.types)))
      dispatch(changeView(designerJSON?.default))
      setSelectedView(designerJSON?.default)
    }
  }, [designModel])

  useEffect(() => {
    const handleOnline = () => {
      window.location.reload(false)
      showLoader(false)
    }
    const handleOffline = () => {
      NotificationManager.error('No active internet connection', '', 10000)
      showLoader(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(design.selectedAddOn).includes('text')) {
      setValue(2)
    } else if (design.selectedAddOn?.file) {
      setValue(0)
    }
  }, [design.selectedAddOn])

  useEffect(() => {
    dispatch(changeView(selectedView))
    if (design.fabricViewColor && Object.keys(design.fabricViewColor).includes(selectedView)) {
      setFabricViewSelectedColor(design.fabricViewColor[selectedView])
    } else {
      if (mode === 'create') {
        setFabricViewSelectedColor(designerJSON?.meshColor ? designerJSON?.meshColor : '#FFFFFF')
      } else
        setFabricViewSelectedColor(
          designModel?.savedDesign?.fabricViewColor[designModel?.savedDesign?.fabricViewSelected]
            ? designModel?.savedDesign?.fabricViewColor[
                designModel?.savedDesign?.fabricViewSelected
              ]
            : designerJSON?.meshColor
            ? designerJSON?.meshColor
            : '#FFFFFF'
        )
    }
  }, [selectedView])

  const handleClick = (e) => {
    if (!e.target?.className?.includes('upper-canvas') && !e.target.id === '3DCanvas') {
      canvasRef?.current?.discardActiveObject()
    }
  }

  const handleCropAwayClick = (e) => {
    if (design.cropStatus === 'inprogress') {
      if (!e?.target?.classList?.contains('upper-canvas') && e.target.id !== '2DCanvas') {
        dispatch(setCropStatus('none'))
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleCropAwayClick, false)
    return () => {
      window.removeEventListener('click', handleCropAwayClick)
    }
  }, [design])

  useEffect(() => {
    return () => {
      dispatch(clearEntireState())
      cancelAnimationFrame(sceneRef.current.id)
      sceneRef.current.renderer.forceContextLoss()
      sceneRef.current.renderer.domElement = null
      sceneRef.current.renderer = null
      sceneRef.current = null
      sceneRef.current = null
    }
  }, [])
  // tab
  const handleApprovalModal = () => {
    setToggleAlert(true)
  }

  const handleSaveProduct = async () => {
    dispatch(generateProductDetails())
  }

  const handleShowPreview = () => {
    showLoader(true)
    setShowPreviewLoader(true)
    if (
      designerJSON.mockupModel &&
      designerJSON.cameraViewPositions &&
      designerJSON.cameraTargetViewPositions
    ) {
      if (sceneRef.current) {
        sceneRef.current.generateMockup(canvasRef.current, designerJSON, () => {
          Promise.all(
            sceneRef.current.switchViewsAndTakeSnapShots(canvasRef.current, 'front')
          ).then((res) => {
            setTimeout(() => {
              setPreviewImages(res)
              showLoader(false)
            }, 2000)
          })
        })
      }
    } else {
      Promise.all(generateMockupImages(canvasRef, sceneRef, designerJSON)).then((res) => {
        setTimeout(() => {
          setPreviewImages(res)
          showLoader(false)
        }, 2000)
      })
    }
  }

  useEffect(() => {
    if (previewImages.length > 0) setShowPreview(!showPreview)
  }, [previewImages])

  const getViewTitle = (designerJSON, item, mode) => {
    try {
      return mode === 'create'
        ? designerJSON.size === 'default' || designerJSON.size === undefined
          ? (item = item)
          : item.split(designerJSON.size)[1] == '' || item.split(designerJSON.size)[1] === undefined
          ? item.split('_' + designerJSON.size)[0]
          : item.split(designerJSON.size + '_')[1].includes('panel')
          ? item.split(designerJSON.size + '_')[1].replace('panel', '')
          : item.split(designerJSON.size + '_')[1]
        : designerJSON.size === 'default' || designerJSON.size === undefined
        ? (item = item)
        : item.split(designerJSON.size)[1] === '' || item.split(designerJSON.size)[1] === undefined
        ? item.split('_' + designerJSON.size)[0]
        : item.split(designerJSON.size + '_')[1].includes('panel')
        ? item.split(designerJSON.size + '_')[1].replace('panel', '')
        : item.split(designerJSON.size + '_')[1]
    } catch (err) {
      console.log('Error')
    }
  }
  return (
    <Layout
      menuHide
      className={classes.dTool_content}
      dtoolHeader='true'
      tabSizeClass={classes.tab_Header}
    >
      <div className={classes.dTool_View}>
        <div className={classes.dTool_feature}>
          {!showPreview && (
            <Grid container direction='row' spacing={3} className={classes.rootPreview}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <div className={classes.content_Item}>
                  <div>
                    {!checkIfEmpty(product?.sizeChart) &&
                      !checkIfEmpty(product?.sizeChart?.imageUrl) && (
                        <Button
                          style={{ 'text-transform': 'none' }}
                          className={clsx(classes.btnSizeChart, classes.sizeChartTop)}
                          endIcon={<Icon icon='arrow_forward' size={18} />}
                          onClick={() => setToggleSizeChartModal(true)}
                          variant='outlined'
                        >
                          Size chart
                        </Button>
                      )}
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  className={classes.Image_Tabs}
                >
                  {designerJSON?.types &&
                    Object.keys(designerJSON.types).map((item) => {
                      return (
                        <>
                          <Box
                            key={item}
                            className={clsx(classes.avatarBlock, {
                              [classes.activeBlock]: selectedView === item
                            })}
                            mr={2}
                            onClick={() => {
                              setSelectedView(item)
                            }}
                          >
                            <a className={classes.form_Link}>
                              <TooltipBootstrap
                                title={
                                  mode === 'create'
                                    ? designerJSON.size === 'default' ||
                                      designerJSON.size === undefined
                                      ? (item = item)
                                      : item.split(designerJSON.size)[1] == '' ||
                                        item.split(designerJSON.size)[1] === undefined
                                      ? item.split('_' + designerJSON.size)[0]
                                      : item.split(designerJSON.size + '_')[1]?.includes('panel')
                                      ? item.split(designerJSON.size + '_')[1]?.replace('panel', '')
                                      : item.split(designerJSON.size + '_')[1]
                                    : designerJSON.size === 'default' ||
                                      designerJSON.size === undefined
                                    ? (item = item)
                                    : item.split(designerJSON.size)[1] === '' ||
                                      item.split(designerJSON.size)[1] === undefined
                                    ? item.split('_' + designerJSON.size)[0]
                                    : item.split(designerJSON.size + '_')[1]?.includes('panel')
                                    ? item.split(designerJSON.size + '_')[1]?.replace('panel', '')
                                    : item.split(designerJSON.size + '_')[1]
                                }
                              >
                                <div className={classes.pdtViewImageTab}>
                                  <img
                                    alt={item}
                                    src={
                                      designModel.baseURL +
                                      '/' +
                                      designerJSON.types[item]
                                        .replace('Images', 'Images/Thumbnail')
                                        .replace('svg', 'png')
                                    }
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null // prevents looping
                                      currentTarget.src = './static/images/dtool_no_view_icon.png'
                                    }}
                                    // onerror="this.onerror=null; this.src='./static/dtool_no_view_icon.png'"
                                    width={'45px'}
                                    height={'45px'}
                                    style={{
                                      // background: 'red',
                                      // width: '25%',
                                      objectFit: 'contain'
                                    }}
                                    // objectFit='contain'
                                  />
                                </div>
                              </TooltipBootstrap>
                            </a>
                          </Box>
                        </>
                      )
                    })}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                <Box display='flex' width='100%' className={classes.btnPreview}>
                  <Box mr={2}>
                    <Button
                      type='submit'
                      variant='outlined'
                      fullWidth
                      startIcon={<Icon icon='eye-show' size={16} color='#babac9' />}
                      onClick={handleShowPreview}
                    >
                      Preview
                    </Button>
                  </Box>
                  <Box></Box>
                </Box>
              </Grid>
            </Grid>
          )}
          {/* Preview */}

          {showPreview && (
            <Preview
              ref={{ sceneRef, canvasRef }}
              showPreview={showPreview}
              setShowPreview={setShowPreview}
              showPreviewLoader={showPreviewLoader}
              setShowPreviewLoader={setShowPreviewLoader}
              previewImages={previewImages}
              mode={mode}
            />
          )}
          {/* <!--canvas--> */}
          <Grid
            container
            direction='row'
            spacing={3}
            className={classes.canvasBlock}
            style={{ display: showPreview ? 'none' : 'flex' }}
          >
            <Grid item xs={12} sm={12} md={8} lg={9} xl={9} style={{ background: '#f4f4f4' }}>
              {/* <!--new--> */}
              <Grid container direction='row' onClick={handleClick}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} id='viewport'>
                  <div>
                    <DCanvas
                      canvasId={'2DCanvas'}
                      className={classes.viewCanvas}
                      mode={mode}
                      productId={productId}
                      productVariantId={productVariantId}
                      productLibraryId={productLibraryId}
                      productLibraryVariantId={productLibraryVariantId}
                      design={design}
                      showLoader={showLoader}
                      setToggleImageUploadModal={setToggleImageUploadModal}
                      ref={refs}
                      showPreview={showPreview}
                      setPreviewImages={setPreviewImages}
                      duplicateProductDetails={duplicateProductDetails}
                      showProgressLoader={showProgressLoader}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} id='viewport'>
                  <div>
                    <canvas id={'3DCanvas'} className={classes.viewCanvas} />
                  </div>
                </Grid>
              </Grid>
              {/* <!--new--> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} className={classes.tab_content}>
              <TabPanel value={value} index={0}>
                <BuildImage
                  mode={mode}
                  ref={{ canvasRef }}
                  toggleImageUploadModal={toggleImageUploadModal}
                  setToggleImageUploadModal={setToggleImageUploadModal}
                  layerCloseHandler={layerCloseHandler}
                  showLoader={showLoader}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <BuildBackground
                  fabricViewSelectedColor={fabricViewSelectedColor}
                  setFabricViewSelectedColor={setFabricViewSelectedColor}
                  handleCollapse={() => setCollapseLayer(false)}
                  layerCloseHandler={layerCloseHandler}
                  mode={mode}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <BuildText
                  text={text}
                  setText={setText}
                  textColor={textColor}
                  setTextColor={setTextColor}
                  textFont={textFont}
                  setTextFont={setTextFont}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  handleCollapse={() => setCollapseLayer(false)}
                  layerCloseHandler={layerCloseHandler}
                />
              </TabPanel>

              {design.cropStatus !== 'inprogress' && (
                <Layers
                  collapseLayer={collapseLayer}
                  handleCollapse={(open) => setCollapseLayer(open)}
                />
              )}
            </Grid>
          </Grid>
          {/* <!--canvas--> */}
        </div>

        {/* <!--tabs--> */}
        {!showPreview && (
          <div className={classes.bg_tabPanel}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='simple tabs example'
              orientation='vertical'
              textColor='secondary'
              className={classes.tabs_Field}
            >
              <Tooltip
                title='Image'
                placement='left'
                classes={{
                  tooltip: classes.customTooltipDtool
                }}
              >
                <Tab icon={<Icon icon='image-add' size={20} />} {...a11yProps(0)} />
              </Tooltip>

              <Tooltip
                title='Background color'
                placement='left'
                classes={{
                  tooltip: classes.customTooltipDtool
                }}
              >
                <Tab icon={<Icon icon='color-fill' size={20} />} {...a11yProps(2)} />
              </Tooltip>
              <Tooltip
                title='Text'
                placement='left'
                classes={{
                  tooltip: classes.customTooltipDtool
                }}
              >
                <Tab icon={<Icon icon='text-tool' size={20} />} {...a11yProps(3)} />
              </Tooltip>
            </Tabs>
          </div>
        )}
        {/* <!--tabs--> */}
      </div>
      {loader && (
        <Loader
          fullOpaque={showPreviewLoader ? true : false}
          message={'Loading design resources...'}
        />
      )}
      {progressLoader && <ProgressLoader ref={progressRef} initialValue={0} />}
      <div className={classes.bgSaveRoot}>
        <div className={classes.workspaceArea}>
          {Number(designPanels) === 1 && (
            <Box display='flex' alignItems='center' className={classes.warningMsg}>
              <Box mr={1} className={classes.warningIcon}>
                <Icon icon='warning-icon' size={18} />
              </Box>
              <Box pr={1}>
                <Typography variant='h4'>
                  The actual product will be different from the 3D view as the backside will be
                  plain.
                </Typography>
              </Box>
            </Box>
          )}
        </div>
        <div className={classes.btnProduct_Wrapper}>
          {!showPreview && (
            <Button
              type='submit'
              variant='contained'
              className={classes.saveProduct}
              onClick={handleApprovalModal}
            >
              Save product
            </Button>
          )}

          {/* <!--dpi alert--> */}
          {toggleAlert && (
            <Modal open={toggleAlert} handleClose={handleModalClose} title=''>
              <AlertPopup onConfirm={handleSaveProduct} onClose={handleModalClose} mode={mode} />
            </Modal>
          )}
          {/* <!--dpi alert--> */}
          {/* <!--size chart modal--> */}
          {toggleSizeChartModal && (
            <Modal
              open={toggleSizeChartModal}
              handleClose={() => setToggleSizeChartModal(false)}
              title='Size chart'
              className={classes.sizeChartModal}
            >
              <ImageContainer url={product?.sizeChart?.imageUrl} alt='Size chart' w='400' h='400' />
            </Modal>
          )}
          {/* <!--size chart modal--> */}
        </div>
      </div>
    </Layout>
  )
}

DesignerTool.getInitialProps = ({ query }) => {
  return {
    mode: query.mode,
    productId: query.productId,
    productVariantId: query.productVariantId,
    productLibraryId: query.productLibraryId,
    productLibraryVariantId: query.productLibraryVariantId,
    designPanels: query.designPanels
  }
}

export default DesignerTool
