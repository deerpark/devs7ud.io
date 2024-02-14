import { PostProps } from "@/types/post.type"
import Loading from "./loading"
import * as React from "react"

export default function Contents(props: PostProps) {
  const { post, content, page: PageComponent, comments, blurDataURL } = props
  return (
    <>
      {content && !PageComponent ? (
        <div
          className="prose dark:prose-invert prose-p:text-secondary-foreground prose-headings:text-foreground mx-auto max-w-3xl text-lg/7"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : typeof PageComponent === "string" ? (
        PageComponent
      ) : (
        <React.Suspense fallback={<Loading />}>
          <PageComponent {...{ post, comments, content, blurDataURL }} />
        </React.Suspense>
      )}
    </>
  )
}
