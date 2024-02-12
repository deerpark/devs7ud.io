"use client"

import { Category } from "@/types/post.type"
import DetailToolbar from "./detail-toolbar"
import { useTranslations } from "next-intl"
import FloatingMenu from "./floating-menu"
import Scratch from "./filters/scratch"
import { TitleBar } from "./title-bar"
import { useTheme } from "next-themes"
import { P } from "./ui/typography"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import * as React from "react"

type DetailContainerProps = {
  title: string
  segment?: string
  description: string
  fancyTitle?: boolean
  categories?: Category[]
  poster?: string
} & React.PropsWithChildren

export default function DetailContainer({
  children,
  title,
  segment = "posts",
  description,
  fancyTitle = false,
  categories,
  poster,
}: DetailContainerProps) {
  const scrollContainerRef = React.useRef(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const t = useTranslations()
  const { theme } = useTheme()
  const isDarkmode =
    theme === "dark" ||
    (theme === "system" &&
      window?.matchMedia &&
      window?.matchMedia("(prefers-color-scheme: dark)").matches)
  return (
    <>
      <div
        ref={scrollContainerRef}
        id="main"
        className="ease-expo-in-out relative flex max-h-screen w-full flex-1 flex-col overflow-y-auto scroll-smooth transition-all duration-500"
      >
        <TitleBar
          backButton
          globalMenu={false}
          backButtonHref={`/${segment}`}
          magicTitle
          title={title}
          tag={categories
            ?.map((category) => t(`POSTS.category.${category.name}`))
            .join(", ")}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
          trailingAccessory={<DetailToolbar />}
        />
        {poster && (
          <div className="relative -mt-16 mb-16">
            <Image
              src={poster}
              width={1600}
              height={1200}
              alt=""
              className="max-h-[calc(100vh/2)] w-full max-w-full object-cover"
            />
            <div className="to-background via-background/0 from-background/0 absolute inset-0 bg-gradient-to-b" />
          </div>
        )}
        <div className="flex max-w-full flex-1 flex-col">
          <div className="flex flex-1 flex-col p-8">
            <div className="mb-4 flex items-center justify-center space-x-2">
              {categories?.map((category) => (
                <Badge key={category.id} variant="outline" className="">
                  {t(`POSTS.category.${category.name}`)}
                </Badge>
              ))}
            </div>
            {fancyTitle ? (
              <Scratch
                height={70}
                fontSize={40}
                gap={-1}
                isDarkmode={isDarkmode}
                foregroundColor="#73DCFF"
                backgroundColor="#9673FF"
              >
                {title}
              </Scratch>
            ) : (
              <h1
                ref={titleRef}
                className={cn(
                  "font-heading from-foreground to-foreground/70 flex-none break-keep bg-gradient-to-r bg-clip-text pb-2 text-center font-black text-transparent",
                  title.length >= 20
                    ? "text-4xl/[1.05]"
                    : title.length >= 15
                      ? "text-5xl/[1.05]"
                      : "text-6xl/[1.05]"
                )}
              >
                {title}
              </h1>
            )}
            <P
              className={cn(
                "text-muted-foreground !mt-3 mb-20 flex-none break-keep text-center text-sm 2xl:px-1",
                fancyTitle ? "mt-20" : ""
              )}
            >
              {description}
            </P>
            {children}
          </div>
        </div>
      </div>
      <FloatingMenu scrollContainerRef={scrollContainerRef} />
    </>
  )
}
