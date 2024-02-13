"use client"

import { Category } from "@/types/post.type"
import DetailToolbar from "./detail-toolbar"
import { useTranslations } from "next-intl"
import FloatingMenu from "./floating-menu"
import Scratch from "./filters/scratch"
import { motion } from "framer-motion"
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
  blurDataURL?: string
  invert?: boolean
} & React.PropsWithChildren

export default function DetailContainer({
  children,
  title,
  segment = "posts",
  description,
  fancyTitle = false,
  categories,
  poster,
  invert = false,
}: DetailContainerProps) {
  const scrollContainerRef = React.useRef(null)
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
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
          invert={invert}
          title={title}
          tag={categories
            ?.map((category) => t(`POSTS.category.${category.name}`))
            .join(", ")}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
          trailingAccessory={<DetailToolbar />}
        />
        {poster && (
          <div
            className={cn(
              "expo-out relative mb-16 mt-[calc(-64px-env(safe-area-inset-top))] transition duration-500",
              imgLoaded ? "h-[calc(100vh/3)] opacity-100" : "h-0 opacity-0"
            )}
          >
            <Image
              src={poster}
              width={1600}
              height={1200}
              alt=""
              onLoad={handleLoadImage}
              /* placeholder="blur"
            blurDataURL={blurDataURL} */
              className={cn(
                "from-primary/20 to-primary/0 slide-in-from-top fade-in expo-out h-[calc(100vh/3)] w-full max-w-full bg-gradient-to-b object-cover duration-500",
                imgLoaded ? "animate-in" : ""
              )}
            />
            <div className="to-background from-background/50 absolute inset-0 bottom-auto h-[calc(100vh/3)] bg-gradient-to-b" />
          </div>
        )}
        <motion.div
          key="contents"
          layout
          className="flex max-w-full flex-1 flex-col"
        >
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
        </motion.div>
      </div>
      <FloatingMenu scrollContainerRef={scrollContainerRef} />
    </>
  )
}
