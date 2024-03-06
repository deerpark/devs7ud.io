"use client"

import * as React from "react"

import DesktopNavigation from "./desktop-navigation"
import MobileNavigation from "./mobile-navigation"
import useWindowSize from "@/hooks/useWindowSize"

type SidebarProps = {
  counts?: {
    posts: number
    bookmarks: number
  }
}

export function Sidebar({ counts }: SidebarProps) {
  const { width } = useWindowSize()
  return (
    <>
      {width > 1024 ? (
        <DesktopNavigation counts={counts} />
      ) : width ? (
        <MobileNavigation />
      ) : null}
    </>
  )
}
