import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { FaEllipsisVerticalIcon } from "./icon-duotone"
import { useTranslations } from "next-intl"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import SnsShare from "./sns-share"

export default function DetailToolbar() {
  const t = useTranslations()
  return (
    <div className="flex items-center px-2">
      <div className="ml-auto flex items-center gap-2">
        <SnsShare />
      </div>
      <Separator
        orientation="vertical"
        className="group-[.active]/bar:bg-border/50 mx-2 h-4"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8" variant="ghost" size="icon">
            <FaEllipsisVerticalIcon className="fa-light group-[.active]/bar:fa-default size-4" />
            <span className="sr-only">{t("TITLEBAR.more")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>{t("TITLEBAR.edit")}</DropdownMenuItem>
          <DropdownMenuItem disabled>{t("TITLEBAR.delete")}</DropdownMenuItem>
          <DropdownMenuItem disabled>{t("TITLEBAR.report")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
