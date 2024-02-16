import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { FaUserTieIcon } from "../icon-duotone"
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import { useTranslations } from "next-intl"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function SidebarFooter() {
  const t = useTranslations("AUTH")
  const { user = { fullName: "" }, isLoaded } = useUser()
  if (!isLoaded) {
    return null
  }
  return (
    <div className="border-border/50 filter-blur sticky inset-x-0 bottom-0 z-10 flex w-full flex-col space-y-3 border-t pb-[calc(8px+env(safe-area-inset-bottom))] pl-5 pr-2 pt-2">
      <div className="flex w-full items-center justify-between space-x-1">
        <FaUserTieIcon className="size-5 lg:size-4" />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <span className="text-muted-foreground px-2 flex-1 text-left text-base/5 lg:text-sm/5">
            {t("welcome", { fullName: user?.fullName || "" })}
          </span>
        </SignedIn>
        <SignedOut>
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
        </SignedOut>
        <div className="flex-1" />
      </div>
    </div>
  )
}
