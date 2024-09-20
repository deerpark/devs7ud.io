import * as React from "react";

const SharedTableLloading = () => {
  return (
    <div
      role="status"
      className="w-full max-w-5xl animate-pulse divide-y divide-border rounded border border-border p-4 shadow dark:divide-foreground md:p-6"
    >
      <div className="flex flex-row items-center justify-between py-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-border"></div>
      </div>
      <div className="flex flex-row items-center justify-between py-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-border"></div>
      </div>
      <div className="flex flex-row items-center justify-between py-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-border"></div>
      </div>
      <div className="flex flex-row items-center justify-between py-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-border"></div>
      </div>
      <div className="flex flex-row items-center justify-between py-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-border dark:bg-foreground/50"></div>
          <div className="h-2 w-32 rounded-full bg-border"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-border"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SharedTableLloading;
