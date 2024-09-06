"use client";

import { LogoIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function MainLinkHomeIcon() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[1] || "/";
  return (
    <span
      className={cn(
        "ml-1.5 block rounded-full group-active:translate-y-px md:ml-0",
        slug && slug !== "/"
          ? ""
          : "bg-primary ring-4 ring-primary group-hover:bg-secondary group-hover:ring-secondary",
      )}
    >
      <LogoIcon
        className="relative z-10 h-[22px] w-[22px]"
        pathClassName={cn(
          slug && slug !== "/"
            ? ""
            : "stroke-background fill-primary group-hover:fill-secondary",
        )}
        strokeWidth={slug && slug !== "/" ? 2.5 : 1.5}
      />
      <span
        className={cn(
          "absolute left-1 top-1 z-0 h-5 w-5 rounded-full",
          slug && slug !== "/" ? "bg-accent" : "bg-background/20",
        )}
      />
    </span>
  );
}
