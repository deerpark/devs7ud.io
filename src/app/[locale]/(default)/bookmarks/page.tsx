import { FaBookmarkIcon } from "@/components/icon"
import Empty from "@/components/ui/empty"

export default function BookmarksPage() {
  return (
    <Empty
      icon={<FaBookmarkIcon className="text-muted-foreground size-12" />}
    />
  )
}
