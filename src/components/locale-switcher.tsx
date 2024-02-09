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
import { FaAnglesUpDownIcon, FaCheckIcon, FaLanguageIcon } from "./icon"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Locale } from "@/types/common"
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
          className="h-auto w-full items-center space-x-3 rounded-md p-2 lg:py-1.5"
        >
          <span className="flex w-5 items-center justify-center lg:w-4">
            <FaLanguageIcon className="text-tertiary size-5 lg:size-4" />
          </span>
          <span className="text-muted-foreground flex-1 text-left text-base/5 lg:text-sm/5">
            {t("label")}
          </span>
          <FaAnglesUpDownIcon className="fa-dark dark:fa-light size-4 shrink-0 lg:size-3" />
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
                    value === code ? "opacity-100" : "opacity-0"
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
