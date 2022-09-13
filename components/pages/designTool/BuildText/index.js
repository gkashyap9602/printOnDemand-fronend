import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import Icon from 'icomoons/Icon'
import AddIcon from '@material-ui/icons/Add'
import ColorPicker from 'components/colorPicker'
import { useDispatch, useSelector } from 'react-redux'
import { addText, deleteLayer } from 'redux/actions/designToolActions'
import { v4 as uuidv4 } from 'uuid'
import { updateSelectedAddOn, updateSelectedObjectPosition } from 'redux/actions/designToolActions'
import style from './style'
import { TooltipBootstrap } from 'components/bootstrapTooltip'
const useStyles = style

const BuildText = ({
  text,
  setText,
  textColor,
  setTextColor,
  textFont,
  setTextFont,
  handleCollapse,
  fontSize,
  setFontSize,
  layerCloseHandler
}) => {
  const options = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Myriad Pro', label: 'Myriad Pro' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Courier', label: 'Courier' },
    { value: 'Comic Sans MS', label: 'Comic Sans MS' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Monaco', label: 'Monaco' },
    { value: 'Optima', label: 'Optima' },
    { value: '"Sans serif"', label: 'Sans Serif' }
  ]

  const classes = useStyles()
  const [showPalatte, setShowPalatte] = useState(false)

  const [positionSelected, setPositionSelected] = useState('')

  const theme = useTheme()
  const mediaBreakXs = useMediaQuery(theme.breakpoints.down('sm'))

  const [mode, setMode] = useState('Add text')
  const showPalatteHandler = () => {
    setShowPalatte(!showPalatte)
    handleCollapse()
  }

  const design = useSelector((state) => state.design)
  const dispatch = useDispatch()

  const handleAddText = useCallback(() => {
    dispatch(updateSelectedAddOn({}))
    setMode('Add text')
  }, [])

  const handlePositionChange = (position) => {
    setPositionSelected(position)
    dispatch(updateSelectedObjectPosition(position))
  }

  const handleApplyToCanvas = useCallback(() => {
    if (text != '' && text.trim().length > 0 && mode === 'Add text') {
      const textData = {
        uuid: uuidv4(),
        text,
        textColor,
        fontSize,
        textFont,
        left: '',
        top: '',
        angle: 90
      }
      dispatch(addText(textData))
      setMode('Edit text')
    }
  }, [text, textFont, fontSize, textColor])

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
  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (
      Object.keys(design.selectedAddOn).includes('text') &&
      Object.keys(design.selectedAddOn).length > 0
    ) {
      setMode('Edit text')
    } else {
      setMode('Add text')
    }
  }, [design.selectedAddOn])

  useEffect(() => {
    if (
      mode === 'Edit text' &&
      Object.keys(design.selectedAddOn).includes('text') &&
      Object.keys(design.selectedAddOn).length !== 0
    ) {
      dispatch(
        updateSelectedAddOn({ ...design.selectedAddOn, text, textFont, fontSize, textColor })
      )
    }
  }, [text, textColor, textFont, fontSize])

  useEffect(() => {
    if (
      mode === 'Edit text' &&
      Object.keys(design.selectedAddOn).includes('text') &&
      Object.keys(design.selectedAddOn).length !== 0
    ) {
      //Populated input field with selectedAddOn value

      if (Object.keys(design.selectedAddOn).length !== 0) {
        setText(design.selectedAddOn.text)
        setTextColor(design.selectedAddOn.textColor)
        setTextFont(design.selectedAddOn.textFont)
        setFontSize(design.selectedAddOn.fontSize)
      }
    }
    if (mode === 'Add text' && Object.keys(design.selectedAddOn).length === 0) {
      //Reset inputs on addition
      setText('')
      setTextColor('#000000')
      setTextFont('Arial')
      setFontSize(35)
    }
    // If coming from image to text
    if (mode === 'Add text' && !Object.keys(design.selectedAddOn).includes('text')) {
      setText('')
      setTextColor('#000000')
      setTextFont('Arial')
      setFontSize(35)
    }
  }, [mode, design.selectedAddOn])

  const handleChange = (e) => {
    setTextFont(e.target.value)
    layerCloseHandler()
  }

  const handleIncrement = () => {
    setFontSize((prevSize) => prevSize + 1)
  }
  const handleDecrement = () => {
    setFontSize((prevSize) => {
      if (prevSize > 1) return prevSize - 1
      else return prevSize
    })
  }

  useEffect(() => {
    if (design.selectedAddOn?.text?.trim() === '' && mode === 'Edit text') {
      dispatch(deleteLayer(design.selectedAddOn.uuid, 'text'))
      setMode('Add text')
    }
  }, [design.selectedAddOn, mode])

  const handleTextEnter = useCallback(
    (e) => {
      setText(e.target.value)
    },
    [text, mode]
  )
  const handleKeyPress = useCallback(
    (e) => {
      if (text.trim() === '') {
        if (e.key === ' ') {
          e.preventDefault()
        }
      }
    },
    [text, design.selectedAddOn]
  )
  return (
    <div className={classes.TextPanel} onClick={() => layerCloseHandler()}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.scrollOverflow}>
          {mediaBreakXs && (
            <Typography
              variant='h3'
              className={classes.panelHeader}
              style={{ marginBottom: '16px' }}
            >
              {mode === 'Add text' ? 'Text' : 'Edit text'}
            </Typography>
          )}

          <>
            <div>
              <TextField
                variant='outlined'
                fullWidth
                id='text-content'
                name='text'
                placeholder='Your text content'
                type={'text'}
                disabled={design?.selectedAddOn?.locked}
                value={text}
                onKeyPress={handleKeyPress}
                onChange={handleTextEnter}
                InputLabelProps={{
                  shrink: false
                }}
                style={{ marginBottom: 16 }}
              />

              <TextField
                id='outlined-select-font'
                select
                fullWidth
                value={textFont}
                onChange={handleChange}
                disabled={design?.selectedAddOn?.locked}
                className={classes.SelectShrink}
                label={textFont === '' ? 'Font' : ''}
                InputLabelProps={{ shrink: false }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                variant='outlined'
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={{ fontFamily: option.value }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <div className={classes.counterSize}>
                <Typography
                  variant='body1'
                  className={classes.labelForm}
                  style={{ width: '108px' }}
                >
                  Font size
                </Typography>

                <ButtonGroup size='small' aria-label='small outlined button group'>
                  <Button
                    disabled={design?.selectedAddOn?.locked}
                    onClick={handleIncrement}
                    className={classes.counterIcon}
                  >
                    +
                  </Button>
                  <TextField
                    style={{
                      borderRadius: '2px',
                      width: '45%',
                      textAlign: 'center'
                    }}
                    value={fontSize}
                    className={classes.fontSizeTextBox}
                    hiddenLabel
                    placeholder='Font size'
                    variant='outlined'
                    type='number'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => setFontSize(e.target.value)}
                  />
                  <Button
                    disabled={design?.selectedAddOn?.locked}
                    onClick={handleDecrement}
                    className={classes.counterIcon}
                  >
                    -
                  </Button>
                </ButtonGroup>
              </div>

              <Box display='flex' alignItems='baseline' className={classes.colorCodes}>
                <div className={classes.colorTextItem}>
                  <Typography variant='body1' className={classes.labelForm}>
                    Font color
                  </Typography>
                </div>

                <Box className={classes.customDefault} mr={1} mb={1} onClick={showPalatteHandler}>
                  <span
                    className={classes.colorHexCode}
                    style={{
                      background: textColor
                    }}
                  ></span>
                  Custom color
                </Box>
              </Box>

              <ClickAwayListener onClickAway={() => setShowPalatte(false)}>
                <ColorPicker
                  color={textColor}
                  handleColorChange={(color) => setTextColor(color.hex)}
                  open={showPalatte}
                  locked={design?.selectedAddOn?.locked}
                  setOpen={setShowPalatte}
                />
              </ClickAwayListener>

              {mode === 'Edit text' && (
                <>
                  <Box display='flex' flexWrap='wrap' mt={2}>
                    <Typography
                      variant='body1'
                      className={classes.labelForm}
                      style={{ width: '100%' }}
                    >
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
                            positionSelected === 'left' ? '1px solid #ffce92' : '1px solid #e8e8e8'
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
                          backgroundColor: positionSelected === 'horizontal' ? '#fff8f0' : 'white',
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
                            positionSelected === 'right' ? '1px solid #ffce92' : '1px solid #e8e8e8'
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
                            positionSelected === 'top' ? '1px solid #ffce92' : '1px solid #e8e8e8'
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
                          backgroundColor: positionSelected === 'vertical' ? '#fff8f0' : 'white',
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
                          backgroundColor: positionSelected === 'bottom' ? '#fff8f0' : 'white',
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
                    </ButtonGroup>
                  </Box>
                </>
              )}
            </div>
          </>

          <div className={classes.btnTextWrapper}>
            {mode === 'Add text' && (
              <>
                <Box mr={2} className={classes.rootCancel}>
                  <Button
                    type='submit'
                    variant='outlined'
                    className={classes.btnApplyCancel}
                    onClick={() => {
                      setMode('Add text')
                      setText('')
                      setTextColor('#000000')
                      setTextFont('Arial')
                      setFontSize(35)
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box className={classes.btnApplyCanvas}>
                  <Button
                    type='submit'
                    variant='contained'
                    startIcon={<AddIcon fontSize='small' color='#babac9' />}
                    onClick={() => {
                      handleApplyToCanvas()
                    }}
                    disabled={text?.length === 0 || text.trim().length === 0}
                  >
                    Apply to canvas
                  </Button>
                </Box>
              </>
            )}
            {mode === 'Edit text' && (
              <Box>
                <Button
                  type='submit'
                  variant='outlined'
                  fullWidth
                  startIcon={<AddIcon fontSize='small' color='#babac9' />}
                  onClick={() => {
                    handleAddText()
                  }}
                >
                  Add new text
                </Button>
              </Box>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default React.memo(BuildText)
