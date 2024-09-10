"use client";

import { cn } from "@/lib/utils";
import { useMedia, useWindowScroll } from "react-use";

export default function CategoryHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const { y } = useWindowScroll();
  const thresholds = useMedia("(min-width: 768px)") ? 20 : 72;
  return (
    <header
      data-inview={y && y > thresholds ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40 flex items-center gap-x-2 border-b border-border/50 py-4 transition-all md:top-5 md:border-b-0",
        "data-[inview=true]:bg-background data-[inview=true]:shadow-2xl data-[inview=true]:md:-mx-3 data-[inview=true]:md:rounded-full data-[inview=true]:md:px-3",
        className,
      )}
    >
      <h2 className="px-6 text-xl font-black md:px-5">{title}</h2>
    </header>
  );
}
