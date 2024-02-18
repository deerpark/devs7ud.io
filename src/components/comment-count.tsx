import { FaCommentIcon } from "./icon-duotone"
import { getComments } from "@/lib/notion"
import { Badge } from "./ui/badge"
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
      <Badge
        variant="outline"
        className={cn(
          "flex-none space-x-1.5 !border-0 px-1 py-0",
          commentCounts
            ? "group-[.active]:text-primary-foreground"
            : "group-[.active]:fa-light opacity-0",
          className
        )}
      >
        <FaCommentIcon
          className="group-[.active]:fa-light size-4"
          style={{ transform: "rotateY(180deg)" }}
        />
        <span className="text-tertiary group-[.active]:text-primary-foreground leading-4">
          {commentCounts}
        </span>
      </Badge>
    </>
  )
}
