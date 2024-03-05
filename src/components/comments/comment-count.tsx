import { FaMessageLinesIcon } from "../icon-regular"
import { getComments } from "@/lib/notion"
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
    <>
      <div className="flex-1" />
      <Badge
        variant="outline"
        className={cn(
          "flex-none space-x-1.5 !border-0 px-1 py-0",
          commentCounts
            ? "group-[.active]:text-secondary-foreground"
            : "opacity-0",
          className
        )}
      >
        <FaMessageLinesIcon
          className="size-3"
          style={{ transform: "rotateY(180deg)" }}
        />
        <span className="leading-4">{commentCounts}</span>
      </Badge>
    </>
  )
}
