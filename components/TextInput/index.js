import { Typography, TextField, InputAdornment, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import Icon from 'icomoons/Icon'
import style from './style'
import ToolTip from '../tooltip'
import { useEffect, useRef, useState } from 'react'
import { checkIfEmpty } from 'utils/helpers'

/**
 * TextField Custom component
 * @returns
 */
function TextInput({
  meta: { touched },
  input,
  label,
  name,
  placeholder,
  step = null,
  type = 'text',
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
  tabIndex,
  multiline = false,
  handleOnClick = () => {},
  onChange = () => {},
  rows = 1
}) {
  const useStyles = style
  const classes = useStyles()
  const [passwordArray, setpasswordArray] = useState([])
  const value = useRef('')
  const [active, setactive] = useState(false)
  const [icon, seticon] = useState(iconProps.icon)
  const [typ, settyp] = useState(type)
  const [symbolsArr] = useState(['e', 'E', '+', '-'])
  const VALIDATE_ARRAY = [
    {
      regex: /^[a-zA-Z0-9!@#$%^&*]{7,}.$/,
      key: 'eightChar'
    },
    {
      regex: /^(?=.*[A-Z]).*$/,
      key: 'uppercase'
    },
    {
      regex: /^(?=.*[a-z])/,
      key: 'lowercase'
    },
    {
      regex: /^(?=.*[0-9])/,
      key: 'number'
    },
    {
      regex: /^(?=.*[!@#$%^&*])/,
      key: 'specialChar'
    }
  ]

  const handleOnChange = async (event) => {
    value.current = event.target.value
    if (type === 'password') {
      checkValidPassword()
    }
    if (label === 'Contact phone') {
      value.current =
        value.current[0] === '+'
          ? `+${value.current.replace(/[^0-9]/g, '')}`
          : value.current.replace(/[^0-9]/g, '')
    }
    onChange(value.current)
    input.onChange(value.current)
  }
  /**
   * checkValidPassword
   */
  const checkValidPassword = () => {
    VALIDATE_ARRAY.map((val) => {
      if (val.regex.test(value.current) && !passwordArray.includes(val.key)) {
        setpasswordArray([...passwordArray, val.key])
      }
      if (!val.regex.test(value.current) && passwordArray.includes(val.key)) {
        setpasswordArray(passwordArray.filter((item) => item !== val.key))
      }
    })
    setactive(true)

    if (checkIfEmpty(value.current)) {
      setpasswordArray([])
      setactive(false)
    }
  }

  useEffect(() => {
    icon === 'eye-show' && settyp('text')
    icon === 'eye-hide' && settyp('password')
  }, [icon])
  return (
    <div className={id === 'hiddenId' ? classes?.hide : classes.rootInput}>
      <Typography variant='body1' className={id === 'hiddenId' ? classes.hide : classes.labelForm}>
        {label}
      </Typography>

      <ToolTip tooltip={tooltip} passwordArray={passwordArray} active={active}></ToolTip>
      <TextField
        onMouseOutCapture={(e) => {
          setactive(false)
        }}
        onMouseEnter={(e) => {
          setactive(true)
        }}
        multiline={multiline}
        rows={rows}
        disabled={isDisabled}
        {...input}
        variant='outlined'
        fullWidth
        onChange={handleOnChange}
        id={name}
        placeholder={placeholder}
        value={(type === 'password' && value.current) || (input && input.value)}
        type={typ}
        onKeyDown={(e) => type === 'number' && symbolsArr.includes(e.key) && e.preventDefault()}
        onInput={(e) => {
          if (`${e.target.value}`.length > 4 && type === 'number') {
            e.target.value = e.target.value.slice(0, 30)
          }
        }}
        onClick={() => handleOnClick(name, value)}
        helperText={touched && helperText}
        InputLabelProps={{
          shrink: false
        }}
        FormHelperTextProps={{
          className: classes.helperText
        }}
        inputProps={{
          tabIndex,
          className: className,
          step: step,
          maxLength: multiline
            ? 600
            : type === 'password'
            ? 20
            : label === 'Production time' || label === 'Company email' || label === 'Email'
            ? 50
            : 30
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                disabled={type !== 'password'}
                onClick={() => {
                  type === 'password' &&
                    (icon === 'eye-hide' ? seticon('eye-show') : seticon('eye-hide'))
                }}
                className={type === 'password' && classes.pswdIconButton}
              >
                <Icon
                  icon={type === 'password' ? icon : iconProps.icon}
                  size={iconProps.size}
                  color={iconProps.color}
                />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

//Prop Types
TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  helperText: PropTypes.string,
  iconProps: PropTypes.objectOf().isRequired
}

//export
export default TextInput
