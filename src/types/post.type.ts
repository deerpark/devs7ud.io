import {
  CommentObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
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

export type PostsResponse = {
  errors?: string
  posts: PageObjectResponse[]
}
export type Posts = {
  posts: PageObjectResponse[]
}
export type RequestParams = {
  locale: string
}
export type OnSearch = (
  params: Pick<RequestParams, "locale">,
  prevState: Posts,
  formData: FormData
) => Promise<PostsResponse>

export type AddCommentResponse = {
  comments: CommentObjectResponse[]
}
export type AddCommentErrorResponse = {
  errors:
    | {
        page_id?: string[] | undefined
        comment?: string[] | undefined
      }
    | string[]
}
