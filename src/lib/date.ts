import {
  FormatDistanceOptions,
  formatDistance as formatDistanceFn,
  format as formatFn,
} from "date-fns"
import { enUS, fr, ko } from "date-fns/locale"
import { Locale } from "@/types/common.type"

export function formatDistance(
  date: string | number | Date,
  baseDate: string | number | Date,
  localeCode: string,
  options?: FormatDistanceOptions | undefined
) {
  const _localeCode = localeCode.toUpperCase() as Locale
  const locale = _localeCode === "EN" ? enUS : _localeCode === "FR" ? fr : ko
  return formatDistanceFn(date, baseDate, {
    ...options,
    locale,
  })
}

export function format(
  date: string | number | Date,
  formatStr: string = "PP",
  localeCode: string
) {
  const _localeCode = localeCode.toUpperCase() as Locale
  const locale = _localeCode === "EN" ? enUS : _localeCode === "FR" ? fr : ko
  return formatFn(date, formatStr, {
    locale,
  })
}
