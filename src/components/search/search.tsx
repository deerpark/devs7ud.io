"use client"
import { usePathname } from "next/navigation"
import SearchCommand from "./search-command"
import { getRoutes } from "@/config/routes"
import * as React from "react"

type SearchProps = {
  className?: string
  iconClassName?: string
}

export default function Search({ className, iconClassName }: SearchProps) {
  const pathname = usePathname()
  const routes = getRoutes(pathname)
  return (
    <SearchCommand
      routes={routes}
      className={className}
      iconClassName={iconClassName}
    />
  )
}
