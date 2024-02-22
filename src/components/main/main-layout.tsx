"use client"

import useWindowSize from "@/hooks/useWindowSize"
import { Sidebar } from "@/components/sidebar"
import GlobalNavigation from "../navigation"
import * as React from "react"

type MainLayoutProps = {
  counts: {
    posts: number
    bookmarks: number
  }
} & React.PropsWithChildren

export default function MainLayout({ children, counts }: MainLayoutProps) {
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
    <div
      id="root"
      className="flex size-full min-h-screen items-stretch lg:overflow-hidden"
    >
      {windowWidth > 1023 ? (
        <>
          <Sidebar counts={counts} />
        </>
      ) : (
        <GlobalNavigation />
      )}
      <div
        id="contents"
        className="relative flex flex-1 lg:max-h-screen lg:overflow-y-auto"
      >
        {children}
      </div>
    </div>
  )
}
