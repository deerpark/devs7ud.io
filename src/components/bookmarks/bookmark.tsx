import { BookmarkProps, Screenshot } from "@/types/bookmark.type"
import { Category, MultiSelect } from "@/types/post.type"
import DetailContainer from "../detail-container"
import LinkVisit from "./link-visit"
import Slideshow from "../slideshow"
import Comments from "../comments"
import Contents from "../contents"
import Tags from "../tags"

export function Bookmark(props: BookmarkProps) {
  const { post, comments } = props
  const title = (post.properties.Title as any).title[0].plain_text?.plain_text
  const link = (post.properties?.Link as any)?.url
  const screenshots: Screenshot[] =
    (post.properties?.Screenshot as any)?.files || []
  // const dateTime = post.created_time
  const categories: Category[] =
    (post.properties?.Categories as any)?.multi_select || []
  const tags: MultiSelect[] = (post.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer title={title} segment="bookmarks" categories={categories}>
      <div className="max-w-full flex-1 space-y-20 sm:min-w-96 2xl:mx-auto 2xl:max-w-max">
        <Contents
          {...props}
          extra={
            <div>
              <Slideshow items={screenshots} />
              <LinkVisit link={link} />
            </div>
          }
        />
        <Tags items={tags} />
      </div>
      <Comments comments={comments} page_id={post.id} />
    </DetailContainer>
  )
}
