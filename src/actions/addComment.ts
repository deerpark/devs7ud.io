"use server"

import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { postComment, getComments } from "@/lib/notion"
import { schemaComment } from "@/scheme"

export async function addComment(
  _: CommentObjectResponse[],
  formData: FormData
) {
  console.log("formData", formData)

  const parse = schemaComment.safeParse({
    page_id: formData.get("page_id"),
    comment: formData.get("comment"),
    name: formData.get("name"),
  })

  console.log("parse.success", parse.success)

  if (!parse.success) {
    console.error(parse.error.flatten().fieldErrors)
    return _
  }

  const data = parse.data

  try {
    const comment = await postComment({
      page_id: data.page_id,
      content: `${data.name}__7__${data.comment}`,
    })

    if (!comment.id) return _

    const comments = await getComments({
      parent: data.page_id,
    })

    return "results" in comments ? comments.results : _

    // revalidatePath("/posts")
  } catch (e) {
    console.error(e)
    return _
  }
}
