/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import './src/lib/Env.mjs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import withNextIntl from 'next-intl/plugin'

const withNextIntlConfig = withNextIntl('./src/lib/i18n.ts')

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      dirs: ['.']
    },
    staticPageGenerationTimeout: 300,
    images: {
      domains: [
        'www.notion.so',
        'notion.so',
        'images.unsplash.com',
        'pbs.twimg.com',
        'abs.twimg.com',
        's3.us-west-2.amazonaws.com',
        'transitivebullsh.it'
      ],
      formats: ['image/avif', 'image/webp'],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    webpack: (config) => {
      config.resolve.alias.unfetch = false
      config.resolve.alias.canvas = false
      config.resolve.alias.encoding = false
      return config
    }
  })
)

export default nextConfig
