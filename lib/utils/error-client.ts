"use client";

import { toast } from "sonner";

export function handleClientError(error: unknown, customMessage?: string) {
  console.error(error);
  
  let message = "알 수 없는 오류가 발생했습니다.";
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  toast.error(customMessage || message);
}
