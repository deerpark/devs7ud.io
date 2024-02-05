import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types"

const localePrefix: LocalePrefix = "as-needed"

// Update this configuration file based on your project information
export const AppConfig = {
  name: "DEVS7UDIO",
  keywords: ["UX", "UI", "사용자경험", "프로토타입", "design engineer"],
  authors: [{ name: "Yonn Kim", url: "https://deerpark.github.io" }],
  locales: ["ko", "en", "fr"],
  defaultLocale: "ko",
  localePrefix,
  twitter: "deerpark7",
}
