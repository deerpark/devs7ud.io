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
  const newLocal =
    "border-border/50 group flex space-x-3 border-b px-6 py-3 text-sm transition-all duration-500 last-of-type:border-none lg:rounded-2xl lg:p-2 2xl:group-[.post]/item:rounded-2xl"
  /* const isPost = segment === "posts" */
  return (
    <Link
      href={url}
      onClick={onClick && onClick}
      className={cn(
        newLocal,
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
