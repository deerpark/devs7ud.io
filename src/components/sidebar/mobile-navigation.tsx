"use client"

import { useScrollDirection } from "@/hooks/useScrollDirection"
import { Navigation } from "./navigation"
import { cn } from "@/lib/utils"

export default function MobileNavigation() {
  const scrollDir = useScrollDirection()
  return (
    <div
      className={cn(
        "ring-border animate-in slide-in-from-bottom-5 fade-in-0 fill-mode-both text-card-foreground fixed inset-x-0 bottom-0 z-50 rounded-t-lg p-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-2xl ring-1 transition-all",
        scrollDir === "UP"
          ? " bg-white/70 backdrop-blur-md dark:bg-black/70"
          : "bg-white/50 dark:bg-black/50 ",
        scrollDir === "DOWN" && "backdrop-blur-none",
        "hover:bg-white hover:backdrop-blur-none dark:hover:bg-black"
      )}
    >
      <div className="mx-auto w-full max-w-lg">
        <Navigation global scrollDir={scrollDir} />
      </div>
    </div>
  )
}
