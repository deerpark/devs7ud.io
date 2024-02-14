import Loading from "./loading"
import Image from "next/image"
import * as React from "react"

type ContentsProps = {
  bannerUrl: string | null
  content: string | React.ComponentType<{}>
}

export default function Contents({
  bannerUrl,
  content: PageComponent,
}: ContentsProps) {
  return (
    <>
      {bannerUrl && (
        <Image
          alt="Image"
          src={bannerUrl}
          // width={banner.width}
          width={800}
          height={400}
          className="via-primary/30 to-primary/50 max-w-full bg-gradient-to-b object-cover"
        />
      )}
      {typeof PageComponent === "string" ? (
        <div
          className="prose dark:prose-invert prose-p:text-secondary-foreground prose-headings:text-foreground mx-auto max-w-3xl text-lg/7"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: PageComponent }}
        />
      ) : (
        <React.Suspense fallback={<Loading />}>
          <PageComponent />
        </React.Suspense>
      )}
    </>
  )
}
