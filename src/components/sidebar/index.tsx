"use client"

import * as React from "react"

import LogoTypo from "@/public/assets/icons/logo-typo-mono.svg"
import Favicon from "@/public/assets/icons/favicon-mono.svg"
import useToggleClassname from "@/hooks/useToggleClassname"
import { GlobalNavigationContext } from "../providers"
import { ThemeSwitcher } from "../theme-switcher"
import { SidebarNavigation } from "./navigation"
import LocaleSwitcher from "../locale-switcher"
import { useTranslations } from "next-intl"
import { SidebarOverlay } from "./overlay"
import { TitleBar } from "../title-bar"
import SidebarFooter from "./footer"
import { cn } from "@/lib/utils"
import Link from "next/link"

type SidebarProps = {
  counts: {
    posts: number
    bookmarks: number
  }
}

export function Sidebar({ counts }: SidebarProps) {
  const navigationContext = React.useContext(GlobalNavigationContext)
  const navIsOpen = navigationContext.isOpen
  const scrollContainerRef = React.useRef<HTMLElement>(null)
  const t = useTranslations()
  useToggleClassname(
    navIsOpen,
    "shrink-left",
    (typeof document !== "undefined" &&
      (document.getElementById("main") || document.getElementById("list"))) ||
      null
  )
  return (
    <>
      <nav
        ref={scrollContainerRef}
        className={cn(
          `3xl:w-80 bg-background ease-expo-in-out fixed inset-y-0 z-30 flex h-full min-h-[100vw+env(safe-area-inset-top)+env(safe-area-inset-bottom)] w-3/4 flex-none flex-col overflow-y-auto overflow-x-hidden border-r transition-all duration-500 sm:w-1/2 md:w-1/3 lg:relative lg:inset-y-auto lg:z-auto lg:max-h-screen lg:w-56 lg:translate-x-0 2xl:w-72`,
          navIsOpen ? "left-0 translate-x-0 shadow-lg" : "-translate-x-full"
        )}
      >
        <TitleBar
          scrollContainerRef={scrollContainerRef}
          leadingAccessory={null}
          title={
            <Link href="/" className="flex items-center">
              <Favicon
                className={cn(
                  "text-primary dark:text-tertiary mr-2 size-5 lg:ml-[7px] lg:mr-3 lg:size-[18px]",
                  navIsOpen ? "ml-0.5 mr-2.5" : "ml-1 mr-2"
                )}
                viewBox="0 0 140 138"
                preserveAspectRatio="xMidYMid meet"
              />
              <LogoTypo
                className="text-primary dark:text-tertiary w-28 lg:w-24"
                viewBox="0 0 141 18"
                preserveAspectRatio="xMidYMid meet"
                title={t("SIDEBAR.title")}
              />
            </Link>
          }
        />
        <SidebarNavigation counts={counts} />
        <div className="flex-none space-y-1 p-3">
          <h4 className="text-muted-foreground/50 px-2 pb-2 pt-5 text-xs font-semibold">
            {t("SYSTEM.settings.label")}
          </h4>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <SidebarFooter />
      </nav>

      <SidebarOverlay />
    </>
  )
}
