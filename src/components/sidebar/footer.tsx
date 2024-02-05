import LocaleSwitcher from "../locale-switcher"
import { ThemeToggle } from "../theme-toggle"
/* import { Button } from "../ui/button" */

export default function SidebarFooter() {
  return (
    <div className="border-border/50 filter-blur sticky bottom-0 z-10 flex flex-col space-y-3 border-t p-3">
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
      <div className="justify-space-between flex w-full items-center space-x-3">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </div>
  )
}
