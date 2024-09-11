"use client";

import { PhotoProvider as PrimitivePhotoProvider } from "react-photo-view";

export function PhotoProvider({ children }: { children: React.ReactNode }) {
  return <PrimitivePhotoProvider>{children}</PrimitivePhotoProvider>;
}
