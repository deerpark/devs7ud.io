import { FaSpinnerThirdIcon } from "./icon-duotone"
import { cn } from "@/lib/utils"

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full flex-1 items-center justify-center",
        className
      )}
    >
      <FaSpinnerThirdIcon className="text-primary size-6 animate-spin" />
    </div>
  )
}
