import { appConfig } from "@/config/app"
import { ImageResponse } from "next/og"

// Route segment config
// export const runtime = "edge"

// Image metadata
export const alt = appConfig.name
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  /* const isKo = params.locale !== "ko"
  // Font
  const font = isKo
    ? fetch(
        new URL("../../../../../fonts/OAGothic-ExtraBold.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer())
    : fetch(
        new URL("../../../../../fonts/Inter-SemiBold.ttf", import.meta.url)
      ).then((res) => res.arrayBuffer()) */

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {params.slug || appConfig.name}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      /* fonts: [
        {
          name: isKo ? "OAGothic-ExtraBold" : "Inter",
          data: await font,
          style: "normal",
          weight: isKo ? 800 : 400,
        },
      ], */
    }
  )
}
