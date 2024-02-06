import Logo from "@/public/assets/icons/logo-background-white.svg"
import LogoTypo from "@/public/assets/icons/logo-typo-mono.svg"
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
    <MainContainer title="">
      <div className="my-20 flex flex-col items-center space-y-5">
        <Logo
          className="dark:ring-foreground h-32 w-[136.376px] rounded-xl dark:ring"
          viewBox="0 0 521 489"
          preserveAspectRatio="xMidYMid meet"
        />
        <LogoTypo
          className="text-foreground h-4"
          viewBox="0 0 141 18"
          preserveAspectRatio="xMidYMid meet"
          title={t("title")}
        />
        <p className="text-muted-foreground/50 max-w-60 break-keep pt-20 text-center">
          {t("description")}
        </p>
      </div>
    </MainContainer>
  )
}
