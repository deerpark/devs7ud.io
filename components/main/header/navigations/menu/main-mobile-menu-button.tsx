"use client";

import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/icons";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { FC } from "react";
import MainLinkHomeIcon from "../main-link-home-icon";

interface MainMobileMenuButtonProps {
  open: boolean;
}

const MainMobileMenuButton: FC<MainMobileMenuButtonProps> = ({ open }) => {
  return (
    <>
      <MainLinkHomeIcon />
      {!open ? (
        <ChevronDown className="h-3 w-3" strokeWidth={3} />
      ) : (
        <ChevronUp className="h-3 w-3" strokeWidth={3} />
      )}
    </>
  );
};

export default MainMobileMenuButton;
