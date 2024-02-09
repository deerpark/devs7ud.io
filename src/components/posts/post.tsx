import {
  CommentObjectResponse,
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { format, formatDistance } from "@/lib/date"
import DetailContainer from "../detail-container"
import { Category } from "@/types/post"
import { useLocale } from "next-intl"
import CreateBy from "../create-by"
import Comments from "../comments"
import Contents from "../contents"
import ByLine from "../by-line"

interface Banner {
  url: string | null
}

interface PostProps {
  post: PageObjectResponse
  content: string
  createdBy?: UserObjectResponse
  comments: CommentObjectResponse[]
}

export function Post(props: PostProps) {
  const { post, content, createdBy, comments } = props
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
  const tags: Category[] = (post.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer title={title} description={description} tags={tags}>
      <div className="mx-auto max-w-max flex-1">
        <div className="text-muted-foreground mb-60 flex flex-col items-center justify-center space-y-20 text-xs/5">
          {createdBy && <CreateBy name={createdBy.name} />}
          <ByLine
            updateAt={updateAt}
            lastEditDateTime={lastEditDateTime}
            updateDateTime={updateDateTime}
          />
        </div>
        <Contents bannerUrl={banner.url} content={content} />
      </div>
      <Comments comments={comments} />
    </DetailContainer>
  )
}
