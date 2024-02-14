import Image from "next/image"
import * as React from "react"

import type {
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { FaSpinnerThirdIcon } from "../icon-duotone"
import { getTranslations } from "next-intl/server"
import ListItemLink from "../list/list-link"
import { Category } from "@/types/post.type"
import CommentCount from "../comment-count"
import { formatDistance } from "@/lib/date"
import ListItem from "../list/list-item"
import { useLocale } from "next-intl"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

export interface PostsProps {
  data: PageObjectResponse[]
  onClick?: () => void
  leadingAccessory?: React.ReactElement | null
  byline?: boolean
  slug?: string | string[] | undefined
  users: UserObjectResponse[]
}

const segment = "posts"

export async function Posts(props: PostsProps) {
  const { data, onClick, leadingAccessory = null, byline, users = [] } = props
  const t = await getTranslations("POSTS.category")
  const locale = useLocale()

  return data.map((post) => {
    const user = users.find((u) => u.id === post.created_by.id)
    const url = `/${segment}/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`
    const title = (post.properties?.Title as any)?.title[0]?.plain_text
    const description = (post.properties?.Description as any)?.rich_text[0]
      ?.plain_text
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
    console.log(thumbnail)
    return (
      <ListItem key={post.id} layoutKey={post.id} className="group/item post">
        <ListItemLink segment={segment} url={url} onClick={onClick && onClick}>
          {leadingAccessory}
          {thumbnail && (
            <div className="relative my-auto grid size-24 flex-none place-content-center transition-all lg:h-28 lg:w-full lg:group-[.active]:m-1 lg:group-[.active]:h-40 lg:group-[.active]:w-[calc(100%-8px)] 2xl:m-0 2xl:size-24 2xl:group-[.active]:m-0 2xl:group-[.active]:size-24">
              <Image
                src={thumbnail}
                fill
                sizes="20vw"
                alt=""
                className="ring-foreground/25 dark:ring-background/25 rounded-xl object-cover opacity-50 shadow-lg grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-[.active]:opacity-100 group-[.active]:grayscale-0 lg:rounded-sm lg:group-[.active]:ring-1 2xl:rounded-xl"
              />
            </div>
          )}
          <div className="flex w-full flex-1 flex-col justify-center space-y-1 lg:px-3 2xl:px-0">
            <div
              className={`group-[.active]:text-primary-foreground line-clamp-3 text-lg/6 font-bold lg:text-base/5`}
            >
              {title}
            </div>
            {description && (
              <div
                className={`group-[.active]:text-primary-foreground line-clamp-1 text-base/5 opacity-70 lg:text-xs/4 2xl:line-clamp-2`}
              >
                {description}
              </div>
            )}
            <div
              className={`text-secondary-foreground/40 group-[.active]:text-secondary-foreground flex flex-wrap items-center justify-between pl-0.5`}
            >
              <div className="my-2 flex items-center space-x-2 2xl:mb-0 2xl:mt-1">
                {byline && user && (
                  <div className="flex items-center space-x-2">
                    <Avatar
                      className={cn(
                        "ring-foreground group-[.active]:ring-primary-foreground border-1 size-5 rounded-full ring-1"
                      )}
                    >
                      <AvatarImage
                        src="/assets/images/yonn-kim.jpg"
                        alt={`@${user?.name} avatar image`}
                        className="grayscale group-hover:!grayscale-0 group-[.active]:grayscale-0"
                      />
                      <AvatarFallback className="text-xs font-bold">
                        {user?.name?.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="group-[.active]:text-primary-foreground truncate text-xs">
                      {user?.name}
                    </span>
                    <span className="group-[.active]:text-primary-foreground truncate text-xs">
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
              <div className="my-2 flex items-center justify-end space-x-2 lg:mb-0 2xl:mb-0 2xl:mt-1">
                <Badge
                  variant="outline"
                  className="text-muted-foreground group-[.active]:text-primary-foreground block max-w-full truncate"
                >
                  {categories.map((category) => t(category.name)).join(", ")}
                </Badge>
              </div>
            </div>
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
