"use client"

import { LayoutGroup } from "framer-motion"
import { TitleBar } from "../title-bar"
import * as React from "react"

type ListProps = {
  title: string
} & React.PropsWithChildren

export default function List({ children, title, ...rest }: ListProps) {
  const scrollContainerRef = React.useRef(null)

  return (
    <div
      ref={scrollContainerRef}
      className="bg-background lg:bg-card relative size-full max-h-screen min-h-screen flex-none overflow-y-auto border-r lg:w-80 xl:w-96"
      {...rest}
    >
      <TitleBar scrollContainerRef={scrollContainerRef} title={title} />
      <LayoutGroup>
        <div className="lg:space-y-1 lg:p-3">{children}</div>
      </LayoutGroup>
    </div>
  )
}
