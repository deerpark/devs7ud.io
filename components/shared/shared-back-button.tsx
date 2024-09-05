"use client";

import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "../ui/button";

interface BackButtonProps {
  className?: string;
  url?: string;
}

const SharedBackButton: React.FC<BackButtonProps> = ({
  className = "",
  url = "/",
}) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="group relative z-10 inline-flex items-center justify-center space-x-3 rounded-full"
      onClick={() => {
        if (window.history.state && window.history.state.idx > 0) {
          router.back();
        } else {
          router.push("/");
        }
      }}
    >
      <ArrowLeftToLine strokeWidth={2.5} className="h-5 w-5" />
    </Button>
  );
};

export default SharedBackButton;
