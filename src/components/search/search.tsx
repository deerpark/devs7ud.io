"use client"
import { CommandDialog } from "@/components/ui/command"
import { FaSearchIcon } from "../icon-duotone"
import { usePathname } from "next/navigation"
import SearchCommand from "./search-command"
import { getRoutes } from "@/config/routes"
import { search } from "@/actions/search"
import { useFormState } from "react-dom"
import { Button } from "../ui/button"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import * as React from "react"

type SearchProps = {
  className?: string
  iconClassName?: string
}

export default function Search({ className, iconClassName }: SearchProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const routes = getRoutes(pathname)
  const formRef = React.useRef<HTMLFormElement>(null)
  const [isSearchMode, setSearchMode] = React.useState(false)
  const [state, formAction] = useFormState(search.bind(null, { locale }), {
    posts: [],
    bookmarks: [],
  })
  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(() => {
      setSearchMode((open) => !open)
    }, [])
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchMode(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setSearchMode])
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
        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col space-y-4"
        >
          <SearchCommand
            routes={routes}
            state={state}
            formRef={formRef}
            onClose={handleClick}
          />
        </form>
      </CommandDialog>
    </>
  )
}
