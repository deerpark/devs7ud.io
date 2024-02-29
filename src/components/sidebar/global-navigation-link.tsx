"use client"

import * as React from "react"
import Link from "next/link"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { AnimatePresence, motion } from "framer-motion"
import { FaSpinnerThirdIcon } from "../icon-duotone"
import { RouteItem } from "@/types/common.type"
import { buttonVariants } from "../ui/button"
import { useRouter } from "next/navigation"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

interface GlobalNavigationLinkProps {
  link: RouteItem
  badge?: boolean
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
  badge,
}: GlobalNavigationLinkProps) {
  const [isPending, setIsPending] = React.useTransition()
  const router = useRouter()
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> =
    React.useCallback(
      (e) => {
        const href = e.currentTarget.dataset.href
        if (!href) return
        e.preventDefault()
        setIsPending(() => {
          router.push(href)
        })
      },
      [router]
    )
  return (
    <li className="relative flex flex-1 flex-col items-center justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            data-href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              `group flex w-full flex-1 items-center justify-center rounded-md !bg-transparent p-2 text-sm font-medium`,
              isActive ? "text-secondary-foreground" : "text-foreground"
            )}
            onClick={handleClick}
          >
            <span className="relative z-10 flex size-fit items-center justify-center">
              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.span
                    key="loading-icon"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 0.5,
                      opacity: 0,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <FaSpinnerThirdIcon className="text-primary size-5 animate-spin" />
                  </motion.span>
                ) : isActive && NavActiveIcon ? (
                  <motion.span
                    key="active-icon"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 0.5,
                      opacity: 0,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <NavActiveIcon
                      className={cn(
                        "size-6 transition-all group-active:size-4",
                        isActive
                          ? "size-8 group-hover:size-8"
                          : "group-hover:size-7"
                      )}
                    />
                  </motion.span>
                ) : (
                  <motion.span
                    key="link-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <NavIcon
                      className={cn(
                        "size-6 transition-all group-active:size-4",
                        isActive
                          ? "size-8 group-hover:size-8"
                          : "group-hover:size-7"
                      )}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
              {typeof count === "number" && badge && (
                <Badge
                  variant="outline"
                  className={cn(
                    "absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 border-2 px-1 py-0 ring-2",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary ring-background group-hover:ring-accent group-hover:text-accent"
                      : "bg-foreground/30 text-background border-foreground/30 ring-background group-hover:bg-foreground group-hover:ring-accent group-hover:text-accent group-hover:border-foreground"
                  )}
                >
                  {count}
                </Badge>
              )}
            </span>
            {isActive && (
              <motion.div
                className="bg-accent absolute inset-0.5 z-0 rounded-lg"
                layoutId="hilight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1 },
                }}
              />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="tooltip">{label}</TooltipContent>
      </Tooltip>
    </li>
  )
}
