"use client";

import { LoginSection } from "@/components/login";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { detailCommentConfig } from "@/config/detail";
import * as React from "react";

const DetailPostSignInToComment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <span>{detailCommentConfig.leaveComment}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans sm:max-w-[425px]">
        <LoginSection />
      </DialogContent>
    </Dialog>
  );
};

export default DetailPostSignInToComment;
