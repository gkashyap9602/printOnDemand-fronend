import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Grid,
  Slider,
  Typography,
  Box,
  Input,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import Icon from 'icomoons/Icon'
import AddIcon from '@material-ui/icons/Add'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateSelectedAddOn,
  changePattern,
  deleteLayer,
  setCropStatus
} from 'redux/actions/designToolActions'
import { updateSelectedObjectPosition, changePatternSpacing } from 'redux/actions/designToolActions'
import style from './style'
import Modal from 'components/modal'
import UploadImage from 'components/pages/designTool/uploadImage'
import Nodata from 'components/nodata'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

const useStyles = style

const RECOMMENDED_DPI = 300
const AAFILE_WIDTH = 8701
const AAFILE_HEIGHT = 6094

const BuildImage = React.forwardRef((props, ref) => {
  const {
    toggleImageUploadModal,
    setToggleImageUploadModal,
    mode: designMode,
    showLoader,
    layerCloseHandler
  } = props
  const { canvasRef } = ref
  const classes = useStyles()

  const theme = useTheme()
  const mediaBreakXs = useMediaQuery(theme.breakpoints.down('sm'))

  const [uploadOpenTab, setUploadOpenTab] = useState(0)
  const [mode, setMode] = useState('Add image')

  const [positionSelected, setPositionSelected] = useState('')
  const [selectedPattern, setSelectedPattern] = useState('')
  const [patternSpacing, setPatternSpacing] = useState(0)
  const [isPrintQualityGood, setIsPrintQualityGood] = useState(false)
  const design = useSelector((state) => state.design)
  const designModel = useSelector((state) => state.designModel)
  const dispatch = useDispatch()
  const [dpi, setDPI] = useState(0)

  // const [cropInProgress, setCropInProgress] = useState(false)

  useEffect(() => {
    if (design.selectedAddOn?.file) {
      setMode('Edit image')
      if (design.selectedAddOn?.patternApplied) {
        if (design.selectedAddOn?.patternSpacing) {
          setPatternSpacing(design.selectedAddOn?.patternSpacing / 96)
        } else {
          setPatternSpacing(0)
        }
      }
    } else {
      setMode('Add image')
    }
  }, [design.selectedAddOn])

  const handleClick = (e) => {
    if (
      e.target?.parentNode?.className?.baseVal === 'positionIcon' ||
      e.target.className?.baseVal === 'positionIcon' ||
      e.target.children[0]?.className?.baseVal === 'positionIcon' ||
      e.target.children[0]?.children[0]?.className?.baseVal === 'positionIcon' ||
      e.target.children[0]?.children[0]?.children[0]?.className?.baseVal === 'positionIcon'
    ) {
      return
    } else {
      setPositionSelected('')
    }
  }

  const handlePatternChange = (patternType) => {
    if (patternType != 'none') {
      setSelectedPattern(patternType)
      if (design?.selectedAddOn?.patternApplied)
        dispatch(changePattern(design.selectedAddOn, patternType, patternSpacing * 96))
      else dispatch(changePattern(design.selectedAddOn, patternType, 0))
    } else {
      dispatch(changePattern(design.selectedAddOn, patternType, patternSpacing * 96))
      // dispatch(deleteLayer(design.selectedAddOn.uuid, 'image'))
    }
  }
  const handleSliderChange = (event, newValue) => {
    setPatternSpacing(newValue)
  }
  const handleInputChange = (event) => {
    if (event.target.value >= 0) {
      if (event.target.value <= 1) {
        setPatternSpacing(event.target.value === '' ? '' : Number(event.target.value))
      }
    }
  }

  const applyPatternSpacing = () => {
    dispatch(changePatternSpacing(design.selectedAddOn, patternSpacing * 96))
  }

  const handleBlur = () => {
    if (patternSpacing < 0) {
      setPatternSpacing(0)
    } else if (patternSpacing > 100) {
      setPatternSpacing(100)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (design?.selectedAddOn?.patternApplied) {
      setSelectedPattern(design.selectedAddOn?.patternType)
    } else {
      setSelectedPattern('none')
    }
  }, [design.selectedAddOn])

  const handlePositionChange = (position) => {
    setPositionSelected(position)
    dispatch(updateSelectedObjectPosition(position))
  }

  const handleModalClose = () => {
    setToggleImageUploadModal(false)
  }

  useEffect(() => {
    const checkImageInRecommendedDPI = () => {
      const scaleFactor = 36
      const canvasDiagonal = Math.sqrt(canvasRef.current.width ** 2 + canvasRef.current.height ** 2)
      const imageDiagonal = Math.sqrt(
        design.selectedAddOn.width ** 2 + design.selectedAddOn.height ** 2
      )
      const imageInitialDiagonal = Math.sqrt(
        design.selectedAddOn.initialWidth ** 2 + design.selectedAddOn.initialHeight ** 2
      )
      const widthFactor = canvasDiagonal / scaleFactor
      const widthInUnits = imageDiagonal / widthFactor
      const dpi = imageInitialDiagonal / widthInUnits
      const reccomendedDPI =
        designMode === 'create'
          ? designModel?.productVariants[0]?.dpi
          : designModel?.productLibraryVariants[0]?.dpi
      setDPI(dpi)
      if (Number(dpi.toFixed(0)) < reccomendedDPI) {
        // designModel?.productVariants[0]?.dpi

        setIsPrintQualityGood(false)
      } else {
        setIsPrintQualityGood(true)
      }
    }
    if (design?.selectedAddOn?.file) {
      checkImageInRecommendedDPI()
    }
  }, [
    design?.selectedAddOn?.width,
    design?.selectedAddOn?.height,
    design?.selectedAddOn?.initialWidth,
    design?.selectedAddOn?.initialHeight
  ])

  const handleCrop = (state) => {
    switch (state) {
      case 'none': {
        dispatch(setCropStatus('none'))
        break
      }
      case 'apply': {
        dispatch(setCropStatus('apply'))
        break
      }
      case 'inprogress': {
        dispatch(setCropStatus('inprogress'))
        break
      }
      default: {
        dispatch(setCropStatus('none'))
        break
      }
    }
    // setCropInProgress((prevValue) => !prevValue)
  }
  return (
    <div className={classes.TextPanel} onClick={() => layerCloseHandler()}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.scrollOverflow}>
          {mediaBreakXs && (
            <Typography variant='h3' className={classes.panelHeader}>
              Image
            </Typography>
          )}
          <>
            <div style={{ marginTop: '16px' }}>
              <div className={classes.counterSize}>
                {mode === 'Add image' && !design?.selectedAddOn?.file && (
                  <>
                    <div className={classes.dtoolImage_Block}>
                      <Nodata
                        className={classes.dtoolImage}
                        labelClass={classes.textClass}
                        label='No image added to this layer'
                        dtoolImage
                      />
                    </div>
                  </>
                )}
                {mode === 'Edit image' && design.selectedAddOn?.file && (
                  <>
                    <div className={classes.dtool_Image}>
                      <Image
                        src={design.selectedAddOn?.file}
                        alt='Image'
                        height={73}
                        width={73}
                        objectFit='contain'
                      />
                      <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                        <Typography variant='body1' className={classes.labelForm}>
                          Image quality:{' '}
                          <div
                            style={{
                              color: isPrintQualityGood ? '#16d108' : '#fcb357',
                              fontWeight: 'bold'
                            }}
                          >
                            {isPrintQualityGood ? 'Good' : 'Poor'}
                            {'/' + dpi.toFixed(0) + ' DPI'}
                          </div>
                        </Typography>
                      </div>
                    </div>

                    {/* The crop */}

                    {!design.selectedAddOn.patternApplied && (
                      <>
                        <div style={{ marginBottom: '10px' }}>
                          <Typography variant='body1' className={classes.labelForm}>
                            Modify
                          </Typography>
                          <ButtonGroup
                            size='small'
                            aria-label='small outlined button group'
                            className={classes.btnPosition}
                          >
                            <Button
                              disabled={design?.selectedAddOn?.locked}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCrop('inprogress')
                              }}
                              className={classes.counterIcon}
                              style={{
                                backgroundColor: positionSelected === 'left' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'left'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Crop'}>
                                <div>
                                  <Icon class={'crop'} icon='crop' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                            <Button
                              disabled={
                                design?.selectedAddOn?.locked || design.cropStatus === 'inprogress'
                              }
                              onClick={() => {
                                dispatch(deleteLayer(design.selectedAddOn.uuid, 'image'))
                              }}
                              className={classes.counterIcon}
                              style={{
                                backgroundColor: positionSelected === 'left' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'left'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Delete'}>
                                <div>
                                  <Icon class={'delete'} icon='delete' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                          </ButtonGroup>
                        </div>
                      </>
                    )}

                    {/* message */}
                    {design.cropStatus === 'inprogress' && (
                      <>
                        <Box
                          display='flex'
                          flexDirection={'column'}
                          alignItems='stretch'
                          style={{ background: '#ffe2ca' }}
                          p={1}
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <Box display='flex' p={1}>
                            <Box m={1}>
                              <Icon icon='warning' size={20} />
                            </Box>
                            <Typography variant='h5'>
                              Are you sure you want to crop the image ?
                            </Typography>
                          </Box>

                          <Box
                            style={{
                              // width: '100%',
                              display: 'flex',
                              justifyItems: 'start',
                              alignItems: 'stretch',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCrop('none')
                              }}
                            >
                              Cancel
                            </Button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCrop('apply')
                              }}
                            >
                              Apply
                            </button>
                          </Box>
                        </Box>
                      </>
                    )}

                    {['none', 'apply'].includes(design.cropStatus) &&
                      !design.selectedAddOn?.patternApplied && (
                        <div style={{ marginBottom: '10px' }}>
                          <Typography variant='body1' className={classes.labelForm}>
                            Position
                          </Typography>
                          <ButtonGroup
                            size='small'
                            aria-label='small outlined button group'
                            className={classes.btnPosition}
                          >
                            <Button
                              disabled={design?.selectedAddOn?.locked}
                              onClick={() => handlePositionChange('left')}
                              className={classes.counterIcon}
                              style={{
                                backgroundColor: positionSelected === 'left' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'left'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Left'}>
                                <div>
                                  <Icon class={'positionIcon'} icon='left' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                            <Button
                              className={classes.counterField}
                              disabled={design?.selectedAddOn?.locked}
                              onClick={() => handlePositionChange('horizontal')}
                              style={{
                                backgroundColor:
                                  positionSelected === 'horizontal' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'horizontal'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Horizontal center'}>
                                <div>
                                  <Icon class={'positionIcon'} icon='center' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                            <Button
                              className={classes.counterField}
                              disabled={design?.selectedAddOn?.locked}
                              onClick={() => handlePositionChange('right')}
                              style={{
                                backgroundColor: positionSelected === 'right' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'right'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Right'}>
                                <div>
                                  <Icon class={'positionIcon'} icon='right' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                            <Button
                              className={classes.counterField}
                              disabled={design?.selectedAddOn?.locked}
                              onClick={() => handlePositionChange('top')}
                              style={{
                                backgroundColor: positionSelected === 'top' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'top'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Top'}>
                                <div>
                                  <Icon class={'positionIcon'} icon='top' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                            <Button
                              className={classes.counterField}
                              disabled={design?.selectedAddOn?.locked}
                              onClick={() => handlePositionChange('vertical')}
                              style={{
                                backgroundColor:
                                  positionSelected === 'vertical' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'vertical'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Vertical center'}>
                                <div>
                                  <Icon class={'positionIcon'} icon='middle' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                            <Button
                              className={classes.counterIcon}
                              disabled={design?.selectedAddOn?.locked}
                              onClick={() => handlePositionChange('bottom')}
                              style={{
                                backgroundColor:
                                  positionSelected === 'bottom' ? '#fff8f0' : 'white',
                                border:
                                  positionSelected === 'bottom'
                                    ? '1px solid #ffce92'
                                    : '1px solid #e8e8e8'
                              }}
                            >
                              <TooltipBootstrap title={'Bottom'}>
                                <div>
                                  <Icon class={'positionIcon'} icon='bottom' size={16} />
                                </div>
                              </TooltipBootstrap>
                            </Button>
                          </ButtonGroup>{' '}
                        </div>
                      )}

                    {['none', 'apply'].includes(design.cropStatus) &&
                      !design?.selectedAddOn?.locked && <></>}

                    {['none', 'apply'].includes(design.cropStatus) && (
                      <>
                        <Typography variant='body1' className={classes.labelForm}>
                          Pattern type
                        </Typography>
                        <div className={classes.patternTypeContainer}>
                          <TooltipBootstrap title={'Horizontal'}>
                            <div
                              className={classes.patternTypeBtn}
                              style={{
                                borderColor:
                                  selectedPattern === 'Horizontal' ? '#ffce92' : '#e8e8e8'
                              }}
                              onClick={() =>
                                !design?.selectedAddOn?.locked
                                  ? handlePatternChange('Horizontal')
                                  : ''
                              }
                            >
                              <Icon icon={'pattern4'} size={30} />
                            </div>
                          </TooltipBootstrap>
                          <TooltipBootstrap title={'Vertical'}>
                            <div
                              className={classes.patternTypeBtn}
                              style={{
                                borderColor: selectedPattern === 'Vertical' ? '#ffce92' : '#e8e8e8'
                              }}
                              onClick={() =>
                                !design?.selectedAddOn?.locked
                                  ? handlePatternChange('Vertical')
                                  : ''
                              }
                            >
                              <Icon icon={'pattern5'} size={30} />
                            </div>
                          </TooltipBootstrap>
                          <TooltipBootstrap title={'Half drop'}>
                            <div
                              className={classes.patternTypeBtn}
                              style={{
                                borderColor: selectedPattern === 'HalfDrop' ? '#ffce92' : '#e8e8e8'
                              }}
                              onClick={() =>
                                !design?.selectedAddOn?.locked
                                  ? handlePatternChange('HalfDrop')
                                  : ''
                              }
                            >
                              <Icon icon={'halfdrop'} size={30} />
                            </div>
                          </TooltipBootstrap>
                          <TooltipBootstrap title={'Brick'}>
                            <div
                              className={classes.patternTypeBtn}
                              style={{
                                borderColor: selectedPattern === 'Brick' ? '#ffce92' : '#e8e8e8'
                              }}
                              onClick={() =>
                                !design?.selectedAddOn?.locked ? handlePatternChange('Brick') : ''
                              }
                            >
                              <Icon icon={'pattern7'} size={26} />
                            </div>
                          </TooltipBootstrap>
                          <TooltipBootstrap title={'Mirror image'}>
                            <div
                              className={classes.patternTypeBtn}
                              style={{
                                borderColor:
                                  selectedPattern === 'mirrorImage' ? '#ffce92' : '#e8e8e8'
                              }}
                              onClick={() =>
                                !design?.selectedAddOn?.locked
                                  ? handlePatternChange('mirrorImage')
                                  : ''
                              }
                            >
                              <Icon icon={'alternate'} size={23} />
                            </div>
                          </TooltipBootstrap>
                          <TooltipBootstrap title={'Block'}>
                            <div
                              className={classes.patternTypeBtn}
                              style={{
                                borderColor: selectedPattern === 'Block' ? '#ffce92' : '#e8e8e8'
                              }}
                              onClick={() =>
                                !design?.selectedAddOn?.locked ? handlePatternChange('Block') : ''
                              }
                            >
                              <Icon icon={'pattern6'} size={23} />
                            </div>
                          </TooltipBootstrap>
                        </div>
                      </>
                    )}
                    {['none', 'apply'].includes(design.cropStatus) &&
                      design.selectedAddOn.patternApplied && (
                        <div className={classes.btnClose}>
                          <TooltipBootstrap title={'Clear'}>
                            <div
                              className={classes.patternTypeBtn}
                              style={{
                                // borderColor: selectedPattern === 'none' ? 'red' : 'grey',
                                textAlign: 'center'
                              }}
                              onClick={() =>
                                !design?.selectedAddOn?.locked ? handlePatternChange('none') : ''
                              }
                            >
                              <Icon icon={'pop-close'} size={15} color='#787878' />
                            </div>
                          </TooltipBootstrap>
                        </div>
                      )}
                    {['none', 'apply'].includes(design.cropStatus) &&
                      design.selectedAddOn?.patternApplied && (
                        <>
                          <Typography variant='body1' className={classes.labelForm}>
                            Pattern spacing
                          </Typography>
                          <Box className={classes.patternSlider}>
                            <Slider
                              value={typeof patternSpacing === 'number' ? patternSpacing : 0}
                              min={0}
                              max={1}
                              step={0.05}
                              onChange={handleSliderChange}
                              onChangeCommitted={applyPatternSpacing}
                              aria-labelledby='input-slider'
                              color='secondary'
                              disabled={design?.selectedAddOn?.locked}
                            />
                            <Input
                              disabled={design?.selectedAddOn?.locked}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>inch</InputAdornment>
                                )
                              }}
                              error={patternSpacing > 1 || patternSpacing < 0 ? true : false}
                              helperText='Pattern spacing should be between 0 - 3 inches'
                              value={patternSpacing}
                              type={'number'}
                              size='small'
                              onChange={handleInputChange}
                              onKeyUp={applyPatternSpacing}
                              onBlur={handleBlur}
                              label='Inches'
                              // variant='filled'
                              inputProps={{
                                inputProps: {
                                  step: 0.1,
                                  min: 0,
                                  max: 1,
                                  type: 'number',
                                  'aria-labelledby': 'input-slider'
                                }
                              }}
                              style={{
                                width: '4rem',
                                marginLeft: '11px',
                                padding: '2px',
                                borderRadius: '15px',
                                backgroundColor: 'none',
                                border: '1px solid #e2e2e1',
                                overflow: 'hidden'
                              }}
                            />
                          </Box>
                        </>
                      )}
                  </>
                )}
              </div>
            </div>
          </>

          <div className={classes.btnTextWrapper}>
            {mode === 'Add image' && !design.selectedAddOn?.file && (
              <>
                <div style={{ width: '100%' }} className={classes.add_dtool_Btn}>
                  <Button
                    type='submit'
                    variant='outlined'
                    fullWidth
                    onClick={() => {
                      setToggleImageUploadModal(true)
                      setUploadOpenTab(0)
                    }}
                    startIcon={<Icon icon='upload-computer' size={18} />}
                    className={classes.addComp}
                  >
                    Add from computer
                  </Button>

                  <Button
                    type='submit'
                    variant='outlined'
                    fullWidth
                    startIcon={<Icon icon='library-icon' size={18} />}
                    className={classes.libraryBtn}
                    onClick={() => {
                      setToggleImageUploadModal(true)
                      setUploadOpenTab(1)
                    }}
                  >
                    Select from library
                  </Button>
                </div>
              </>
            )}
            {mode === 'Edit image' &&
              design.selectedAddOn?.file &&
              design.cropStatus !== 'inprogress' && (
                <div className={classes.dtoolImageAdd}>
                  <Button
                    type='submit'
                    variant='outlined'
                    startIcon={<AddIcon fontSize='small' color='#babac9' />}
                    onClick={() => {
                      setMode('Add image')
                      dispatch(updateSelectedAddOn({}))
                      // setToggleImageUploadModal(true)
                      // setUploadOpenTab(0)
                    }}
                  >
                    Add image
                  </Button>
                </div>
              )}
          </div>
        </Grid>
        <Modal open={toggleImageUploadModal} handleClose={handleModalClose} title='Upload image'>
          <UploadImage
            openTab={uploadOpenTab}
            setUploadOpenTab={setUploadOpenTab}
            setModalClose={handleModalClose}
            showLoader={showLoader}
          />
        </Modal>

        {/* <!--layers--> */}

        {/* <Layers /> */}

        {/* <!--layers--> */}
      </Grid>
    </div>
  )
})
export default React.memo(BuildImage)
