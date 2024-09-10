"use client";

import { useReadingProgress } from "@/hooks/use-reading-progress";
import { cn, getUrl } from "@/lib/utils";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { useMedia, useWindowScroll } from "react-use";
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
  const { y } = useWindowScroll();
  const thresholds = useMedia("(min-width: 768px)") ? 20 : 72;
  return (
    <>
      <header
        data-inview={y && y > thresholds ? "true" : "false"}
        className={cn(
          "sticky top-0 z-40 flex h-14 items-center bg-background px-3 transition-all md:top-5 md:px-6",
          "data-[inview=true]:shadow-2xl data-[inview=true]:md:rounded-full",
        )}
      >
        <nav
          className="flex w-full items-center gap-x-3 px-3 md:px-0"
          aria-label="Global"
        >
          <h1
            className={cn(
              "line-clamp-1 flex-1 text-xl font-black tracking-tight",
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
