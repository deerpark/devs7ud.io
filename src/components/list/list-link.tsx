"use client"

import { useParams } from "next/navigation"
import { PostsProps } from "../posts"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ListItemLinkProps = {
  url: string
  segment?: string
  className?: string
} & Pick<PostsProps, "onClick"> &
  React.PropsWithChildren

export default function ListItemLink({
  url,
  segment = "posts",
  onClick,
  children,
  className,
}: ListItemLinkProps) {
  const params = useParams<{ slug: string; locale: string }>()
  const active = `/${segment}/${params.slug}` === url
  const isPost = segment === "posts"
  return (
    <Link
      href={url}
      onClick={onClick && onClick}
      className={cn(
        "border-border/50 group flex space-x-6 border-b px-6 text-sm transition-all duration-500 last-of-type:border-none lg:rounded-lg lg:px-0 2xl:pl-2 2xl:pr-3 2xl:group-[.post]/item:rounded-2xl",
        isPost
          ? "ld:pb-2 items-stretch py-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:pt-0 2xl:flex-row 2xl:space-x-3 2xl:space-y-0 2xl:py-2"
          : "py-3 lg:space-x-3 lg:px-3 lg:py-2",
        active
          ? "bg-primary text-primary-foreground active"
          : "text-secondary-foreground/70 hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </Link>
  )
}
