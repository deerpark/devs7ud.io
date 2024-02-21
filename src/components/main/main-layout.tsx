"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import useWindowSize from "@/hooks/useWindowSize"
import { Sidebar } from "@/components/sidebar"
import * as React from "react"

const MIN_SIZE_IN_PIXELS = 240
const MAX_SIZE_IN_PIXELS = 340

type MainLayoutProps = {
  counts: {
    posts: number
    bookmarks: number
  }
  layout: number[]
} & React.PropsWithChildren

export default function MainLayout({
  children,
  counts,
  layout,
}: MainLayoutProps) {
  const [minSize, setMinSize] = React.useState(10)
  const [maxSize, setMaxSize] = React.useState(30)
  const { windowWidth, handleResize } = useWindowSize()

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:root=${JSON.stringify(sizes)}`
  }

  React.useLayoutEffect(() => {
    const panelGroup = document.querySelector<HTMLDivElement>(
      '[data-panel-group-id="root"]'
    )
    const resizeHandle =
      document.querySelector<HTMLDivElement>('[id="root-handle"]')

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
      autoSaveId="root"
      onLayout={onLayout}
      direction="horizontal"
      id="root"
      className="flex size-full min-h-screen items-stretch lg:overflow-hidden"
    >
      {windowWidth > 1023 && (
        <>
          <Sidebar
            counts={counts}
            defaultSize={layout[0] || 10}
            minMaxSize={[minSize, maxSize]}
          />
          <ResizableHandle id="root-handle" withHandle />
        </>
      )}
      <ResizablePanel
        id="contents"
        defaultSize={layout[1]}
        order={2}
        className="relative flex flex-1 lg:max-h-screen lg:overflow-y-auto"
      >
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
