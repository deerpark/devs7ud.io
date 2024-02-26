"use client"

import * as React from "react"
import Link from "next/link"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { RouteItem } from "@/types/common.type"
import { buttonVariants } from "../ui/button"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

interface GlobalNavigationLinkProps {
  link: RouteItem
}

export function GlobalNavigationLink({
  link: {
    href,
    label,
    icon: NavIcon,
    activeIcon: NavActiveIcon,
    isActive,
    isExternal,
    count,
  },
}: GlobalNavigationLinkProps) {
  return (
    <li className="relative flex flex-1 flex-col items-center justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              `group flex w-full flex-1 items-center justify-center rounded-md p-2 text-sm font-medium`,
              isActive ? "text-foreground" : "text-tertiary-foreground"
            )}
          >
            <span className="relative flex size-fit items-center justify-center">
              {isActive && NavActiveIcon ? (
                <NavActiveIcon className="size-8" />
              ) : (
                <NavIcon className="size-8" />
              )}
              {typeof count === "number" && (
                <Badge
                  variant="outline"
                  className={cn(
                    "absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 border-2 px-1 py-0 ring-2",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary ring-background group-hover:ring-accent group-hover:text-accent"
                      : "bg-tertiary-foreground text-background border-tertiary-foreground ring-background group-hover:bg-foreground group-hover:ring-accent group-hover:text-accent group-hover:border-foreground"
                  )}
                >
                  {count}
                </Badge>
              )}
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="tooltip">{label}</TooltipContent>
      </Tooltip>
    </li>
  )
}
