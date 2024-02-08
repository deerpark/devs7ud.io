import {
  CommentObjectResponse,
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useLocale, useTranslations } from "next-intl"
import { format, formatDistance } from "@/lib/date"
import PostContainer from "./post-container"
import { Separator } from "../ui/separator"
import { FaMessagesIcon } from "../icon"
import { P } from "../ui/typography"
import Empty from "../ui/empty"
import Comment from "./comment"
import Image from "next/image"

interface Banner {
  url: string | null
}

interface PostProps {
  post: PageObjectResponse
  content: string
  createdBy?: UserObjectResponse
  comments: CommentObjectResponse[]
}

export function Post(props: PostProps) {
  const { post, content, createdBy, comments } = props
  const title = (post.properties.Title as any).title[0].plain_text
  const description = (post.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  const banner: Banner = {
    url: (post.properties.Banner as any)?.files[0]?.file?.url,
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
    <PostContainer title={title} description={description}>
      <P className="text-muted-foreground mb-20 flex items-center justify-center space-x-2 text-xs 2xl:justify-start 2xl:px-1">
        {createdBy && (
          <div className="flex items-center space-x-2">
            <Avatar className="ring-foreground group-[.active]:ring-primary-foreground border-1 size-5 rounded-full ring-1">
              <AvatarImage
                src="/assets/images/yonn-kim.jpg"
                alt={`${createdBy.name} avatar image`}
              />
              <AvatarFallback className="text-xs font-bold">
                {createdBy.name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>{createdBy.name}</div>
            <Separator
              orientation="vertical"
              className="size-0.5 rounded-full"
            />
          </div>
        )}
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
        className="prose prose-p:text-white prose-headings:text-white mt-4 max-w-3xl text-lg/6"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="bg-card -mx-8 -mb-8 mt-20">
        <Separator orientation="horizontal" />
        <div className="p-8">
          <div className="text-card-foreground divide-border space-y-5 divide-y">
            {comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            {!comments?.length && (
              <Empty
                icon={
                  <FaMessagesIcon className="text-muted-foreground size-12" />
                }
                description={t("COMMENT.empty.message")}
              />
            )}
          </div>
        </div>
      </div>
    </PostContainer>
  )
}
