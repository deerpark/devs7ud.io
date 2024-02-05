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
        className={`flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium  ${
          isActive
            ? "text-primary-foreground bg-primary"
            : "text-foreground/80 hover:bg-accent hover:text-foreground/100"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <span className="flex w-4 items-center justify-center">
          <NavIcon />
        </span>
        <span className="flex-1">{label}</span>
        {Accessory && (
          <span className="flex w-4 items-center justify-center opacity-40">
            <Accessory />
          </span>
        )}
      </Link>
    </li>
  )
}
