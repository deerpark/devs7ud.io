"use client"

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
        className="group/item bookmark relative"
      >
        <ListItemLink
          segment={segment}
          url={url}
          onClick={onClick}
          className="relative z-10"
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
              className="ring-border size-12 rounded-full bg-[url('/assets/images/cool-background.png')] bg-cover object-cover ring-1 lg:size-8"
            />
          </div>
          <div className="flex w-full flex-col justify-center">
            <div
              className={`text-foreground group-[.active]:text-secondary-foreground flex items-center justify-between`}
            >
              <span className="line-clamp-3 text-base font-bold lg:text-sm/[1.15]">
                {title}
              </span>
            </div>
            {(link || categories) && (
              <div className="flex items-center space-x-1 text-sm lg:text-xs/[1.15]">
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
          </div>
        </ListItemLink>
      </ListItem>
    )
  })
}
