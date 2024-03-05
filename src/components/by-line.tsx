import { useTranslations } from "next-intl"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"

type ByLineProps = {
  updateAt: string
  updateDateTime: string
  lastEditDateTime?: string
  className?: string
}

export default function ByLine({
  updateAt,
  lastEditDateTime,
  updateDateTime,
  className,
}: ByLineProps) {
  const t = useTranslations()
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <span className="truncate">{updateAt}</span>
      {lastEditDateTime ? (
        <>
          <Separator orientation="vertical" className="size-0.5 rounded-full" />
          <span className="truncate">{t("POSTS.updated")}</span>
          <Separator orientation="vertical" className="size-0.5 rounded-full" />
          <span className="truncate">{updateDateTime}</span>
        </>
      ) : null}
    </div>
  )
}
