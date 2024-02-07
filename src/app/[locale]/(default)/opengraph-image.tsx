/* eslint-disable @next/next/no-img-element */
import { getFontBinary } from "@/lib/fonts"
import { appConfig } from "@/config/app"
import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

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
  params: { locale: string }
}) {
  const isKo = !params.locale || params.locale !== "ko"
  // Font
  const font = getFontBinary(isKo)

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://devs7ud.io/assets/icons/logo-background-white.svg"
            width={140}
            height={138}
            alt=""
          />
          <h2
            className="font-heading"
            style={{
              fontSize: 128,
              fontFamily: isKo ? "OAGothic-ExtraBold" : "Inter",
              fontWeight: 900,
              letterSpacing: -10,
            }}
          >
            {appConfig.name}
          </h2>
          <div
            style={{
              fontSize: 48,
            }}
          >
            {appConfig.description}
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: isKo ? "OAGothic-ExtraBold" : "Inter",
          data: await font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  )
}
