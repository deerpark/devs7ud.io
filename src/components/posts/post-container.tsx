"use client"

import { TitleBar } from "../title-bar"
import { P } from "../ui/typography"
import * as React from "react"

type PostContainerProps = {
  title: string
  description: string
} & React.PropsWithChildren

export default function PostContainer({
  children,
  title,
  description,
}: PostContainerProps) {
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
      <div className="max-w-full p-8">
        <h1
          ref={titleRef}
          className="font-heading from-foreground to-card-foreground bg-gradient-to-r bg-clip-text text-center text-6xl/[1.05] text-transparent 2xl:text-left"
        >
          {title}
        </h1>
        <P className="text-muted-foreground !mt-3 mb-20 text-center text-sm 2xl:px-1 2xl:text-left">
          {description}
        </P>
        {children}
      </div>
    </div>
  )
}
