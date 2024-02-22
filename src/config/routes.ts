import {
  FaAddressCardIcon,
  FaBlogIcon,
  FaBookmarkIcon,
  FaHouseIcon,
  FaArrowUpRightIcon,
  FaWreathLaurelIcon,
} from "@/components/icon-duotone"
import { FaGithubIcon, FaTwitterIcon } from "@/components/icon-brand"
import { useTranslations as getTranslations } from "next-intl"
import { Route } from "@/types/common.type"

export function getRoutes(
  pathname: string,
  counts?: {
    posts: number
    bookmarks: number
  }
) {
  const t = getTranslations("SYSTEM.navigation")
  const routes: Route[] = [
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
          count: counts?.posts,
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
          count: counts?.bookmarks,
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

        {
          href: "https://github.com/deerpark",
          label: t("online.github"),
          icon: FaGithubIcon,
          trailingAccessory: FaArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
      ],
    },
  ]
  return routes
}
