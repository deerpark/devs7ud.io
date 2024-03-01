import Image from "next/image"
import * as React from "react"

import type {
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import CommentCount from "../comments/comment-count"
/* import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar" */
import { FaSpinnerThirdIcon } from "../icon-duotone"
import ListItemLink from "../list/list-link"
import { Category } from "@/types/post.type"
import { Separator } from "../ui/separator"
import { formatDistance } from "@/lib/date"
import ListItem from "../list/list-item"
import { useLocale } from "next-intl"
/* import { cn } from "@/lib/utils" */

export interface PostsProps {
  data: PageObjectResponse[]
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  leadingAccessory?: React.ReactElement | null
  byline?: boolean
  slug?: string | string[] | undefined
  users: UserObjectResponse[]
}

const segment = "posts"

export function Posts(props: PostsProps) {
  const { data, onClick, leadingAccessory = null, byline, users = [] } = props
  const locale = useLocale()

  return data.map((post) => {
    const user = users.find((u) => u.id === post.created_by.id)
    const url = `/${segment}/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`
    const title = (post.properties?.Title as any)?.title[0]?.plain_text
    /* const description = (post.properties?.Description as any)?.rich_text[0]
      ?.plain_text */
    const categories: Category[] =
      (post.properties?.Categories as any)?.multi_select || []
    const lastEditedTime = post.last_edited_time
    const lastEditedTimeFormat = formatDistance(
      new Date(lastEditedTime),
      new Date(),
      locale,
      { addSuffix: true }
    )
    const thumbnail =
      (post?.cover as any)?.file?.url || (post?.cover as any)?.external?.url
    return (
      <ListItem
        key={post.id}
        layoutKey={post.id}
        className="group/item post relative"
      >
        <ListItemLink
          segment={segment}
          url={url}
          onClick={onClick && onClick}
          className="relative z-10"
        >
          {leadingAccessory}
          {thumbnail && (
            <div className="relative my-auto grid h-16 w-24 flex-none place-content-center overflow-hidden rounded-xl shadow-lg transition-all duration-500">
              <Image
                src={thumbnail}
                width={96}
                height={64}
                sizes="(max-width: 96px) 100vw"
                alt=""
                className="bg-primary/25 absolute inset-0 size-full object-cover transition-all duration-500 group-hover:opacity-100 group-[.active]:opacity-100"
              />
            </div>
          )}
          <div className="flex w-full flex-1 flex-col justify-center space-y-1">
            <div className="line-clamp-1 break-keep text-base/tight font-semibold group-[.active]:font-bold">
              {title}
            </div>
            {/* {description && (
              <div
              className={`text-foreground/60 group-[.active]:text-foreground/80 line-clamp-1 text-base/5 2xl:line-clamp-2`}
              >
              {description}
              </div>
            )} */}
            <div
              className={`flex flex-wrap items-center justify-between text-xs/tight`}
            >
              <div className="flex flex-1 items-center space-x-1 2xl:mb-0">
                {byline && user && (
                  <div className="flex flex-none items-center space-x-2">
                    <span className="truncate opacity-50">
                      {categories.map((category) => category.name).join(", ")}
                    </span>
                    <Separator
                      orientation="vertical"
                      className="size-0.5 rounded-full"
                    />
                    <span className="truncate opacity-50">
                      {lastEditedTimeFormat}
                    </span>
                  </div>
                )}

                <React.Suspense
                  fallback={
                    <FaSpinnerThirdIcon className="text-primary size-4 animate-spin" />
                  }
                >
                  <CommentCount id={post.id} />
                </React.Suspense>
              </div>
            </div>
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
