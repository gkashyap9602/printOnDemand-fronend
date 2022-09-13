import React, { useState } from 'react'
import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core'
import Image from 'next/image'

import SignDelayBanner from 'static/images/delay-signup.png'
import style from './style'
// import Icon from 'icomoons/Icon'

const useStyles = style
const SignupDelay = () => {
  const classes = useStyles()
  const [value, setValue] = useState('label1')

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const selectedItem = [
    { id: 1, value: 'label1', label: 'I want to place my order directly' },
    { id: 2, value: 'label2', label: 'I want an ecommerce store and am interested in a plug-in' },
    {
      id: 3,
      value: 'label3',
      label: 'I want to place my order directly and work towards eCommerce integration'
    },
    {
      id: 4,
      value: 'label4',
      label: 'I will be creating or working with a custom platform and API connection'
    }
  ]
  return (
    <div className={classes.accountGrid}>
      <Grid container spacing={3} direction='row' className={classes.root}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className={classes.signup_Row}>
            <Typography variant='h2'>
              Sign up now and start
              <span className={classes.rowspan}>designing</span>
            </Typography>
            <Typography variant='body2' className={classes.row_Text}>
              To ensure our current partners&apos;success during the holidays, new account
              activation would be on hold
            </Typography>
            <div style={{ marginTop: 32 }}>
              <Image src={SignDelayBanner} alt='Sign Up Delay' height={574} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
          <div className={classes.bgSignup}>
            <Typography variant='h1'>Additional details</Typography>
            <Typography variant='h4' className={classes.labelText}>
              We require additional information about your business to understand you better
            </Typography>
            <div className={classes.formWrapper}>
              <div className={classes.labelBlock}>
                <Typography variant='body2' className={classes.labelHead}>
                  Which scenario best describes your ordering needs?
                </Typography>
                <RadioGroup
                  aria-label='detail'
                  name='label1'
                  value={value}
                  onChange={handleChange}
                  className={classes.radioForm}
                >
                  {selectedItem.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio id='radioBtn' color='primary' />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </div>
              <div className={classes.labelBlock}>
                <Typography variant='body2' className={classes.labelHead}>
                  If you already have an eCommerce store, what platform are you using?
                </Typography>
                <RadioGroup
                  aria-label='detail'
                  name='label1'
                  value={value}
                  onChange={handleChange}
                  className={classes.radioForm}
                >
                  {selectedItem.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio id='radioBtn' color='primary' />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignupDelay
