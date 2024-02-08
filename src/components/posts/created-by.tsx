import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getUsers } from "@/lib/notion"

type CommentCreatedByProps = {
  userId: string
}

export default async function CommentCreatedBy({
  userId,
}: CommentCreatedByProps) {
  const users = await getUsers()
  const user =
    "results" in users ? users.results.find((u) => u.id === userId) : undefined
  if (!user) return null

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="ring-foreground group-[.active]:ring-primary-foreground border-1 size-5 rounded-full ring-1">
        {user?.avatar_url && (
          <AvatarImage
            src={user?.avatar_url}
            alt={`${user.name} avatar image`}
          />
        )}
        <AvatarFallback className="text-xs font-bold">
          {user.name?.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div>{user.name}</div>
    </div>
  )
}
