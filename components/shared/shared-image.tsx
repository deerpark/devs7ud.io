"use client";

/* eslint-disable jsx-a11y/alt-text */
import { cn } from "@/lib/utils";
import { ImageOff, Shell } from "lucide-react";
import Image, { ImageProps } from "next/image";
import * as React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

export const CustomImage = React.forwardRef<
  HTMLImageElement,
  ImageProps & { viewer?: boolean; single?: boolean }
>(function CustomImage(
  {
    viewer,
    single,
    ...props
  }: ImageProps & { viewer?: boolean; single?: boolean },
  ref: React.Ref<HTMLImageElement>,
) {
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);
  const originSize = Math.min(
    Number(props.width) || 16,
    Number(props.height) || 16,
  );
  const size = originSize <= 16 ? 12 : originSize <= 32 ? 16 : 24;
  const handleLoadImage = React.useCallback(() => {
    setLoading(false);
  }, []);

  const handleErrorImage = React.useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  const image = (
    <Image
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      {...props}
      className={cn(
        "transition-all",
        props.className,
        isLoading || isError
          ? "absolute inset-0 opacity-0 blur-sm"
          : "inset-auto opacity-100 blur-0",
      )}
      onError={handleErrorImage}
      onLoad={handleLoadImage}
    />
  );

  return (
    <>
      {isLoading && !isError ? (
        <p
          className={cn(
            "flex items-center justify-center text-muted-foreground/50",
            props.className,
          )}
        >
          <Shell size={size} className="animate-spin" />
        </p>
      ) : !isLoading && isError ? (
        <p
          className={cn(
            "flex items-center justify-center gap-y-2 p-2 text-muted-foreground/50",
            props.className,
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
      {typeof props.src === "string" && viewer && single ? (
        <PhotoProvider>
          <PhotoView src={props.src}>{image}</PhotoView>
        </PhotoProvider>
      ) : typeof props.src === "string" && viewer ? (
        <PhotoView src={props.src}>{image}</PhotoView>
      ) : (
        image
      )}
    </>
  );
});
