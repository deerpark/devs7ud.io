"use client"

import useWindowSize from "@/hooks/useWindowSize"
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
}

export default function FloatingMenu({
  backButton = false,
  backButtonHref,
}: FloatingMenuProps) {
  const router = useRouter()
  const { width } = useWindowSize()
  const [isShow, setShow] = React.useState<boolean>(false)

  const isMobile = width <= 1024

  const handleScrollToTop: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      if (isMobile) {
        ;(document.scrollingElement || document.documentElement).scrollTop = 0
      } else {
        const element = document.getElementById("main")
        if (!element) return
        console.log(element.scrollTop)
        element.scrollTop = 0
      }
    }, [isMobile])

  // 스로틀링을 useCallback 밖에서 적용
  const handleScroll = React.useCallback(() => {
    let scrollY = 0
    if (isMobile) {
      scrollY = window.scrollY
    } else {
      const element = document.getElementById("main")
      if (!element) return
      scrollY = element.scrollTop
    }
    setShow(scrollY > 50)
  }, [isMobile])

  // 스로틀링 적용
  const throttledHandleScroll = React.useMemo(
    () => throttle(handleScroll, 100),
    [handleScroll]
  )

  React.useLayoutEffect(() => {
    if (isMobile) {
      if (!window) return
      window.addEventListener("scroll", throttledHandleScroll, {
        passive: true,
      })
      return () => window.removeEventListener("scroll", throttledHandleScroll)
    } else {
      const element = document.getElementById("main")
      if (!element) return
      element.addEventListener("scroll", throttledHandleScroll, {
        passive: true,
      })
      return () => element.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [throttledHandleScroll, isMobile])

  const handleNavToBack = React.useCallback(() => {
    if (!backButtonHref) return
    router.push(backButtonHref)
  }, [backButtonHref])
  return (
    <div
      className={cn(
        "ease-expo-in-out fixed bottom-[calc(104px+env(safe-area-inset-bottom))] right-7 z-50 flex flex-col space-y-2 transition-all duration-500 lg:bottom-9",
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
