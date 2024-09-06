import { LoginMenu } from "@/components/login";
import { LogoIcon } from "@/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import MainLinkHomeIcon from "./main-link-home-icon";
import { MainDesktopNavigationMenu } from "./menu";

const MainDesktopNavigation = ({
  userId,
  slug,
}: {
  userId: string | null;
  slug?: string | null;
}) => {
  return (
    <nav className="sticky top-0 z-50 hidden min-w-48 flex-col gap-y-6 py-10 pl-6 pr-2 md:flex">
      {/* Logo */}
      <div className="flex flex-none justify-start px-3">
        <Link href="/" className="group relative">
          <MainLinkHomeIcon />
        </Link>
      </div>

      {/* Navigation */}
      <MainDesktopNavigationMenu slug={slug} />

      {/* Login Menu */}
      <div className="flex flex-1 flex-col items-start justify-end">
        <LoginMenu userId={userId} />
      </div>
    </nav>
  );
};

export default MainDesktopNavigation;
