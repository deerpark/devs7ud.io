import { getTranslations } from "next-intl/server"
import { headers } from "next/headers"
import Link from "next/link"

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get("host")
  const t = await getTranslations()
  return (
    <div>
      <h2>
        {t("SYSTEM.notfound.title")}: {domain}
      </h2>
      <p>{t("SYSTEM.notfound.message")}</p>
      <p>
        {t("SYSTEM.notfound.view")}{" "}
        <Link href="/posts">{t("SYSTEM.notfound.allposts")}</Link>
      </p>
    </div>
  )
}
