import { Category, MultiSelect, PostProps } from "@/types/post.type"
import { format, formatDistance } from "@/lib/date"
import DetailContainer from "../detail-container"
import { useLocale } from "next-intl"
import CreateBy from "../create-by"
import Comments from "../comments"
import Contents from "../contents"
import ByLine from "../by-line"
import Tags from "../tags"

export function Post(props: PostProps) {
  const { post, users, comments, blurDataURL } = props
  const createdBy =
    "results" in users
      ? users.results.find((u) => u.id === post.created_by.id)
      : undefined
  const title = (post.properties.Title as any).title[0].plain_text
  const poster =
    (post?.cover as any)?.file?.url || (post?.cover as any)?.external?.url
  const posterDarkmode = (post.properties?.Darkmode as any)?.files[0]?.file?.url
  const description = (post.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  // const dateTime = post.created_time
  const lastEditDateTime = post.last_edited_time
  const locale = useLocale()
  const updateDateTime = formatDistance(
    new Date(lastEditDateTime),
    new Date(),
    locale,
    {
      addSuffix: true,
    }
  )
  const updateAt = format(lastEditDateTime, "PP", locale)
  const categories: Category[] =
    (post.properties?.Categories as any)?.multi_select || []
  const tags: MultiSelect[] = (post.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer
      title={title}
      description={description}
      categories={categories}
      poster={[poster, posterDarkmode]}
      blurDataURL={blurDataURL}
      createdBy={createdBy && <CreateBy />}
      byLine={
        <ByLine
          updateAt={updateAt}
          lastEditDateTime={lastEditDateTime}
          updateDateTime={updateDateTime}
        />
      }
    >
      <div className="max-w-full flex-1 space-y-40 sm:min-w-96 2xl:mx-auto 2xl:max-w-max">
        <Contents {...props} />
        <Tags items={tags} />
      </div>
      <Comments comments={comments} page_id={post.id} />
    </DetailContainer>
  )
}
