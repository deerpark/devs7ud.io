import { Category, PostProps } from "@/types/post.type"
import { format, formatDistance } from "@/lib/date"
import { useLocale } from "next-intl"
import { P } from "./ui/typography"
import Loading from "./loading"
import Image from "next/image"
import ByLine from "./by-line"
import * as React from "react"

export default function Contents(props: PostProps) {
  const {
    post,
    content,
    page: PageComponent,
    comments,
    extra = undefined,
  } = props
  const poster =
    (post?.cover as any)?.file?.url || (post?.cover as any)?.external?.url
  const title = (post.properties.Title as any).title[0].plain_text
  const description = (post.properties?.Description as any)?.rich_text[0]
  const categories: Category[] =
    (post.properties?.Categories as any)?.multi_select || []
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
  return (
    <>
      {poster && (
        <div className="relative mx-auto aspect-square max-h-[calc(100vh/1.5)] w-full max-w-7xl lg:aspect-video">
          <Image
            src={poster}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
            /* placeholder="blur"
          blurDataURL={blurDataURL} */
            className="from-primary/20 to-primary/0 animate-gradient-mask fill-mode-both absolute inset-0 size-full bg-gradient-to-b object-cover opacity-0 transition-all"
          />
        </div>
      )}
      <h1 className="font-heading from-primary to-primary/70 flex-none break-all bg-gradient-to-r bg-clip-text text-xl font-black text-transparent lg:break-keep">
        {title}
      </h1>
      <div className="text-muted-foreground flex items-center text-sm">
        <ByLine
          updateAt={updateAt}
          lastEditDateTime={lastEditDateTime}
          updateDateTime={updateDateTime}
        />
      </div>
      <div className="text-muted-foreground text-sm">
        {categories?.map((category) => category.name).join(", ")}
      </div>
      <P className="text-muted-foreground !mt-3 flex-none break-keep text-center text-sm 2xl:px-1">
        {description}
      </P>
      {extra ? extra : null}
      {content && !PageComponent ? (
        <div
          className="prose dark:prose-invert prose-p:text-tertiary-foreground prose-headings:text-secondary-foreground mx-auto max-w-3xl text-lg/7"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : typeof PageComponent === "string" ? (
        PageComponent
      ) : (
        <React.Suspense fallback={<Loading />}>
          <PageComponent {...{ post, comments, content }} />
        </React.Suspense>
      )}
    </>
  )
}
