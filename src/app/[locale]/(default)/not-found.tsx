/* eslint-disable jsx-a11y/anchor-is-valid */

import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/global.css"

import { headers } from "next/headers"
import Link from "next/link"

import { Heading, P } from "@/components/ui/typography"
import { buttonVariants } from "@/components/ui/button"
import { FaDoNotEnterIcon } from "@/components/icon"
import { getTranslations } from "next-intl/server"

export { metadata } from "@/lib/metadata"
export { viewport } from "@/lib/viewport"

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get("host")
  const t = await getTranslations()
  return (
    <div className="container flex flex-col items-center space-y-5 py-10">
      <FaDoNotEnterIcon className="my-10 size-12" />
      <div className="flex flex-col items-center space-y-3">
        <Heading tag="h1">{t("SYSTEM.notfound.title")}</Heading>
        <P className="text-muted-foreground">
          {t("SYSTEM.notfound.domain")}: {domain}
        </P>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          {t("SYSTEM.gohome")}
        </Link>
      </div>
    </div>
  )
}
