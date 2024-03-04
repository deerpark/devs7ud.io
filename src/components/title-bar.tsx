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
  scrollContainerRef?: React.RefObject<HTMLElement> | null
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
  const handleNavToBack = React.useCallback(() => {
    if (!backButtonHref) return
    router.push(backButtonHref)
  }, [backButtonHref, router])

  return (
    <>
      <div
        className={cn(
          "bg-background/80 group/bar sticky top-0 z-30 flex min-h-[calc(56px+env(safe-area-inset-top))] flex-col justify-center px-3 backdrop-blur-sm transition-all duration-500"
        )}
      >
        <div
          className={cn(
            "relative flex-none pt-[calc(env(safe-area-inset-top))] transition-all duration-500"
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
                "text-secondary-foreground transform-gpu py-5 md:py-0",
                magicTitle ? "hidden" : "flex-1"
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
