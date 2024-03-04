import { Category, MultiSelect, PostProps } from "@/types/post.type"
import DetailContainer from "../detail-container"
import Comments from "../comments"
import Contents from "../contents"
import Tags from "../tags"

export function Post(props: PostProps) {
  const { post, comments } = props
  const title = (post.properties.Title as any).title[0].plain_text
  const categories: Category[] =
    (post.properties?.Categories as any)?.multi_select || []
  const tags: MultiSelect[] = (post.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer title={title} categories={categories}>
      <div className="max-w-full flex-1 space-y-40 sm:min-w-96 2xl:mx-auto 2xl:max-w-max">
        <Contents {...props} />
        <Tags items={tags} />
      </div>
      <Comments comments={comments} page_id={post.id} />
    </DetailContainer>
  )
}
