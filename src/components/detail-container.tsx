"use client"

import useDeviceDetaction from "@/hooks/useDeviceDetaction"
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
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const { isIPhone } = useDeviceDetaction()
  const t = useTranslations()
  const { theme } = useTheme()
  const isDarkmode =
    theme === "dark" ||
    (theme === "system" &&
      window?.matchMedia &&
      window?.matchMedia("(prefers-color-scheme: dark)").matches)
  const handleLoadImage = React.useCallback(() => {
    setImgLoaded(true)
  }, [])
  const roundedTopClassName = isIPhone ? "rounded-t-5xl" : "rounded-t-3xl"
  const posterSrc = poster?.length
    ? poster[1] && poster[0] && isDarkmode
      ? poster[1]
      : poster[0]
    : ""
  return (
    <>
      <div
        ref={scrollContainerRef}
        id="main"
        className="relative flex max-h-screen w-full flex-1 flex-col overflow-y-auto scroll-smooth transition-all duration-500"
      >
        {posterSrc && (
          <>
            <div
              className={cn(
                "from-primary to-tertiary absolute inset-0 h-0 overflow-hidden bg-gradient-to-b pt-[calc(100vh/3)]",
                roundedTopClassName,
                "sm:rounded-t-none",
                isIPhone ? "fixed" : "relative"
              )}
            >
              <Image
                src={posterSrc}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt=""
                onLoad={handleLoadImage}
                /* placeholder="blur"
            blurDataURL={blurDataURL} */
                className={cn(
                  "from-primary/20 to-primary/0 absolute inset-0 size-full max-h-[calc(100vh/3)] max-w-full bg-gradient-to-b object-cover transition-all",
                  imgLoaded
                    ? "animate-gradient-mask fill-mode-both opacity-0"
                    : "opacity-0"
                )}
              />
              {createdBy && (
                <div className="bg-background/20 ring-background/20 text-foreground/70 absolute right-5 top-[calc(12px+env(safe-area-inset-top))] z-20 flex size-8 items-center justify-center rounded-full ring-2 backdrop-blur-sm">
                  {createdBy}
                </div>
              )}
              {byLine && (
                <div className="bg-background/20 text-foreground/70 absolute left-5 top-[calc(12px+env(safe-area-inset-top))] z-20 flex h-8 items-center rounded-2xl p-0.5 px-4 text-sm/8 backdrop-blur-sm">
                  {byLine}
                </div>
              )}
            </div>
          </>
        )}
        <div
          className={cn(
            "bg-background relative flex max-w-full flex-1 flex-col shadow-2xl",
            roundedTopClassName,
            isIPhone ? "mt-[calc(100vh/3-46px)]" : "-mt-12"
          )}
        >
          <TitleBar
            segment={segment}
            backButton
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
          <div
            className={cn(
              "flex flex-1 flex-col p-8 sm:pt-16 md:pt-20 lg:pt-24"
            )}
          >
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
                "text-muted-foreground !mt-3 flex-none break-keep text-center text-sm 2xl:px-1",
                fancyTitle ? "mt-20" : "mb-20 sm:mb-32 md:mb-36 lg:mb-40"
              )}
            >
              {description}
            </P>
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
