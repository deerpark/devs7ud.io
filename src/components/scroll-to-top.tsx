"use client"

import { FaUpToLineIcon } from "./icon-duotone"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import * as React from "react"

type ScrollToTopProps = {
  isShow: boolean
  handleScrollToTop: React.MouseEventHandler<HTMLButtonElement>
}

export default function ScrollToTop({
  isShow,
  handleScrollToTop,
}: ScrollToTopProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        "border-background ease-expo-in-out group size-12 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-500",
        isShow ? "opacity-100" : "opacity-0"
      )}
      onClick={handleScrollToTop}
    >
      <FaUpToLineIcon className="size-6" />
    </Button>
  )
}
