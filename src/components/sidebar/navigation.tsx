import {
  FaAddressCardIcon,
  FaBlogIcon,
  FaBookmarkIcon,
  FaHouseIcon,
  FaArrowUpRightIcon,
  FaWreathLaurelIcon,
} from "../icon-duotone"
import { /* FaGithubIcon,  */ FaTwitterIcon } from "../icon-brand"
import { NavigationLink } from "./navigation-link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import * as React from "react"

type SidebarNavigationProps = {
  counts: {
    posts: number
    bookmarks: number
  }
}

export function SidebarNavigation({ counts }: SidebarNavigationProps) {
  const pathname = usePathname()
  const t = useTranslations("SYSTEM.navigation")
  const sections = [
    {
      label: null,
      items: [
        {
          href: "/",
          label: t("index.home"),
          icon: FaHouseIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "") === "/",
          trailingAction: null,
          isExternal: false,
        },

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
      ],
    },
    {
      label: t("me.label"),
      items: [
        {
          href: "/bookmarks",
          label: t("me.bookmarks"),
          icon: FaBookmarkIcon,
          trailingAccessory: null,
          isActive:
            pathname.replace(/en|ko|fr/g, "").indexOf("/bookmarks") >= 0,
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
      ],
    },
    {
      label: t("projects.label"),
      items: [
        {
          href: "https://coni.gsretail.com",
          label: t("projects.coni"),
          icon: FaWreathLaurelIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
      ],
    },
    {
      label: t("online.label"),
      items: [
        {
          href: "https://twitter.com/deerpark7",
          label: t("online.twitter"),
          icon: FaTwitterIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
        /* 
        {
          href: "https://github.com/deerpark",
          label: t("online.github"),
          icon: FaGithubIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        }, */
      ],
    },
  ]

  return (
    <div className="flex-1 space-y-1 p-3">
      {sections.map((section) => {
        return (
          <ul key={`${section?.label}`} className="space-y-1">
            {section.label && (
              <h4
                key={section.label}
                className="text-muted-foreground/50 px-2 pb-2 pt-5 text-xs font-semibold"
              >
                {section.label}
              </h4>
            )}
            {section.items.map((item) => (
              <NavigationLink key={item.label} link={item} />
            ))}
          </ul>
        )
      })}
    </div>
  )
}
