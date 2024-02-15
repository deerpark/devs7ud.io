import { z } from "zod"

export const schema = z.object({
  keyword: z.string({
    invalid_type_error: "Invalid keyword",
  }),
})
