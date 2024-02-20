import { FaCalendarClockIcon } from "./icon-duotone"
import { useTranslations } from "next-intl"
import { Separator } from "./ui/separator"

type ByLineProps = {
  updateAt: string
  updateDateTime: string
  lastEditDateTime?: string
}

export default function ByLine({
  updateAt,
  lastEditDateTime,
  updateDateTime,
}: ByLineProps) {
  const t = useTranslations()
  return (
    <div className="flex items-center space-x-2">
      <FaCalendarClockIcon className="fa-dark dark:fa-light size-4" />
      <Separator
        orientation="vertical"
        className="bg-foreground/50 size-0.5 rounded-full"
      />
      <span className="truncate">{updateAt}</span>
      {lastEditDateTime ? (
        <>
          <Separator
            orientation="vertical"
            className="bg-foreground/50 size-0.5 rounded-full"
          />
          <span className="truncate">{t("POSTS.updated")}</span>
          <Separator
            orientation="vertical"
            className="bg-foreground/50 size-0.5 rounded-full"
          />
          <span className="truncate">{updateDateTime}</span>
        </>
      ) : null}
    </div>
  )
}
