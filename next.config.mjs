/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
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
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.notion.so'
        },
        {
          protocol: 'https',
          hostname: 'notion.so'
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com'
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com'
        },
        {
          protocol: 'https',
          hostname: 'abs.twimg.com'
        },
        {
          protocol: 'https',
          hostname: 's3.us-west-2.amazonaws.com'
        },
        {
          protocol: 'https',
          hostname: 'devs7ud.io'
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com'
        }
      ],
      dangerouslyAllowSVG: true
    }
  })
)

export default nextConfig
