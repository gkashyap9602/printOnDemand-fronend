import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ColorPicker from 'components/colorPicker'
import style from './style'
import { useDispatch, useSelector } from 'react-redux'
import { changeAllColor, changeViewColor, toggleApplyToAll } from 'redux/actions/designToolActions'
const useStyles = style

const BuildBackground = ({
  fabricViewSelectedColor,
  setFabricViewSelectedColor,
  handleCollapse,
  layerCloseHandler
}) => {
  const classes = useStyles()

  const theme = useTheme()
  const mediaBreakXs = useMediaQuery(theme.breakpoints.down('sm'))

  const [showPalatte, setShowPalatte] = useState(false)
  const showPalatteHandler = () => {
    setShowPalatte(!showPalatte)
    handleCollapse()
  }

  const design = useSelector((state) => state.design)
  const designModel = useSelector((state) => state.designModel)
  const dispatch = useDispatch()

  const editViewColor = useCallback(() => {
    dispatch(changeViewColor(design.fabricViewSelected, fabricViewSelectedColor))
  }, [design.fabricViewSelected, fabricViewSelectedColor])

  const editEntireColor = useCallback(() => {
    dispatch(changeAllColor(fabricViewSelectedColor))
  }, [fabricViewSelectedColor])
  const handleApplyAllToggle = () => {
    dispatch(toggleApplyToAll())
  }

  useEffect(() => {
    if (design.fabricEntireProduct.applyToAll) {
      editEntireColor()
    } else {
      editViewColor()
    }
  }, [fabricViewSelectedColor, design.fabricEntireProduct.applyToAll])

  return (
    <div className={classes.BgPanel} onClick={() => layerCloseHandler()}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.scrollOverflow}>
          <div className={classes.bgPadding}>
            {mediaBreakXs && (
              <Typography variant='h3' className={classes.panelHeader}>
                Background color
              </Typography>
            )}
          </div>

          <div className={classes.bgPadding}>
            <Box display='flex' flexWrap='wrap' mt={2} className={classes.colorCodes}>
              <Box className={classes.customDefault} mr={1} mb={1} onClick={showPalatteHandler}>
                <span
                  className={classes.colorHexCode}
                  style={{
                    background: fabricViewSelectedColor
                  }}
                ></span>
                Custom color
              </Box>
            </Box>
            <ColorPicker
              color={fabricViewSelectedColor}
              handleColorChange={(color) => setFabricViewSelectedColor(color.hex)}
              open={showPalatte}
              setOpen={setShowPalatte}
            />

            {/* <!--checkbox--> */}

            <div className={classes.bgCheckBox}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='checkedC'
                    checkedIcon={<CheckIcon fontSize='medium' />}
                    icon={<RadioButtonUncheckedIcon color='primary' />}
                    checked={design.fabricEntireProduct.applyToAll}
                    onChange={() => handleApplyAllToggle()}
                  />
                }
                label={<div className={classes.checkedLabel}>Apply color to entire product</div>}
              />
            </div>
            {/* <!--checkbox--> */}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default React.memo(BuildBackground)
