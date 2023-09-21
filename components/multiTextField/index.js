import { Typography, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

import style from './style'

/**
 * TextField Custom component
 * @returns
 */
function MultiTextInput({
  // meta: { touched },
  input,
  label,
  name,
  placeholder,
  type = 'multiText',
  id,
  helperText = '',
  tooltip = false,
  iconProps = {
    icon: 'user',
    size: 20,
    color: '#babac9'
  },
  isDisabled = false,
  className = null,
  tabIndex
}) {
  const useStyles = style
  const classes = useStyles()

  return (
    <div className={classes.rootInput}>
      <Typography variant='body1' className={classes.labelForm}>
        {label}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={8}
        className={classes.multiTextField}
        variant='outlined'
        placeholder={placeholder}
        disabled={isDisabled}
        id={id}
        {...input}
        //  error={showError}
        //   helperText={touched && helperText}
        InputLabelProps={{
          shrink: false
        }}
        // {...props}
        // {...field}
      />
    </div>
  )
}

//Prop Types
MultiTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  helperText: PropTypes.string,
  iconProps: PropTypes.objectOf().isRequired
}

//export
export default MultiTextInput
