import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types"

const localePrefix: LocalePrefix = "as-needed"
const locales = ["ko", "en", "fr"]
const themes = ["light", "dark", "system"]
const defaultLocale = locales[0]!

export const defaultAppConfig = {
  locales,
  localePrefix,
  defaultLocale,
}

export const appConfig = {
  ...defaultAppConfig,
  name: "DEVS7UD.IO",
  description: "We think about practical and user-friendly user interfaces.",
  keywords: ["UX", "UI", "사용자경험", "프로토타입", "design engineer"],
  authors: [{ name: "Yonn Kim", url: "https://deerpark.github.io" }],
  twitter: "deerpark7",
  themes,
}
