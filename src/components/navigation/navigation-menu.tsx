"use client"

import { TbExternalLinkOff } from "react-icons/tb"
import { PiGithubLogoBold } from "react-icons/pi"
import { BsBookmarkStar } from "react-icons/bs"
import NavigationLink from "./navigation-link"
import { HiOutlineHome } from "react-icons/hi"
import { usePathname } from "next/navigation"
import { LiaIdCard } from "react-icons/lia"
import { useTranslations } from "next-intl"
import { GrArticle } from "react-icons/gr"
import * as React from "react"

type SidebarNavigationProps = {
  counts: {
    posts?: number
    bookmarks?: number
  }
}

export function GlobalNavigationMenu({ counts }: SidebarNavigationProps) {
  const pathname = usePathname()
  const t = useTranslations("SYSTEM.navigation")
  const sections = [
    {
      href: "/",
      label: t("index.home"),
      icon: HiOutlineHome,
      trailingAccessory: null,
      isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/posts") >= 0,
      trailingAction: null,
      isExternal: false,
      count: counts.posts,
    },
    {
      href: "/posts",
      label: t("index.posts"),
      icon: GrArticle,
      trailingAccessory: null,
      isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/posts") >= 0,
      trailingAction: null,
      isExternal: false,
      count: counts.posts,
    },
    {
      href: "/bookmarks",
      label: t("me.bookmarks"),
      icon: BsBookmarkStar,
      trailingAccessory: null,
      isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/bookmarks") >= 0,
      isExternal: false,
      count: counts.bookmarks,
    },
    {
      href: "/about",
      label: t("me.about"),
      icon: LiaIdCard,
      trailingAccessory: null,
      isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/about") >= 0,
      trailingAction: null,
      isExternal: false,
    },
    /* {
      href: "https://coni.gsretail.com",
      label: t("projects.coni"),
      icon: FaWreathLaurelIcon,
      trailingAccessory: TbExternalLinkOff,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    }, */
    /* {
      href: "https://twitter.com/deerpark7",
      label: t("online.twitter"),
      icon: FaTwitterIcon,
      trailingAccessory: TbExternalLinkOff,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    }, */
    {
      href: "https://github.com/deerpark",
      label: t("online.github"),
      icon: PiGithubLogoBold,
      trailingAccessory: TbExternalLinkOff,
      isActive: false,
      trailingAction: null,
      isExternal: true,
    },
  ]

  return (
    <ul className="flex flex-1 items-center justify-center">
      {sections.map((item) => (
        <NavigationLink key={item.label} link={item} />
      ))}
    </ul>
  )
}
