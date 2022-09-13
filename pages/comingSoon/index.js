import React from 'react'
import HeaderLogo from '/static/images/MWW-Logo.png'
import Style from 'styles/comingsoon.module.css'
import Image from 'next/image'
import Link from 'next/link'
function ComingSoon({ show = true }) {
  return (
    <div className={Style.bgimg}>
      <Image src={HeaderLogo} alt='Logo' />
      <h1>Coming soon</h1>
      <h5>Our website is under construction</h5>
      {show && <Link href='/orders'>Back to MWW</Link>}
    </div>
  )
}

export default ComingSoon
