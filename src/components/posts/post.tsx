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
import { Category } from "@/types/post"
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
  const tags: Category[] = (post.properties?.Tags as any)?.multi_select || []
  return (
    <PostContainer title={title} description={description} tags={tags}>
      <P className="text-muted-foreground mb-60 flex flex-col items-center justify-center space-y-20 text-xs/5">
        {createdBy && (
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="ring-foreground group-[.active]:ring-primary-foreground border-1 size-16 rounded-full ring-1">
              <AvatarImage
                src="/assets/images/yonn-kim.jpg"
                alt={`${createdBy.name} avatar image`}
              />
              <AvatarFallback className="text-xs font-bold">
                {createdBy.name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="truncate">{createdBy.name}</div>
          </div>
        )}
        <div className="flex flex-wrap items-center space-x-2">
          <span className="truncate">{updateAt}</span>
          {lastEditDateTime ? (
            <>
              <Separator
                orientation="vertical"
                className="size-0.5 rounded-full"
              />
              <span className="truncate">{t("POSTS.updated")}</span>
              <Separator
                orientation="vertical"
                className="size-0.5 rounded-full"
              />
              <span className="truncate">{updateDateTime}</span>
            </>
          ) : null}
        </div>
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
        className="prose prose-p:text-secondary-foreground prose-headings:text-foreground mx-auto mt-4 max-w-3xl text-lg/7"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="bg-card -mx-8 -mb-8 mt-20">
        <Separator
          orientation="horizontal"
          className="2xl:from-border/20 2xl:via-border 2xl:to-border/20 2xl:bg-transparent 2xl:bg-gradient-to-r"
        />
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
