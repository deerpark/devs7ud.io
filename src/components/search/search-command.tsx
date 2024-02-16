"use client"

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { FaSearchIcon } from "../icon-duotone"
import { Route } from "@/types/common.type"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useFormStatus } from "react-dom"
import { useLocale } from "next-intl"
import { debounce } from "lodash"
import { cn } from "@/lib/utils"
import Loading from "../loading"
import * as React from "react"
import { Command } from "cmdk"

type SearchCommandProps = {
  routes?: Route[]
  formRef: React.RefObject<HTMLFormElement>
  state:
    | {
        errors: string | undefined
        posts: PageObjectResponse[]
        bookmarks: PageObjectResponse[]
      }
    | {
        posts: PageObjectResponse[]
        bookmarks: PageObjectResponse[]
        errors?: undefined
      }
  onClose: any
}

export default function SearchCommand({
  /* routes, */
  state,
  formRef,
  onClose,
}: SearchCommandProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const { pending } = useFormStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeValue = debounce(() => {
    if (!formRef.current) return
    formRef.current.requestSubmit()
  }, 500)
  const handleSelectItem = React.useCallback(
    (value: string) => {
      onClose()
      router.push(`/${locale}/${value}`)
    },
    [locale, router, onClose]
  )
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <CommandInput
        className="min-h-14 pl-[42px]"
        icon={
          <FaSearchIcon
            className={cn(
              "absolute inset-y-0 left-3.5 my-auto size-4",
              pending ? "animate-pulse" : ""
            )}
          />
        }
        id="keyword"
        name="keyword"
        placeholder={t("SEARCH.placeholder")}
        onValueChange={handleChangeValue}
      />
      <CommandList>
        <CommandEmpty>
          {pending ? (
            <Command.Loading>
              <Loading className="h-auto w-full" />
            </Command.Loading>
          ) : (
            "No results found."
          )}
        </CommandEmpty>
        {state.posts.length ? (
          <CommandGroup heading="Posts">
            {state.posts.map((post) => (
              <CommandItem
                key={post.id}
                value={`posts/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`}
                onSelect={handleSelectItem}
              >
                {(post.properties.Title as any).title[0].plain_text}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {state.bookmarks.length ? (
          <CommandGroup heading="Bookmarks">
            {state.bookmarks.map((bookmark) => (
              <CommandItem
                key={bookmark.id}
                value={`bookmarks/${(bookmark.properties?.Slug as any)?.rich_text[0].plain_text}`}
                onSelect={handleSelectItem}
              >
                {(bookmark.properties.Title as any).title[0].plain_text}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {/* <CommandGroup heading="Navigation">
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
          </CommandGroup> */}
      </CommandList>
    </>
  )
}
