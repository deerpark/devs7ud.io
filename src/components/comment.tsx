import * as React from "react"

import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import CommentCreatedBy from "./created-by"
import { formatDistance } from "@/lib/date"
import { FaSpinnerThirdIcon } from "./icon"
import { Separator } from "./ui/separator"
import { useLocale } from "next-intl"

type CommentProps = {
  comment: CommentObjectResponse
}

export default function Comment({ comment }: CommentProps) {
  const locale = useLocale()
  const createdDateTime = formatDistance(
    new Date(comment.created_time),
    new Date(),
    locale,
    {
      addSuffix: true,
    }
  )
  return (
    <div className="space-y-2 pt-5 first-of-type:pt-0" key={comment.id}>
      <div className="flex items-center space-x-2 text-sm">
        <React.Suspense
          fallback={
            <FaSpinnerThirdIcon className="text-primary size-6 animate-spin" />
          }
        >
          <CommentCreatedBy userId={comment.created_by.id} />
        </React.Suspense>
        <Separator orientation="vertical" className="size-0.5 rounded-full" />
        <span className="text-muted-foreground">{createdDateTime}</span>
      </div>
      <div>{comment.rich_text[0]?.plain_text}</div>
    </div>
  )
}
