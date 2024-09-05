"use client";

import { ChevronUp } from "lucide-react";
import * as React from "react";
import ScrollToTop from "react-scroll-to-top";

const DetailPostScrollUpButton = () => {
  return (
    <>
      <ScrollToTop
        style={{
          height: "40px",
          width: "40px",
          borderRadius: "50%",
        }}
        className="rounded-full bg-background p-2.5 shadow-2xl"
        smooth
        component={<ChevronUp className="h-5 w-5" strokeWidth={3} />}
      />
    </>
  );
};

export default DetailPostScrollUpButton;
