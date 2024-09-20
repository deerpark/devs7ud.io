"use client";

import {
  DetailPostBookMarkButton,
  DetailPostCommentButton,
  DetailPostLikeButton,
  DetailPostShareButton,
} from "@/components/detail/post/buttons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/editor/posts/${e.currentTarget.dataset.id}`);
  };
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
      {userId === "f62f3c03-a769-4bd9-aa15-b3fe68b86954" ? (
        <Button
          data-id={id}
          onClick={handleEdit}
          variant="ghost"
          size="icon"
          className="hidden flex-none items-center justify-center rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary md:flex"
        >
          <Edit3 className="h-5 w-5" strokeWidth={2.5} />
        </Button>
      ) : null}
      {separator && <Separator className="h-5 w-px flex-none bg-border/50" />}
      <DetailPostShareButton title={title} text={text} url={url} />
    </div>
  );
};

export default DetailPostFloatingBar;
