import { buttonVariants } from "../ui/button"
import { FaLinkIcon } from "../icon-duotone"
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
          "block space-x-2 md:inline-block"
        )}
      >
        <span>{t("BOOKMARKS.visit")}</span>
        <FaLinkIcon className="fa-light dark:fa-dark size-5" />
      </Link>
    </div>
  )
}
