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
    const screeshot = (item.properties?.Screenshot as any)?.files[0]?.file?.url
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
          className="relative z-10 items-start"
        >
          {leadingAccessory}
          <div className="flex flex-none items-center justify-center rounded-full shadow-lg">
            <Image
              alt="Image"
              src={favicon}
              // width={banner.width}
              width={48}
              height={48}
              sizes="(max-width: 48px) 100vw"
              className="ring-border bg-primary/25 size-12 rounded-full object-cover ring-1 lg:size-10"
            />
          </div>
          <div className="flex w-full flex-col justify-center">
            <div
              className={`text-foreground group-[.active]:text-secondary-foreground flex items-center justify-between`}
            >
              <span className="line-clamp-1 pt-1 text-base/tight font-semibold group-[.active]:font-bold lg:text-sm/tight">
                {title}
              </span>
            </div>
            {description && (
              <div className="line-clamp-2 text-xs/tight opacity-50">
                {description}
              </div>
            )}
            {screeshot && (
              <div className="relative mt-3 flex aspect-[2/1] w-full max-w-[290px] items-center justify-center rounded-lg shadow-sm">
                <Image
                  alt="Screenshot"
                  src={screeshot}
                  // width={banner.width}
                  width={290}
                  height={48}
                  sizes="(max-width: 290px) 100vw"
                  className="ring-border bg-primary/25 size-full rounded-lg object-cover opacity-50 ring-1 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0 group-[.active]:opacity-100 group-[.active]:grayscale-0"
                />
              </div>
            )}
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
