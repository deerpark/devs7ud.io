import LocaleSwitcher from "../locale-switcher"
import { ThemeToggle } from "../theme-toggle"
import { UserButton } from "@clerk/nextjs"
/* import { Button } from "../ui/button" */

export default function SidebarFooter() {
  return (
    <div className="border-border/50 filter-blur sticky bottom-0 z-10 flex w-full flex-col space-y-3 border-t p-3">
      {/* <div>
        <Button
          variant="ghost"
          onClick={() => {
            // authik.loginWithTwitter({ returnTo: window.location.pathname })
            return false
          }}
          className="w-full"
        >
          Sign in
        </Button>
      </div> */}
      <div className="flex w-full items-center justify-between space-x-3">
        <LocaleSwitcher />
        <UserButton afterSignOutUrl="/" />
        <ThemeToggle />
      </div>
    </div>
  )
}
