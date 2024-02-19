import { currentUser } from "@clerk/nextjs"

export default async function CommentUsername() {
  const user = await currentUser()
  return <input type="hidden" name="name" value={user?.username || ""} />
}
