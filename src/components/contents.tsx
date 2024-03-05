import { Category, PostProps } from "@/types/post.type"
import { format, formatDistance } from "@/lib/date"
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
    locale = "ko",
  } = props
  const poster =
    (post?.cover as any)?.file?.url || (post?.cover as any)?.external?.url
  const title = (post.properties.Title as any).title[0].plain_text
  const description = (post.properties?.Description as any)?.rich_text[0]
    .plain_text
  const categories: Category[] =
    (post.properties?.Categories as any)?.multi_select || []
  const lastEditDateTime = post.last_edited_time
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
        <div
          id="cover"
          className="relative -mx-8 aspect-square max-h-[calc(100vh/1.5)] w-screen overflow-hidden lg:aspect-video lg:w-[calc(100%+64px)] 2xl:mx-auto 2xl:w-full 2xl:rounded-t-3xl"
        >
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
      <div className="!mt-0 flex flex-col space-y-2 py-8">
        <h1 className="from-primary to-primary/70 flex-none break-all bg-gradient-to-r bg-clip-text text-3xl/normal font-black text-transparent lg:break-keep">
          {title}
        </h1>
        <div className="text-secondary-foreground flex items-center">
          <ByLine
            className="text-tertiary-foreground"
            updateAt={updateAt}
            lastEditDateTime={lastEditDateTime}
            updateDateTime={updateDateTime}
          />
        </div>
        {categories.length ? (
          <div className="text-sm font-semibold">
            {categories?.map((category) => category.name).join(", ")}
          </div>
        ) : null}
      </div>
      {description ? (
        <P className="border-border/50 text-muted-foreground !mt-0 flex-none break-keep border-b pb-8 text-sm">
          {description}
        </P>
      ) : null}
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
          <PageComponent {...{ post, comments, content, locale }} />
        </React.Suspense>
      )}
    </>
  )
}
