"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import Loading from "../loading"

export default function CommentSubmit() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit">
      {pending ? <Loading className="size-4" /> : <span>Submit</span>}
    </Button>
  )
}
