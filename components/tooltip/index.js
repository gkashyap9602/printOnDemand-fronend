/* eslint-disable require-jsdoc */
import PasswordValidation from 'components/passwordValidation'
import React from 'react'
import Styles from './style.module.css'
function Tooltip({ children, tooltip = false, passwordArray = [], active = false }) {
  return (
    <>
      {active && tooltip ? (
        <div className={Styles.tooltip}>
          {children}
          <span className={Styles.tooltiptext}>
            <PasswordValidation passwordArray={passwordArray} />
          </span>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default Tooltip
