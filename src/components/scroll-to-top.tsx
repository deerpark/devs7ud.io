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
      variant="secondary"
      size="icon"
      className={cn(
        "bg-primary/75 border-background ease-expo-in-out group size-9 rounded-full backdrop-blur-sm transition-all duration-500",
        isShow ? "opacity-100" : "opacity-0"
      )}
      onClick={handleScrollToTop}
    >
      <FaUpToLineIcon className="fa-light dark:fa-dark group-hover:fa-default size-5" />
    </Button>
  )
}
