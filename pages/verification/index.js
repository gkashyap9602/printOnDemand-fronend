import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import HeaderBar from 'components/appbar'
import React, { useEffect, useState } from 'react'
import { style } from 'styles/verification'
import SignupBanner from '/static/images/signup-banner.png'
import Image from 'next/image'
import { activateAccountHandler } from 'redux/actions/authActions'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import Link from 'next/link'
import { VerifiedUserOutlined } from '@material-ui/icons'

const Success = () => {
  const useStyles = style
  const classes = useStyles()
  return (
    <>
      <VerifiedUserOutlined className={classes.verifiedUser} />
      Congratulations!!! Your account has been verified
      <br />
      <Link href='/login'> Back to Signin</Link>
    </>
  )
}

/**
 * Verification
 * @returns
 */
function Verification({ activateAccountHandler }) {
  const useStyles = style
  const classes = useStyles()
  const [success, setsuccess] = useState(false)
  const [loaderBtn, setloaderBtn] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (router.query.activationToken) {
      setTimeout(() => {
        accountActivate()
      }, 2000)
    }
  })

  /**
   * Account activate api call
   */
  const accountActivate = async () => {
    const res = await activateAccountHandler({ token: router.query.activationToken })
    switch (res?.StatusCode) {
      case 400:
      case 12002:
        NotificationManager.warning(res?.Response?.Message, '', 5000)
        setloaderBtn(false)
        break
      case 200:
        setsuccess(true)
        setloaderBtn(false)
        break
      default:
        break
    }
  }
  return (
    <div className={classes.bgAccount}>
      <div className={classes.bgCurve}></div>
      {/* <!--app bar--> */}
      <HeaderBar />
      {/* <!--app bar--> */}
      {/* <!--Activate  section--> */}
      <Container>
        <div className={classes.accountGrid}>
          <Grid container spacing={3} direction='row' className={classes.root}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={classes.signup_Row}>
                <Typography variant='h2'>
                  Create and sell custom products
                  <span className={classes.rowspan}>online</span>
                </Typography>
                <Image src={SignupBanner} alt='Sign Up' width={475} height={425} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
              <div className={classes.bgSignup}>
                <Typography variant='h1'>Account verification</Typography>
                <Box display='flex' alignItems='center' className={classes.successMsg}>
                  <Typography variant='h5'>
                    {success ? (
                      <Success />
                    ) : (
                      <>
                        {loaderBtn && (
                          <CircularProgress size={18} className={classes.LoaderSession} />
                        )}
                        Thank you for registering with us.We are verifying your account.
                        <br />
                        Please wait for a moment.
                      </>
                    )}
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* <!--Activate section--> */}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  activateAccountHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification)
