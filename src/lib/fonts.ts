import { config as faConfig } from "@fortawesome/fontawesome-svg-core"
import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Font files can be colocated inside of `app`
export const oaGothic = localFont({
  src: "../fonts/OAGothic-ExtraBold.woff2",
  display: "swap",
  variable: "--font-oa-gothic",
})

faConfig.autoAddCss = false
