import React from 'react'
import { Container } from '@material-ui/core'
import HeaderBar from 'components/appbar'
import SignupDelay from 'components/signupDelay'
import { style } from 'styles/signup'
const useStyles = style

/**
 * Signup WaitingList page
 * @returns
 */
const SignupWaitingList = () => {
  const classes = useStyles()
  return (
    <div className={classes.bgAccount}>
      <div className={classes.bgCurve} />
      <HeaderBar />
      {/* <!--signup section--> */}
      <Container>
        <SignupDelay />
      </Container>
      {/* <!--signup section--> */}
    </div>
  )
}
//Export
export default SignupWaitingList
