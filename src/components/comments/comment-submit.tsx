"use client"

import { useTranslations } from "next-intl"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import Loading from "../loading"

export default function CommentSubmit() {
  const { pending } = useFormStatus()
  const t = useTranslations("POSTS.comments.form")
  return (
    <Button type="submit">
      {pending ? <Loading className="size-4" /> : <span>{t("submit")}</span>}
    </Button>
  )
}
