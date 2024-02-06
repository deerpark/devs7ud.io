/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import withBundleAnalyzer from "@next/bundle-analyzer"
import withNextIntl from "next-intl/plugin"

const withNextIntlConfig = withNextIntl("./src/lib/i18n.ts")

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      dirs: ["."],
    },
    staticPageGenerationTimeout: 300,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.icons8.com",
        },
        {
          protocol: "https",
          hostname: "www.notion.so",
        },
        {
          protocol: "https",
          hostname: "notion.so",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "pbs.twimg.com",
        },
        {
          protocol: "https",
          hostname: "abs.twimg.com",
        },
        {
          protocol: "https",
          hostname: "s3.us-west-2.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "devs7ud.io",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
      ],
      dangerouslyAllowSVG: true,
    },
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.(".svg")
      )

      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: ["@svgr/webpack"],
        }
      )

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i

      return config
    },
  })
)

export default nextConfig
