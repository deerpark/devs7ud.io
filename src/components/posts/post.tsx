import PostContainer from "./post-container"
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
    <PostContainer title={title}>
      <h1 className="font-heading mb-8 text-center text-6xl">{title}</h1>
      {banner.url && (
        <Image
          alt="Image"
          src={banner.url}
          // width={banner.width}
          width={800}
          height={400}
          className="max-w-full object-cover"
        />
      )}
      <div
        className="prose prose-p:text-white prose-headings:text-white mt-4 max-w-3xl text-xl leading-10"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PostContainer>
  )
}
