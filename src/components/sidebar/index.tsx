"use client"

import * as React from "react"

import LogoTypo from "@/public/assets/icons/logo-typo-mono.svg"
import Favicon from "@/public/assets/icons/favicon-mono.svg"
import { GlobalNavigationContext } from "../providers"
import { ThemeSwitcher } from "../theme-switcher"
import { SidebarNavigation } from "./navigation"
import LocaleSwitcher from "../locale-switcher"
import { useTranslations } from "next-intl"
import { SidebarOverlay } from "./overlay"
import { TitleBar } from "../title-bar"
import SidebarFooter from "./footer"

type SidebarProps = {
  postCount: number
}

export function Sidebar({ postCount }: SidebarProps) {
  const navigationContext = React.useContext(GlobalNavigationContext)
  const navIsOpen = navigationContext.isOpen
  const scrollContainerRef = React.useRef<HTMLElement>(null)
  const t = useTranslations()
  return (
    <>
      <nav
        ref={scrollContainerRef}
        className={`absolute ${
          navIsOpen
            ? "inset-y-0 left-0 translate-x-0 shadow-lg"
            : "-translate-x-full"
        } 3xl:w-80 bg-card z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none flex-col overflow-y-auto border-r transition duration-200 ease-in-out sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 2xl:w-72`}
      >
        <TitleBar
          scrollContainerRef={scrollContainerRef}
          leadingAccessory={null}
          title={
            <div className="flex items-center">
              <Favicon
                className="text-foreground/80 ml-1 mr-2 size-5 lg:ml-1.5 lg:mr-3.5 lg:size-[18px]"
                viewBox="0 0 140 138"
                preserveAspectRatio="xMidYMid meet"
              />
              <LogoTypo
                className="text-foreground/80 w-28 lg:w-24"
                viewBox="0 0 141 18"
                preserveAspectRatio="xMidYMid meet"
                title={t("SIDEBAR.title")}
              />
            </div>
          }
        />
        <SidebarNavigation postCount={postCount} />
        <div className="space-y-1 p-3">
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
