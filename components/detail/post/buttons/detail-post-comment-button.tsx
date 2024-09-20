"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="flex items-center text-sm font-semibold">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="peer rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <MessageSquareText className="h-5 w-5" strokeWidth={2.5} />
          </Button>
          <span className="pr-3 text-muted-foreground peer-hover:text-primary">
            {totalComments}
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent className="px-1 py-0.5 text-xs font-semibold text-muted-foreground">
        댓글 {totalComments}개
      </TooltipContent>
    </Tooltip>
  );
};

const DetailPostCommentButton: React.FC<
  DetailPostCommentButtonProps & { scrollIntoView?: boolean }
> = ({ totalComments = 0, scrollIntoView = false }) => {
  return scrollIntoView ? (
    <ScrollIntoView selector="#comments">
      <CommentButton totalComments={totalComments} />
    </ScrollIntoView>
  ) : (
    <CommentButton totalComments={totalComments} />
  );
};

export default DetailPostCommentButton;
