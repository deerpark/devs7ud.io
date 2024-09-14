/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { cn } from "@/lib/utils";
import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";
import { PhotoView } from "react-photo-view";
import { defaultExtensions } from "./wysiwyg/extensions";

interface WysiwygContentsProps {
  content: string | null;
}
export function WysiwygContents({ content }: WysiwygContentsProps) {
  const htmlContent =
    typeof window !== "undefined" && content
      ? generateHTML(JSON.parse(content), defaultExtensions)
      : "";

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        return (
          <PhotoView src={domNode.attribs.src}>
            <img
              src={domNode.attribs.src}
              alt={domNode.attribs.alt || "image"}
              className={cn(
                domNode.attribs.class,
                "!static !h-auto !w-auto  transition-all hover:scale-105 hover:rounded-[30px] hover:ring hover:ring-primary",
              )}
            />
          </PhotoView>
        );
      }
    },
  };

  if (!htmlContent) return null;

  return content ? (
    <div className="relative mx-auto max-w-3xl py-5">
      <div className="lg:prose-md prose dark:prose-invert">
        {parse(htmlContent, options)}
      </div>
    </div>
  ) : null;
}
