import { mainPostConfig } from "@/config/main";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { Comment, PostWithCategoryWithProfile } from "@/types/collection";
import { getPublicImageUrl } from "@/utils/image-url";
import { createClient } from "@/utils/supabase/server";
import { getUserId } from "@/utils/user-id";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Clock10Icon, MessageCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
}

const MainPostItem: React.FC<MainPostItemProps> = async ({ post }) => {
  const readTime = readingTime(post.content ? post.content : "");
  const comments = await getComments(post.id ? post.id : "");
  const image = post.image
    ? await getPublicImageUrl(post.id, "cover-image", post.image || "")
    : "";

  return (
    <>
      <div className="max-w-full">
        <Link
          href={`/posts/${post.slug}`}
          className="block rounded-2xl hover:bg-accent/50 active:bg-accent/100"
        >
          <article className="relative isolate flex flex-none flex-col gap-2 px-2 py-2 sm:gap-5 sm:px-3 sm:py-3 lg:flex-row">
            {image ? (
              <div className="relative aspect-[16/9] min-h-32 flex-none sm:aspect-[2/1] lg:aspect-square lg:min-w-32">
                <Image
                  src={image}
                  alt={post.title ?? "Cover"}
                  height={128}
                  width={128}
                  priority
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(128, 128),
                  )}`}
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                />
              </div>
            ) : null}

            <div className="group flex-1">
              {/* Desktop category view */}
              <span className="text-xs font-semibold text-muted-foreground">
                {post.categories?.title}
              </span>
              <h3 className="text-lg font-bold">{post.title}</h3>
              {/* Mobile category and toolbar view*/}
              <div className="flex items-center gap-x-3 text-sm sm:hidden">
                <div className="font-semibold">{post.categories?.title}</div>
                <div className="flex items-center gap-x-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="ml-1">
                    {format(parseISO(post.updated_at!), "dd/MM/yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <Clock10Icon className="h-4 w-4" />
                  <span className="ml-1">
                    {getMinutes(readTime.minutes ? readTime.minutes : 0)}
                  </span>
                </div>
              </div>
              <p className="line-clamp-2 text-sm">{post.description}</p>
              {/* Desktop toolbar view */}
              <div className="hidden items-center gap-x-3 py-3 text-sm sm:flex">
                <div className="flex items-center gap-x-1">
                  {post.profiles?.avatar_url ? (
                    <Image
                      src={post.profiles?.avatar_url}
                      alt={post.profiles?.full_name ?? "Avatar"}
                      height={24}
                      width={24}
                      priority
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(24, 24),
                      )}`}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : null}
                  <div className="text-sm">
                    <p className="font-semibold">{post.profiles.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {format(parseISO(post.updated_at!), "MMMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <Clock10Icon className="h-4 w-4" />
                  <span>{getMinutes(readTime.minutes)}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <MessageCircleIcon className="h-4 w-4" />
                  <span>{comments?.length}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </>
  );
};

export default MainPostItem;
