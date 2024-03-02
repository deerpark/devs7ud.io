import {
  FaHeadSideIcon,
  FaNewspaperIcon,
  FaPinataIcon,
  FaCampgroundIcon,
  FaArrowUpRightIcon,
  FaBoxHeartIcon,
} from "../components/icon-duotone"
import { FaGithubIcon, FaTwitterIcon } from "../components/icon-brand"
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
          icon: FaCampgroundIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "") === "/",
          trailingAction: null,
          isExternal: false,
        },

        {
          href: "/posts",
          label: t("index.posts"),
          icon: FaNewspaperIcon,
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
          href: "/projects",
          label: t("me.projects"),
          icon: FaBoxHeartIcon,
          trailingAccessory: null,
          isActive: false,
          trailingAction: null,
          isExternal: false,
        },
        {
          href: "/bookmarks",
          label: t("me.bookmarks"),
          icon: FaPinataIcon,
          trailingAccessory: null,
          isActive:
            pathname.replace(/en|ko|fr/g, "").indexOf("/bookmarks") >= 0,
          isExternal: false,
          count: counts?.bookmarks,
        },
        {
          href: "/about",
          label: t("me.about"),
          icon: FaHeadSideIcon,
          trailingAccessory: null,
          isActive: pathname.replace(/en|ko|fr/g, "").indexOf("/about") >= 0,
          trailingAction: null,
          isExternal: false,
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
