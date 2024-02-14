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
  console.log()
  return (
    <Link
      href={url}
      onClick={onClick && onClick}
      className={cn(
        "border-border/50 flex space-x-6 border-b px-6 text-sm lg:rounded-lg lg:border-none ",
        isPost
          ? "items-stretch py-2 lg:flex-col lg:space-x-0 lg:space-y-2 lg:p-3 2xl:flex-row 2xl:space-x-3 2xl:space-y-0 2xl:py-2"
          : "py-3 lg:space-x-3 lg:px-3 lg:py-2",
        active
          ? "bg-primary text-primary-foreground active group"
          : "text-secondary-foreground/70 hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </Link>
  )
}
