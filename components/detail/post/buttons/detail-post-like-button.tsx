"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

const DetailPostLikeButton = () => {
  return (
    <span className="flex items-center text-sm font-semibold">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="peer rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          e.preventDefault();
          toast.error("준비중입니다.");
        }}
      >
        <Heart className="h-5 w-5" strokeWidth={2.5} />
      </Button>
      <span className="pr-3 text-muted-foreground peer-hover:text-primary">
        {0}
      </span>
    </span>
  );
};

export default DetailPostLikeButton;
