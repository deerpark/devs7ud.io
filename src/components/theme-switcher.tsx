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
} from "./icon"
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
          className="h-auto w-full items-center space-x-3 rounded-md p-2 lg:py-1.5"
        >
          <span className="flex w-5 items-center justify-center lg:w-4">
            <FaSunIcon className="size-5 rotate-0 scale-100 transition-all lg:size-4 dark:-rotate-90 dark:scale-0" />
            <FaMoonStarsIcon className="absolute size-5 rotate-90 scale-0 transition-all lg:size-4 dark:rotate-0 dark:scale-100" />
          </span>
          <span className="text-muted-foreground flex-1 text-left text-base/5 lg:text-sm/5">
            {t("toggle")}
          </span>
          <FaAnglesUpDownIcon className="fa-dark dark:fa-light size-4 shrink-0 lg:size-3" />
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
