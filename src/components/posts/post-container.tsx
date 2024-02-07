"use client"

import { TitleBar } from "../title-bar"
import * as React from "react"

type PostContainerProps = {
  title: string
} & React.PropsWithChildren

export default function PostContainer({ children, title }: PostContainerProps) {
  const scrollContainerRef = React.useRef(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  return (
    <div
      ref={scrollContainerRef}
      id="main"
      className="relative flex max-h-screen w-full flex-1 flex-col overflow-y-auto"
    >
      <TitleBar
        backButton
        globalMenu={false}
        backButtonHref={"/posts"}
        magicTitle
        title={title}
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
      />
      <div className="max-w-max p-8">
        <h1
          ref={titleRef}
          className="font-heading from-foreground to-card-foreground bg-gradient-to-r bg-clip-text text-center text-6xl/[1.05] text-transparent"
        >
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
