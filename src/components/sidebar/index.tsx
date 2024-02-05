"use client"

import * as React from "react"

import { GlobalNavigationContext } from "../providers"
import { SidebarNavigation } from "./navigation"
import { SidebarOverlay } from "./overlay"
import { TitleBar } from "../title-bar"

export function Sidebar() {
  const navigationContext = React.useContext(GlobalNavigationContext)
  const navIsOpen = navigationContext.isOpen
  const scrollContainerRef = React.useRef<HTMLElement>(null)
  return (
    <>
      <nav
        ref={scrollContainerRef}
        className={`absolute ${
          navIsOpen
            ? "inset-y-0 left-0 translate-x-0 shadow-lg"
            : "-translate-x-full"
        } 3xl:w-80 bg-card z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none flex-col overflow-y-auto border-r pb-10 transition duration-200 ease-in-out sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 2xl:w-72`}
      >
        <TitleBar
          scrollContainerRef={scrollContainerRef}
          leadingAccessory={null}
          title="DEVS7UD.IO"
        />
        <SidebarNavigation />
      </nav>

      <SidebarOverlay />
    </>
  )
}
