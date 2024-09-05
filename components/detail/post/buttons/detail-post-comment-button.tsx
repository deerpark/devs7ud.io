"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import * as React from "react";
import ScrollIntoView from "react-scroll-into-view";

interface DetailPostCommentButtonProps {
  totalComments?: number;
}

const CommentButton: React.FC<DetailPostCommentButtonProps> = ({
  totalComments = 0,
}) => {
  return (
    <span className="flex items-center text-sm font-semibold">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="peer rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
      >
        <MessageSquareText className="h-4 w-4" strokeWidth={2.5} />
      </Button>
      <span className="text-muted-foreground peer-hover:text-primary">
        {totalComments}
      </span>
    </span>
  );
};

const DetailPostCommentButton: React.FC<
  DetailPostCommentButtonProps & { scrollIntoView?: boolean }
> = ({ totalComments = 0, scrollIntoView = false }) => {
  return scrollIntoView ? (
    <ScrollIntoView selector="#comments" className="flex w-full">
      <CommentButton totalComments={totalComments} />
    </ScrollIntoView>
  ) : (
    <CommentButton totalComments={totalComments} />
  );
};

export default DetailPostCommentButton;
