"use client"

import * as React from "react"
import Link from "next/link"

import { GlobalNavigationContext } from "../providers"
import { FaSpinnerThirdIcon } from "../icon-duotone"
import { RouteItem } from "@/types/common.type"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

interface NavigationLinkProps {
  link: RouteItem
  badge?: boolean
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
  badge,
}: NavigationLinkProps) {
  const { setIsOpen } = React.useContext(GlobalNavigationContext)
  const [isPending, setIsPending] = React.useTransition()
  const router = useRouter()
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> =
    React.useCallback(
      (e) => {
        setIsOpen(false)
        const href = e.currentTarget.dataset.href
        if (!href) return
        e.preventDefault()
        setIsPending(() => {
          router.push(href)
        })
      },
      [router, setIsOpen]
    )
  return (
    <li className="relative">
      <Link
        href={href}
        data-href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "group relative z-10 flex flex-1 items-center space-x-3 rounded-md p-2 text-sm font-medium lg:py-1.5",
          isActive
            ? "text-secondary-foreground fa-light dark:fa-dark"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        onClick={handleClick}
      >
        <span className="flex w-5 items-center justify-center lg:w-4">
          {isPending ? (
            <FaSpinnerThirdIcon className="text-primary size-5 animate-spin lg:size-4" />
          ) : (
            <NavIcon
              className={cn(
                "size-5 lg:size-4",
                isActive ? "text-secondary-foreground" : "text-foreground"
              )}
            />
          )}
        </span>
        <span
          className={cn(
            "flex-1 text-base/5 lg:text-sm/5",
            isActive
              ? "text-secondary-foreground transition-color delay-100 duration-500"
              : ""
          )}
        >
          {label}
        </span>
        {Accessory && (
          <span className="flex w-5 items-center justify-center opacity-40 group-hover:opacity-100 lg:w-4">
            <Accessory className="fa-dark dark:fa-light size-4 lg:size-3" />
          </span>
        )}
        {typeof count === "number" && badge && (
          <Badge
            variant="outline"
            className={
              isActive
                ? "text-secondary-foreground border-secondary-foreground"
                : "text-foreground border-foreground"
            }
          >
            {count}
          </Badge>
        )}
      </Link>
      {isActive && (
        <motion.div
          className="bg-accent absolute inset-0 z-0 rounded-lg"
          layoutId="sidebar-hilight"
        />
      )}
    </li>
  )
}
