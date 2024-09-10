import { DetailPostFloatingBar } from "@/components/detail/post";
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

const getGridTemplateStyle = (imageCount) => {
  const threeColLayout = "33% 34% 33%";
  const twoColLayout = "50% 50%";

  let style = {
    gridTemplateRows: "",
    gridTemplateColumns: "",
  };

  if (imageCount === 1) {
    style.gridTemplateColumns = "100%";
    style.gridTemplateRows = "128px";
  } else if (imageCount === 2) {
    style.gridTemplateColumns = twoColLayout;
    style.gridTemplateRows = "128px";
  } else if (imageCount === 3) {
    style.gridTemplateColumns = threeColLayout;
    style.gridTemplateRows = "128px";
  } else if (imageCount >= 4 && imageCount <= 6) {
    style.gridTemplateColumns = threeColLayout;
    style.gridTemplateRows = imageCount === 4 ? "128px 128px" : "128px 128px";
  } else if (imageCount === 7) {
    style.gridTemplateColumns = threeColLayout;
    style.gridTemplateRows = "128px 128px 128px";
  } else if (imageCount === 8) {
    style.gridTemplateColumns = threeColLayout;
    style.gridTemplateRows = "128px 128px 128px";
  } else if (imageCount === 9) {
    style.gridTemplateColumns = threeColLayout;
    style.gridTemplateRows = "128px 128px 128px";
  }

  return style;
};

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
            <div
              className={cn(
                "relative grid flex-none gap-px overflow-hidden rounded-xl bg-foreground/30 ring-1 ring-border group-hover:ring-foreground/20",
              )}
              style={getGridTemplateStyle(galleryImagePublicUrls.length)}
            >
              {galleryImagePublicUrls.map((url, index) => (
                <CustomImage
                  className="h-full w-full bg-background object-cover"
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
          ) : image ? (
            <div
              className={cn(
                "relative grid flex-none gap-px overflow-hidden rounded-xl bg-foreground/30 ring-1 ring-border group-hover:ring-foreground/20",
              )}
              style={getGridTemplateStyle(1)}
            >
              <CustomImage
                className="h-full w-full bg-background object-cover"
                src={image}
                alt={post.title ?? "Cover"}
                width={512}
                height={512}
                priority
                viewer
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
