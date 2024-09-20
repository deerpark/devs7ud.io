"use client";

import { sharedPagingConfig } from "@/config/shared";
import { cn } from "@/lib/utils";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import * as React from "react";
import { v4 } from "uuid";
import { default as SharedPager } from "./shared-pager";

interface SharedPaginationProps {
  page: number;
  totalPages: number;
  baseUrl: string;
  pageUrl: string;
}

const SharedPagination: React.FC<SharedPaginationProps> = ({
  page,
  totalPages,
  baseUrl,
  pageUrl,
}) => {
  const router = useRouter();
  const prevLink =
    page > 2 ? baseUrl + pageUrl + (page - 1).toString() : baseUrl;
  const nextLink =
    page < totalPages
      ? baseUrl + pageUrl + (page + 1).toString()
      : baseUrl + pageUrl + page.toString();

  // Artificial for loop for JSX or TSX
  // It will be used for pagination
  var rows: Array<number> = [];
  var i = 0;
  while (++i <= totalPages) rows.push(i);
  // End of pagination for loop function
  return (
    <nav className="mt-8 flex items-center justify-between border-t border-border px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          type="button"
          onClick={() => {
            router.push(prevLink);
            router.refresh();
          }}
          className={cn(
            {
              "pointer-events-none opacity-50": page === 1,
            },
            "text-hover:border-border inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium hover:text-foreground",
          )}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          {sharedPagingConfig.previous}
        </button>
      </div>
      {/* Pagination */}
      <div className="hidden md:-mt-px md:flex">
        {Array(totalPages)
          .fill(1)
          .map((el, i) => (
            <SharedPager
              key={v4()}
              index={i}
              totalPages={totalPages}
              currentPage={page}
              baseUrl={baseUrl}
              pageUrl={pageUrl}
            />
          ))}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          type="button"
          onClick={() => {
            router.push(nextLink);
            router.refresh();
          }}
          className={cn(
            "text-hover:border-border inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium hover:text-foreground",
            { "pointer-events-none opacity-50": page >= totalPages },
          )}
        >
          {sharedPagingConfig.next}
          <ArrowLongRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default SharedPagination;
