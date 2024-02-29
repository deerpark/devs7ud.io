"use client"

import { useParams, useRouter } from "next/navigation"
import { Skeleton } from "../ui/skeleton"
import { motion } from "framer-motion"
import { PostsProps } from "../posts"
import { cn } from "@/lib/utils"
import * as React from "react"
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
  const [isPending, setIsPending] = React.useTransition()
  const router = useRouter()
  const active = `/${segment}/${params.slug}` === url
  const newLocal =
    "border-border/50 group flex space-x-3 border-b px-6 py-3 text-sm transition-all duration-500 last-of-type:border-none lg:rounded-2xl lg:p-2 2xl:group-[.post]/item:rounded-2xl"
  const isPost = segment === "posts"
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> =
    React.useCallback(
      (e) => {
        const url = e.currentTarget.dataset.url
        if (!url) return
        e.preventDefault()
        onClick && onClick(e)
        setIsPending(() => {
          router.push(url)
        })
      },
      [onClick, router]
    )
  return (
    <>
      <Link
        href={url}
        data-url={url}
        onClick={handleClick}
        className={cn(
          newLocal,
          active
            ? "text-primary-foreground active"
            : "text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
          className
        )}
      >
        {isPending ? (
          <div className="flex items-center space-x-3">
            <Skeleton
              className={cn(
                "shadow-2xl ring",
                isPost
                  ? "h-16 w-24 rounded-xl"
                  : "size-12 rounded-full lg:size-8"
              )}
            />
            <div className="flex w-full flex-1 flex-col justify-center space-y-1">
              <Skeleton className="h-6" />
              <Skeleton className="mr-[10%] h-5" />
            </div>
          </div>
        ) : (
          children
        )}
      </Link>
      {active && (
        <motion.div
          className={cn(
            "bg-primary absolute inset-0.5 z-0",
            isPost ? "lg:rounded-2xl" : "lg:rounded-xl"
          )}
          layoutId="list-hilight"
        />
      )}
    </>
  )
}
