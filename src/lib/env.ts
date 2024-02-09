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
    NOTION_BOOKMARKS_DATABASE_ID: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_HOST: z.string().url("NEXT_PUBLIC_HOST is not a valid URL"),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    PORT: 3000,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    CROWDIN_PROJECT_ID: process.env.CROWDIN_PROJECT_ID,
    CROWDIN_PERSONAL_TOKEN: process.env.CROWDIN_PERSONAL_TOKEN,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_BOOKMARKS_DATABASE_ID: process.env.NOTION_BOOKMARKS_DATABASE_ID,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
})
