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

const segment = "projects"

export function Projects(props: PostsProps) {
  const { data, onClick, leadingAccessory = null } = props
  const locale = useLocale()

  return data.map((post) => {
    const url = `/${segment}/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`
    const title = (post.properties?.Title as any)?.title[0]?.plain_text
    const description = (post.properties?.Description as any)?.rich_text[0]
      ?.plain_text
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
        className="group/item project relative"
      >
        <ListItemLink
          segment={segment}
          url={url}
          onClick={onClick && onClick}
          className="relative z-10 flex-col space-x-0 space-y-3"
        >
          {leadingAccessory}
          {thumbnail && (
            <div className="relative grid aspect-video size-full flex-none place-content-center overflow-hidden rounded-xl shadow-lg transition-all duration-500">
              <Image
                src={thumbnail}
                width={280}
                height={180}
                sizes="(max-width: 280px) 100vw"
                alt=""
                className="bg-primary/25 absolute inset-0 size-full object-cover transition-all duration-500 group-hover:opacity-100 group-[.active]:opacity-100"
              />
            </div>
          )}
          <div className="flex w-full flex-col justify-center space-y-1 px-2">
            <div className="line-clamp-1 flex items-center space-x-2 break-keep">
              <span className="text-base/tight font-semibold group-[.active]:font-bold">
                {title}
              </span>
              {description && (
                <span
                  className={`text-foreground/60 group-[.active]:text-foreground/80 truncate text-base/5`}
                >
                  {description}
                </span>
              )}
            </div>

            <div
              className={`flex flex-wrap items-center justify-between text-xs/tight`}
            >
              <div className="flex flex-1 items-center space-x-1 2xl:mb-0">
                {lastEditedTimeFormat && (
                  <div className="flex flex-none items-center space-x-2">
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
