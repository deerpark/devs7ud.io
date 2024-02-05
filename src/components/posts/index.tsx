import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import ListItem from "../list/list-item"
import Link from "next/link"

interface PostsProps {
  data: PageObjectResponse[]
  onClick?: () => void
  leadingAccessory?: React.ReactElement | null
  byline?: boolean
  slug?: string
}

export function Posts(props: PostsProps) {
  const { data, onClick, leadingAccessory = null, byline, slug } = props

  return data.map((post) => {
    const url = `/posts/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`
    const active = `/posts/${slug}` === url
    const title = (post.properties?.Title as any)?.title[0]?.plain_text
    const description = (post.properties?.Description as any)?.rich_text[0]
      ?.plain_text
    return (
      <ListItem key={post.id} layoutKey={post.id}>
        <Link
          href={`/posts/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`}
          onClick={onClick && onClick}
          className={`flex space-x-3 border-b px-3.5 py-3 text-sm lg:rounded-lg lg:border-none lg:py-2 ${
            active ? "" : "sm:hover:bg-card"
          }`}
        >
          {leadingAccessory}
          <div className="flex flex-col justify-center space-y-1">
            <div
              className={`line-clamp-3 font-medium ${
                active ? "" : "opacity-80"
              }`}
            >
              {title}
            </div>
            {description && (
              <div className={`line-clamp-2 ${active ? "" : "opacity-60"}`}>
                {description}
              </div>
            )}
            {byline && (
              <div
                className={`line-clamp-1 ${
                  active
                    ? "text-white text-opacity-60"
                    : "text-gray-1000 text-opacity-40 dark:text-white dark:text-opacity-60"
                }`}
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@deerpark"
                  />
                  <AvatarFallback>YK</AvatarFallback>
                </Avatar>
                <span>Yoon Kim</span>
              </div>
            )}
          </div>
        </Link>
      </ListItem>
    )
  })
}
