import {
  CommentObjectResponse,
  ListUsersResponse,
} from "@notionhq/client/build/src/api-endpoints"

export type Locale = "KO" | "EN" | "FR"

export interface PageProps<T> {
  users: ListUsersResponse | never[]
  content: string
  page: React.ComponentType<Omit<T, "page" | "users" | "comments">> | string
  comments: CommentObjectResponse[]
  blurDataURL?: string
}
