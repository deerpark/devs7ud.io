import createMiddleware from "next-intl/middleware"
import { authMiddleware } from "@clerk/nextjs"

import { defaultAppConfig } from "./config/app"

const intlMiddleware = createMiddleware({
  locales: defaultAppConfig.locales,
  localePrefix: defaultAppConfig.localePrefix,
  defaultLocale: defaultAppConfig.defaultLocale,
})

export default authMiddleware({
  beforeAuth: intlMiddleware,
  publicRoutes: (req) =>
    !req.url.includes("/:locale/admin") && !req.url.includes("/admin"),
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
