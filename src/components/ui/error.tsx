import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBomb } from "@fortawesome/pro-solid-svg-icons"

import { Heading } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErorProps {
  children: React.ReactNode
  reset: () => void
  className?: string
}

export default function Error({ children, reset, className }: ErorProps) {
  return (
    <div
      className={cn(
        "container flex flex-col items-center space-y-5",
        className
      )}
    >
      <FontAwesomeIcon icon={faBomb} />
      <div className="flex flex-col items-center space-y-3">
        <Heading tag="h1">예기치 않은 에러가 발생 했습니다.</Heading>
        <Button onClick={() => reset()}>재시도</Button>
      </div>
      {children}
    </div>
  )
}
