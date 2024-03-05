import { Category, MultiSelect, PostProps } from "@/types/post.type"
import { Screenshot } from "@/types/bookmark.type"
import DetailContainer from "../detail-container"
import LinkVisit from "../bookmarks/link-visit"
import { useTranslations } from "next-intl"
import Slideshow from "../slideshow"
import Comments from "../comments"
import Contents from "../contents"
import Tags from "../tags"

export function Project(props: PostProps) {
  const { post, comments } = props
  const t = useTranslations()
  const title = (post.properties.Title as any).title[0].plain_text
  const link = (post.properties?.Link as any)?.url
  const screenshots: Screenshot[] =
    (post.properties?.Screenshot as any)?.files || []
  const categories: Category[] =
    (post.properties?.Categories as any)?.multi_select || []
  const tags: MultiSelect[] = (post.properties?.Tags as any)?.multi_select || []
  return (
    <DetailContainer title={title} categories={categories} segment="projects">
      <div className="max-w-full flex-1 space-y-20 sm:min-w-96 2xl:mx-auto 2xl:max-w-max">
        <Contents
          {...props}
          extra={
            <div className="space-y-5">
              <Slideshow
                items={screenshots}
                label={t("SLIDESHOW.screenshot")}
              />
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
