"use client"

import { FaLeftToLine } from "./icon-duotone"
import { useRouter } from "next/navigation"
import ScrollToTop from "./scroll-to-top"
import { Button } from "./ui/button"
import { throttle } from "lodash"
import { cn } from "@/lib/utils"
import * as React from "react"

type FloatingMenuProps = {
  backButton?: boolean
  backButtonHref?: string
  scrollContainerRef?: React.RefObject<HTMLElement> | null
}

export default function FloatingMenu({
  backButton = false,
  backButtonHref,
  scrollContainerRef = null,
}: FloatingMenuProps) {
  const router = useRouter()
  const [isShow, setShow] = React.useState<boolean>(false)

  const handleScrollToTop: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      if (!scrollContainerRef?.current) return
      scrollContainerRef.current.scrollTop = 0
    }, [scrollContainerRef])

  const handleScroll = throttle<(this: HTMLElement, ev: Event) => any>(() => {
    if (!scrollContainerRef?.current) return
    setShow(scrollContainerRef.current.scrollTop > 50)
  }, 100)

  const handleNavToBack = React.useCallback(() => {
    if (!backButtonHref) return
    router.push(backButtonHref)
  }, [backButtonHref, router])

  React.useEffect(() => {
    const element = scrollContainerRef?.current
    if (!element) return

    element.addEventListener("scroll", handleScroll)

    // 이벤트 리스너 제거 시 함수 참조를 직접 전달
    return () => element.removeEventListener("scroll", handleScroll)
  }, [handleScroll, scrollContainerRef])
  return (
    <div
      className={cn(
        "ease-expo-in-out fixed bottom-[calc(112px+env(safe-area-inset-bottom))] right-7 z-50 flex flex-col space-y-2 transition-all duration-500 lg:bottom-9",
        isShow ? "translate-y-0 " : "translate-y-11"
      )}
    >
      {backButton && backButtonHref && (
        <Button
          size="icon"
          variant="outline"
          onClick={handleNavToBack}
          className="border-background group/button size-12 rounded-full shadow-2xl lg:hidden"
        >
          <FaLeftToLine className={cn("size-6")} />
        </Button>
      )}
      <ScrollToTop isShow={isShow} handleScrollToTop={handleScrollToTop} />
    </div>
  )
}
