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
        "animate-in fade-in-0 fill-mode-both text-card-foreground flex-none p-2 transition-all",
        isMobile && scrollDir === "UP"
          ? "bg-white/70 backdrop-blur-md dark:bg-black/70"
          : "bg-white/50 dark:bg-black/50 ",
        scrollDir === "DOWN" && "backdrop-blur-none",
        "hover:bg-white hover:backdrop-blur-none dark:hover:bg-black",
        isMobile
          ? "ring-border slide-in-from-bottom-5 fixed inset-x-2 bottom-[calc(8px+env(safe-area-inset-bottom))] z-50 rounded-lg shadow-2xl ring-1"
          : "slide-in-from-top-5 mx-auto mb-8 mt-[calc(32px+env(safe-area-inset-top))] bg-transparent"
      )}
    >
      <div className="mx-auto min-w-80 max-w-lg">
        <GlobalMenu global scrollDir={scrollDir} />
      </div>
    </div>
  )
}
