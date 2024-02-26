"use client"

import * as React from "react"
import Link from "next/link"

import { RouteItem } from "@/types/common.type"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

interface GlobalNavigationLinkProps {
  link: RouteItem
}

export function GlobalNavigationLink({
  link: { href, label, icon: NavIcon, isActive, isExternal, count },
}: GlobalNavigationLinkProps) {
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          `group flex flex-1 flex-col items-center rounded-md p-2 text-sm font-medium`,
          isActive
            ? "text-primary-foreground bg-primary fa-light dark:fa-dark"
            : "text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-accent-foreground/50 dark:hover:text-accent-foreground"
        )}
      >
        <span className="flex w-5 flex-1 items-center justify-center">
          <NavIcon className="text-tertiary size-5" />
        </span>
        <span className="flex-none text-base/5 lg:text-sm/5">{label}</span>
        {typeof count === "number" && (
          <Badge
            variant="outline"
            className={cn(
              "absolute right-0 top-0",
              isActive
                ? "text-primary-foreground"
                : "text-primary/70 dark:text-muted-foreground border-primary/20"
            )}
          >
            {count}
          </Badge>
        )}
      </Link>
    </li>
  )
}
