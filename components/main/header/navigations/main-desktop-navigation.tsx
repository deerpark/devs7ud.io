import { LoginMenu } from "@/components/login";
import { LogoIcon } from "@/icons";
import Link from "next/link";
import * as React from "react";
import { MainDesktopNavigationMenu } from "./menu";

const MainDesktopNavigation = ({ userId }: { userId: string | null }) => {
  return (
    <nav className="sticky top-0 z-50 hidden min-w-48 flex-col gap-y-6 py-10 pl-6 pr-2 md:flex">
      {/* Logo */}
      <div className="flex flex-none justify-start px-3">
        <Link href="/" className="relative">
          <span className="relative z-10 block">
            <LogoIcon />
          </span>
          <span className="absolute left-1 top-1 z-0 h-5 w-5 rounded-full bg-accent" />
        </Link>
      </div>

      {/* Navigation */}
      <MainDesktopNavigationMenu />

      {/* Login Menu */}
      <div className="flex flex-1 flex-col items-start justify-end">
        <LoginMenu userId={userId} />
      </div>
    </nav>
  );
};

export default MainDesktopNavigation;
