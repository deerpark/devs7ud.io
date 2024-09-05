"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

const DetailPostLikeButton = () => {
  return (
    <span className="flex items-center">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toast.error("준비중입니다.");
        }}
      >
        <Heart className="h-4 w-4" strokeWidth={2.5} />
      </Button>
      <span className="text-sm">{0}</span>
    </span>
  );
};

export default DetailPostLikeButton;
