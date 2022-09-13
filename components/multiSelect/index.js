import React from 'react'
import { Chip, MenuItem, Select, Typography } from '@material-ui/core'
// import Icon from '../../icomoons/Icon'

import Icon from 'icomoons/Icon'
import style from './style'

const useStyles = style

const MultiSelect = ({
  type,
  options = [],
  id,
  variant = 'outlined',
  label,
  required = false,
  placeholder,
  tabIndex,
  ErrorFieldClasses,
  helperText = '',
  meta,
  field,
  input,
  selectedMultipleValue = [],
  optionIcon,
  isDisabled = false,
  isCategoryChanged = false,
  ...props
}) => {
  const classes = useStyles()

  const { error, touched } = meta || {}

  const [fieldItem, setFieldItem] = React.useState([])
  React.useEffect(() => {
    setFieldItem(selectedMultipleValue)
  }, [selectedMultipleValue.length !== 0])

  React.useEffect(() => {
    if (selectedMultipleValue.length === 0) {
      setFieldItem([])
    }
  }, [isCategoryChanged])

  const handleChange = (e) => {
    const {
      target: { value }
    } = e
    setFieldItem(typeof value === 'string' ? value.split('') : value)
    input.onChange(typeof value === 'string' ? value.split('') : value)
  }

  const ArrowIcon = () => {
    return (
      <>
        <div className={classes.selectDropArrow}>
          <Icon icon='drop-down' size={18} color='#697880' />
        </div>
      </>
    )
  }

  const removeSelect = (id) => {
    const newList = fieldItem.filter((val) => val !== id)
    input.onChange(newList)
    setFieldItem(newList)
  }

  return (
    <div className={classes.rootInput}>
      <Typography variant='body1' className={classes.labelForm}>
        {label}
      </Typography>
      <div className={classes.multiSelectDrop}>
        <Select
          disabled={isDisabled}
          {...input}
          fullWidth
          multiple
          variant={variant}
          id={id}
          label={fieldItem === undefined || fieldItem === '' ? placeholder : ''}
          value={fieldItem}
          onChange={handleChange}
          className={classes.SelectShrink}
          InputLabelProps={{ shrink: false }}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
              multiple: true
            },
            IconComponent: () => <ArrowIcon />
          }}
          inputProps={{ tabIndex }}
          helperText={touched && helperText}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          }}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value, index) => {
                return (
                  <Chip
                    key={value}
                    label={options.filter((item) => item.value === value)[0]?.label}
                    onDelete={() => !isDisabled && removeSelect(value)}
                    onMouseDown={(event) => {
                      event.stopPropagation()
                    }}
                  />
                )
              })}
            </div>
          )}
          {...field}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
export default MultiSelect
