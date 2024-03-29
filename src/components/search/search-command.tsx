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
  data:
    | {
        errors: string | undefined
        posts: PageObjectResponse[]
        bookmarks: PageObjectResponse[]
        projects: PageObjectResponse[]
      }
    | {
        posts: PageObjectResponse[]
        bookmarks: PageObjectResponse[]
        projects: PageObjectResponse[]
        errors?: undefined
      }
  onClose: any
}

export default function SearchCommand({
  /* routes, */
  data,
  formRef,
  onClose,
}: SearchCommandProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const { pending } = useFormStatus()
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

  return (
    <>
      <CommandInput
        className="bg-popover text-foreground placehoder:!font-semibold min-h-14 rounded-3xl border pl-14 !text-lg/8 !font-black md:rounded-2xl"
        icon={
          <FaSearchIcon
            className={cn(
              "absolute inset-y-0 left-6 my-auto size-4",
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
            <p className="text-background dark:text-foreground py-5 text-center">
              {t("SEARCH.notfound")}
            </p>
          )}
        </CommandEmpty>
        {data.posts.length ? (
          <CommandGroup heading={t("SYSTEM.navigation.index.posts")}>
            {data.posts.map((post) => (
              <CommandItem
                className="text-background dark:text-foreground"
                key={post.id}
                value={`posts/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`}
                onSelect={handleSelectItem}
              >
                {(post.properties.Title as any).title[0].plain_text}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {data.bookmarks.length ? (
          <CommandGroup heading={t("SYSTEM.navigation.me.bookmarks")}>
            {data.bookmarks.map((bookmark) => (
              <CommandItem
                className="text-background dark:text-foreground"
                key={bookmark.id}
                value={`bookmarks/${(bookmark.properties?.Slug as any)?.rich_text[0].plain_text}`}
                onSelect={handleSelectItem}
              >
                {(bookmark.properties.Title as any).title[0].plain_text}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {data.projects.length ? (
          <CommandGroup heading={t("SYSTEM.navigation.me.projects")}>
            {data.projects.map((project) => (
              <CommandItem
                className="text-background dark:text-foreground"
                key={project.id}
                value={`projects/${(project.properties?.Slug as any)?.rich_text[0].plain_text}`}
                onSelect={handleSelectItem}
              >
                {(project.properties.Title as any).title[0].plain_text}
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
