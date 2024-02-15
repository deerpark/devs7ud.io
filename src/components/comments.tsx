import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { FaMessagesIcon } from "./icon-duotone"
import { useTranslations } from "next-intl"
import { Separator } from "./ui/separator"
import Comment from "./comment"
import Empty from "./ui/empty"

type CommentsProps = {
  comments: CommentObjectResponse[]
}

export default function Comments({ comments }: CommentsProps) {
  const t = useTranslations()
  return (
    <div className="bg-card/50 -mx-8 -mb-8 mt-60 flex-none pb-20">
      <Separator
        orientation="horizontal"
        className="2xl:from-border/20 2xl:via-border 2xl:to-border/20 2xl:bg-transparent 2xl:bg-gradient-to-r"
      />
      <div className="p-8">
        <div className="text-card-foreground divide-border space-y-5 divide-y">
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {!comments?.length && (
            <Empty
              icon={
                <FaMessagesIcon className="text-muted-foreground size-12" />
              }
              description={t("COMMENT.empty.message")}
            />
          )}
        </div>
      </div>
    </div>
  )
}
