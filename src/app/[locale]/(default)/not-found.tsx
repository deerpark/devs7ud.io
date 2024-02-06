/* eslint-disable jsx-a11y/anchor-is-valid */

import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/global.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoNotEnter } from "@fortawesome/pro-solid-svg-icons"
import { headers } from "next/headers"
import Link from "next/link"

import { Heading, P } from "@/components/ui/typography"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"

export { metadata } from "@/lib/metadata"
export { viewport } from "@/lib/viewport"

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get("host")
  const t = await getTranslations()
  return (
    <div className="container flex flex-col items-center space-y-5 py-10">
      <FontAwesomeIcon icon={faDoNotEnter} className="my-10 size-8" />
      <div className="flex flex-col items-center space-y-3">
        <Heading tag="h1">{t("SYSTEM.notfound.title")}</Heading>
        <P className="text-muted-foreground">
          {t("SYSTEM.notfound.domain")}: {domain}
        </P>
        <Link href="/" passHref>
          <Button variant="link">{t("SYSTEM.gohome")}</Button>
        </Link>
      </div>
    </div>
  )
}
