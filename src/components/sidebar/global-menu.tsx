import {
  FaHeadSideIcon,
  FaNewspaperIcon,
  FaPinataIcon,
  FaCampgroundIcon,
  FaArrowUpRightIcon,
  FaBoxHeartIcon,
  FaEllipsisVerticalIcon,
} from "../icon-duotone"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer"
import { MobileNavigationLink } from "./mobile-navigation-link"
import { FaGithubIcon, FaTwitterIcon } from "../icon-brand"
import { NavigationLink } from "./navigation-link"
import { ThemeSwitcher } from "../theme-switcher"
import LocaleSwitcher from "../locale-switcher"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import SidebarFooter from "./footer"
import * as React from "react"

type NavigationProps = {
  global?: boolean
  counts?: {
    posts: number
    bookmarks: number
  }
  scrollDir?: "UP" | "DOWN"
  width: number
}

export function GlobalMenu({
  counts,
  global = false,
  scrollDir,
  width,
}: NavigationProps) {
  const pathname = usePathname()
  const t = useTranslations("SYSTEM")
  const isMobile = width <= 1024
  const sections = [
    {
      label: null,
      extra: false,
      global: true,
      items: [
        {
          href: "/",
          label: t("navigation.index.home"),
          icon: FaCampgroundIcon,
          activeIcon: FaCampgroundIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "") === "/",
          trailingAction: null,
          isExternal: false,
          global: true,
        },

        {
          href: "/posts",
          label: t("navigation.index.posts"),
          icon: FaNewspaperIcon,
          activeIcon: FaNewspaperIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/posts") >= 0,
          trailingAction: null,
          isExternal: false,
          count: counts?.posts,
          global: true,
        },
      ],
    },
    {
      label: t("navigation.me.label"),
      extra: false,
      global: true,
      items: [
        {
          href: "/projects",
          label: t("navigation.me.projects"),
          icon: FaBoxHeartIcon,
          activeIcon: FaBoxHeartIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/projects") >= 0,
          trailingAction: null,
          isExternal: false,
          global: true,
        },
        {
          href: "/bookmarks",
          label: t("navigation.me.bookmarks"),
          icon: FaPinataIcon,
          activeIcon: FaPinataIcon,
          trailingAccessory: null,
          isActive:
            pathname.replace(/en|ko|fr/g, "").indexOf("/bookmarks") >= 0,
          isExternal: false,
          count: counts?.bookmarks,
          global: true,
        },
        {
          href: "/about",
          label: t("navigation.me.about"),
          icon: FaHeadSideIcon,
          activeIcon: FaHeadSideIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/about") >= 0,
          trailingAction: null,
          isExternal: false,
          global: false,
        },
      ],
    },
    {
      label: t("navigation.online.label"),
      extra: false,
      global: false,
      items: [
        {
          href: "https://twitter.com/devs7udio",
          label: t("navigation.online.twitter"),
          icon: FaTwitterIcon,
          activeIcon: FaTwitterIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
          global: true,
        },
        {
          href: "https://github.com/deerpark",
          label: t("navigation.online.github"),
          icon: FaGithubIcon,
          activeIcon: FaGithubIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
          global: true,
        },
      ],
    },
    {
      label: t("navigation.extra.label"),
      extra: true,
      global: true,
      items: [
        {
          href: "https://twitter.com/devs7udio",
          label: t("navigation.online.twitter"),
          icon: FaTwitterIcon,
          activeIcon: FaTwitterIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
          global: true,
        },
        {
          href: "https://github.com/deerpark",
          label: t("navigation.online.github"),
          icon: FaGithubIcon,
          activeIcon: FaGithubIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
          global: true,
        },
      ],
    },
  ]

  return global ? (
    <ul className="flex h-16 w-full items-stretch space-x-1">
      {sections
        .filter((s) => !s.extra && s.global)
        .map((section) => section.items)
        .flat()
        .filter((s) => s.global)
        .map((item) => (
          <MobileNavigationLink
            key={item.label}
            link={item}
            scrollDir={scrollDir}
          />
        ))}
      {sections
        .filter((s) => s.extra)
        .map((section) => (
          <li
            key={section.label}
            className="relative flex flex-1 flex-col items-center justify-center"
          >
            <Drawer direction={isMobile ? "bottom" : "top"}>
              <DrawerTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-accent-foreground group flex w-full flex-1 items-center justify-center rounded-md p-2 text-sm font-medium active:scale-95"
                >
                  <motion.span
                    key="default-icon"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 0.5,
                      opacity: 0,
                      transition: { duration: 0.1 },
                    }}
                    className="relative z-20"
                  >
                    <FaEllipsisVerticalIcon className="size-6 transition-all" />
                  </motion.span>
                  <span className="bg-accent ease-expo-in-out pointer-events-none absolute inset-0 z-10 scale-75 rounded-lg opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
                </Button>
              </DrawerTrigger>
              <DrawerContent
                className={isMobile ? "bottom-5" : "bottom-auto top-5"}
              >
                <div className="mx-auto w-full max-w-sm">
                  <div className="flex flex-col p-4">
                    <ul className="text-alt-foreground flex-none space-y-1 p-3">
                      {section.items
                        .filter((s) => s.global)
                        .map((item) => (
                          <NavigationLink key={item.label} link={item} />
                        ))}
                    </ul>
                    <div className="flex-none space-y-1 p-3">
                      <h4 className="text-muted-foreground px-2 pb-2 pt-5 text-xs font-semibold">
                        {t("settings.label")}
                      </h4>
                      <LocaleSwitcher />
                      <ThemeSwitcher />
                    </div>
                    <SidebarFooter />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </li>
        ))}
    </ul>
  ) : (
    <div className="flex-1 space-y-1 p-3">
      {sections
        .filter((s) => !s.extra)
        .map((section) => {
          return (
            <ul key={`${section?.label}`} className="space-y-1">
              {section.label && (
                <h4
                  key={section.label}
                  className="text-muted-foreground px-2 pb-2 pt-5 text-xs font-semibold"
                >
                  {section.label}
                </h4>
              )}
              {section.items.map((item) => (
                <NavigationLink key={item.label} link={item} badge />
              ))}
            </ul>
          )
        })}
    </div>
  )
}
