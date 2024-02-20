"use client"

// 이 함수는 CSS의 safe-area-inset 값들을 체크합니다.
export default function useSafeAreaInsets() {
  if (typeof document !== "object")
    return { hasInset: false, insets: { top: 0, left: 0, bottom: 0, right: 0 } }

  // DOM에 임시 요소를 생성
  const div = document.createElement("div")

  // 요소를 화면에 보이지 않게 추가합니다.
  div.style.position = "absolute"
  div.style.left = "env(safe-area-inset-left)"
  div.style.right = "env(safe-area-inset-right)"
  div.style.top = "env(safe-area-inset-top)"
  div.style.bottom = "env(safe-area-inset-bottom)"
  div.style.bottom = "env(safe-area-inset-bottom)"
  div.style.pointerEvents = "none"
  document.body.appendChild(div)

  // 계산된 스타일을 가져와서 safe-area-inset 값들을 추출합니다.
  const { top, left, right, bottom } = window.getComputedStyle(div)
  const insets = {
    top,
    left,
    right,
    bottom,
  }
  const hasInset = !!(parseInt(top, 10) + parseInt(bottom, 10) || 0)

  // 요소를 제거합니다.
  document.body.removeChild(div)

  // safe-area-inset 값들을 객체로 반환합니다.
  return { hasInset, insets }
}
