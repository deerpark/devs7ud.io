"use client"

import { useParams } from "next/navigation"
import { LayoutGroup } from "framer-motion"
import { TitleBar } from "../title-bar"
import * as React from "react"

type ListProps = {
  title: React.ReactNode
  contents: React.ReactNode
} & React.PropsWithChildren

export default function List({
  children,
  title,
  contents,
  ...rest
}: ListProps) {
  const params = useParams<{ slug: string; locale: string }>()
  const scrollContainerRef = React.useRef(null)

  return (
    <div className="flex max-w-full flex-1">
      <div
        id="list"
        className={`flex-none ${params.slug ? "hidden lg:flex" : "min-h-screen w-full"}`}
      >
        <div
          ref={scrollContainerRef}
          className="bg-background lg:bg-card/50 relative size-full max-h-screen min-h-screen flex-none overflow-y-auto border-r lg:w-80 xl:w-96"
          {...rest}
        >
          <TitleBar scrollContainerRef={scrollContainerRef} title={title} />
          <LayoutGroup>
            <div className="lg:space-y-1 lg:p-3">{contents}</div>
          </LayoutGroup>
        </div>
      </div>
      {children}
    </div>
  )
}
