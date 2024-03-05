"use client"

import { Category } from "@/types/post.type"
import DetailToolbar from "./detail-toolbar"
/* import FloatingMenu from "./floating-menu" */
import { TitleBar } from "./title-bar"
import { cn } from "@/lib/utils"
import * as React from "react"

type DetailContainerProps = {
  title: string
  segment?: string
  categories?: Category[]
} & React.PropsWithChildren

export default function DetailContainer({
  children,
  title,
  segment = "posts",
  categories,
}: DetailContainerProps) {
  const scrollContainerRef = React.useRef(null)
  const tag = categories?.map((category) => category.name).join(", ")
  return (
    <>
      <div
        ref={scrollContainerRef}
        id="main"
        className={cn(
          "relative flex w-full flex-1 flex-col transition-all duration-500",
          "lg:max-h-screen lg:overflow-y-auto lg:overflow-x-hidden lg:scroll-smooth"
        )}
      >
        <div
          className={cn(
            "bg-background relative flex max-w-full flex-1 flex-col shadow-2xl"
          )}
        >
          <TitleBar
            segment={segment}
            backButton
            backButtonHref={`/${segment}`}
            magicTitle
            title={title}
            tag={tag}
            scrollContainerRef={scrollContainerRef}
            trailingAccessory={<DetailToolbar />}
          />
          <div className="mt-[calc(-56px-env(safe-area-inset-top))] flex flex-1 flex-col p-8 pt-0">
            {children}
          </div>
        </div>
      </div>
      {/* <FloatingMenu
        scrollContainerRef={scrollContainerRef}
        backButton
        backButtonHref={`/${segment}`}
      /> */}
    </>
  )
}
