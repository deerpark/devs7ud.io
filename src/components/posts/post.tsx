import { format, formatDistance } from "@/lib/date"
import PostContainer from "./post-container"
import { Separator } from "../ui/separator"
import { useTranslations } from "next-intl"
import { P } from "../ui/typography"
import Image from "next/image"

interface Banner {
  url: string | null
}

interface PostProps {
  title: string
  banner: Banner
  content: string
  dateTime: string
  lastEditDateTime: string
}

export async function Post(props: PostProps) {
  const { title, content, banner, dateTime, lastEditDateTime } = props
  const t = useTranslations()
  const createAt = await formatDistance(new Date(dateTime), new Date(), {
    addSuffix: true,
  })
  const updateAt = await format(lastEditDateTime)
  return (
    <PostContainer title={title}>
      <P className="text-muted-foreground mb-8 flex items-center justify-center space-x-2 text-xs">
        <span>{createAt}</span>
        {lastEditDateTime ? (
          <>
            <Separator
              orientation="vertical"
              className="size-0.5 rounded-full"
            />
            <span>
              {lastEditDateTime ? `${t("POSTS.updated")} - ${updateAt}` : null}
            </span>
          </>
        ) : null}
      </P>
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
