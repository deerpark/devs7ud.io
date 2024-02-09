import {
  CommentObjectResponse,
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { FaLinkIcon, FaMessagesIcon } from "../icon"
import DetailContainer from "../detail-container"
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import { useTranslations } from "next-intl"
import { Category } from "@/types/post"
import { cn } from "@/lib/utils"
import Comment from "../comment"
import Empty from "../ui/empty"
import Image from "next/image"
import Link from "next/link"

interface Banner {
  url: string | null
}

interface BookmarkProps {
  bookmark: PageObjectResponse
  content: string
  createdBy?: UserObjectResponse
  comments: CommentObjectResponse[]
}

export function Bookmark(props: BookmarkProps) {
  const { bookmark, content, comments } = props
  const title = (bookmark.properties.Title as any).title[0].plain_text
  const description = (bookmark.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  const link = (bookmark.properties?.Link as any)?.url
  const banner: Banner = {
    url: (bookmark.properties.Banner as any)?.files[0]?.file?.url,
  }
  // const dateTime = bookmark.created_time
  const t = useTranslations()
  const tags: Category[] =
    (bookmark.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer
      title={title}
      segment="bookmarks"
      description={description}
      tags={tags}
    >
      <div className="mx-auto max-w-max flex-1">
        <div className="mx-auto">
          <Link
            href={link}
            target="_blank"
            className={cn(buttonVariants({ variant: "default" }), "space-x-2")}
          >
            <span>{t("BOOKMARKS.visit")}</span>
            <FaLinkIcon className="fa-light dark:fa-dark size-5" />
          </Link>
        </div>
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
      </div>
      <div className="bg-card -mx-8 -mb-8 mt-20 flex-none">
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
    </DetailContainer>
  )
}
