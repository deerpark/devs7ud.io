"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { Blinds, X } from "lucide-react";
import { FC } from "react";

interface MainMobileMenuButtonProps {
  open: boolean;
}

const MainMobileMenuButton: FC<MainMobileMenuButtonProps> = ({ open }) => {
  return (
    <>
      <Disclosure.Button
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex h-auto w-full items-center justify-start gap-x-2 rounded-3xl px-3 py-2 text-sm",
        )}
      >
        {open ? (
          <X className="h-5 w-5" strokeWidth={2.5} />
        ) : (
          <Blinds className="h-5 w-5" strokeWidth={2.5} />
        )}
        <span>{open ? "닫기" : "메뉴"}</span>
      </Disclosure.Button>
    </>
  );
};

export default MainMobileMenuButton;
