"use client"

import { RouteItem } from "@/types/common.type"
import { cn } from "@/lib/utils"
import Link from "next/link"
/* import { Badge } from "../ui/badge"; */

interface GlobalNavigationLinkProps {
  link: RouteItem
}

export default function GlobalNavigationLink({
  link: {
    href,
    label,
    icon: NavIcon,
    /* trailingAccessory: Accessory, */
    isActive,
    isExternal,
    /* count, */
  },
}: GlobalNavigationLinkProps) {
  return (
    <li className="flex items-center justify-center">
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "group flex flex-1 items-center justify-center rounded-md",
          isActive
            ? "text-primary font-bold"
            : "text-foreground hover:bg-accent hover:text-primary"
        )}
      >
        <span className="flex flex-none items-center justify-center p-1.5">
          <NavIcon className="size-6" />
        </span>
        <span className="hidden flex-1 p-1.5">{label}</span>
        {/* {Accessory && (
          <span className="flex flex-none items-center p-1.5">
            <Accessory className="fa-inherit size-3 opacity-40 group-hover:opacity-100" />
          </span>
        )} */}
        {/* {typeof count === "number" && (
          <span className="flex flex-none items-center p-1.5">
            <Badge
              variant="outline"
              className={cn(
                isActive
                  ? "border-primary text-primary/100"
                  : "text-foreground/60"
              )}
            >
              {count}
            </Badge>
          </span>
        )} */}
      </Link>
    </li>
  )
}
