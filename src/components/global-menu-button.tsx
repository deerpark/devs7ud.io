"use client"

import * as React from "react"

import { GlobalNavigationContext } from "./providers"
import { FaBars, FaXmark } from "./icon-duotone"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type GlobalMenuButtonProps = {
  isFloating?: boolean
  isMono?: boolean
}

export default function GlobalMenuButton({
  isFloating = false,
  isMono = false,
}: GlobalMenuButtonProps) {
  const { isOpen, setIsOpen } = React.useContext(GlobalNavigationContext)
  const newLocal =
    "border-background ease-expo-in-out absolute -left-12 size-12 rounded-full backdrop-blur-sm transition-all duration-500"
  return (
    <div
      className={cn(
        isFloating
          ? "ease-expo-in-out relative size-12 transition-all duration-500"
          : "",
        isFloating && !isOpen
          ? "translate-x-0"
          : isFloating
            ? "translate-x-full"
            : ""
      )}
    >
      <Button
        variant={isFloating ? undefined : "ghost"}
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group/button transition-all lg:hidden",
          !isFloating && !isOpen ? "hidden" : "",
          isFloating ? newLocal : "text-foreground",
          isFloating && !isOpen
            ? "opacity-0"
            : isFloating && isOpen
              ? "opacity-100"
              : "-ml-0.5"
        )}
      >
        <FaXmark
          className={cn(
            "transition-all",
            isFloating ? "fa-light size-6" : "size-4"
          )}
        />
      </Button>
      <Button
        variant={isFloating ? undefined : "ghost"}
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group transition-all lg:hidden",
          !isFloating && isOpen ? "hidden" : "",
          isFloating
            ? "border-background ease-expo-in-out size-12 rounded-full backdrop-blur-sm transition-all duration-500"
            : "text-foreground mr-1",
          isFloating && !isOpen
            ? "opacity-100"
            : isFloating && isOpen
              ? "opacity-0"
              : ""
        )}
      >
        <FaBars
          className={cn(
            "transition-all",
            isFloating ? "fa-light size-6" : "size-4",
            isMono ? "fa-light group-hover:fa-default" : ""
          )}
        />
      </Button>
    </div>
  )
}
