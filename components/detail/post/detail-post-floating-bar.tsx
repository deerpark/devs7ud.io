"use client";

import {
  DetailPostBookMarkButton,
  DetailPostCommentButton,
  DetailPostLikeButton,
  DetailPostShareButton,
} from "@/components/detail/post/buttons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import * as React from "react";

interface DetailPostFloatingBarProps {
  id: string;
  title?: string;
  text?: string;
  url?: string;
  totalComments?: number;
  isBookmarked?: boolean;
  userId?: string | null;
  grow?: boolean;
  separator?: boolean;
  className?: string;
  scrollIntoView?: boolean;
}

const DetailPostFloatingBar: React.FC<DetailPostFloatingBarProps> = ({
  id,
  title = "",
  text = "",
  url = window.location.href,
  totalComments = 0,
  isBookmarked = false,
  userId,
  grow = false,
  separator = false,
  className,
  scrollIntoView,
}) => {
  return (
    <div className={cn("flex flex-1 items-center gap-3", className)}>
      <DetailPostCommentButton
        totalComments={totalComments}
        scrollIntoView={scrollIntoView}
      />
      <DetailPostLikeButton />
      <DetailPostBookMarkButton
        id={id}
        isBookmarked={isBookmarked}
        userId={userId}
      />
      {grow && <span className="flex-1" />}
      {separator && <Separator className="h-5 w-px flex-none bg-border/50" />}
      <DetailPostShareButton title={title} text={text} url={url} />
    </div>
  );
};

export default DetailPostFloatingBar;
