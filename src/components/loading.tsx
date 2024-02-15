import { FaSpinnerThirdIcon } from "./icon-duotone"
import { cn } from "@/lib/utils"

export default function Loading({
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
}) {
  return (
    <div
      className={cn(
        "flex size-full flex-1 items-center justify-center",
        className
      )}
    >
      <FaSpinnerThirdIcon
        className={cn("text-primary size-6 animate-spin", iconClassName)}
      />
    </div>
  )
}
