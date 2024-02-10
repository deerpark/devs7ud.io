import {
  CommentObjectResponse,
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Category, MultiSelect } from "@/types/post.type"
import { Screenshot } from "@/types/bookmark.type"
import DetailContainer from "../detail-container"
import LinkVisit from "./link-visit"
import Slideshow from "../slideshow"
import Comments from "../comments"
import Contents from "../contents"
import Tags from "../tags"

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
  const screenshots: Screenshot[] =
    (bookmark.properties?.Screenshot as any)?.files || []
  // const dateTime = bookmark.created_time
  const categories: Category[] =
    (bookmark.properties?.Categories as any)?.multi_select || []
  const tags: MultiSelect[] =
    (bookmark.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer
      title={title}
      segment="bookmarks"
      description={description}
      categories={categories}
    >
      <div className="mx-auto max-w-max flex-1 space-y-10">
        <Slideshow items={screenshots} />
        <LinkVisit link={link} />
        <Contents bannerUrl={banner.url} content={content} />
        <Tags items={tags} />
      </div>
      <Comments comments={comments} />
    </DetailContainer>
  )
}
