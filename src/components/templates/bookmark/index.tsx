import { PostProps } from "@/types/post.type"

export default function BasicTemplate(
  props: Omit<PostProps, "page" | "users" | "comments">
) {
  return (
    <div>
      {props.post.icon && "emoji" in props.post.icon
        ? props.post.icon.emoji
        : "Grid"}
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
