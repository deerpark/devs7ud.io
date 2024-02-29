"use client"

import { useTheme } from "next-themes"
import * as React from "react"

import useSafeAreaInsets from "@/hooks/useSafeAreaInsets"
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
  const { hasInset } = useSafeAreaInsets()

  const roundedTopClassName = hasInset ? "rounded-t-5xl" : ""
  const roundedContinerTopClassName = hasInset
    ? "rounded-t-5xl"
    : "rounded-t-3xl"

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
          currentScrollOffset !== 0 ? "active" : "",
          magicTitle && offset >= 100
            ? "border-foreground/10 dark:border-foreground/20 border-t"
            : "",
          magicTitle && offset >= 100 ? roundedContinerTopClassName : ""
        )}
      >
        {magicTitle && segment === "posts" && (
          <div
            data-opacity={opacity}
            style={{
              opacity: opacity + 1 === 1 ? 0 : opacity + 1.3,
            }}
            // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
            className={cn(
              "pointer-events-none absolute inset-0 -top-[calc(100vh/2.5+24px)] z-0 h-[calc(100vh/2.5+24px)] w-full backdrop-blur-sm transition-all",
              roundedTopClassName
            )}
          />
        )}
        <div
          style={{
            background: `hsla(var(${background}) / ${(background !== '--card' ? backgroundColorOpacity : 1) || 1}`,
          }}
          className={cn(
            "pointer-events-none absolute inset-0 z-0 size-full transition-all duration-500",
            offset < 100 ? "backdrop-blur-sm" : "",
            magicTitle && offset >= 100 ? roundedContinerTopClassName : ""
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
                className="text-foreground group/button mr-3 flex items-center justify-center rounded-md p-2 lg:hidden"
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
                "transform-gpu",
                magicTitle ? "flex items-center space-x-2 lg:px-5" : "flex-1"
              )}
            >
              {tag && <Badge className="block flex-none truncate">{tag}</Badge>}
              <span className="text-foreground line-clamp-1 text-base font-bold">
                {title}
              </span>
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
