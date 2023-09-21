/* eslint-disable require-jsdoc */
import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { ServerStyleSheet } from 'styled-components'
import theme from '../styles/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='shortcut icon' href='/favicon.ico' />
          <script src='https://api.paytrace.com/assets/e2ee/paytrace-e2ee.js' />

          {/* <!-- Google Tag Manager --> */}
          <script
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T6PQ2W5');`
            }}
          ></script>
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-T6PQ2W5'
              height='0'
              width='0'
              style='display:none;visibility:hidden'
            ></iframe>`
            }}
          ></noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const styledComponentsSheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        // sheets.collect(<App {...props} />)
        styledComponentsSheet.collectStyles(sheets.collect(<App {...props} />))
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      styledComponentsSheet.getStyleElement()
    ]
  }
}
