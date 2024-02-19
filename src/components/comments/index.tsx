import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { addComment } from "@/actions/addComment"
import { Separator } from "../ui/separator"
import CommentForm from "./comment-form"
import * as React from "react"

type CommentsProps = {
  page_id: string
  comments: CommentObjectResponse[]
}

export default function Comments({ comments, page_id }: CommentsProps) {
  return (
    <div className="bg-card/50 -mx-8 -mb-8 mt-60 flex-none pb-20">
      <Separator
        orientation="horizontal"
        className="2xl:from-border/20 2xl:via-border 2xl:to-border/20 2xl:bg-transparent 2xl:bg-gradient-to-r"
      />
      <div className="max-w-full flex-1 space-y-10 p-8 sm:min-w-96 2xl:mx-auto 2xl:max-w-max">
        <CommentForm
          page_id={page_id}
          comments={comments}
          addComment={addComment}
        />
      </div>
    </div>
  )
}
