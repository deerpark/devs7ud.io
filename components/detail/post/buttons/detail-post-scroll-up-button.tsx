"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronUp } from "lucide-react";
import * as React from "react";
import ScrollToTop from "react-scroll-to-top";

const DetailPostScrollUpButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ScrollToTop
          className="h-10 w-10 rounded-full bg-background p-2.5 shadow-2xl"
          smooth
          component={<ChevronUp className="h-5 w-5" strokeWidth={3} />}
        />
      </TooltipTrigger>
      <TooltipContent className="px-1 py-0.5 text-xs font-semibold text-muted-foreground">
        맨 위로 이동
      </TooltipContent>
    </Tooltip>
  );
};

export default DetailPostScrollUpButton;
