"use client"

import * as React from "react"

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import ListItemLink from "../list/list-link"
import ListItem from "../list/list-item"
/* import { useLocale } from "next-intl" */
import Image from "next/image"
/* import { cn } from "@/lib/utils" */

export interface BookmarksProps {
  data: PageObjectResponse[]
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
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
    const description = (item.properties?.Description as any)?.rich_text[0]
      ?.plain_text
    const favicon = (item.properties?.Favicon as any)?.files[0]?.file?.url
    return (
      <ListItem
        key={item.id}
        layoutKey={item.id}
        className="group/item bookmark relative"
      >
        <ListItemLink
          segment={segment}
          url={url}
          onClick={onClick}
          className="relative z-10"
        >
          {leadingAccessory}
          <div className="flex size-12 flex-none items-center justify-center rounded-full shadow-lg lg:size-10">
            <Image
              alt="Image"
              src={favicon}
              // width={banner.width}
              width={48}
              height={48}
              sizes="(max-width: 48px) 100vw"
              className="ring-border bg-primary/25 size-full rounded-full object-cover ring-1"
            />
          </div>
          <div className="flex w-full flex-col justify-center">
            <div
              className={`text-foreground group-[.active]:text-secondary-foreground flex items-center justify-between`}
            >
              <span className="line-clamp-1 text-base/tight font-semibold group-[.active]:font-bold lg:text-sm/tight">
                {title}
              </span>
            </div>
            {description && (
              <div className="line-clamp-1 text-xs/tight opacity-50">
                {description}
              </div>
            )}
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
