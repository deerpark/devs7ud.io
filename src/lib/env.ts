/* eslint-disable import/prefer-default-export */
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const env = createEnv({
  server: {
    PORT: z.coerce.number().min(1).max(65535),
    CROWDIN_PROJECT_ID: z.string().min(1),
    CROWDIN_PERSONAL_TOKEN: z.string().min(1),
    NOTION_TOKEN: z.string().min(1),
    NOTION_DATABASE_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_HOST: z.string().url("NEXT_PUBLIC_HOST is not a valid URL"),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().min(1),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    PORT: 3000,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    CROWDIN_PROJECT_ID: process.env.CROWDIN_PROJECT_ID,
    CROWDIN_PERSONAL_TOKEN: process.env.CROWDIN_PERSONAL_TOKEN,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  },
})
