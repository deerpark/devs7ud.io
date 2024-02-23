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
  onClick?: () => void
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
      <ListItem key={post.id} layoutKey={post.id} className="group/item post">
        <ListItemLink segment={segment} url={url} onClick={onClick && onClick}>
          {leadingAccessory}
          {thumbnail && (
            <div className="ring-foreground/25 dark:ring-background/25 relative my-auto grid h-16 w-24 flex-none place-content-center overflow-hidden rounded-xl shadow-lg transition-all duration-500">
              <Image
                src={thumbnail}
                width={96}
                height={64}
                alt=""
                className="absolute inset-0 size-full object-cover transition-all duration-500 group-hover:opacity-100 group-[.active]:opacity-100"
              />
            </div>
          )}
          <div className="flex w-full flex-1 flex-col justify-center space-y-1">
            <div
              className={`group-[.active]:text-primary-foreground line-clamp-1 break-keep text-lg/6 font-bold`}
            >
              {title}
            </div>
            {/* {description && (
              <div
                className={`group-[.active]:text-primary-foreground line-clamp-1 text-base/5 opacity-70 2xl:line-clamp-2`}
              >
                {description}
              </div>
            )} */}
            <div
              className={`text-secondary-foreground/40 group-[.active]:text-secondary-foreground flex flex-wrap items-center justify-between pl-0.5`}
            >
              <div className="flex flex-1 items-center space-x-2 2xl:mb-0">
                {byline && user && (
                  <div className="flex flex-none items-center space-x-2">
                    {/* <Avatar
                      className={cn(
                        "ring-foreground group-[.active]:ring-primary-foreground border-1 size-5 rounded-full ring-1 group-hover:!opacity-100 group-[.active]:opacity-100"
                      )}
                    >
                      <AvatarImage
                        src="/assets/images/yonn-kim.jpg"
                        alt={`@${user?.name} avatar image`}
                        className="transition-all group-hover:!grayscale-0 group-[.active]:grayscale-0"
                      />
                      <AvatarFallback className="text-xs font-bold">
                        {user?.name?.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar> */}
                    {/* <span className="group-[.active]:text-primary-foreground truncate text-sm">
                      {user?.name}
                    </span> */}
                    <span className="group-[.active]:text-primary-foreground truncate text-sm">
                      {categories.map((category) => category.name).join(", ")}
                    </span>
                    <Separator
                      orientation="vertical"
                      className="size-0.5 rounded-full"
                    />
                    <span className="group-[.active]:text-primary-foreground truncate text-sm">
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
