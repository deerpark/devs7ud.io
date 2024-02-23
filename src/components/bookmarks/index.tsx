import * as React from "react"

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import ListItemLink from "../list/list-link"
import { Category } from "@/types/post.type"
import { Separator } from "../ui/separator"
import ListItem from "../list/list-item"
/* import { useLocale } from "next-intl" */
import Image from "next/image"
/* import { cn } from "@/lib/utils" */

export interface BookmarksProps {
  data: PageObjectResponse[]
  onClick?: () => void
  leadingAccessory?: React.ReactElement | null
  slug?: string | string[] | undefined
}

const segment = "bookmarks"

export function Bookmarks(props: BookmarksProps) {
  const { data, onClick, leadingAccessory = null } = props
  // const locale = useLocale()

  return data.map((item) => {
    const url = `/${segment}/${(item.properties?.Slug as any)?.rich_text[0].plain_text}`
    const title = (item.properties?.Title as any)?.title[0]?.plain_text
    /* const description = (item.properties?.Description as any)?.rich_text[0]
      ?.plain_text */
    const link = (item.properties?.Link as any)?.url?.match(
      /^(?:https?:\/\/)?(?:www\.)?([^\/:]+)/
    )
    const favicon = (item.properties?.Favicon as any)?.files[0]?.file?.url
    const categories: Category[] =
      (item.properties?.Categories as any)?.multi_select || []
    return (
      <ListItem
        key={item.id}
        layoutKey={item.id}
        className="group/item bookmark"
      >
        <ListItemLink
          segment={segment}
          url={url}
          onClick={onClick && onClick}
          className=""
        >
          {leadingAccessory}
          <div className="flex flex-none items-center justify-center">
            <Image
              alt="Image"
              src={favicon}
              // width={banner.width}
              width={48}
              height={48}
              className="ring-border bg-background size-12 rounded-lg object-cover ring-1 lg:size-8 lg:rounded-md"
            />
          </div>
          <div className="flex w-full flex-col justify-center">
            <div
              className={`text-secondary-foreground/70 group-[.active]:text-primary-foreground flex items-center justify-between`}
            >
              <span className="line-clamp-3 text-base font-bold lg:text-sm/[1.15]">
                {title}
              </span>
            </div>
            {(link || categories) && (
              <div className="text-muted-foreground/70 group-[.active]:text-primary-foreground/70 flex items-center space-x-1 text-sm lg:text-xs/[1.15]">
                {link && (
                  <>
                    <span className="line-clamp-1">{link[1]}</span>
                    <Separator
                      orientation="vertical"
                      className="size-0.5 rounded-full"
                    />
                  </>
                )}
                {categories?.length && (
                  <span className="line-clamp-1">
                    {categories.map((category) => category.name).join(", ")}
                  </span>
                )}
              </div>
            )}
            {/* {description && (
              <div
                className={`text-muted-foreground group-[.active]:text-primary-foreground/70 line-clamp-2 text-base/5 lg:text-sm/4`}
              >
                {description}
              </div>
            )} */}
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
