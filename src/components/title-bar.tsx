"use client"

import { useTheme } from "next-themes"
import * as React from "react"

import { FaArrowLeft, FaBars, FaCircleXmark } from "./icon"
import { GlobalNavigationContext } from "./providers"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

type InitialTitleOffsets = {
  top: number
  bottom: number
}

interface Props {
  title: React.ReactNode
  globalMenu?: boolean
  backButton?: boolean
  backButtonHref?: string
  magicTitle?: boolean
  titleRef?: React.RefObject<HTMLParagraphElement> | null
  scrollContainerRef?: React.RefObject<HTMLElement> | null
  children?: React.ReactNode
  leadingAccessory?: React.ReactNode
  trailingAccessory?: React.ReactNode
}

export function TitleBar({
  title,
  globalMenu = true,
  backButton = false,
  backButtonHref,
  magicTitle = false,
  titleRef = null,
  scrollContainerRef = null,
  leadingAccessory = null,
  trailingAccessory = null,
  children,
}: Props) {
  const { isOpen, setIsOpen } = React.useContext(GlobalNavigationContext)
  const { theme } = useTheme()
  const [offset, setOffset] = React.useState(200)
  const [opacity, _setOpacity] = React.useState(0)
  const [currentScrollOffset, _setCurrentScrollOffset] = React.useState(0)
  const router = useRouter()

  const isDarkmode =
    theme === "dark" ||
    (theme === "system" &&
      window?.matchMedia &&
      window?.matchMedia("(prefers-color-scheme: dark)").matches)

  const [initialTitleOffsets, _setInitialTitleOffsets] =
    React.useState<InitialTitleOffsets>({
      top: 0,
      bottom: 0,
    })

  const initialTitleOffsetsRef = React.useRef(initialTitleOffsets)
  const setInitialTitleOffsets = (data: InitialTitleOffsets) => {
    initialTitleOffsetsRef.current = data
    _setInitialTitleOffsets(data)
  }

  const opacityRef = React.useRef(opacity)
  const setOpacity = (data: number) => {
    opacityRef.current = data
    _setOpacity(data)
  }

  const currentScrollOffsetRef = React.useRef(currentScrollOffset)
  const setCurrentScrollOffset = (data: number) => {
    currentScrollOffsetRef.current = data
    _setCurrentScrollOffset(data)
  }

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
  }, [titleRef, scrollContainerRef])

  const handleNavToBack = React.useCallback(() => {
    if (!backButtonHref) return
    router.push(backButtonHref)
  }, [backButtonHref, router])

  const backgroundColor = isDarkmode ? "50,50,50" : "255,255,255"
  let backgroundColorOpacity
  if (currentScrollOffset === 0) {
    backgroundColorOpacity = currentScrollOffset
  } else {
    backgroundColorOpacity = isDarkmode
      ? currentScrollOffset + 0.5
      : currentScrollOffset + 0.8
  }

  React.useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _scrollContainerRef = scrollContainerRef?.current
    _scrollContainerRef?.addEventListener("scroll", handler)
    return () => _scrollContainerRef?.removeEventListener("scroll", handler)
  }, [title, titleRef, scrollContainerRef, handler])

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
  }, [title, titleRef, scrollContainerRef])

  return (
    <div
      style={{
        background: `rgba(${backgroundColor},${backgroundColorOpacity})`,
        boxShadow: `0 1px 3px rgba(0,0,0,${currentScrollOffset})`,
        minHeight: "48px",
      }}
      className="filter-blur border-border/50 sticky top-0 z-10 flex flex-col justify-center border-b px-3 py-2 lg:border-0 dark:border-b"
    >
      <div className="flex flex-none items-center justify-between">
        <span className="flex items-center">
          {globalMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground mr-3 lg:hidden"
            >
              {isOpen ? (
                <FaCircleXmark className="size-4" />
              ) : (
                <FaBars className="size-4" />
              )}
            </Button>
          )}

          {backButton && backButtonHref && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNavToBack}
              className="text-foreground mr-3 flex items-center justify-center rounded-md p-2 lg:hidden"
            >
              <FaArrowLeft className="size-4" />
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
            className={
              "text-foreground line-clamp-1 transform-gpu text-sm font-bold"
            }
          >
            {title}
          </h2>
        </span>

        {trailingAccessory && trailingAccessory}
      </div>

      <div>{children}</div>
    </div>
  )
}
