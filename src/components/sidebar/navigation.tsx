import { usePathname } from "next/navigation"
import * as React from "react"

import {
  FaAddressCardIcon,
  FaBlogIcon,
  FaBoomarkIcon,
  FaGithubIcon,
  FaHouseIcon,
  FaSquareArrowUpRightIcon,
  FaTwitterSquareIcon,
  FaWreathLaurelIcon,
} from "../icon"
import { NavigationLink } from "./navigation-link"

export function SidebarNavigation() {
  const pathname = usePathname()
  const sections = [
    {
      label: null,
      items: [
        {
          href: "/",
          label: "Home",
          icon: FaHouseIcon,
          trailingAccessory: null,
          isActive: pathname === "/",
          trailingAction: null,
          isExternal: false,
        },

        {
          href: "/posts",
          label: "Posts",
          icon: FaBlogIcon,
          trailingAccessory: null,
          isActive: pathname.indexOf("/posts") >= 0,
          trailingAction: null,
          isExternal: false,
        },
      ],
    },
    {
      label: "Me",
      items: [
        {
          href: "/bookmarks",
          label: "Bookmarks",
          icon: FaBoomarkIcon,
          trailingAccessory: null,
          isActive: pathname.indexOf("/bookmarks") >= 0,
          isExternal: false,
        },

        {
          href: "/about",
          label: "About",
          icon: FaAddressCardIcon,
          trailingAccessory: null,
          isActive: pathname.indexOf("/about") >= 0,
          trailingAction: null,
          isExternal: false,
        },
      ],
    },
    {
      label: "Projects",
      items: [
        {
          href: "https://coni.gsretail.com",
          label: "Coni",
          icon: FaWreathLaurelIcon,
          trailingAccessory: FaSquareArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
      ],
    },
    {
      label: "Online",
      items: [
        {
          href: "https://twitter.com/deerpark7",
          label: "Twitter",
          icon: FaTwitterSquareIcon,
          trailingAccessory: FaSquareArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },

        {
          href: "https://github.com/deerpark",
          label: "GitHub",
          icon: FaGithubIcon,
          trailingAccessory: FaSquareArrowUpRightIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
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
                className="px-2 pb-2 pt-5 text-xs font-semibold text-opacity-40"
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
