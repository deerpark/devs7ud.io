"use client"

import useWindowSize from "@/hooks/useWindowSize"
import { useParams } from "next/navigation"
import { LayoutGroup } from "framer-motion"
import { TitleBar } from "../title-bar"
import { cn } from "@/lib/utils"
import * as React from "react"

type ListProps = {
  title: React.ReactNode
  contents: React.ReactNode
  search: React.ReactNode
} & React.PropsWithChildren

export default function List({
  children,
  title,
  contents,
  search,
  ...rest
}: ListProps) {
  const params = useParams<{ slug: string; locale: string }>()
  const scrollContainerRef = React.useRef(null)
  const { windowWidth, handleResize } = useWindowSize()

  React.useLayoutEffect(() => {
    if (typeof window !== "object") return

    // 컴포넌트가 마운트 될 때 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize)

    // 컴포넌트가 언마운트 될 때 리사이즈 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  return (
    <div id="container" className="flex max-w-full flex-1">
      {windowWidth > 767 && (
        <div
          id="list"
          className={cn(
            "flex-none transition-all duration-500",
            params.slug ? "" : "min-h-screen"
          )}
        >
          <div
            ref={scrollContainerRef}
            className={cn(
              "bg-popover lg:bg-card/30 relative size-full max-h-screen min-h-screen max-w-md flex-none overflow-y-auto pb-20",
              params.slug ? "" : "border-r"
            )}
            {...rest}
          >
            <TitleBar
              scrollContainerRef={scrollContainerRef}
              title={title}
              searchAccessory={search}
            />
            <LayoutGroup>
              <div className="divide-border/30 divide-y py-3 lg:divide-y-0 lg:px-3">
                {contents}
              </div>
            </LayoutGroup>
          </div>
        </div>
      )}
      {params.slug && (
        <div id="main" className="flex flex-1 flex-col">
          {children}
        </div>
      )}
    </div>
  )
}
