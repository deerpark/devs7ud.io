"use client"

import { Category } from "@/types/post.type"
import DetailToolbar from "./detail-toolbar"
import FloatingMenu from "./floating-menu"
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
  const tag = categories?.map((category) => category.name).join(", ")
  return (
    <>
      <div
        id="main"
        className={cn(
          "bg-background relative flex w-full max-w-full flex-1 flex-col transition-all duration-500",
          "overflow-x-hidden lg:max-h-screen lg:overflow-y-auto lg:scroll-smooth"
        )}
      >
        <TitleBar
          segment={segment}
          backButton
          backButtonHref={`/${segment}`}
          magicTitle
          title={title}
          tag={tag}
          trailingAccessory={<DetailToolbar />}
        />
        <div className="mt-[-calc(env(safe-area-inset-top))] flex flex-1 flex-col p-8 pt-0 lg:mt-[calc(-64px-env(safe-area-inset-top))] 2xl:mt-0">
          {children}
        </div>
      </div>
      <FloatingMenu backButton backButtonHref={`/${segment}`} />
    </>
  )
}
