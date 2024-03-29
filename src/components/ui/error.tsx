import { Button, buttonVariants } from "@/components/ui/button"
import { Heading } from "@/components/ui/typography"
import { FaBombIcon } from "../icon-duotone"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ErorProps {
  children: React.ReactNode
  reset: () => void
  className?: string
}

export default function Error({ children, reset, className }: ErorProps) {
  const t = useTranslations("SYSTEM")
  return (
    <div
      className={cn(
        "container flex flex-col items-center space-y-5 py-10",
        className
      )}
    >
      <FaBombIcon className="my-10 size-12" />
      <div className="flex flex-col items-center space-y-3">
        <Heading tag="h1">{t("error.title")}</Heading>
        <div className="flex items-center justify-center space-x-3">
          <Button onClick={() => reset()} variant="link">
            {t("error.action")}
          </Button>
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            {t("gohome")}
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
