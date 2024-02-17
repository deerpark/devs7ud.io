"use client"

import { TitleBar } from "../title-bar"
import * as React from "react"

type MainContainerProps = {
  title: React.ReactNode
} & React.PropsWithChildren

export default function MainContainer({ title, children }: MainContainerProps) {
  const scrollContainerRef = React.useRef(null)
  return (
    <div
      id="main"
      ref={scrollContainerRef}
      className="relative flex max-h-screen w-full flex-1 flex-col overflow-y-auto transition-all duration-500"
    >
      <TitleBar scrollContainerRef={scrollContainerRef} title={title} />
      <div className="space-y-1 p-3">{children}</div>
    </div>
  )
}
