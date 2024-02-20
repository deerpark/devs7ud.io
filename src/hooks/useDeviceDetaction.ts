"use client"

import * as React from "react"

// 모바일 디바이스인지 확인하는 커스텀 훅
const useDeviceDetaction = (): { isMobile: boolean; isIPhone: boolean } => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isIPhone, setIsIPhone] = React.useState<boolean>(false)

  React.useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
    const iphone = Boolean(userAgent.match(/iPhone/i))
    setIsMobile(mobile)
    setIsIPhone(iphone)
  }, [])

  return { isMobile, isIPhone }
}

export default useDeviceDetaction
