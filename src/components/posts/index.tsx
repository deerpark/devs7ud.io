import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import ListItemLink from "../list/list-link"
import ListItem from "../list/list-item"
import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"

export interface PostsProps {
  data: PageObjectResponse[]
  onClick?: () => void
  leadingAccessory?: React.ReactElement | null
  byline?: boolean
  slug?: string | string[] | undefined
}

export function Posts(props: PostsProps) {
  const { data, onClick, leadingAccessory = null, byline, slug } = props

  return data.map((post) => {
    const url = `/posts/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`
    const active = `/posts/${slug}` === url
    console.log(url, slug)
    const title = (post.properties?.Title as any)?.title[0]?.plain_text
    const description = (post.properties?.Description as any)?.rich_text[0]
      ?.plain_text
    return (
      <ListItem key={post.id} layoutKey={post.id}>
        <ListItemLink url={url} onClick={onClick && onClick}>
          {leadingAccessory}
          <div className="flex flex-col justify-center space-y-1">
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
            {byline && (
              <div
                className={`line-clamp-1 flex items-center space-x-2 py-2 pl-0.5 ${
                  active
                    ? "text-secondary-foreground"
                    : "text-secondary-foreground/40"
                }`}
              >
                <Avatar
                  className={cn(
                    "ring-foreground group-[.active]:ring-primary-foreground size-4 rounded-full ring-1"
                  )}
                >
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={`"@${appConfig.twitter}"`}
                  />
                  <AvatarFallback>
                    {appConfig.authors[0]?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="group-[.active]:text-primary-foreground text-xs">
                  {appConfig.authors[0]?.name}
                </span>
              </div>
            )}
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
