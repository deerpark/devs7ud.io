"use client";

import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { ChevronDown, X } from "lucide-react";
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
        {open ? <X className="h-5 w-5" strokeWidth={3} /> : <LogoIcon />}
        {!open ? <ChevronDown className="h-3 w-3" strokeWidth={3} /> : null}
      </Disclosure.Button>
    </>
  );
};

export default MainMobileMenuButton;
