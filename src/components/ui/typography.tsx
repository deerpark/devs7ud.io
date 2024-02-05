import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    tag: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "text-2xl font-semibold ",
      h4: "text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: {
    tag: "h1",
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, tag, ...props }, ref) => {
    const Comp = tag || "h1"
    return (
      <Comp
        className={cn(headingVariants({ tag, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

function P({ children }: React.PropsWithChildren) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}

function Blockquote({ children }: React.PropsWithChildren) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}

function InlineCode({ children }: React.PropsWithChildren) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

export { Blockquote, Heading, InlineCode, P }
