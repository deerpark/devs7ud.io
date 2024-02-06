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
      url: "/apple-touch-icon.png",
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
