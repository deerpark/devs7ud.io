import { getComments } from "@/lib/notion"
import { FaMessagesIcon } from "../icon"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

type CommentCountProps = { id: string; className?: string }

export default async function CommentCount({
  id,
  className,
}: CommentCountProps) {
  const comments = await getComments({ parent: id })
  const commentCounts = "results" in comments ? comments.results.length : 0
  return (
    <div className={cn("", className)}>
      <Badge
        variant="outline"
        className={cn(
          "group-[.active]:text-primary-foreground space-x-2 !border-0 px-1 py-0",
          commentCounts ? "" : "opacity-20"
        )}
      >
        <FaMessagesIcon className="size-4" />
        <span>{commentCounts}</span>
      </Badge>
    </div>
  )
}
