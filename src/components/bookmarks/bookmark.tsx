import {
  CommentObjectResponse,
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import DetailContainer from "../detail-container"
import { Category } from "@/types/post"
import LinkVisit from "./link-visit"
import Comments from "../comments"
import Contents from "../contents"

interface Banner {
  url: string | null
}

interface BookmarkProps {
  bookmark: PageObjectResponse
  content: string
  createdBy?: UserObjectResponse
  comments: CommentObjectResponse[]
}

export function Bookmark(props: BookmarkProps) {
  const { bookmark, content, comments } = props
  const title = (bookmark.properties.Title as any).title[0].plain_text
  const description = (bookmark.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  const link = (bookmark.properties?.Link as any)?.url
  const banner: Banner = {
    url: (bookmark.properties.Banner as any)?.files[0]?.file?.url,
  }
  // const dateTime = bookmark.created_time
  const tags: Category[] =
    (bookmark.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer
      title={title}
      segment="bookmarks"
      description={description}
      tags={tags}
    >
      <div className="mx-auto max-w-max flex-1">
        <LinkVisit link={link} />
        <Contents bannerUrl={banner.url} content={content} />
      </div>
      <Comments comments={comments} />
    </DetailContainer>
  )
}
