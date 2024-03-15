"use client"

import {
  motion,
  transform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion"
import * as React from "react"

function FramerTest() {
  const x = useMotionValue(0)
  const opacity = useMotionValue(1)

  function updateOpacity() {
    console.log(x.get())
    const newOpacity = transform(x.get(), [-100, 0, 100], [0, 1, 0], {
      clamp: false,
    })
    opacity.set(newOpacity)
  }
  useMotionValueEvent(x, "change", updateOpacity)

  return (
    <div className="size-full min-h-screen flex-1 overflow-y-auto">
      <div className="flex h-[3000px] flex-col items-center justify-center">
        <motion.div
          style={{ x, opacity }}
          drag="x"
          dragTransition={{
            power: 0.2,
            timeConstant: 200,
            min: 0,
            max: 0,
          }}
          className="bg-primary size-10 rounded-lg"
        ></motion.div>
      </div>
    </div>
  )
}

export default FramerTest
