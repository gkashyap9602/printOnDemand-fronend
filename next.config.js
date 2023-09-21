const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    SITE_URL: process.env.SITE_URL,
    ZENDESK_URL: process.env.ZENDESK_URL,
    ZENDESK_EMAIL: process.env.ZENDESK_EMAIL,
    ZENDESK_PASSWORD: process.env.ZENDESK_PASSWORD,
    ENV_MODE: process.env.ENV_MODE,
    CF_IMG_URL_DEV: process.env.CF_IMG_URL_DEV,
    CF_IMG_URL_STAG: process.env.CF_IMG_URL_STAG,
    CF_IMG_URL_PROD: process.env.CF_IMG_URL_PROD,
  },
  images: {
    domains: ['mwwdevapi.fingent.net', 'mwwportalstoragedev.blob.core.windows.net','mww.solidappmaker.ml','d35sh5431xvp8v.cloudfront.net','dzsol7gnt221.cloudfront.net','d27ue0n0njn6cu.cloudfront.net'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  webpack(config, options) {
    return config
  }
}
