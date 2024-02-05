"use client"

import { motion } from "framer-motion"

type ListItemProps = {
  layoutKey: string
} & React.PropsWithChildren

export default function ListItem({ layoutKey, children }: ListItemProps) {
  return (
    <motion.div layout key={layoutKey}>
      {children}
    </motion.div>
  )
}
