import { unstable_setRequestLocale } from "next-intl/server"
import MainContainer from "@/components/main"
import { useTranslations } from "next-intl"

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const t = useTranslations("Meta")

  return (
    <MainContainer title={t("title")}>
      <p>{t("description")}</p>
    </MainContainer>
  )
}
