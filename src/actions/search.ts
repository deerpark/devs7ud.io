"use server"

import { searchPages } from "@/lib/notion"
import { schema } from "@/scheme"
import { QueryDatabaseResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export async function search(
  params: { locale: string },
  prevState: {posts: PageObjectResponse[]},
  formData: FormData
) {
  console.log("prevState", prevState)
  const parse = schema.safeParse({
    keyword: formData.get("keyword"),
  })

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors.keyword?.join(),
      posts: [] as PageObjectResponse[]
    }
  }

  const data = parse.data
  console.log("data", data)

  try {
    const pages = await searchPages(params.locale, "posts", data.keyword) as QueryDatabaseResponse

    // revalidatePath("/posts")
    return { posts: pages.results as PageObjectResponse[] }
  } catch (e) {
    return {
      errors: "Failed to load posts",
      posts: [] as PageObjectResponse[]
    }
  }
}
