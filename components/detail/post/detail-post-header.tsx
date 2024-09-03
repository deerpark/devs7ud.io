"use client";

import { LoginMenu } from "@/components/login";
import { SharedBackButton } from "@/components/shared";
import { useReadingProgress } from "@/hooks/use-reading-progress";

interface DetailPostHeaderProps {
  title: string;
}

const DetailPostHeader: React.FC<DetailPostHeaderProps> = ({ title }) => {
  const completion = useReadingProgress();
  return (
    <header className="sticky top-0 z-40 bg-background/50 shadow-2xl shadow-foreground/10 backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-x-3 px-6 py-4"
        aria-label="Global"
      >
        <div className="flex flex-none items-center justify-start">
          <SharedBackButton />
        </div>
        <h1 className="max-w-3xl flex-1 truncate px-4 font-bold tracking-tight sm:flex-none sm:px-0 sm:text-xl">
          {title}
        </h1>
        <span className="hidden sm:flex-1" />
        <div className="flex flex-none items-center justify-end">
          <LoginMenu />
        </div>
      </nav>
      <span
        style={{ transform: `translateX(${completion - 100}%)` }}
        className="absolute top-0 h-0.5 w-full bg-secondary/50"
      />
    </header>
  );
};

export default DetailPostHeader;
