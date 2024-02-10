import { MultiSelect } from "@/types/post.type"
import { Badge } from "./ui/badge"

type TagsProps = {
  items: MultiSelect[]
}

export default function Tags({ items = [] }: TagsProps) {
  return items.length ? (
    <div className="flex items-center space-x-2">
      {items?.map((item) => (
        <Badge key={item.id} variant="outline" className="">
          {item.name}
        </Badge>
      ))}
    </div>
  ) : null
}
