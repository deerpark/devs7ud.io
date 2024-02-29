"use client"

import { useParams } from "next/navigation"
import { TitleBar } from "../title-bar"
import { cn } from "@/lib/utils"
import * as React from "react"

type ListProps = {
  title: React.ReactNode
  contents: React.ReactNode
  search: React.ReactNode
} & React.PropsWithChildren

export default function List({
  children,
  title,
  contents,
  search,
  ...rest
}: ListProps) {
  const params = useParams<{ slug: string; locale: string }>()
  const scrollContainerRef = React.useRef(null)

  return (
    <div className="flex max-w-full flex-1">
      <div
        id="list"
        className={cn(
          "flex-none transition-all duration-500",
          params.slug ? "hidden lg:flex" : "min-h-screen w-full"
        )}
      >
        <div
          ref={scrollContainerRef}
          className={cn(
            "lg:bg-card/30 relative size-full max-h-screen min-h-screen flex-none overflow-y-auto pb-20 transition-all lg:w-80 lg:border-r xl:w-96",
            params.slug ? "bg-popover" : "bg-background"
          )}
          {...rest}
        >
          <TitleBar
            scrollContainerRef={scrollContainerRef}
            title={title}
            searchAccessory={search}
            background="--card"
          />
          <div className="divide-border/30 lg:divide-border/0 divide-y py-3 lg:px-3">
            {contents}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
