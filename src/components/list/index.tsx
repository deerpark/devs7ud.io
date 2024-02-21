"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"
import useWindowSize from "@/hooks/useWindowSize"
import { useParams } from "next/navigation"
import { LayoutGroup } from "framer-motion"
import { TitleBar } from "../title-bar"
import { cn } from "@/lib/utils"
import * as React from "react"

const MIN_SIZE_IN_PIXELS = 340
const MAX_SIZE_IN_PIXELS = 448

type ListProps = {
  title: React.ReactNode
  contents: React.ReactNode
  search: React.ReactNode
  layout: number[]
} & React.PropsWithChildren

export default function List({
  children,
  title,
  contents,
  search,
  layout,
  ...rest
}: ListProps) {
  const params = useParams<{ slug: string; locale: string }>()
  const [minSize, setMinSize] = React.useState(10)
  const [maxSize, setMaxSize] = React.useState(30)
  const scrollContainerRef = React.useRef(null)
  const { windowWidth, handleResize } = useWindowSize()

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:container=${JSON.stringify(sizes)}`
  }

  React.useLayoutEffect(() => {
    const panelGroup = document.querySelector<HTMLDivElement>(
      '[data-panel-group-id="container"]'
    )
    const resizeHandle = document.querySelector<HTMLDivElement>(
      '[id="container-handle"]'
    )

    if (!panelGroup) return

    const observer = new ResizeObserver(() => {
      let width = panelGroup.offsetWidth

      if (resizeHandle) {
        width -= resizeHandle.offsetWidth
      }

      setMinSize((MIN_SIZE_IN_PIXELS / width) * 100)
      setMaxSize((MAX_SIZE_IN_PIXELS / width) * 100)
    })
    observer.observe(panelGroup)
    if (resizeHandle) {
      observer.observe(resizeHandle)
    }

    return () => {
      observer.unobserve(panelGroup)
      if (resizeHandle) {
        observer.unobserve(resizeHandle)
      }
      observer.disconnect()
    }
  }, [])

  React.useLayoutEffect(() => {
    if (typeof window !== "object") return

    // 컴포넌트가 마운트 될 때 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize)

    // 컴포넌트가 언마운트 될 때 리사이즈 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  return (
    <ResizablePanelGroup
      autoSaveId="container"
      onLayout={onLayout}
      direction="horizontal"
      id="container"
      className="flex max-w-full flex-1"
    >
      {windowWidth > 767 && (
        <ResizablePanel
          id="list"
          defaultSize={layout[0] || 30}
          minSize={minSize}
          maxSize={maxSize}
          className={cn(
            "flex-none transition-all duration-500",
            params.slug ? "" : "min-h-screen"
          )}
          order={1}
        >
          <div
            ref={scrollContainerRef}
            className={cn(
              "bg-popover lg:bg-card/30 relative size-full max-h-screen min-h-screen max-w-md flex-none overflow-y-auto pb-20",
              params.slug ? "" : "border-r"
            )}
            {...rest}
          >
            <TitleBar
              scrollContainerRef={scrollContainerRef}
              title={title}
              searchAccessory={search}
            />
            <LayoutGroup>
              <div className="divide-border/30 divide-y py-3 lg:divide-y-0 lg:px-3">
                {contents}
              </div>
            </LayoutGroup>
          </div>
        </ResizablePanel>
      )}
      {(windowWidth > 767 || params.slug) && (
        <ResizableHandle id="container-handle" withHandle />
      )}
      {params.slug && (
        <ResizablePanel
          id="main"
          defaultSize={layout[1] || 70}
          order={2}
          className="flex flex-1 flex-col"
        >
          {children}
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  )
}
