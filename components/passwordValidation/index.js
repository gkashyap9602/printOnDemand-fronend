/* eslint-disable require-jsdoc */
import { CancelOutlined, CheckCircleOutlineRounded } from '@material-ui/icons'
import React from 'react'
import Style from './style.module.css'
function PasswordValidation({ passwordArray = [] }) {
  const listdata = [
    {
      label: 'contain atleast eight characters',
      key: 'eightChar'
    },
    {
      label: 'include atleast one uppercase letter',
      key: 'uppercase'
    },
    {
      label: 'include atleast one lowercase letter',
      key: 'lowercase'
    },
    {
      label: 'include atleast one number',
      key: 'number'
    },
    {
      label: 'include atleast one special character(!,@,#,$, %, ^, &, and *)',
      key: 'specialChar'
    }
  ]
  return (
    <div className={Style.passwordValid}>
      <h2 className={Style.h2}>Password must:</h2>
      <ul className={Style.list}>
        {listdata?.map((value, i) => (
          <div key={i} className={Style.align}>
            {passwordArray.includes(value?.key) ? (
              <CheckCircleOutlineRounded style={{ color: 'green' }} />
            ) : (
              <CancelOutlined style={{ color: 'red' }} />
            )}
            <li className={Style.li}>{value?.label}</li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default PasswordValidation
