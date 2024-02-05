import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { Posts } from "@/components/posts"
import { getPages } from "@/lib/notion"

export default async function PostsPage() {
  const pages = await getPages()

  console.log(pages.results)

  return pages.results.length ? (
    <Posts data={pages.results as PageObjectResponse[]} />
  ) : (
    <div>등록된 포스트가 없습니다.</div>
  )
}
