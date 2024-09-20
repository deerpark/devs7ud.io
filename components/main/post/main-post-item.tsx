import { DetailPostFloatingBar } from "@/components/detail/post";
import { PhotoProvider } from "@/components/shared/photo-provider";
import { CustomImage } from "@/components/shared/shared-image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { cn, getMinutes, getUrl } from "@/lib/utils";
import { getBookmark } from "@/lib/utils/bookmark";
import { getGalleryImageFileNames } from "@/lib/utils/gallery-image-filenames";
import { getGalleryImageUrls } from "@/lib/utils/gallery-image-url";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { Comment, PostWithCategoryWithProfile } from "@/types/collection";
import { Ellipsis } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import * as React from "react";
import readingTime from "reading-time";

export const dynamic = "force-dynamic";

const cellClassName = [
  ["row-start-1 row-end-1 col-start-1 col-end-1 h-64 rounded-xl"],
  [
    "row-start-1 row-end-1 col-start-1 col-end-2 h-64 rounded-l-xl",
    "row-start-1 row-end-1 col-start-3 col-end-4 h-64 rounded-r-xl",
  ],
  [
    "row-start-1 row-end-1 col-start-1 col-end-1 h-64 rounded-l-xl",
    "row-start-1 row-end-1 col-span-2 h-64",
    "row-start-1 row-end-1 col-start-4 col-end-4 h-64 rounded-r-xl",
  ],
  [
    "row-start-1 row-end-1 col-start-1 col-end-1 h-28 rounded-tl-xl",
    "row-start-1 row-end-1 col-span-2 h-28 rounded-tr-xl",
    "row-start-1 row-end-1 col-start-4 col-end-4 h-28 rounded-bl-xl",
    "row-start-2 row-end-2 col-span-3 h-28 rounded-br-xl",
  ],
  [
    "row-start-1 row-end-1 col-start-1 col-end-1 h-28 rounded-tl-xl",
    "row-start-1 row-end-1 col-span-2 h-28",
    "row-start-1 row-end-1 col-start-4 col-end-4 h-28 rounded-tr-xl",
    "row-start-2 row-end-2 col-span-2 h-28 rounded-bl-xl",
    "row-start-2 row-end-2 col-span-2 h-28 rounded-br-xl",
  ],
  [
    "row-start-1 row-end-1 col-start-1 col-end-1 h-28 rounded-tl-xl",
    "row-start-1 row-end-1 col-span-2 h-28",
    "row-start-1 row-end-1 col-start-4 col-end-4 h-28 rounded-tr-xl",
    "row-start-2 row-end-2 col-start-1 col-end-1 h-28 rounded-bl-xl",
    "row-start-2 row-end-2 col-span-2 h-28",
    "row-start-2 row-end-2 col-start-4 col-end-4 h-28 rounded-br-xl",
  ],
  [
    "row-start-1 row-end-1 col-start-1 col-end-1 h-28 rounded-tl-xl",
    "row-start-1 row-end-1 col-span-2 h-28",
    "row-start-1 row-end-1 col-start-4 col-end-4 h-28 rounded-tr-xl",
    "row-start-2 row-end-2 col-start-1 col-end-1 h-28",
    "row-start-2 row-end-2 col-span-2 h-28",
    "row-start-2 row-end-2 col-start-4 col-end-4 h-28",
    "row-start-3 row-end-3 col-span-3 h-28 rounded-b-xl",
  ],
  [
    "row-start-1 row-end-1 col-start-1 col-end-1 h-28 rounded-tl-xl",
    "row-start-1 row-end-1 col-span-2 h-28",
    "row-start-1 row-end-1 col-start-4 col-end-4 h-28 rounded-tr-xl",
    "row-start-2 row-end-2 col-start-1 col-end-1 h-28",
    "row-start-2 row-end-2 col-span-2 h-28",
    "row-start-2 row-end-2 col-start-4 col-end-4 h-28",
    "row-start-3 row-end-3 col-span-2 h-28 rounded-bl-xl",
    "row-start-3 row-end-3 col-span-2 h-28 rounded-br-xl",
  ],
  [
    "row-start-1 row-end-1 col-start-1 col-end-1 h-28 rounded-tl-xl",
    "row-start-1 row-end-1 col-span-2 h-28",
    "row-start-1 row-end-1 col-start-4 col-end-4 h-28 rounded-tr-xl",
    "row-start-2 row-end-2 col-start-1 col-end-1 h-28",
    "row-start-2 row-end-2 col-span-2 h-28",
    "row-start-2 row-end-2 col-start-4 col-end-4 h-28",
    "row-start-3 row-end-3 col-start-1 col-end-1 h-28 rounded-bl-xl",
    "row-start-3 row-end-3 col-span-2 h-28",
    "row-start-3 row-end-3 col-start-4 col-end-4 h-28 rounded-br-xl",
  ],
];

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

const bucketNameGalleryImage =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE!;

const MainPostItem: React.FC<MainPostItemProps> = async ({ post, userId }) => {
  // Get bookmark status
  const isBookmarked =
    post.id && userId ? await getBookmark(post.id, userId) : false;
  const readTime = readingTime(post.content ? post.content : "");
  const comments = await getComments(post.id ? post.id : "");
  const image = post.image
    ? await getPublicImageUrl("cover-image", post.image || "")
    : "";

  // Gallery images setup
  const galleryImageFileNames = await getGalleryImageFileNames(
    bucketNameGalleryImage,
    post.author_id,
    post.id,
  );
  const galleryImagePublicUrls = await getGalleryImageUrls(
    bucketNameGalleryImage,
    post.author_id || "",
    post.id,
    galleryImageFileNames || [],
  );
  const restNumber = galleryImagePublicUrls.length % 3;

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
          {galleryImagePublicUrls?.length ? (
            <PhotoProvider>
              <div
                className={cn(
                  "relative grid flex-none grid-cols-[1fr_0.5fr_0.5fr_1fr] gap-1 rounded-xl bg-background ring-1 ring-border group-hover:ring-foreground/20",
                )}
              >
                {galleryImagePublicUrls.map((url, index) => (
                  <CustomImage
                    className={cn(
                      "h-fulll static w-full bg-background object-cover shadow shadow-border",
                      cellClassName[galleryImagePublicUrls.length - 1][index],
                    )}
                    key={url}
                    src={url}
                    alt=""
                    width={512}
                    height={512}
                    viewer
                    priority
                  />
                ))}
              </div>
            </PhotoProvider>
          ) : image ? (
            <div className={cn("gap-1d relative grid flex-none grid-cols-1")}>
              <CustomImage
                className="h-fulll static col-start-1 col-end-1 row-start-1 row-end-1 w-full rounded-[32px] bg-background object-cover shadow shadow-border ring-1 ring-border hover:rounded-[32px] hover:!ring-primary  group-hover:ring-foreground/20 lg:rounded-3xl"
                src={image}
                alt={post.title ?? "Cover"}
                width={512}
                height={512}
                priority
                viewer
                single
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
