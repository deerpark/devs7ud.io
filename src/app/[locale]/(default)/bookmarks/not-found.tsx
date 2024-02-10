import { FaDoNotEnterIcon } from "@/components/icon-duotone"
import { Heading, P } from "@/components/ui/typography"
import { buttonVariants } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { headers } from "next/headers"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get("host")
  const t = await getTranslations()
  return (
    <div className="container flex flex-col items-center space-y-5 py-10">
      <FaDoNotEnterIcon className="my-10 size-12" />
      <div className="flex flex-col items-center space-y-3">
        <Heading tag="h1">
          {t("SYSTEM.notfound.title")}: {domain}
        </Heading>
        <P className="text-muted-foreground">{t("SYSTEM.notfound.message")}</P>
        <P className="flex items-center space-x-1">
          <span className="text-muted-foreground">
            {t("SYSTEM.notfound.view")}
          </span>
          <Link
            href="/bookmarks"
            className={cn(buttonVariants({ variant: "link" }), "px-1")}
          >
            {t("SYSTEM.notfound.allbookmarks")}
          </Link>
        </P>
      </div>
    </div>
  )
}
