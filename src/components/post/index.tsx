import Image from "next/image"

interface Banner {
  url: string | null
}

interface PostProps {
  title: string
  banner: Banner
  content: string
}

export function Post(props: PostProps) {
  const { title, content, banner } = props

  return (
    <article className="mb-10 flex w-full flex-1 flex-col items-center pt-20">
      <h1 className="mb-8 text-6xl font-black">{title}</h1>
      {banner.url && (
        <Image
          alt="Blog Image"
          src={banner.url}
          // width={banner.width}
          width={800}
          height={400}
          className="max-w-[800px] object-cover"
        />
      )}
      <div
        className="prose prose-p:text-white prose-headings:text-white mt-4 max-w-3xl text-xl leading-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
