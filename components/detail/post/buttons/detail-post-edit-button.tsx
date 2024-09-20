"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

interface DetailPostEditButtonProps {
  id: string;
}

const DetailPostEditButton = ({ id }: DetailPostEditButtonProps) => {
  const router = useRouter();
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/editor/posts/${e.currentTarget.dataset.id}`);
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-id={id}
          onClick={handleEdit}
          variant="ghost"
          size="icon"
          className="hidden flex-none items-center justify-center rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary md:flex"
        >
          <Edit3 className="h-5 w-5" strokeWidth={2.5} />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="px-1 py-0.5 text-xs font-semibold text-muted-foreground">
        글 수정
      </TooltipContent>
    </Tooltip>
  );
};

export default DetailPostEditButton;
