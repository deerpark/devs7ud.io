import { DetailPostLoading } from "@/components/detail/post";
import { Shell } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Shell size={32} className="animate-spin" />
    </div>
  );
};

export default Loading;
