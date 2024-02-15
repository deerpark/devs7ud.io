import * as React from "react"

import { getPathnameFromUrl } from "@/lib/pathname"
import { NavigationLink } from "./navigation-link"
import { getRoutes } from "@/config/routes"

type SidebarNavigationProps = {
  url: string
  counts: {
    posts: number
    bookmarks: number
  }
}

export function SidebarNavigation({ counts, url }: SidebarNavigationProps) {
  const pathname = getPathnameFromUrl(url)
  const sections = getRoutes(pathname, counts)

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
