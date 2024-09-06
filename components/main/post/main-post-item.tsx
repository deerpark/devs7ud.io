import { DetailPostFloatingBar } from "@/components/detail/post";
import { CustomImage } from "@/components/shared/shared-image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { getMinutes, getUrl } from "@/lib/utils";
import { getBookmark } from "@/lib/utils/bookmark";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { Comment, PostWithCategoryWithProfile } from "@/types/collection";
import { Ellipsis } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import * as React from "react";
import readingTime from "reading-time";

export const dynamic = "force-dynamic";

async function getComments(postId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  if (!postId) return [];
  const { data: comments, error } = await supabase
    .from("comments")
    .select()
    .eq("post_id", postId)
    .order("created_at", { ascending: true })
    .returns<Comment[]>();

  if (error) {
    console.error(error.message);
  }
  return comments;
}

interface MainPostItemProps {
  post: PostWithCategoryWithProfile;
  userId?: string | null;
}

const MainPostItem: React.FC<MainPostItemProps> = async ({ post, userId }) => {
  // Get bookmark status
  const isBookmarked =
    post.id && userId ? await getBookmark(post.id, userId) : false;
  const readTime = readingTime(post.content ? post.content : "");
  const comments = await getComments(post.id ? post.id : "");
  const image = post.image
    ? await getPublicImageUrl("cover-image", post.image || "")
    : "";

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block max-w-full hover:bg-accent/50 active:bg-accent/100 md:rounded-2xl"
    >
      <article className="relative isolate flex items-stretch gap-2 px-5 py-4 md:px-3 md:py-5">
        {post.profiles?.avatar_url ? (
          <div className="flex flex-none flex-col">
            <CustomImage
              src={post.profiles?.avatar_url}
              alt={post.profiles?.full_name ?? "Avatar"}
              height={40}
              width={40}
              priority
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-y-2">
          <div className="flex flex-1">
            <div className="flex flex-1 flex-col gap-y-2 pt-2.5">
              <div className="flex items-center gap-x-1 text-sm font-semibold">
                <p className="font-bold">{post.profiles.username}</p>
                <Separator className="h-0.5 w-0.5" />
                <span className="text-foreground/70">
                  {getMinutes(readTime.minutes ? readTime.minutes : 0)}
                </span>
              </div>
              <p className="line-clamp-2">{post.description}</p>
            </div>
            <div className="flex flex-none flex-col">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Ellipsis size={16} strokeWidth={3} />
              </Button>
            </div>
          </div>
          {image ? (
            <div className="relative flex-none">
              <CustomImage
                src={image}
                alt={post.title ?? "Cover"}
                width={512}
                height={512}
                priority
                className="h-52 !w-auto max-w-full rounded-2xl bg-accent group-hover:ring-1 group-hover:ring-border"
              />
            </div>
          ) : null}
          <div className="flex flex-none items-center">
            <DetailPostFloatingBar
              id={post.id as string}
              title={post.title as string}
              text={post.description as string}
              url={`${getUrl()}${encodeURIComponent(`/posts/${post.slug}`)}`}
              totalComments={comments?.length}
              isBookmarked={isBookmarked}
              userId={userId}
              grow
            />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MainPostItem;
