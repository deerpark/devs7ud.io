import { BookmarkProps, Screenshot } from "@/types/bookmark.type"
import { Category, MultiSelect } from "@/types/post.type"
import DetailContainer from "../detail-container"
import LinkVisit from "./link-visit"
import Slideshow from "../slideshow"
import Comments from "../comments"
import Contents from "../contents"
import Tags from "../tags"

export function Bookmark(props: BookmarkProps) {
  const { post, comments, blurDataURL } = props
  const title = (post.properties.Title as any).title[0].plain_text
  /* const poster =
    (post?.cover as any)?.file?.url ||
    (post?.cover as any)?.external?.url */
  const description = (post.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  const link = (post.properties?.Link as any)?.url
  const screenshots: Screenshot[] =
    (post.properties?.Screenshot as any)?.files || []
  // const dateTime = post.created_time
  const categories: Category[] =
    (post.properties?.Categories as any)?.multi_select || []
  const tags: MultiSelect[] = (post.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer
      title={title}
      segment="bookmarks"
      description={description}
      /* poster={poster} */
      categories={categories}
      blurDataURL={blurDataURL}
    >
      <div className="mx-auto min-w-80 max-w-max flex-1 space-y-10 sm:min-w-96">
        <Slideshow items={screenshots} />
        <LinkVisit link={link} />
        <Contents {...props} />
        <Tags items={tags} />
      </div>
      <Comments comments={comments} />
    </DetailContainer>
  )
}
