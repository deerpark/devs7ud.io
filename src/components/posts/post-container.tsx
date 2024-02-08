"use client"

import { useTranslations } from "next-intl"
import Scratch from "../filters/scratch"
import { Category } from "@/types/post"
import { TitleBar } from "../title-bar"
import { useTheme } from "next-themes"
import { P } from "../ui/typography"
import { cn } from "@/lib/utils"
import * as React from "react"

type PostContainerProps = {
  title: string
  description: string
  tags?: Category[]
} & React.PropsWithChildren

export default function PostContainer({
  children,
  title,
  description,
  tags,
}: PostContainerProps) {
  const scrollContainerRef = React.useRef(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const t = useTranslations("POSTS.category")
  const { theme } = useTheme()
  const isDarkmode =
    theme === "dark" ||
    (theme === "system" &&
      window?.matchMedia &&
      window?.matchMedia("(prefers-color-scheme: dark)").matches)
  return (
    <div
      ref={scrollContainerRef}
      id="main"
      className="relative flex max-h-screen w-full flex-1 flex-col overflow-y-auto"
    >
      <TitleBar
        backButton
        globalMenu={false}
        backButtonHref={"/posts"}
        magicTitle
        title={title}
        tag={tags?.map((tag) => t(tag.name)).join(", ")}
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
      />
      <div className="max-w-full">
        <div className="mx-auto max-w-max p-8">
          <Scratch
            height={70}
            fontSize={40}
            gap={-1}
            isDarkmode={isDarkmode}
            foregroundColor="#73DCFF"
            backgroundColor="#9673FF"
          >
            {tags?.map((tag) => t(tag.name)).join(", ") || ""}
          </Scratch>
          <h1
            ref={titleRef}
            className={cn(
              "font-heading from-foreground to-foreground/70 break-keep bg-gradient-to-r bg-clip-text pb-2 pt-20 text-center font-black text-transparent",
              title.length >= 20
                ? "text-4xl/[1.05]"
                : title.length >= 15
                  ? "text-5xl/[1.05]"
                  : "text-6xl/[1.05]"
            )}
          >
            {title}
          </h1>
          <P className="text-muted-foreground !mt-3 mb-20 break-keep text-center text-sm 2xl:px-1">
            {description}
          </P>
          {children}
        </div>
      </div>
    </div>
  )
}
