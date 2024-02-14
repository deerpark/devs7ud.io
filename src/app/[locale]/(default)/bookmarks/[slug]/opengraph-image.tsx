/* eslint-disable @next/next/no-img-element */
import { getPageBySlug } from "@/lib/notion"
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
  const post = await getPageBySlug(params.slug, "bookmarks")
  const imageUrl =
    (post?.properties?.cover as any)?.file?.url ||
    (post?.properties?.cover as any)?.external?.url

  return new ImageResponse(
    (
      // ImageResponse JSX elementㅅ
      <div
        style={{
          background: "#2656C5",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          <img
            alt="Image"
            src={imageUrl}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <img
            alt="Image"
            src="https://devs7ud.io/og.jpeg"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
