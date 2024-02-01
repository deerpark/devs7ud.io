/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import './src/lib/Env.mjs';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/lib/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      dirs: ['.'],
    },
    staticPageGenerationTimeout: 300,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.notion.so',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'notion.so',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'abs.twimg.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 's3.us-west-2.amazonaws.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'devs7ud.io',
          port: '',
          pathname: '/**',
        },
      ],
      formats: ['image/avif', 'image/webp'],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    webpack: (config) => {
      config.resolve.alias.unfetch = false;
      config.resolve.alias.canvas = false;
      config.resolve.alias.encoding = false;
      return config;
    },
  }),
);

export default nextConfig;
