"use client"

import * as React from "react"

import { FaLeftToLine } from "./icon-duotone"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

interface Props {
  title: React.ReactNode
  segment?: string
  tag?: React.ReactNode
  backButton?: boolean
  backButtonHref?: string
  magicTitle?: boolean
  children?: React.ReactNode
  leadingAccessory?: React.ReactNode
  trailingAccessory?: React.ReactNode
  searchAccessory?: React.ReactNode
}

export function TitleBar({
  title,
  tag,
  /* segment, */
  backButton = false,
  backButtonHref,
  magicTitle = false,
  leadingAccessory = null,
  trailingAccessory = null,
  searchAccessory = null,
  children,
}: Props) {
  const router = useRouter()
  const [inviewCover, setInviewCover] = React.useState(false)
  const handleNavToBack = React.useCallback(() => {
    if (!backButtonHref) return
    router.push(backButtonHref)
  }, [backButtonHref, router])

  React.useLayoutEffect(() => {
    const coverRef = document.getElementById("cover")
    if (!coverRef) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setInviewCover(entry.isIntersecting)
      })
    })

    observer.observe(coverRef)

    return () => {
      if (coverRef) {
        observer.unobserve(coverRef)
      }
    }
  }, [])

  return (
    <>
      <div
        className={cn(
          "group/bar fixed inset-x-0 top-0 z-30 flex min-h-[calc(56px+env(safe-area-inset-top))] flex-col justify-center transition-all duration-500 lg:sticky lg:inset-x-auto",
          !magicTitle || (magicTitle && !inviewCover)
            ? "bg-background/80 backdrop-blur-sm"
            : "bg-gradient-to-b from-black/20 to-black/0 2xl:from-black/0",
          magicTitle && !inviewCover ? "shadow-2xl" : "",
          (magicTitle && !(backButton && backButtonHref)) ||
            (magicTitle && !tag)
            ? "pl-8 pr-3"
            : "px-3"
        )}
      >
        <div
          className={cn(
            "relative flex-none pt-[calc(env(safe-area-inset-top))] transition-all duration-500",
            inviewCover ? "fa-white 2xl:fa-black dark:2xl:fa-white" : ""
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
              className={cn(
                "text-secondary-foreground flex flex-1 transform-gpu items-center space-x-3 opacity-0 transition-all duration-500 md:py-0",
                !magicTitle || (magicTitle && !inviewCover)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1"
              )}
            >
              {tag && <Badge className="block flex-none truncate">{tag}</Badge>}
              <span className="line-clamp-1 text-base font-bold">{title}</span>
              {magicTitle && <div className="flex-1" />}
            </h2>
            {trailingAccessory && trailingAccessory}
          </span>
          {searchAccessory && searchAccessory}
        </div>

        <div>{children}</div>
      </div>
    </>
  )
}
