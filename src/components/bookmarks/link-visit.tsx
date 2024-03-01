import { FaLinkSimple } from "../icon-duotone"
import { buttonVariants } from "../ui/button"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import Link from "next/link"

type LinkVisitProps = {
  link: string
}

export default function LinkVisit({ link }: LinkVisitProps) {
  const t = useTranslations()
  return (
    <div className="mx-auto w-full md:max-w-fit">
      <Link
        href={link}
        target="_blank"
        className={cn(
          buttonVariants({ variant: "default" }),
          "flex items-center space-x-2 md:inline-flex"
        )}
      >
        <FaLinkSimple className="fa-light dark:fa-dark size-5" />
        <span>{t("BOOKMARKS.visit")}</span>
      </Link>
    </div>
  )
}
