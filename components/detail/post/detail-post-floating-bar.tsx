"use client";

import {
  DetailPostBookMarkButton,
  DetailPostCommentButton,
  DetailPostLikeButton,
  DetailPostShareButton,
} from "@/components/detail/post/buttons";
import * as React from "react";

interface DetailPostFloatingBarProps {
  id: string;
  title?: string;
  text?: string;
  url?: string;
  totalComments?: number;
  isBookmarked?: boolean;
  userId?: string | null;
}

const DetailPostFloatingBar: React.FC<DetailPostFloatingBarProps> = ({
  id,
  title = "",
  text = "",
  url = window.location.href,
  totalComments = 0,
  isBookmarked = false,
  userId,
}) => {
  return (
    <div className="flex flex-1 items-center gap-5">
      <DetailPostCommentButton totalComments={totalComments} />
      <DetailPostBookMarkButton
        id={id}
        isBookmarked={isBookmarked}
        userId={userId}
      />
      <DetailPostLikeButton />
      <span className="flex-1" />
      <DetailPostShareButton title={title} text={text} url={url} />
    </div>
  );
};

export default DetailPostFloatingBar;
