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
  return (
    <div
      className={cn(
        isFloating
          ? "ease-expo-in-out relative size-9 transition-all duration-500"
          : "",
        isFloating && !isOpen
          ? "translate-x-0"
          : isFloating
            ? "translate-x-full"
            : ""
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "lg:hidden",
          !isFloating && !isOpen ? "hidden" : "",
          isFloating
            ? "bg-primary/75 border-background ease-expo-in-out group absolute -left-9 size-9 rounded-full backdrop-blur-sm transition-all duration-500"
            : "text-foreground",
          isFloating && !isOpen
            ? "opacity-0"
            : isFloating && isOpen
              ? "opacity-100"
              : "-ml-0.5"
        )}
      >
        <FaXmark
          className={cn(
            isFloating
              ? "fa-light dark:fa-dark group-hover:fa-default size-5"
              : "size-4"
          )}
        />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "lg:hidden",
          !isFloating && isOpen ? "hidden" : "",
          isFloating
            ? "bg-primary/75 border-background ease-expo-in-out group size-9 rounded-full backdrop-blur-sm transition-all duration-500"
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
            isFloating ? "size-5" : "size-4",
            isMono
              ? "fa-light group-hover:fa-default"
              : "fa-light dark:fa-dark group-hover:fa-default"
          )}
        />
      </Button>
    </div>
  )
}
