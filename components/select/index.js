import React from 'react'
import { ListItemIcon, MenuItem, TextField, Typography } from '@material-ui/core'
// import Icon from '../../icomoons/Icon'

import Icon from 'icomoons/Icon'
import style from './style'

const useStyles = style

const Select = ({
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
  selectedValue = '',
  optionIcon,
  isDisabled,
  isCategoryUpdated = () => {},
  isRendered = false,
  ...props
}) => {
  const classes = useStyles()

  const { touched } = meta || {}

  const [fieldItem, setFieldItem] = React.useState('')

  React.useEffect(() => {
    setFieldItem(selectedValue)
  }, [selectedValue, isRendered])

  const handleChange = (e) => {
    if (input.name === 'category') {
      isCategoryUpdated()
    }
    setFieldItem(e.target.value)
    input.onChange(e.target.value)
  }

  return (
    <div className={classes.rootInput}>
      <Typography variant='body1' className={classes.labelForm}>
        {label}
      </Typography>
      <div>
        <TextField
          {...input}
          select
          disabled={isDisabled}
          fullWidth
          variant={variant}
          id={id}
          label={fieldItem === undefined || fieldItem === '' ? placeholder : ''}
          value={fieldItem}
          onChange={handleChange}
          className={classes.SelectShrink}
          InputLabelProps={{ shrink: false }}
          // IconComponent={<Icon icon='success' size={20} />}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
              },
              getContentAnchorEl: null
            }
          }}
          inputProps={{ tabIndex }}
          helperText={touched && helperText}
          {...field}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {optionIcon && (
                <ListItemIcon className={classes.optionIcon}>
                  <Icon icon={option.icon} size={18} color='#8a8a9e' />
                </ListItemIcon>
              )}
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  )
}
export default Select
