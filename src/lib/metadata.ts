import type { Metadata } from "next/types"

import { appConfig } from "@/config/app"
import { env } from "@/lib/env"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_HOST || "https://devs7ud.io"),
  title: appConfig.name,
  description: appConfig.description,
  generator: appConfig.name,
  applicationName: appConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: appConfig.keywords,
  authors: appConfig.authors,
  creator: appConfig.authors[0]?.name,
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      url: "/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      url: "/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      url: "/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      url: "/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      url: "/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      url: "/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      url: "/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      url: "/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  manifest: "/manifest.json",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: appConfig.twitter
    ? {
        creator: `@${appConfig.twitter}`,
      }
    : undefined,
}
