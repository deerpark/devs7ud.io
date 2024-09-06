"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sharedLoginConfig } from "@/config/shared";
import { Plug } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { default as LoginSection } from "./login-section";

const ButtonSignin = (
  <Button
    variant="ghost"
    type="button"
    className="flex h-auto w-full items-center justify-start gap-x-2 rounded-3xl px-3 py-2 text-sm"
  >
    <Plug className="h-5 w-5" strokeWidth={2.5} />
    <span className="hidden font-bold md:block">로그인</span>
  </Button>
);

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{ButtonSignin}</DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-40px)] gap-y-0 rounded-3xl p-0 font-sans sm:max-w-[320px]">
        <DialogHeader className="sr-only">
          <DialogTitle>{sharedLoginConfig.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-10 text-center">
          <Plug className="h-10 w-10" strokeWidth={1} />
        </div>
        <LoginSection setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
