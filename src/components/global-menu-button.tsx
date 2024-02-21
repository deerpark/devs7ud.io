"use client"

import * as React from "react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import Favicon from "@/public/assets/icons/favicon-mono.svg"
import { SidebarNavigation } from "./sidebar/navigation"
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
    <Drawer>
      <DrawerTrigger asChild>
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
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div
            className={cn(
              "bg-background fill-mode-both fixed inset-x-4 bottom-0 z-50 mx-auto w-[calc(100vw-32px)] max-w-full space-y-10 rounded-t-3xl px-4 py-10 shadow-2xl duration-500 sm:inset-x-0 sm:w-auto sm:max-w-sm sm:pb-6",
              isOpen
                ? "animate-in slide-in-from-bottom-[100%] fade-in-50 ease-expo-out"
                : "animate-out slide-out-to-bottom-[100%] fade-out-0 ease-expo-in"
            )}
          >
            <div className="flex items-center justify-center">
              <Favicon
                className={cn("text-primary dark:text-tertiary size-14")}
                viewBox="0 0 140 138"
                preserveAspectRatio="xMidYMid meet"
              />
            </div>
            <SidebarNavigation
              counts={{ posts: undefined, bookmarks: undefined }}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
