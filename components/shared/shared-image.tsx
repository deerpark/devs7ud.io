"use client";

/* eslint-disable jsx-a11y/alt-text */
import { cn } from "@/lib/utils";
import { ImageOff, Shell } from "lucide-react";
import Image, { ImageProps } from "next/image";
import * as React from "react";

export function CustomImage(props: ImageProps) {
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);
  const originSize = Math.min(
    Number(props.width) || 16,
    Number(props.height) || 16,
  );
  const size = originSize <= 16 ? 12 : originSize <= 32 ? 16 : 24;
  const handleLoad = React.useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = React.useCallback(() => {
    setError(true);
    setLoading(false);
    console.log("error");
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      {isLoading && !isError ? (
        <p
          className={cn(
            props.className,
            "flex items-center justify-center text-muted-foreground/50",
          )}
        >
          <Shell size={size} className="animate-spin" />
        </p>
      ) : !isLoading && isError ? (
        <p
          className={cn(
            props.className,
            "flex items-center justify-center gap-y-2 p-2 text-muted-foreground/50",
            props.alt ? "flex-col" : "",
          )}
        >
          <ImageOff size={size} />
          {props.alt ? (
            <span className="line-clamp-2 text-center text-xs text-muted-foreground/40">
              {props.alt}
            </span>
          ) : null}
        </p>
      ) : null}
      <Image
        {...props}
        className={cn(
          props.className,
          "transition-all",
          isLoading || isError
            ? "absolute inset-0 opacity-0 blur-sm"
            : "relative inset-auto opacity-100 blur-0",
        )}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
}
