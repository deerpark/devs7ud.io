import * as React from "react"

import type {
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getTranslations } from "next-intl/server"
import ListItemLink from "../list/list-link"
import { FaSpinnerThirdIcon } from "../icon"
import { formatDistance } from "@/lib/date"
import CommentCount from "./comment-count"
import ListItem from "../list/list-item"
import { Category } from "@/types/post"
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

export async function Posts(props: PostsProps) {
  const { data, onClick, leadingAccessory = null, byline, users } = props
  const t = await getTranslations("POSTS.category")
  const locale = useLocale()

  return data.map((post) => {
    const user = users.find((u) => u.id === post.created_by.id)
    const url = `/posts/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`
    const title = (post.properties?.Title as any)?.title[0]?.plain_text
    const description = (post.properties?.Description as any)?.rich_text[0]
      ?.plain_text
    const tags: Category[] = (post.properties?.Tags as any)?.multi_select || []
    const lastEditedTime = post.last_edited_time
    const lastEditedTimeFormat = formatDistance(
      new Date(lastEditedTime),
      new Date(),
      locale,
      { addSuffix: true }
    )
    return (
      <ListItem key={post.id} layoutKey={post.id}>
        <ListItemLink url={url} onClick={onClick && onClick}>
          {leadingAccessory}
          <div className="flex w-full flex-col justify-center space-y-1">
            <div
              className={`group-[.active]:text-primary-foreground line-clamp-3 text-lg/6 font-bold lg:text-base/5`}
            >
              {title}
            </div>
            {description && (
              <div
                className={`text-muted-foreground group-[.active]:text-primary-foreground/70 line-clamp-2 text-base/5 lg:text-sm/4`}
              >
                {description}
              </div>
            )}
            <div
              className={`text-secondary-foreground/40 group-[.active]:text-secondary-foreground flex items-center justify-between space-x-2 py-2 pl-0.5`}
            >
              <div className="flex items-center space-x-2">
                {byline && (
                  <div className="flex items-center space-x-2">
                    <Avatar
                      className={cn(
                        "ring-foreground group-[.active]:ring-primary-foreground border-1 size-5 rounded-full ring-1"
                      )}
                    >
                      <AvatarImage
                        src="/assets/images/yonn-kim.jpg"
                        alt={`@${user?.name} avatar image`}
                      />
                      <AvatarFallback className="text-xs font-bold">
                        {user?.name?.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="group-[.active]:text-primary-foreground text-xs">
                      {user?.name}
                    </span>
                    <span className="group-[.active]:text-primary-foreground text-xs">
                      {lastEditedTimeFormat}
                    </span>
                  </div>
                )}

                <React.Suspense
                  fallback={
                    <FaSpinnerThirdIcon className="text-primary size-6 animate-spin" />
                  }
                >
                  <CommentCount id={post.id} />
                </React.Suspense>
              </div>
              <div className="flex items-center space-x-2">
                <ul className="flex items-center space-x-2">
                  {tags.map((tag) => (
                    <li key={tag.id}>
                      <Badge
                        variant="outline"
                        className="group-[.active]:text-primary-foreground"
                      >
                        {t(tag.name)}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
