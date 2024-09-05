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
    <span className="flex items-center">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground"
      >
        <MessageSquareText className="h-4 w-4" strokeWidth={2.5} />
      </Button>
      <span className="text-sm">{totalComments}</span>
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
