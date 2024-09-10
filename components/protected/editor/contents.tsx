"use client";

import { generateHTML } from "@tiptap/react";
import { defaultExtensions } from "./wysiwyg/extensions";

interface WysiwygContentsProps {
  content: string | null;
}
export function WysiwygContents({ content }: WysiwygContentsProps) {
  return content ? (
    <div className="relative mx-auto max-w-3xl py-5">
      <div
        className="lg:prose-md prose dark:prose-invert"
        dangerouslySetInnerHTML={{
          __html: generateHTML(JSON.parse(content), defaultExtensions) || "",
        }}
      />
    </div>
  ) : null;
}
