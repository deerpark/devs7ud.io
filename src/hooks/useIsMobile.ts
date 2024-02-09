import * as React from "react"

// 모바일 디바이스인지 확인하는 커스텀 훅
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
    setIsMobile(mobile)
  }, [])

  return isMobile
}

export default useIsMobile
