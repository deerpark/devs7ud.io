import {
  FaAddressCardIcon,
  FaBlogIcon,
  FaBookmarkIcon,
  FaArrowUpRightIcon,
  FaWreathLaurelIcon,
} from "../icon-duotone"
import { NavigationLink } from "./navigation-link"
import { usePathname } from "next/navigation"
import { FaGithubIcon } from "../icon-brand"
import { useTranslations } from "next-intl"
import * as React from "react"

type SidebarNavigationProps = {
  counts: {
    posts?: number
    bookmarks?: number
  }
}

export function SidebarNavigation({ counts }: SidebarNavigationProps) {
  const pathname = usePathname()
  const t = useTranslations("SYSTEM.navigation")
  const sections = [
    {
      href: "/posts",
      label: t("index.posts"),
      icon: FaBlogIcon,
      trailingAccessory: null,
      isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/posts") >= 0,
      trailingAction: null,
      isExternal: false,
      count: counts.posts,
    },
    {
      href: "/bookmarks",
      label: t("me.bookmarks"),
      icon: FaBookmarkIcon,
      trailingAccessory: null,
      isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/bookmarks") >= 0,
      isExternal: false,
      count: counts.bookmarks,
    },
    {
      href: "/about",
      label: t("me.about"),
      icon: FaAddressCardIcon,
      trailingAccessory: null,
      isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/about") >= 0,
      trailingAction: null,
      isExternal: false,
    },
    {
      href: "https://coni.gsretail.com",
      label: t("projects.coni"),
      icon: FaWreathLaurelIcon,
      trailingAccessory: FaArrowUpRightIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },
    /* {
      href: "https://twitter.com/deerpark7",
      label: t("online.twitter"),
      icon: FaTwitterIcon,
      trailingAccessory: FaArrowUpRightIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    }, */
    {
      href: "https://github.com/deerpark",
      label: t("online.github"),
      icon: FaGithubIcon,
      trailingAccessory: FaArrowUpRightIcon,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },
  ]

  return (
    <ul className="flex-1 space-y-1">
      {sections.map((item) => (
        <NavigationLink key={item.label} link={item} />
      ))}
    </ul>
  )
}
