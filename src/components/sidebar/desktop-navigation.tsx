"use client"

import LogoTypo from "@/public/assets/icons/logo-typo-mono.svg"
import Favicon from "@/public/assets/icons/favicon-mono.svg"
import useDeviceDetaction from "@/hooks/useDeviceDetaction"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeSwitcher } from "../theme-switcher"
import LocaleSwitcher from "../locale-switcher"
import { useTranslations } from "next-intl"
import { SidebarOverlay } from "./overlay"
import { Navigation } from "./navigation"
import { TitleBar } from "../title-bar"
import SidebarFooter from "./footer"
import { cn } from "@/lib/utils"
import * as React from "react"
import Link from "next/link"

interface DesktopNavigationProps {
  counts: { posts: number; bookmarks: number }
}

export default function DesktopNavigation({ counts }: DesktopNavigationProps) {
  const scrollContainerRef = React.useRef(null)
  const t = useTranslations()
  const { isIPhone, isMobile } = useDeviceDetaction()
  const roundedRightClassName = isIPhone
    ? "rounded-r-lg"
    : isMobile
      ? "rounded-r-md"
      : ""
  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={scrollContainerRef}
        key="sidebar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5 },
        }}
        className={cn(
          `3xl:w-80 bg-background text-card-foreground ease-expo-in-out fixed inset-y-0 left-0 z-30 flex h-full min-h-[100vw+env(safe-area-inset-top)+env(safe-area-inset-bottom)] w-3/4 flex-none flex-col overflow-y-auto overflow-x-hidden border-r transition-all duration-500 sm:w-1/2 md:w-1/3 lg:relative lg:inset-y-auto lg:z-auto lg:max-h-screen lg:min-h-screen lg:w-56 2xl:w-72`,
          roundedRightClassName
        )}
      >
        <TitleBar
          scrollContainerRef={scrollContainerRef}
          leadingAccessory={null}
          title={
            <Link
              href="/"
              className="group/logo flex min-h-6 items-center px-1.5 py-2 lg:px-0"
            >
              <Favicon
                className={cn(
                  "text-primary ease-expo-in-out ml-1 mr-2 size-5 transition-all group-hover/logo:scale-125 lg:ml-[7px] lg:mr-3 lg:size-[18px]"
                )}
                viewBox="0 0 140 138"
                preserveAspectRatio="xMidYMid meet"
              />
              <LogoTypo
                className="text-primary ease-expo-in-out w-28 -translate-x-4 opacity-0 transition-all delay-100 duration-500 group-hover/logo:translate-x-0 group-hover/logo:opacity-100 lg:w-24"
                viewBox="0 0 141 18"
                preserveAspectRatio="xMidYMid meet"
                title={t("SIDEBAR.title")}
              />
            </Link>
          }
        />
        <Navigation counts={counts} />
        <div className="flex-none space-y-1 p-3">
          <h4 className="text-muted-foreground px-2 pb-2 pt-5 text-xs font-semibold">
            {t("SYSTEM.settings.label")}
          </h4>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <SidebarFooter />
      </motion.div>
      <SidebarOverlay />
    </AnimatePresence>
  )
}
