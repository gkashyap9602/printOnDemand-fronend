import React, { useState, useEffect } from 'react'
import { Stepper, Step, StepButton, StepLabel } from '@material-ui/core'
import { connect } from 'react-redux'
import { updateField } from 'redux/actions/userActions'
import Icon from 'icomoons/Icon'
import { useRouter } from 'next/router'
import style from './style'

const useStyles = style

const getSteps = [
  {
    label: 'Basic info',
    icon: 'basic-info',
    name: 'basicInfo',
    isCompleted: false,
    activeIcon: false
  },
  {
    label: 'Shipping info',
    icon: 'shipping-info',
    name: 'shippingInfo',
    isCompleted: false,
    activeIcon: false
  },
  {
    label: 'Billing info',
    icon: 'billing-info',
    name: 'billingInfo',
    isCompleted: false,
    activeIcon: false
  },
  {
    label: 'Payment info',
    icon: 'payment-info',
    name: 'paymentInfo',
    isCompleted: false,
    activeIcon: false
  }
]

const TimelineStepper = ({
  info,
  updateField,
  wizardIndex,
  userValueUpdated,
  userAccountDetails
}) => {
  const classes = useStyles()
  const route = useRouter()
  const [steps, setSteps] = useState(getSteps)
  const StepIcon = ({ iconLabel }) => (
    <div className={classes.IconStepper}>
      <Icon icon={iconLabel} size={21} color='#9A9AB0' />
    </div>
  )
  useEffect(() => {}, [userAccountDetails])
  const handleStep = (step) => () => {
    // e.preventDefault()
    if (route?.query && step !== 3) {
      route.push('/profile')
    }
    updateField('wizardIndex', step)
  }
  return (
    <div className={classes.stepTimeline}>
      <Stepper nonLinear activeStep={wizardIndex}>
        {steps?.map((item, i) => (
          <Step
            key={i}
            onClick={info[item?.name] ? handleStep(i) : null}
            disabled={!info[item?.name]}
          >
            <StepButton
              icon={
                info[item?.name] ? (
                  <Icon icon='success' size={28} />
                ) : (
                  <StepIcon iconLabel={item?.icon} />
                )
              }
              className={classes.btnStepper}
            >
              <StepLabel>
                {item?.label}

                <div className={info[item?.name] ? classes.stepperComplete : classes.stepperStatus}>
                  {info[item?.name] ? 'Completed' : 'Pending'}
                </div>
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

const mapStateToProps = (state) => ({
  wizardIndex: state.user.wizardIndex,
  userValueUpdated: state.user.userValueUpdated
})

const mapDispatchToProps = {
  updateField
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineStepper)
