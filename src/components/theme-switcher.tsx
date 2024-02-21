"use client"

import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "@/components/ui/button"

import {
  FaAnglesUpDownIcon,
  FaCheckIcon,
  FaSunIcon,
  FaMoonStarsIcon,
} from "./icon-duotone"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandGroup, CommandItem } from "./ui/command"
import { appConfig } from "@/config/app"
import { cn } from "@/lib/utils"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("SYSTEM.theme")
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(theme)

  const handleSelect: (v: string) => void = (v) => {
    const newTheme = v
    if (!newTheme) return
    setOpen(false)
    setValue(newTheme)
    setTheme(v)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="text-foreground hover:bg-accent group h-auto w-full items-center rounded-md p-0"
        >
          <span className="flex flex-none items-center p-1.5">
            <FaSunIcon className="size-5 dark:hidden" />
            <FaMoonStarsIcon className="hidden size-5 dark:block" />
          </span>
          <span className="flex-1 p-1.5 text-left">{t("toggle")}</span>
          <span className="flex flex-none items-center p-1.5">
            <FaAnglesUpDownIcon className="fa-inherit size-3 opacity-40 group-hover:opacity-100" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0" align="start">
        <Command>
          <CommandGroup>
            {appConfig.themes.map((tm) => (
              <CommandItem key={tm} value={tm} onSelect={handleSelect}>
                <FaCheckIcon
                  className={cn(
                    "mr-2 size-4",
                    value === tm ? "opacity-100" : "opacity-0"
                  )}
                />
                {t(tm as "system" | "light" | "dark")}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
