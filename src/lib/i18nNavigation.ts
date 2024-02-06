import { createSharedPathnamesNavigation } from "next-intl/navigation"

import { appConfig } from "@/config/app"

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: appConfig.locales,
  localePrefix: appConfig.localePrefix,
})
