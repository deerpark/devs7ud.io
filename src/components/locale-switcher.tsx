"use client"

import { useLocale, useTranslations } from "next-intl"
import * as React from "react"

import { usePathname, useRouter } from "@/lib/i18nNavigation"
import { appConfig } from "@/config/app"

import {
  Command,
  /* CommandEmpty, */
  CommandGroup,
  /* CommandInput, */
  CommandItem,
} from "./ui/command"
import { FaAnglesUpDownIcon, FaCheckIcon, FaLanguageIcon } from "./icon-duotone"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Locale } from "@/types/common.type"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = (useLocale().toUpperCase() as Locale | undefined) || "KO"
  const t = useTranslations("SYSTEM.language")
  const [open, setOpen] = React.useState(false)
  const [value] = React.useState<Locale>(locale)

  const handleSelect: (v: string) => void = (v) => {
    const newLocale = v as Locale
    if (!newLocale) return
    // setValue(newLocale)
    setOpen(false)
    router.push(pathname, { locale: newLocale.toLowerCase() })
    router.refresh()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="text-foreground/60 hover:bg-accent hover:text-foreground/100 group h-auto w-full items-center rounded-md p-0"
        >
          <span className="flex flex-none items-center p-1.5">
            <FaLanguageIcon className="size-5" />
          </span>
          <span className="flex-1 p-1.5 text-left">{t("label")}</span>
          <span className="flex flex-none items-center p-1.5">
            <FaAnglesUpDownIcon className="fa-inherit size-3 opacity-40 group-hover:opacity-100" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0" align="start">
        <Command>
          {/* <CommandInput placeholder={t("placeholder")} />
          <CommandEmpty>{t("empty")}</CommandEmpty> */}
          <CommandGroup>
            {appConfig.locales.map((code) => (
              <CommandItem
                key={code}
                value={code.toUpperCase()}
                onSelect={handleSelect}
              >
                <FaCheckIcon
                  className={cn(
                    "mr-2 size-4",
                    value.toLowerCase() === code ? "opacity-100" : "opacity-0"
                  )}
                />
                {t(code.toUpperCase() as Locale)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
