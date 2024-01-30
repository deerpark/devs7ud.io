/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    CROWDIN_PROJECT_ID: z.string().min(1),
    CROWDIN_PERSONAL_TOKEN: z.string().min(1),
  },
  client: {},
  // You need to destructure all the keys manually
  runtimeEnv: {
    CROWDIN_PROJECT_ID: process.env.CROWDIN_PROJECT_ID,
    CROWDIN_PERSONAL_TOKEN: process.env.CROWDIN_PERSONAL_TOKEN,
  },
});
