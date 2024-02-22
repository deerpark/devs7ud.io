"use client"

import { GlobalNavigationMenu } from "./navigation-menu"
import { cn } from "@/lib/utils"

export default function GlobalNavigation() {
  return (
    <div
      className={cn(
        "bg-background fill-mode-both fixed inset-x-4 bottom-4 z-50 mx-auto w-[calc(100vw-32px)] max-w-full space-y-10 rounded-t-3xl px-4 py-10 shadow-2xl duration-500 sm:inset-x-0 sm:w-auto sm:max-w-fit sm:pb-6"
      )}
    >
      <GlobalNavigationMenu
        counts={{ posts: undefined, bookmarks: undefined }}
      />
    </div>
  )
}
