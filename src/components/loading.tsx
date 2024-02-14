import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { cn } from "@/lib/utils"

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full flex-1 items-center justify-center",
        className
      )}
    >
      <FontAwesomeIcon
        icon={faSpinnerThird}
        className="text-primary size-6 animate-spin"
      />
    </div>
  )
}
