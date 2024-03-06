"use client"

import { useScrollDirection } from "@/hooks/useScrollDirection"
import { GlobalMenu } from "../sidebar/global-menu"
import useWindowSize from "@/hooks/useWindowSize"
import { cn } from "@/lib/utils"
import * as React from "react"

export default function Navigation() {
  const { width } = useWindowSize()
  const scrollDir = useScrollDirection()
  const isMobile = width <= 1024
  return (
    <div
      className={cn(
        "flex-none animate-in fade-in-0 fill-mode-both text-card-foreground p-2 transition-all",
        isMobile && scrollDir === "UP"
          ? "bg-white/70 backdrop-blur-md dark:bg-black/70"
          : "bg-white/50 dark:bg-black/50 ",
        scrollDir === "DOWN" && "backdrop-blur-none",
        "hover:bg-white hover:backdrop-blur-none dark:hover:bg-black",
        isMobile
          ? "fixed inset-x-2 z-50 bottom-[calc(8px+env(safe-area-inset-bottom))] shadow-2xl ring-border ring-1 slide-in-from-bottom-5 rounded-lg"
          : "mx-auto mt-[calc(32px+env(safe-area-inset-top))] mb-8 bg-transparent slide-in-from-top-5"
      )}
    >
      <div className="mx-auto min-w-80 max-w-lg">
        <GlobalMenu global scrollDir={scrollDir} />
      </div>
    </div>
  )
}
