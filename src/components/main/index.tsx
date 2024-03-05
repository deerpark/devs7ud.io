"use client"

import { TitleBar } from "../title-bar"
import * as React from "react"

type MainContainerProps = {
  title: React.ReactNode
} & React.PropsWithChildren

export default function MainContainer({ title, children }: MainContainerProps) {
  return (
    <div
      id="main"
      className="relative flex w-full flex-1 flex-col transition-all duration-500 lg:max-h-screen lg:overflow-y-auto"
    >
      <TitleBar title={title} />
      <div className="pt-14 space-y-1 p-3 lg:pt-3">{children}</div>
    </div>
  )
}
