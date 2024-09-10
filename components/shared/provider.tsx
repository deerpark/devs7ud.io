"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { TooltipProvider } from "../ui/tooltip";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const initialState = {
    isOpen: false,
    setIsOpen,
  };

  const [state, setState] = React.useState(initialState);

  function setIsOpen(isOpen: boolean) {
    return setState({ ...state, isOpen });
  }

  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <PhotoProvider>{children}</PhotoProvider>
        <Toaster />
      </TooltipProvider>
    </NextThemesProvider>
  );
}
