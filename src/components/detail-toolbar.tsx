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
/* import Search from "./list/search" */
import SnsShare from "./sns-share"
import { cn } from "@/lib/utils"

type DetailToolbarProps = {
  invert?: boolean
}

export default function DetailToolbar({ invert = false }: DetailToolbarProps) {
  const t = useTranslations()
  return (
    <div className="flex items-center px-2">
      <div className="ml-auto flex items-center gap-2">
        <SnsShare invert={invert} />
        {/* <Search
          className="group/button size-8"
          iconClassName={
            invert
              ? "fa-light group-[.active]/bar:fa-default group-hover/button:fa-default"
              : ""
          }
        /> */}
      </div>
      <Separator
        orientation="vertical"
        className={cn(
          "group-[.active]/bar:bg-border/50 hover:fa-default mx-2 h-4 transition-all",
          invert ? "bg-border/50" : ""
        )}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="group/button size-8" variant="ghost" size="icon">
            <FaEllipsisVerticalIcon
              className={cn(
                "size-4 transition-all",
                invert
                  ? "fa-light group-[.active]/bar:fa-default group-hover/button:fa-default"
                  : ""
              )}
            />
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
