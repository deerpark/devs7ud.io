"use client";

import { useReadingProgress } from "@/hooks/use-reading-progress";
import { cn, getUrl } from "@/lib/utils";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { useWindowScroll } from "@uidotdev/usehooks";
import DetailPostFloatingBar from "./detail-post-floating-bar";

interface DetailPostHeaderProps {
  post: PostWithCategoryWithProfile;
  totalComments: number;
  isBookmarked: boolean | undefined;
  userId: string | null;
}

const DetailPostHeader: React.FC<DetailPostHeaderProps> = ({
  post,
  totalComments,
  isBookmarked,
  userId,
}) => {
  const completion = useReadingProgress();
  const [{ y }] = useWindowScroll();
  return (
    <>
      <header
        className={cn(
          "sticky top-5 z-40 flex h-14 items-center px-3 backdrop-blur-lg transition-all md:px-6",
          y && y > 20
            ? "mx-5 rounded-full bg-background shadow-2xl md:mx-0"
            : "bg-muted/50 md:bg-transparent",
        )}
      >
        <nav
          className="flex w-full items-center gap-x-3 px-3 md:px-0"
          aria-label="Global"
        >
          <h1
            className={cn(
              "line-clamp-1 flex-1 font-black tracking-tight",
              y && y > 20 ? "text-base md:text-xl" : "text-xl",
            )}
          >
            {post.categories.title}
          </h1>

          <DetailPostFloatingBar
            className="flex-none gap-x-3"
            userId={userId}
            id={post.id as string}
            title={post.title as string}
            text={post.description as string}
            url={`${getUrl()}${encodeURIComponent(`/posts/${post.slug}`)}`}
            totalComments={totalComments}
            isBookmarked={isBookmarked}
            scrollIntoView
            separator
          />
        </nav>
      </header>
      <span
        style={{ transform: `translateX(${completion - 100}%)` }}
        className="fixed left-0 top-0 z-50 h-0.5 w-full bg-secondary/50"
      />
    </>
  );
};

export default DetailPostHeader;
