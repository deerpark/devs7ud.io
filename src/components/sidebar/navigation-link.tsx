"use client"

import * as React from "react"
import Link from "next/link"

import { RouteItem } from "@/types/common.type"
import { Badge } from "../ui/badge"

interface NavigationLinkProps {
  link: RouteItem
}

export function NavigationLink({
  link: {
    href,
    label,
    icon: NavIcon,
    trailingAccessory: Accessory,
    isActive,
    isExternal,
    count,
  },
}: NavigationLinkProps) {
  return (
    <li className="px-3">
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`group flex items-center rounded-md ${
          isActive
            ? "text-primary bg-primary/20 fa-inherit font-bold"
            : "text-foreground hover:bg-accent"
        }`}
      >
        <span className="flex flex-none items-center justify-center p-1.5">
          <NavIcon className="size-5" />
        </span>
        <span className="flex-1 p-1.5">{label}</span>
        {Accessory && (
          <span className="flex flex-none items-center p-1.5">
            <Accessory className="size-4" />
          </span>
        )}
        {typeof count === "number" && (
          <span className="flex flex-none items-center p-1.5">
            <Badge variant="outline">{count}</Badge>
          </span>
        )}
      </Link>
    </li>
  )
}
