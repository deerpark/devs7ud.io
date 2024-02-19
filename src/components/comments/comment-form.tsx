"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { FaMessagesIcon, FaUserLockIcon } from "../icon-duotone"
import { Button, buttonVariants } from "../ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import CommentUsername from "./comment-username"
import CommentSubmit from "./comment-submit"
import { Separator } from "../ui/separator"
import { useTranslations } from "next-intl"
import { Textarea } from "../ui/textarea"
import { useFormState } from "react-dom"
import { cn } from "@/lib/utils"
import Empty from "../ui/empty"
import Comment from "./comment"
import * as React from "react"
import Link from "next/link"

type CommentFormProps = {
  page_id: string
  comments: CommentObjectResponse[]
  addComment(
    _: CommentObjectResponse[],
    formData: FormData
  ): Promise<CommentObjectResponse[]>
}

export default function CommentForm({
  page_id,
  comments,
  addComment,
}: CommentFormProps) {
  const t = useTranslations()
  const commentRef = React.useRef<HTMLTextAreaElement>(null)
  const [state, formAction] = useFormState(addComment, comments)
  React.useEffect(() => {
    if (commentRef.current) {
      commentRef.current.form?.reset()
    }
  }, [state])
  return (
    <>
      <div className="text-card-foreground divide-border/50 space-y-5 divide-y lg:min-w-96">
        {state?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {!state?.length && (
          <Empty
            icon={<FaMessagesIcon className="text-muted-foreground size-12" />}
            description={t("COMMENT.empty.message")}
          />
        )}
      </div>
      <SignedIn>
        <form className="" action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle>Leave a comment</CardTitle>
              <CardDescription>Leave a comment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <input type="hidden" name="page_id" value={page_id} />
                <React.Suspense>
                  <CommentUsername />
                </React.Suspense>
                <Textarea
                  ref={commentRef}
                  id="comment"
                  name="comment"
                  placeholder="Please comment."
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
              <Button variant="ghost">Cancel</Button>
              <CommentSubmit />
            </CardFooter>
          </Card>
        </form>
      </SignedIn>
      <SignedOut>
        <Empty
          icon={<FaUserLockIcon className="text-muted-foreground size-12" />}
          description="댓글을 작성하시려면 로그인 해주세요."
          action={
            <div className="flex items-center space-x-2">
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-muted-foreground px-2"
                )}
              >
                {t("AUTH.signin")}
              </Link>
              <Separator
                orientation="vertical"
                className="size-0.5 rounded-full"
              />
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-muted-foreground px-2"
                )}
              >
                {t("AUTH.signup")}
              </Link>
            </div>
          }
          className="border-border/50 border-t"
        />
      </SignedOut>
    </>
  )
}
