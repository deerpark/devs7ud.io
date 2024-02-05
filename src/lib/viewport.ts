import type { Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefffe" },
    { media: "(prefers-color-scheme: dark)", color: "#2d3439" },
  ],
}
