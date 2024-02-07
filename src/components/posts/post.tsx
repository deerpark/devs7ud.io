import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { useLocale, useTranslations } from "next-intl"
import { format, formatDistance } from "@/lib/date"
import PostContainer from "./post-container"
import { Separator } from "../ui/separator"
import { P } from "../ui/typography"
import Image from "next/image"

interface Banner {
  url: string | null
}

interface PostProps {
  post: PageObjectResponse
  content: string
}

export function Post(props: PostProps) {
  const { post, content } = props
  const title = (post.properties.Title as any).title[0].plain_text
  const description = (post.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  const banner: Banner = {
    url: (post.properties.Banner as any).url,
  }
  // const dateTime = post.created_time
  const lastEditDateTime = post.last_edited_time
  const t = useTranslations()
  const locale = useLocale()
  const updateDateTime = formatDistance(
    new Date(lastEditDateTime),
    new Date(),
    locale,
    {
      addSuffix: true,
    }
  )
  const updateAt = format(lastEditDateTime, "PP", locale)
  return (
    <PostContainer title={title}>
      <P className="text-muted-foreground mb-20 flex items-center justify-center space-x-2 text-xs 2xl:justify-start 2xl:px-1">
        <span>{updateAt}</span>
        {lastEditDateTime ? (
          <>
            <Separator
              orientation="vertical"
              className="size-0.5 rounded-full"
            />
            <span>{t("POSTS.updated")}</span>
            <Separator
              orientation="vertical"
              className="size-0.5 rounded-full"
            />
            <span>{updateDateTime}</span>
          </>
        ) : null}
      </P>
      <P className="mb-20 text-center text-sm 2xl:px-1 2xl:text-left">
        {description}
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
