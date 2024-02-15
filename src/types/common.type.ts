import {
  CommentObjectResponse,
  ListUsersResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Icon } from "@/components/icon-duotone"

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
  icon: Icon
  trailingAccessory: Icon | null
  isActive: boolean
  trailingAction?: React.ReactNode
  isExternal?: React.ReactNode
  count?: number
}
