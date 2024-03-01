import { useEffect, useState } from "react"

export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState<"UP" | "DOWN">("UP")

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDir = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? "DOWN" : "UP"
      console.log(direction)
      if (scrollY !== lastScrollY) setScrollDir(direction)
      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener("scroll", updateScrollDir, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollDir)
    }
  }, [])

  return scrollDir
}
