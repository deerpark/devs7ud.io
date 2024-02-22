"use client"

import GlobalNavigation from "../navigation"
import * as React from "react"

type BetaLayoutProps = {} & React.PropsWithChildren

export default function BetaLayout({ children }: BetaLayoutProps) {
  return (
    <div
      id="root"
      className="flex size-full min-h-screen items-stretch lg:overflow-hidden"
    >
      <GlobalNavigation />
      <div
        id="contents"
        className="relative flex flex-1 lg:max-h-screen lg:overflow-y-auto"
      >
        {children}
      </div>
    </div>
  )
}
