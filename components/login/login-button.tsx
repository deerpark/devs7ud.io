"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plug } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { default as LoginSection } from "./login-section";

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className="flex h-auto w-full items-center justify-start gap-x-2 rounded-3xl px-3 py-2 text-sm"
        >
          <Plug className="h-5 w-5" strokeWidth={2.5} />
          <span className="font-bold">로그인</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 font-sans sm:max-w-[320px]">
        <LoginSection setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
