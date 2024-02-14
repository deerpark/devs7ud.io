import {
  CommentObjectResponse,
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Category, MultiSelect } from "@/types/post.type"
import { format, formatDistance } from "@/lib/date"
import DetailContainer from "../detail-container"
import { useLocale } from "next-intl"
import CreateBy from "../create-by"
import Comments from "../comments"
import Contents from "../contents"
import ByLine from "../by-line"
import Tags from "../tags"

interface Banner {
  url: string | null
}

interface PostProps {
  post: PageObjectResponse
  content: string | React.ComponentType<{}>
  createdBy?: UserObjectResponse
  comments: CommentObjectResponse[]
  poster?: string
  blurDataURL?: string
}

export function Post(props: PostProps) {
  const { post, content, createdBy, comments, poster, blurDataURL } = props
  const title = (post.properties.Title as any).title[0].plain_text
  const description = (post.properties?.Description as any)?.rich_text[0]
    ?.plain_text
  const banner: Banner = {
    url: (post.properties.Banner as any)?.files[0]?.file?.url,
  }
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
      poster={poster}
      blurDataURL={blurDataURL}
      invert
    >
      <div className="mx-auto max-w-max flex-1 space-y-10">
        <div className="text-muted-foreground mb-40 flex flex-col items-center justify-center space-y-20 text-xs/5">
          {createdBy && <CreateBy name={createdBy.name} />}
          <ByLine
            updateAt={updateAt}
            lastEditDateTime={lastEditDateTime}
            updateDateTime={updateDateTime}
          />
        </div>
        <Contents bannerUrl={banner.url} content={content} />
        <Tags items={tags} />
      </div>
      <Comments comments={comments} />
    </DetailContainer>
  )
}
