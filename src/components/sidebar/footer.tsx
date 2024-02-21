import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useLocale, useTranslations } from "next-intl"
import { FaUserTieIcon } from "../icon-duotone"
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function SidebarFooter() {
  const t = useTranslations("AUTH")
  const locale = useLocale()
  const { user = { fullName: "" }, isLoaded } = useUser()
  if (!isLoaded) {
    return null
  }
  return (
    <div className="border-border/50 filter-blur sticky bottom-0 z-10 flex w-full flex-col border-t px-3">
      <div className="flex min-h-14 items-center">
        <SignedIn>
          <span className="flex-none p-1.5">
            <UserButton afterSignOutUrl={`/${locale}`} />
          </span>
          <span className="flex-1 truncate px-1.5 py-3">
            {t("welcome", { fullName: user?.fullName || "" })}
          </span>
        </SignedIn>
        <SignedOut>
          <span className="flex-none p-1.5">
            <FaUserTieIcon className="size-5" />
          </span>
          <Link
            href={`/${locale}/sign-in`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex-none p-1.5"
            )}
          >
            {t("signin")}
          </Link>
          <Separator orientation="vertical" className="size-0.5 rounded-full" />
          <Link
            href={`/${locale}/sign-up`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex-none p-1.5"
            )}
          >
            {t("signup")}
          </Link>
          <div className="flex-1" />
        </SignedOut>
      </div>
    </div>
  )
}
