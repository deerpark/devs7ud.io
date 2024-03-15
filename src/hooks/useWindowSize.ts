"use client"

import * as React from "react"

export default function useWindowSize() {
  const [width, setWidth] = React.useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  )

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    setWidth(window.innerWidth)
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { width }
}
