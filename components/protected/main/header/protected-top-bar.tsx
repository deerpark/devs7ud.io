"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

const ProtectedTopBar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const path = currentPath.split("/");
  return (
    <>
      {path.length > 3 ? (
        <Button
          variant="ghost"
          type="button"
          onClick={() => router.back()}
          className="relative flex flex-none items-center"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold">뒤로가기</span>
        </Button>
      ) : (
        <Link
          href="/"
          className={cn(
            "relative flex flex-none items-center",
            buttonVariants({ variant: "ghost" }),
          )}
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold">사이트로 돌아가기</span>
        </Link>
      )}
    </>
  );
};

export default ProtectedTopBar;
