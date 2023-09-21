import React from 'react'
import PageNotFound from 'components/pageNotFound'

export const Page404 = ({ asPath }) => {
  return <PageNotFound url={asPath} />
}
Page404.getInitialProps = async ({ res, asPath }) => {
  res.statusCode = 404
  return { asPath }
}

export default Page404
