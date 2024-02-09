"use client"

import { FaUpToLineIcon } from "./icon-duotone"
import { Button } from "./ui/button"
import { throttle } from "lodash"
import { cn } from "@/lib/utils"
import * as React from "react"

type ScrollToTopProps = {
  scrollContainerRef?: React.RefObject<HTMLElement> | null
}

export default function ScrollToTop({
  scrollContainerRef = null,
}: ScrollToTopProps) {
  const [show, setShow] = React.useState<boolean>(false)
  const handleScrollToTop: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      if (!scrollContainerRef?.current) return
      scrollContainerRef.current.scrollTop = 0
    }, [scrollContainerRef])
  const handleScroll = throttle<(this: HTMLElement, ev: Event) => any>(() => {
    if (!scrollContainerRef?.current) return
    setShow(scrollContainerRef.current.scrollTop > 50)
  }, 100)
  React.useEffect(() => {
    const element = scrollContainerRef?.current
    if (!element) return

    element.addEventListener("scroll", handleScroll)

    // 이벤트 리스너 제거 시 함수 참조를 직접 전달
    return () => element.removeEventListener("scroll", handleScroll)
  }, [handleScroll, scrollContainerRef])
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        "bg-primary/75 border-background group size-9 rounded-full backdrop-blur-sm transition-all duration-500 ease-in-out",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
      onClick={handleScrollToTop}
    >
      <FaUpToLineIcon className="fa-light dark:fa-dark group-hover:fa-default size-5" />
    </Button>
  )
}
