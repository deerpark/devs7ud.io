import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { FaEllipsisVerticalIcon } from "./icon-duotone"
import { useTranslations } from "next-intl"
import { Button } from "./ui/button"
/* import Search from "./list/search" */
import SnsShare from "./sns-share"

export default function DetailToolbar() {
  const t = useTranslations()
  return (
    <div className="flex items-center space-x-1 px-2">
      <div className="ml-auto flex items-center gap-2">
        <SnsShare />
        {/* <Search
          className="group/button size-8"
          iconClassName={
        /> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="group/button size-8" variant="ghost" size="icon">
            <FaEllipsisVerticalIcon className="size-4" />
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
