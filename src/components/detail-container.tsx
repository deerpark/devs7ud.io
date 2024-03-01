"use client"

import { Category } from "@/types/post.type"
import DetailToolbar from "./detail-toolbar"
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
  poster?: string[]
  blurDataURL?: string
  createdBy?: React.ReactNode
  byLine?: React.ReactNode
} & React.PropsWithChildren

export default function DetailContainer({
  children,
  title,
  segment = "posts",
  description,
  fancyTitle = false,
  categories,
  poster,
  createdBy,
  byLine,
}: DetailContainerProps) {
  const scrollContainerRef = React.useRef(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const { theme } = useTheme()
  const isDarkmode =
    theme === "dark" ||
    (theme === "system" &&
      window?.matchMedia &&
      window?.matchMedia("(prefers-color-scheme: dark)").matches)
  const posterSrc = poster?.length
    ? poster[1] && poster[0] && isDarkmode
      ? poster[1]
      : poster[0]
    : ""
  const tag = categories?.map((category) => category.name).join(", ")

  const handleLoadImage = React.useCallback(() => {
    setImgLoaded(true)
  }, [])
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
            titleRef={titleRef}
            scrollContainerRef={scrollContainerRef}
            trailingAccessory={<DetailToolbar />}
          />
          <div
            className={cn("flex flex-1 flex-col p-8 pt-16 md:pt-20 lg:pt-24")}
          >
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
                  "font-heading from-primary to-primary/70 flex-none break-all bg-gradient-to-r bg-clip-text pb-2 text-center font-black text-transparent lg:break-keep",
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
                "text-muted-foreground !mt-3 flex-none break-keep text-center text-sm 2xl:px-1",
                fancyTitle ? "mt-20" : "mb-20 sm:mb-32 md:mb-36 lg:mb-40"
              )}
            >
              {description}
            </P>
            {posterSrc && (
              <div className="relative mx-auto mb-20 mt-6 aspect-square max-h-[calc(100vh/1.5)] w-full max-w-7xl overflow-hidden rounded-3xl sm:mb-32 md:mb-36 lg:mb-40 lg:aspect-video">
                <Image
                  src={posterSrc}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt=""
                  onLoad={handleLoadImage}
                  /* placeholder="blur"
          blurDataURL={blurDataURL} */
                  className={cn(
                    "from-primary/20 to-primary/0 absolute inset-0 size-full bg-gradient-to-b object-cover transition-all",
                    imgLoaded
                      ? "animate-gradient-mask fill-mode-both opacity-0"
                      : "opacity-0"
                  )}
                />
                {createdBy && (
                  <div className="bg-background/50 ring-background/50 absolute right-5 top-5 z-20 flex size-8 items-center justify-center rounded-full ring-2 backdrop-blur-sm">
                    {createdBy}
                  </div>
                )}
                {byLine && (
                  <div className="bg-background/50 absolute bottom-5 left-5 z-20 flex h-8 items-center rounded-2xl p-0.5 px-4 text-sm/8 backdrop-blur-sm">
                    {byLine}
                  </div>
                )}
              </div>
            )}
            <div className="mb-20 flex items-center justify-center space-x-2 sm:mb-32 md:mb-36 lg:mb-40">
              {categories?.map((category) => (
                <Badge key={category.id} variant="outline" className="">
                  {category.name}
                </Badge>
              ))}
            </div>
            {children}
          </div>
        </div>
      </div>
      <FloatingMenu
        scrollContainerRef={scrollContainerRef}
        backButton
        backButtonHref={`/${segment}`}
      />
    </>
  )
}
