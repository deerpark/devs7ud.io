"use client"

import { useParams } from "next/navigation"
import { LayoutGroup } from "framer-motion"
import { TitleBar } from "../title-bar"
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
        className={`flex-none transition-all duration-500 ${params.slug ? "hidden lg:flex" : "min-h-screen w-full"}`}
      >
        <div
          ref={scrollContainerRef}
          className="bg-popover lg:bg-card/30 relative size-full max-h-screen min-h-screen flex-none overflow-y-auto pb-20 transition-all lg:w-80 lg:border-r xl:w-96"
          {...rest}
        >
          <TitleBar
            scrollContainerRef={scrollContainerRef}
            title={title}
            searchAccessory={search}
          />
          <LayoutGroup>
            <div className="divide-border/30 divide-y py-3 lg:divide-y-0 lg:px-3">
              {contents}
            </div>
          </LayoutGroup>
        </div>
      </div>
      {children}
    </div>
  )
}
