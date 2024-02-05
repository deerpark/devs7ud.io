import { unstable_setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const t = useTranslations("Meta")

  return <h1>{t("title")}</h1>
}
