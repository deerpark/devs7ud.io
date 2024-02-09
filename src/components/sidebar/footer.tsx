import { FaUserTieIcon } from "../icon-duotone"
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
/* import { UserButton } from "@clerk/nextjs" */
import Link from "next/link"

export default function SidebarFooter() {
  const t = useTranslations("AUTH")
  return (
    <div className="border-border/50 filter-blur sticky bottom-0 z-10 flex w-full flex-col space-y-3 border-t py-2 pl-5 pr-2">
      <div className="flex w-full items-center justify-between space-x-1">
        {/* <UserButton afterSignOutUrl="/" /> */}
        <FaUserTieIcon className="size-5 lg:size-4" />
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-muted-foreground px-2"
          )}
        >
          {t("signin")}
        </Link>
        <Separator orientation="vertical" className="size-0.5 rounded-full" />
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-muted-foreground px-2"
          )}
        >
          {t("signup")}
        </Link>
        <div className="flex-1" />
      </div>
    </div>
  )
}
