import { LoginMenu } from "@/components/login";
import { LogoIcon } from "@/icons";
import Link from "next/link";
import React from "react";
import { MainDesktopNavigationMenu } from "./menu";

const MainDesktopNavigation = () => {
  return (
    <>
      <nav className="hidden min-w-52 flex-col gap-y-6 px-2 py-10 md:flex">
        {/* Logo */}
        <div className="flex flex-none justify-start px-3">
          <Link href="/" className="relative">
            <span className="relative z-10">
              <LogoIcon />
            </span>
            <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-accent" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-none flex-col gap-y-2">
          <MainDesktopNavigationMenu />
        </div>

        {/* Login Menu */}
        <div className="flex flex-1 flex-col items-start justify-end">
          <LoginMenu />
        </div>
      </nav>
    </>
  );
};

export default MainDesktopNavigation;
