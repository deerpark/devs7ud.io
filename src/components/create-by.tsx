import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type CreateByProps = {
  name?: string | null
}

export default function CreateBy({ name }: CreateByProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Avatar className="size-8 rounded-full">
        <AvatarImage
          src="/assets/images/yonn-kim.jpg"
          alt={`${name} avatar image`}
        />
        {name && (
          <AvatarFallback className="text-xs font-bold">
            {name?.slice(0, 1)}
          </AvatarFallback>
        )}
      </Avatar>
      {name && <div className="truncate">{name}</div>}
    </div>
  )
}
