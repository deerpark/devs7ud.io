import { Heading, P } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import * as React from "react"

type EmptyProps = {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export default function Empty({
  icon,
  action,
  title,
  description,
  className,
}: EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center space-y-5 py-10",
        className
      )}
    >
      {icon}
      <div className="flex flex-col items-center space-y-3">
        {title && <Heading tag="h1">{title}</Heading>}
        {description && <P className="text-muted-foreground">{description}</P>}
        {action && <P className="flex items-center space-x-1">{action}</P>}
      </div>
    </div>
  )
}
