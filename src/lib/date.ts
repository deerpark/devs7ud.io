import "server-only"

import {
  FormatDistanceOptions,
  formatDistance as formatDistanceFn,
  format as formatFn,
} from "date-fns"
import { enUS, fr, ko } from "date-fns/locale"
import { getLocale } from "next-intl/server"

export async function formatDistance(
  date: string | number | Date,
  baseDate: string | number | Date,
  options?: FormatDistanceOptions | undefined
) {
  const localeCode = await getLocale()
  const locale = localeCode === "en" ? enUS : localeCode === "fr" ? fr : ko
  return formatDistanceFn(date, baseDate, {
    locale,
    ...options,
  })
}

export async function format(date: string | number | Date, formatStr = "PP") {
  const localeCode = await getLocale()
  const locale = localeCode === "en" ? enUS : localeCode === "fr" ? fr : ko
  return formatFn(date, formatStr, {
    locale,
  })
}
