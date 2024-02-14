import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { PageProps } from "./common.type"

export type CategoryColor = "blue" | "orange" | "purple" | "green"
export type CategoryName =
  | "Technology"
  | "Fashion"
  | "Food"
  | "Travel"
  | "Sports"
export type Category = { id: string; name: CategoryName; color: CategoryColor }
export type MultiSelect = { id: string; name: string; color: string }

export interface PostProps extends PageProps<PostProps> {
  post: PageObjectResponse
}
