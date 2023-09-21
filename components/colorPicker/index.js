import React from 'react'
import { ChromePicker } from 'react-color'
import Icon from 'icomoons/Icon'

import style from './style'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

const useStyles = style

const ColorPicker = ({ color, handleColorChange, open, locked = false, setOpen }) => {
  const classes = useStyles()

  return (
    <div className={classes.colorPicker}>
      {open ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
          <TooltipBootstrap title={'Close'} placement='top'>
            <div className={classes.pickerClose}>
              <Icon icon='close-red-light-icon' size={25} onClick={() => setOpen(false)} />
            </div>
          </TooltipBootstrap>
          <ChromePicker color={color} onChangeComplete={!locked ? handleColorChange : () => {}} />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ColorPicker
