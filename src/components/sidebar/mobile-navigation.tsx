"use client"

import { useScrollDirection } from "@/hooks/useScrollDirection"
import useWindowSize from "@/hooks/useWindowSize"
import { GlobalMenu } from "./global-menu"
import { cn } from "@/lib/utils"
import * as React from "react"

export default function MobileNavigation() {
  const { width } = useWindowSize()
  const scrollDir = useScrollDirection()
  return (
    <div
      className={cn(
        "ring-border animate-in slide-in-from-bottom-5 fade-in-0 fill-mode-both text-card-foreground fixed inset-x-0 bottom-0 z-50 rounded-t-lg p-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-2xl ring-1 transition-all",
        scrollDir === "UP"
          ? " dark:bg-background/100 bg-white/100 backdrop-blur-md"
          : "dark:bg-background/90 bg-white/90 ",
        scrollDir === "DOWN" && "backdrop-blur-none",
        "dark:hover:bg-background hover:bg-white hover:backdrop-blur-none"
      )}
    >
      <div className="mx-auto w-full max-w-lg">
        <GlobalMenu global scrollDir={scrollDir} width={width} />
      </div>
    </div>
  )
}
