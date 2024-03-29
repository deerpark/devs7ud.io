import {
  CommentObjectResponse,
  ListUsersResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Icon } from "@/components/icon-duotone"
import { IconType } from "react-icons/lib"

export type Locale = "KO" | "EN" | "FR"

export interface PageProps<T> {
  users: ListUsersResponse | never[]
  content: string
  page: React.ComponentType<Omit<T, "page" | "users" | "comments">> | string
  comments: CommentObjectResponse[]
  blurDataURL?: string
}

export type Route = {
  label: string | null
  items: RouteItem[]
}
export type RouteItem = {
  href: string
  label: string
  icon: Icon | IconType
  activeIcon?: Icon | IconType
  trailingAccessory: Icon | IconType | null
  isActive: boolean
  trailingAction?: React.ReactNode
  isExternal?: React.ReactNode
  count?: number
}
