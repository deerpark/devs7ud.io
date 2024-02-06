import createMiddleware from "next-intl/middleware"

import { defaultAppConfig } from "./config/app"

const intlMiddleware = createMiddleware({
  locales: defaultAppConfig.locales,
  localePrefix: defaultAppConfig.localePrefix,
  defaultLocale: defaultAppConfig.defaultLocale,
})

export default intlMiddleware

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
