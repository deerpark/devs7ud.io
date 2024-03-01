import {
  FaHeadSideIcon as FarImagePolaroidUserIcon,
  FaFeatherIcon as FarFeatherIcon,
  FaPinataIcon as FarBookmarkIcon,
  FaCampgroundIcon as FarHouseIcon,
  FaAwardIcon as FarWreathLaurelIcon,
  FaEllipsisVerticalIcon,
} from "../icon-regular"
import {
  FaHeadSideIcon,
  FaFeatherIcon,
  FaPinataIcon,
  FaCampgroundIcon,
  FaArrowUpRightIcon,
  FaAwardIcon,
} from "../icon-duotone"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer"
import { GlobalNavigationLink } from "./global-navigation-link"
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

type SidebarNavigationProps = {
  global?: boolean
  counts: {
    posts: number
    bookmarks: number
  }
}

export function SidebarNavigation({
  counts,
  global = false,
}: SidebarNavigationProps) {
  const pathname = usePathname()
  const t = useTranslations("SYSTEM")
  const sections = [
    {
      label: null,
      extra: false,
      global: true,
      items: [
        {
          href: "/",
          label: t("navigation.index.home"),
          icon: FarHouseIcon,
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
          icon: FarFeatherIcon,
          activeIcon: FaFeatherIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/posts") >= 0,
          trailingAction: null,
          isExternal: false,
          count: counts.posts,
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
          href: "/bookmarks",
          label: t("navigation.me.bookmarks"),
          icon: FarBookmarkIcon,
          activeIcon: FaPinataIcon,
          trailingAccessory: null,
          isActive:
            pathname.replace(/en|ko|fr/g, "").indexOf("/bookmarks") >= 0,
          isExternal: false,
          count: counts.bookmarks,
          global: true,
        },
        {
          href: "/about",
          label: t("navigation.me.about"),
          icon: FarImagePolaroidUserIcon,
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
      label: t("navigation.projects.label"),
      extra: false,
      global: true,
      items: [
        {
          href: "/projects",
          label: t("navigation.projects.label"),
          icon: FarWreathLaurelIcon,
          activeIcon: FaAwardIcon,
          trailingAccessory: null,
          isActive: false,
          trailingAction: null,
          isExternal: false,
          global: true,
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
    <ul className="flex h-14 w-full items-stretch">
      {sections
        .filter((s) => !s.extra && s.global)
        .map((section) => section.items)
        .flat()
        .filter((s) => s.global)
        .map((item) => (
          <GlobalNavigationLink key={item.label} link={item} />
        ))}
      {sections
        .filter((s) => s.extra)
        .map((section) => (
          <li
            key={section.label}
            className="relative flex flex-1 flex-col items-center justify-center"
          >
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-foreground/50 group flex w-full flex-1 items-center justify-center rounded-md !bg-transparent p-2 text-sm font-medium"
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
                  >
                    <FaEllipsisVerticalIcon className="fa-dark dark:fa-light size-6 transition-all group-hover:size-8 group-active:size-4" />
                  </motion.span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
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
