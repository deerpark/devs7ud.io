"use server"

import {
  QueryDatabaseResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { searchPages } from "@/lib/notion"
import { schema } from "@/scheme"

export async function search(
  params: { locale: string },
  _: { posts: PageObjectResponse[] },
  formData: FormData
) {
  const parse = schema.safeParse({
    keyword: formData.get("keyword"),
  })

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors.keyword?.join(),
      posts: [] as PageObjectResponse[],
    }
  }

  const data = parse.data

  try {
    const pages = (await searchPages(
      params.locale,
      "posts",
      data.keyword
    )) as QueryDatabaseResponse

    // revalidatePath("/posts")
    return { posts: pages.results as PageObjectResponse[] }
  } catch (e) {
    return {
      errors: "Failed to load posts",
      posts: [] as PageObjectResponse[],
    }
  }
}
