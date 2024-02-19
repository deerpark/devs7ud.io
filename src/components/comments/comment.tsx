"use client"

import * as React from "react"

import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { FaUserTieIcon } from "../icon-duotone"
import { Separator } from "../ui/separator"
import { formatDistance } from "@/lib/date"
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
        <FaUserTieIcon className="size-4" />
        <Separator orientation="vertical" className="size-0.5 rounded-full" />
        <span className="text-muted-foreground">{createdDateTime}</span>
      </div>
      <div>{comment.rich_text[0]?.plain_text}</div>
    </div>
  )
}
