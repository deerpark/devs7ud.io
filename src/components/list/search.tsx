import * as React from 'react'
import { FaSearchIcon, FaSpinnerThirdIcon } from "../icon-duotone"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useFormState, useFormStatus } from "react-dom"
import { OnSearch } from "@/types/post.type"
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"

type SearchProps = {
    onSearch: OnSearch
    locale: string
}

export default function Search({onSearch, locale}: SearchProps) {
    const t = useTranslations()
    const [state, formAction] = useFormState(onSearch.bind(null, {locale}), {posts: []});
    const { pending } = useFormStatus()
    return <form action={formAction}>
    <div className="relative mb-3">
        <Command>
        <CommandInput
        className='pl-[42px]'
        icon={<div className="absolute inset-y-0 left-3.5 my-auto size-4 overflow-hidden">
        {pending ? (
          <FaSpinnerThirdIcon
            className={cn(
              "absolute inset-y-0 left-0",
              pending
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            )}
          />
        ) : (
          <FaSearchIcon
            className={cn(
              "absolute inset-y-0 left-0",
              pending
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            )}
          />
        )}
      </div>}
            id="keyword"
            name="keyword" placeholder={t("SEARCH.placeholder")} />
            {state.posts.length ? <CommandList>
                <CommandGroup heading="Posts">
                    {state.posts.map((post) => <CommandItem key={post.id}>{(post.properties.Title as any).title[0].plain_text}</CommandItem>)}
                </CommandGroup>
            </CommandList>: null}
        </Command>
    </div>
  </form>
}