import { BookmarkProps } from "@/types/bookmark.type"

export default function BookmarkTemplate(
  props: Omit<BookmarkProps, "page" | "users" | "comments">
) {
  return (
    <div>
      <div className="rounded-6xl bg-primary text-primary-foreground relative inset-x-0 flex w-full flex-col space-y-2 p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex-none text-5xl font-black">
          {props.post.icon && "emoji" in props.post.icon
            ? props.post.icon.emoji
            : "Grid"}
        </div>
        <div className="flex flex-1 flex-col">타이틀</div>
      </div>
      {props.content && (
        <div
          className="prose dark:prose-invert prose-p:text-secondary-foreground prose-headings:text-foreground mx-auto max-w-3xl text-lg/7"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      )}
    </div>
  )
}
