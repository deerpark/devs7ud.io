"use client"

import { useTheme } from "next-themes"
import * as React from "react"

import useWindowSize from "@/hooks/useWindowSize"
import { FaLeftToLine } from "./icon-duotone"
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
  backButton?: boolean
  backButtonHref?: string
  magicTitle?: boolean
  titleRef?: React.RefObject<HTMLHeadingElement> | null
  scrollContainerRef?: React.RefObject<HTMLElement> | null
  children?: React.ReactNode
  leadingAccessory?: React.ReactNode
  trailingAccessory?: React.ReactNode
  searchAccessory?: React.ReactNode
  background?: "--background" | "--card"
}

export function TitleBar({
  title,
  tag,
  segment,
  backButton = false,
  backButtonHref,
  magicTitle = false,
  titleRef = null,
  scrollContainerRef = null,
  leadingAccessory = null,
  trailingAccessory = null,
  searchAccessory = null,
  background = "--background",
  children,
}: Props) {
  const { theme } = useTheme()
  const [offset, setOffset] = React.useState(200)
  const [opacity, _setOpacity] = React.useState(0)
  const [currentScrollOffset, _setCurrentScrollOffset] = React.useState(0)
  const [backgroundColorOpacity, setBackgroundColorOpacity] = React.useState(0)
  const router = useRouter()
  const { width } = useWindowSize()

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
  const scrollingElementRef = React.useMemo(
    () => (width >= 1024 ? scrollContainerRef : { current: document.body }),
    [width, scrollContainerRef]
  )

  const handler = React.useCallback(() => {
    const shadowOpacity = scrollingElementRef?.current?.scrollTop ?? 0 / 200
    console.log(shadowOpacity)
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
  }, [scrollingElementRef, setCurrentScrollOffset, titleRef, setOpacity])

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
    console.log("React.useEffect")
    // eslint-disable-next-line no-underscore-dangle
    const _scrollContainerRef = scrollingElementRef?.current
    console.log("_scrollContainerRef", _scrollContainerRef)
    _scrollContainerRef?.addEventListener("scroll", handler)
    return () => _scrollContainerRef?.removeEventListener("scroll", handler)
  }, [scrollingElementRef, handler])

  React.useEffect(() => {
    if (!titleRef?.current || !scrollingElementRef) return
    if (scrollingElementRef && "current" in scrollingElementRef) {
      if (!scrollingElementRef.current) return
      scrollingElementRef.current.scrollTop = 0
    }
    setOpacity(0)
    setInitialTitleOffsets({
      bottom: titleRef.current.getBoundingClientRect().bottom - 56,
      top: titleRef.current.getBoundingClientRect().top - 48,
    })
  }, [
    titleRef,
    scrollingElementRef,
    setOpacity,
    setInitialTitleOffsets,
    scrollContainerRef,
  ])

  return (
    <>
      <div
        style={{
          boxShadow:
            opacity > 0
              ? `0 1px 20px rgba(0,0,0,${currentScrollOffset})`
              : "none",
        }}
        className={cn(
          "group/bar sticky top-0 z-30 flex min-h-[calc(56px+env(safe-area-inset-top))] flex-col justify-center px-3 transition-all duration-500",
          currentScrollOffset !== 0 ? "active" : ""
        )}
      >
        <div
          style={{
            background: `hsla(var(${background}) / ${backgroundColorOpacity || (magicTitle ? 1 : 0)})`,
          }}
          className={cn(
            "pointer-events-none absolute inset-0 z-0 size-full backdrop-blur-sm transition-all duration-500"
          )}
        />
        <div
          className={cn(
            "relative flex-none transition-all duration-500",
            segment !== "posts" ||
              !magicTitle ||
              (opacity !== 0 && opacity > -0.45)
              ? "pt-[calc(env(safe-area-inset-top))]"
              : ""
          )}
        >
          <span className="flex min-h-14 w-full items-center">
            {backButton && backButtonHref && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNavToBack}
                className="group/button mr-3 flex items-center justify-center rounded-md p-2 lg:hidden"
              >
                <FaLeftToLine className={cn("size-4")} />
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
                "text-secondary-foreground transform-gpu py-5 md:py-0",
                magicTitle ? "flex items-center space-x-2 lg:px-5" : "flex-1"
              )}
            >
              {tag && <Badge className="block flex-none truncate">{tag}</Badge>}
              <span className="line-clamp-1 text-base font-bold">{title}</span>
            </h2>
            {magicTitle && <div className="flex-1" />}
            {trailingAccessory && trailingAccessory}
          </span>
          {searchAccessory && searchAccessory}
        </div>

        <div>{children}</div>
      </div>
    </>
  )
}
