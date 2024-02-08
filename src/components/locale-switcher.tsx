"use client"

import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

import { usePathname, useRouter } from "@/lib/i18nNavigation"
import { appConfig } from "@/config/app"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Locale } from "@/types/common"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const LocaleIcons = {
  en: (
    <Image
      width={20}
      height={20}
      className="ring-foreground rounded-full ring-1"
      src="https://img.icons8.com/color/48/usa-circular.png"
      alt="belgium-circular"
    />
  ),
  ko: (
    <Image
      width={20}
      height={20}
      className="ring-foreground rounded-full ring-1"
      src="https://img.icons8.com/color/48/south-korea-circular.png"
      alt="south-korea-circular"
    />
  ),
  fr: (
    <Image
      width={20}
      height={20}
      className="ring-foreground rounded-full ring-1"
      src="https://img.icons8.com/color/48/france-circular.png"
      alt="france-circular"
    />
  ),
}

type LocaleSwitcherProps = {
  showLabel?: boolean
}

export default function LocaleSwitcher(props: LocaleSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = (useLocale().toUpperCase() as Locale | undefined) || "label"
  const t = useTranslations("SYSTEM.language")

  const handleChange: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const newLocale = e.currentTarget.dataset.locale
    if (!newLocale) return
    router.push(pathname, { locale: newLocale })
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="space-x-3 px-3">
          {LocaleIcons[locale.toLowerCase() as keyof typeof LocaleIcons]}
          {props.showLabel && <span>{t(locale)}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-px">
          {appConfig.locales.map((elt) => (
            <DropdownMenuItem
              data-locale={elt}
              key={elt}
              onClick={handleChange}
              className={cn(
                "space-x-3",
                elt === locale.toLocaleLowerCase() ? "bg-accent" : ""
              )}
            >
              {LocaleIcons[elt as keyof typeof LocaleIcons]}
              <span>{t(elt.toUpperCase() as Locale)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
