import * as React from "react"

// navIsOpen 상태(boolean)와 className(string)을 파라미터로 받는 useToggleClassname 커스텀 훅 정의
const useToggleClassname = (
  navIsOpen: boolean,
  className: string,
  el: HTMLElement | null
): void => {
  React.useEffect(() => {
    if (!el) return
    // navIsOpen이 true이면 className을 추가, false이면 className을 제거
    if (navIsOpen) {
      el.classList.add(className)
    } else {
      el.classList.remove(className)
    }

    // 컴포넌트 언마운트 혹은 navIsOpen 상태가 변경될 때 className을 제거
    return () => {
      el.classList.remove(className)
    }
  }, [navIsOpen, className, el]) // 의존성 배열에 navIsOpen과 className을 추가
}

export default useToggleClassname
