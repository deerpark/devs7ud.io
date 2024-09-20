"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import * as React from "react";
import { v4 } from "uuid";

export interface SharedPagerProps {
  index: number;
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  pageUrl: string;
}

const SharedPager: React.FC<SharedPagerProps> = ({
  index,
  totalPages,
  currentPage,
  baseUrl,
  pageUrl,
}) => {
  const router = useRouter();
  const i = index + 1;
  if (
    i <= 3 || //the first three pages
    i >= totalPages - 2 || //the last three pages
    (i >= currentPage - 1 && i <= currentPage + 1)
  ) {
    //the currentPage, the page before and after
    return (
      <button
        type="button"
        onClick={() => {
          router.push(baseUrl + pageUrl + i.toString());
          router.refresh();
        }}
        key={v4()}
        className={cn(
          "text-hover:border-border inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium hover:text-foreground",
          { "border-border": i === currentPage },
        )}
      >
        {i}
      </button>
    );
  }

  return (
    //any other page should be represented by ...
    <div className="text-hover:text-foreground inline-flex items-center border-transparent px-4 pt-4 text-sm font-medium">
      ...
    </div>
  );
};

export default SharedPager;
