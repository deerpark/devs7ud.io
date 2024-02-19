import { z } from "zod"

export const schema = z.object({
  keyword: z.string({
    invalid_type_error: "Invalid keyword",
  }),
})

export const schemaComment = z.object({
  page_id: z.string({
    invalid_type_error: "Invalid page_id",
  }),
  comment: z.string({
    invalid_type_error: "Invalid comment",
  }),
})
