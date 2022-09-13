import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import Image from 'next/image'
import Icon from 'icomoons/Icon'
import style from './style'
import { MoreActions } from 'components/formElements'
import { useDispatch, useSelector } from 'react-redux'
import {
  lockLayer,
  deleteLayer,
  unlockLayer,
  changeSelectedAddOn
} from 'redux/actions/designToolActions'

const useStyles = style

const options = [
  { id: 1, status: 1, label: 'Lock', icon: 'password' },
  // { id: 2, label: 'Copy', icon: 'copy' },
  { id: 2, status: 2, label: 'Delete', icon: 'delete' }
]

const unlock = [{ id: 3, status: 3, label: 'Unlock', icon: 'unlock' }]
const LayerItem = ({ type, title, image, uuid, locked, index, isDragging }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const design = useSelector((state) => state.design)
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    if (isDragging) {
      // Push to selectedAddOn
      dispatch(changeSelectedAddOn(uuid))
    }
  }, [isDragging, isSelected])

  useEffect(() => {
    if (design.selectedAddOn.uuid === uuid) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [design.selectedAddOn])

  const handleOnClick = () => {
    setIsSelected(true)

    dispatch(changeSelectedAddOn(uuid))
  }
  const handleAction = (status, details) => {
    const { uuid: uuid2, index: index2, type: type2 } = details

    switch (status) {
      case 1: {
        dispatch(lockLayer(uuid2, index2))
        break
      }
      case 2: {
        dispatch(deleteLayer(uuid2, type2))
        break
      }
      case 3: {
        dispatch(unlockLayer(uuid2, index2))
        break
      }
    }
  }

  return (
    <div
      className={classes.boxItem}
      style={{
        cursor: locked ? 'not-allowed' : 'grab',
        backgroundColor: isSelected ? '#fff8f0' : 'white',
        border: isSelected ? '1px solid #ffce92' : '1px solid #e8e8e8'
      }}
      onClick={handleOnClick}
    >
      <Box display='flex' flexGrow={1} alignItems='center'>
        <div className={classes.layer_Icon}>
          <Icon icon='dotted' size={14} />
        </div>
        <div className={classes.layer_Icon}>
          {type === 'text' && (
            <div className={classes.Layer_Text}>
              <Icon icon='textIcon' size={18} />
            </div>
          )}
          {type === 'image' && (
            <Image
              src={image}
              alt='Layers'
              width={31}
              height={31}
              objectFit='cover'
              className={classes.roundedFill}
            />
          )}
          {type === 'color' && <div className={classes.bgColor} />}
        </div>
        <div>{title}</div>
      </Box>
      <Box justifyContent='flex-end' display='flex'>
        {locked && (
          <div className={classes.lockFlex}>
            <Icon icon='password' size={18} color='#8a8a9e' />
          </div>
        )}
        <MoreActions
          options={!locked ? options : unlock}
          rawDteails={{ uuid, index, type }}
          isActionChange={handleAction}
          actionOnToggle={() => {
            dispatch(changeSelectedAddOn(uuid))
          }}
        />
      </Box>
    </div>
  )
}
export default React.memo(LayerItem)
