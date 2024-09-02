"use client";

import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
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
    <button
      type="button"
      className="group relative z-10 inline-flex items-center justify-center space-x-3"
      onClick={() => {
        if (window.history.state && window.history.state.idx > 0) {
          router.back();
        } else {
          router.push("/");
        }
      }}
    >
      <Button variant="ghost" size="icon">
        <ArrowLeftToLine strokeWidth={2.5} className="h-5 w-5" />
      </Button>
    </button>
  );
};

export default SharedBackButton;
