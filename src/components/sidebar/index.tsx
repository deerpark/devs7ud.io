"use client"

import * as React from "react"

import Favicon from "@/public/assets/icons/favicon-mono.svg"
import { useLocale, useTranslations } from "next-intl"
import { ThemeSwitcher } from "../theme-switcher"
import { ResizablePanel } from "../ui/resizable"
import { SidebarNavigation } from "./navigation"
import LocaleSwitcher from "../locale-switcher"
import SidebarFooter from "./footer"
import { cn } from "@/lib/utils"
import Link from "next/link"

type SidebarProps = {
  counts: {
    posts: number
    bookmarks: number
  }
  defaultSize: number
  minMaxSize: number[]
}

export function Sidebar({
  counts,
  defaultSize,
  minMaxSize: [minSize, maxSize],
}: SidebarProps) {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <>
      <ResizablePanel
        id="sidebar"
        defaultSize={defaultSize}
        minSize={minSize}
        maxSize={maxSize}
        className={cn(
          "bg-background",
          "relative flex flex-none flex-col space-y-5 overflow-y-auto overflow-x-hidden text-sm"
        )}
        order={1}
      >
        <div className="sticky top-0 flex min-h-14 flex-none items-center px-3">
          <Link href={`/${locale}`} className="flex items-center space-x-1">
            <span>
              <Favicon
                className={cn("text-primary dark:text-tertiary size-8")}
                viewBox="0 0 140 138"
                preserveAspectRatio="xMidYMid meet"
              />
            </span>
            <span className="px-1.5 font-black">devs7udio</span>
          </Link>
        </div>
        <SidebarNavigation counts={counts} />
        <div className="flex-none space-y-1 px-3">
          <h4 className="text-foreground/60 px-1.5 py-3 text-xs font-semibold">
            {t("SYSTEM.settings.label")}
          </h4>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <SidebarFooter />
      </ResizablePanel>
    </>
  )
}
