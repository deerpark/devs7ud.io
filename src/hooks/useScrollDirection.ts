import React, { useEffect, useState } from "react"

export const useScrollDirection = (
  $elRef?: React.RefObject<HTMLDivElement>
) => {
  const [scrollDir, setScrollDir] = useState<"UP" | "DOWN">("UP")

  useEffect(() => {
    // $elRef가 제공되었으면 해당 엘리먼트를 사용하고, 그렇지 않으면 window를 사용
    const element = $elRef?.current ?? window
    let lastScrollY = "scrollY" in element ? element.scrollY : element.scrollTop

    const updateScrollDir = () => {
      const scrollY = "scrollY" in element ? element.scrollY : element.scrollTop
      const direction = scrollY > lastScrollY ? "DOWN" : "UP"
      if (scrollY !== lastScrollY) setScrollDir(direction)
      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    // 스크롤 이벤트 리스너 추가
    element.addEventListener("scroll", updateScrollDir, { passive: true })

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      element.removeEventListener("scroll", updateScrollDir)
    }
  }, [$elRef]) // $elRef를 의존성 배열에 추가

  return scrollDir
}
