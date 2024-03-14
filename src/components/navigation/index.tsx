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
        "animate-in fade-in-0 fill-mode-both text-card-foreground z-50 flex-none rounded-lg backdrop-blur-md transition-all",
        scrollDir === "UP"
          ? "dark:bg-background/100 bg-white/100"
          : "dark:bg-background/90 bg-white/90 ",
        "dark:hover:bg-background hover:bg-white hover:backdrop-blur-none",
        isMobile
          ? "ring-border slide-in-from-bottom-5 fixed inset-x-2 bottom-[calc(8px+env(safe-area-inset-bottom))] p-2 shadow-2xl ring-1 md:px-2 md:py-3"
          : "slide-in-from-top-5 sticky top-0 mx-auto mb-8 w-full pb-2 pt-[calc(8px+env(safe-area-inset-top))]"
      )}
    >
      <div className="mx-auto min-w-96 max-w-lg">
        <GlobalMenu global scrollDir={scrollDir} width={width} />
      </div>
    </div>
  )
}
