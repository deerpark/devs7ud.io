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
  src: "../../public/assets/fonts/OAGothic-ExtraBold.woff2",
  display: "swap",
  variable: "--font-oa-gothic",
})

export function getFontBinary(isKo: boolean): Promise<ArrayBuffer | Buffer> {
  return isKo
    ? fetch(
        new URL(
          "../../public/assets/fonts/OAGothic-ExtraBold.ttf",
          import.meta.url
        )
      ).then((res) => res.arrayBuffer())
    : fetch(
        new URL("../../public/assets/fonts/Inter-SemiBold.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer())
}

faConfig.autoAddCss = false
