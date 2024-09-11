"use client";

import { sharedEmptyConfig } from "@/config/shared";
import { CircleSlash } from "lucide-react";
import { useRouter } from "next/navigation";

const SharedError = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <CircleSlash
          size={64}
          className="mx-auto block text-foreground/50"
          strokeWidth={1.5}
        />
        <p className="mt-2 text-lg font-semibold">{sharedEmptyConfig.sorry}</p>
        <h1 className="mt-1 text-sm text-foreground/80">
          {sharedEmptyConfig.error}
        </h1>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-accent"
          >
            {sharedEmptyConfig.tryAgain}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SharedError;
