"use client"

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
    <div key={layoutKey} className={className}>
      {children}
    </div>
  )
}
