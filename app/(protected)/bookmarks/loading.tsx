import { Shell } from "lucide-react";
import * as React from "react";

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Shell size={32} className="animate-spin" />
    </div>
  );
}
