"use client"

import * as React from "react"

export default function useWindowSize() {
  // 창 너비를 상태로 저장
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "object" ? 0 : window.innerWidth
  )
  const [windowHeight, setWindowHeight] = React.useState(
    typeof window !== "object" ? 0 : window.innerHeight
  )
  const handleResize = () => {
    if (typeof window !== "object") return
    // 창의 너비가 변할 때마다 상태 업데이트
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }
  return {
    windowWidth,
    windowHeight,
    handleResize,
  }
}
