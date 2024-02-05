"use client"

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react"

import { GlobalNavigationContext } from "../providers"

export function SidebarOverlay() {
  const { isOpen, setIsOpen } = React.useContext(GlobalNavigationContext)

  return (
    <div
      className={`fixed inset-0 z-20 bg-black/10 transition duration-200 ease-in-out dark:bg-black/50 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onClick={() => setIsOpen(false)}
    />
  )
}
