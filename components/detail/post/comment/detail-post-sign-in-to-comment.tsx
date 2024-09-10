"use client";

import { LoginSection } from "@/components/login";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { detailCommentConfig } from "@/config/detail";
import { sharedLoginConfig } from "@/config/shared";
import { Plug } from "lucide-react";
import * as React from "react";

const DetailPostSignInToComment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <span>{detailCommentConfig.leaveComment}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-40px)] gap-y-0 rounded-b-3xl rounded-t-xl p-0 font-sans sm:max-w-xs">
        <DialogHeader className="sr-only">
          <DialogTitle>{sharedLoginConfig.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-10 text-center">
          <Plug className="h-10 w-10" strokeWidth={1} />
        </div>
        <LoginSection />
      </DialogContent>
    </Dialog>
  );
};

export default DetailPostSignInToComment;
