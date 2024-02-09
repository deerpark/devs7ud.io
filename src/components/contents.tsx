import Image from "next/image"

type ContentsProps = {
  bannerUrl: string | null
  content: string
}

export default function Contents({ bannerUrl, content }: ContentsProps) {
  return (
    <>
      {bannerUrl && (
        <Image
          alt="Image"
          src={bannerUrl}
          // width={banner.width}
          width={800}
          height={400}
          className="max-w-full object-cover"
        />
      )}
      <div
        className="prose prose-p:text-secondary-foreground prose-headings:text-foreground mx-auto mt-4 max-w-3xl text-lg/7"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  )
}
