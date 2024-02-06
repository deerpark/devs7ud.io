"use client"

import * as React from "react"
import Link from "next/link"

import { GlobalNavigationContext } from "../providers"
import type { Icon } from "../icon"

interface NavigationLinkProps {
  link: {
    href: string
    label: string
    icon: Icon
    isActive: boolean
    trailingAccessory: Icon | null
    isExternal: boolean
  }
}

export function NavigationLink({
  link: {
    href,
    label,
    icon: NavIcon,
    trailingAccessory: Accessory,
    isActive,
    isExternal,
  },
}: NavigationLinkProps) {
  const { setIsOpen } = React.useContext(GlobalNavigationContext)
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`flex flex-1 items-center space-x-3 rounded-md p-2 text-sm font-medium lg:py-1.5  ${
          isActive
            ? "text-primary-foreground bg-primary"
            : "text-foreground/80 hover:bg-accent hover:text-foreground/100"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <span className="flex w-5 items-center justify-center lg:w-4">
          <NavIcon className="size-5 lg:size-4" />
        </span>
        <span className="flex-1 text-base/5 lg:text-sm/5">{label}</span>
        {Accessory && (
          <span className="flex w-5 items-center justify-center opacity-40 lg:w-4">
            <Accessory className="size-4 lg:size-3" />
          </span>
        )}
      </Link>
    </li>
  )
}
