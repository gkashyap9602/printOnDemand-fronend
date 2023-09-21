import React from 'react'
import { Checkbox } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

/**
 * Custom checkbox Component
 * @returns
 */
function CheckBoxInput(props) {
  const { isChecked = false } = props

  const [isCheck, setIsCheck] = React.useState(false)
  React.useEffect(() => {
    setIsCheck(isChecked)
  }, [isChecked])

  const handleChange = (e) => {
    setIsCheck(e.target.checked)
    props.input.onChange(e.target.checked)
  }

  return (
    <Checkbox
      {...props.input}
      checkedIcon={<CheckIcon fontSize='medium' />}
      icon={<RadioButtonUncheckedIcon color='primary' />}
      {...props}
      checked={isCheck}
      onChange={handleChange}
    />
  )
}

export default CheckBoxInput
