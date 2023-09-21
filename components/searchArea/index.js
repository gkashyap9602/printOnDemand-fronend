import React, { useEffect, useState } from 'react'
import { InputBase } from '@material-ui/core'
import { NotificationManager } from 'react-notifications'
import Icon from 'icomoons/Icon'
import style from './style'
// import { DebounceInput } from 'react-debounce-input'
import { useDebounce } from 'use-debounce'

const useStyles = style

const SearchArea = ({ placeholder, className, handleSearch, searchValue = undefined }) => {
  const classes = useStyles()
  const [value, setvalue] = useState(null)
  const [debouncedText] = useDebounce(value, 1000)
  const [isType, setisType] = useState(false)

  useEffect(() => {
    setvalue(searchValue)
    return () => {
      setvalue('')
    }
  }, [searchValue])

  useEffect(() => {
    if (debouncedText !== null || undefined) {
      isType && onSearch()
    }
  }, [debouncedText])

  const onSearch = () => {
    if (navigator && navigator.onLine) {
      setvalue(debouncedText)
      handleSearch({ target: { value: debouncedText } })
    } else {
      debouncedText !== '' && NotificationManager.error('No active internet connection.', '', 10000)
    }
  }

  return (
    <div className={`${classes.search} ${className}`}>
      <div className={classes.searchIcon}>
        <Icon icon='search-icon' size={16} />
      </div>
      <InputBase
        placeholder={placeholder}
        value={value}
        classes={{
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => {
          setvalue(e.target.value)
          setisType(true)
        }}
      />
    </div>
  )
}

export default SearchArea
