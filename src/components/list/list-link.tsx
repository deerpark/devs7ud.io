"use client"

import { useParams } from "next/navigation"
import { PostsProps } from "../posts"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ListItemLinkProps = {
  url: string
  className?: string
} & Pick<PostsProps, "onClick"> &
  React.PropsWithChildren

export default function ListItemLink({
  url,
  onClick,
  children,
  className,
}: ListItemLinkProps) {
  const params = useParams<{ slug: string; locale: string }>()
  const active = `/posts/${params.slug}` === url
  return (
    <Link
      href={url}
      onClick={onClick && onClick}
      className={cn(
        `border-border/50 flex space-x-3 border-b px-6 py-3 text-sm lg:rounded-lg lg:border-none lg:px-3 lg:py-2 ${
          active
            ? "bg-primary text-primary-foreground active group"
            : "hover:bg-accent hover:text-accent-foreground"
        }`,
        className
      )}
    >
      {children}
    </Link>
  )
}
