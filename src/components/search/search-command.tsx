"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FaSearchIcon } from "../icon-duotone"
import { Route } from "@/types/common.type"
import { useTranslations } from "next-intl"
import { search } from "@/actions/search"
import { useFormState } from "react-dom"
import { Button } from "../ui/button"
import { useLocale } from "next-intl"
import { debounce } from "lodash"
import { cn } from "@/lib/utils"
import * as React from "react"

type SearchCommandProps = {
  routes: Route[]
  className?: string
  iconClassName?: string
}

export default function SearchCommand({
  routes,
  className,
  iconClassName,
}: SearchCommandProps) {
  const t = useTranslations()
  const locale = useLocale()
  const formRef = React.useRef<HTMLFormElement>(null)
  const keywordRef = React.useRef<HTMLInputElement>(null)
  const [state, formAction] = useFormState(search.bind(null, { locale }), {
    posts: [],
  })
  const [isLoading, setLoading] = React.useState(false)
  const [isSearchMode, setSearchMode] = React.useState(false)
  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      setSearchMode((open) => !open)
    }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeValue = React.useCallback(
    debounce(() => {
      if (!keywordRef.current || !keywordRef.current.form) return
      setLoading(true)
      keywordRef.current.form.requestSubmit()
    }, 500),
    []
  )
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchMode((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  React.useEffect(() => {
    setLoading(false)
  }, [state])

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "fa-dark dark:fa-light size-8 px-0 transition-all",
          isSearchMode ? "scale-150 opacity-0" : "scale-100 opacity-100",
          className
        )}
        onClick={handleClick}
      >
        <FaSearchIcon className={cn("size-4", iconClassName)} />
      </Button>
      <CommandDialog open={isSearchMode} onOpenChange={setSearchMode}>
        <form ref={formRef} action={formAction}>
          <CommandInput
            className="pl-[42px]"
            icon={
              <FaSearchIcon
                className={cn(
                  "absolute inset-y-0 left-3.5 my-auto size-4",
                  isLoading ? "animate-pulse" : ""
                )}
              />
            }
            ref={keywordRef}
            id="keyword"
            name="keyword"
            placeholder={t("SEARCH.placeholder")}
            onValueChange={handleChangeValue}
          />
        </form>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {state.posts.length ? (
            <CommandGroup heading="Posts">
              {state.posts.map((post) => (
                <CommandItem key={post.id}>
                  {(post.properties.Title as any).title[0].plain_text}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
          <CommandGroup heading="Navigation">
            {routes.map((item) => {
              return item.items.map((subItem) => (
                <CommandItem key={`${item.label}-${subItem.label}`}>
                  <div key={subItem.label}>
                    {item.label ? `${item.label} - ` : ""}
                    {subItem.label}
                  </div>
                </CommandItem>
              ))
            })}
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem>다크모드</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
