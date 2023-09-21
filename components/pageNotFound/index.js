import React from 'react'
import Link from 'next/link'

import { Container, Box, CssBaseline } from '@material-ui/core'

const PageNotFound = ({ url }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box>
          <h2>404: Resource not found under {url} path.</h2>
          <p>
            We seem to have misplaced the page you are looking for. Sorry! Please try checking the
            URL for errors.
          </p>
          <p>
            You can also click the Search button below to find what you are looking for. Or you can
            <Link href='/'>
              <a> return to Home</a>
            </Link>
          </p>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default PageNotFound
