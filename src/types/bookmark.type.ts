import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { PageProps } from "./common.type"

export type Screenshot = {
  file: {
    url: string
    expiry_time: string
  }
  name: string
  type?: "file"
}

export interface BookmarkProps extends PageProps<BookmarkProps> {
  post: PageObjectResponse
}
