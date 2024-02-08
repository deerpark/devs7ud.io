"use client"

import * as React from "react"

import LogoTypo from "@/public/assets/icons/logo-typo-mono.svg"
import Favicon from "@/public/assets/icons/favicon-mono.svg"
import { GlobalNavigationContext } from "../providers"
import { SidebarNavigation } from "./navigation"
import { useTranslations } from "next-intl"
import { SidebarOverlay } from "./overlay"
import { TitleBar } from "../title-bar"
import SidebarFooter from "./footer"

export function Sidebar() {
  const navigationContext = React.useContext(GlobalNavigationContext)
  const navIsOpen = navigationContext.isOpen
  const scrollContainerRef = React.useRef<HTMLElement>(null)
  const t = useTranslations("SIDEBAR")
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
                className="text-foreground/80 ml-1 mr-1.5 size-5 lg:size-[18px]"
                viewBox="0 0 140 138"
                preserveAspectRatio="xMidYMid meet"
              />
              <LogoTypo
                className="text-foreground/80 w-28 lg:w-24"
                viewBox="0 0 141 18"
                preserveAspectRatio="xMidYMid meet"
                title={t("title")}
              />
            </div>
          }
        />
        <SidebarNavigation />
        <SidebarFooter />
      </nav>

      <SidebarOverlay />
    </>
  )
}
