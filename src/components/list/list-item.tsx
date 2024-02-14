"use client"

import { motion } from "framer-motion"

type ListItemProps = {
  layoutKey: string
  className?: string
} & React.PropsWithChildren

export default function ListItem({
  layoutKey,
  className,
  children,
}: ListItemProps) {
  return (
    <motion.div layout key={layoutKey} className={className}>
      {children}
    </motion.div>
  )
}
