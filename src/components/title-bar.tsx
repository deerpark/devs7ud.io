"use client"

import { useTheme } from "next-themes"
import * as React from "react"

import GlobalMenuButton from "./global-menu-button"
import { FaArrowLeft } from "./icon-duotone"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

type InitialTitleOffsets = {
  top: number
  bottom: number
}

interface Props {
  title: React.ReactNode
  segment?: string
  tag?: React.ReactNode
  globalMenu?: boolean
  backButton?: boolean
  backButtonHref?: string
  magicTitle?: boolean
  invert?: boolean
  titleRef?: React.RefObject<HTMLHeadingElement> | null
  scrollContainerRef?: React.RefObject<HTMLElement> | null
  children?: React.ReactNode
  leadingAccessory?: React.ReactNode
  trailingAccessory?: React.ReactNode
}

export function TitleBar({
  title,
  segment,
  tag,
  globalMenu = true,
  backButton = false,
  backButtonHref,
  magicTitle = false,
  invert = false,
  titleRef = null,
  scrollContainerRef = null,
  leadingAccessory = null,
  trailingAccessory = null,
  children,
}: Props) {
  const { theme } = useTheme()
  const [offset, setOffset] = React.useState(200)
  const [opacity, _setOpacity] = React.useState(0)
  const [currentScrollOffset, _setCurrentScrollOffset] = React.useState(0)
  const [backgroundColorOpacity, setBackgroundColorOpacity] = React.useState(0)
  const router = useRouter()

  const isDarkmode = React.useMemo(
    () =>
      theme === "dark" ||
      (theme === "system" &&
        window?.matchMedia &&
        window?.matchMedia("(prefers-color-scheme: dark)").matches),
    [theme]
  )

  const [initialTitleOffsets, _setInitialTitleOffsets] =
    React.useState<InitialTitleOffsets>({
      top: 0,
      bottom: 0,
    })

  const initialTitleOffsetsRef = React.useRef(initialTitleOffsets)
  const setInitialTitleOffsets = React.useCallback(
    (data: InitialTitleOffsets) => {
      initialTitleOffsetsRef.current = data
      _setInitialTitleOffsets(data)
    },
    []
  )

  const opacityRef = React.useRef(opacity)
  const setOpacity = React.useCallback((data: number) => {
    opacityRef.current = data
    _setOpacity(data)
  }, [])

  const currentScrollOffsetRef = React.useRef(currentScrollOffset)
  const setCurrentScrollOffset = React.useCallback((data: number) => {
    currentScrollOffsetRef.current = data
    _setCurrentScrollOffset(data)
  }, [])

  const handler = React.useCallback(() => {
    const shadowOpacity = scrollContainerRef?.current?.scrollTop ?? 0 / 200
    setCurrentScrollOffset(shadowOpacity > 0.12 ? 0.12 : shadowOpacity)

    if (!titleRef?.current || !initialTitleOffsetsRef?.current) return

    const titleTop = titleRef.current.getBoundingClientRect().top - 48
    const titleBottom = titleRef.current.getBoundingClientRect().bottom - 56
    const initialOffsets = initialTitleOffsetsRef.current

    const offsetAmount =
      parseFloat((titleBottom / initialOffsets.bottom).toFixed(2)) * 100

    const opacityOffset =
      parseFloat((titleTop / initialOffsets.top).toFixed(2)) * -1

    setOffset(Math.min(Math.max(offsetAmount, 0), 100))
    setOpacity(opacityOffset)
  }, [scrollContainerRef, setCurrentScrollOffset, titleRef, setOpacity])

  const handleNavToBack = React.useCallback(() => {
    if (!backButtonHref) return
    router.push(backButtonHref)
  }, [backButtonHref, router])

  React.useEffect(() => {
    setBackgroundColorOpacity(
      currentScrollOffset === 0
        ? currentScrollOffset
        : isDarkmode
          ? currentScrollOffset + 0.5
          : currentScrollOffset + 0.8
    )
  }, [currentScrollOffset, isDarkmode])

  React.useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _scrollContainerRef = scrollContainerRef?.current
    _scrollContainerRef?.addEventListener("scroll", handler)
    return () => _scrollContainerRef?.removeEventListener("scroll", handler)
  }, [scrollContainerRef, handler])

  React.useEffect(() => {
    if (!titleRef?.current || !scrollContainerRef?.current) return
    if (scrollContainerRef && "current" in scrollContainerRef) {
      // eslint-disable-next-line no-param-reassign
      scrollContainerRef.current.scrollTop = 0
    }
    setOpacity(0)
    setInitialTitleOffsets({
      bottom: titleRef.current.getBoundingClientRect().bottom - 56,
      top: titleRef.current.getBoundingClientRect().top - 48,
    })
  }, [titleRef, scrollContainerRef, setOpacity, setInitialTitleOffsets])

  return (
    <div
      className={cn(
        "group/bar sticky top-0 z-10 flex flex-col justify-center px-3 pt-[calc(env(safe-area-inset-top))] transition-all duration-1000",
        currentScrollOffset !== 0 ? "active" : ""
      )}
    >
      {magicTitle && segment === "posts" && (
        <div
          className={cn(
            "from-foreground/30 to-foreground/0 dark:from-background/50 dark:to-background/0 pointer-events-none absolute inset-0 z-0 size-full h-28 bg-gradient-to-b pt-[calc(env(safe-area-inset-top))] contrast-150 transition-all",
            currentScrollOffset !== 0
              ? "duration-2000 opacity-0"
              : "opacity-100 duration-300"
          )}
        />
      )}
      <div
        style={{
          background: `linear-gradient(180deg, hsla(var(--background) / ${backgroundColorOpacity}) 0%, hsla(var(--background) / 0) 100%)`,
          boxShadow: `0 1px 20px rgba(0,0,0,${currentScrollOffset})`,
        }}
        className={cn(
          "pointer-events-none absolute inset-0 z-0 size-full transition-all",
          currentScrollOffset !== 0
            ? "duration-2000 opacity-100 backdrop-blur-sm"
            : "opacity-0 duration-300"
        )}
      />
      <div className="relative flex min-h-14 flex-none items-center justify-between py-2">
        <span className="flex w-full items-center">
          {globalMenu && <GlobalMenuButton invert={invert} />}

          {backButton && backButtonHref && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNavToBack}
              className="text-foreground group/button mr-3 flex items-center justify-center rounded-md p-2 lg:hidden"
            >
              <FaArrowLeft
                className={cn(
                  "size-4",
                  invert
                    ? "fa-light group-[.active]/bar:fa-default group-hover/button:fa-default"
                    : ""
                )}
              />
            </Button>
          )}

          {leadingAccessory && leadingAccessory}

          <h2
            style={
              magicTitle
                ? {
                    transform: `translateY(${offset}%)`,
                    opacity: `${opacity}`,
                  }
                : {}
            }
            className={cn(
              "transform-gpu",
              magicTitle ? "flex items-center space-x-2 lg:px-5" : ""
            )}
          >
            {tag && <Badge className="block flex-none truncate">{tag}</Badge>}
            <span className="text-foreground line-clamp-1 text-base font-bold">
              {title}
            </span>
          </h2>
        </span>

        {trailingAccessory && trailingAccessory}
      </div>

      <div>{children}</div>
    </div>
  )
}
