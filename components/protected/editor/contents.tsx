"use client";

import { generateHTML } from "@tiptap/react";
import { defaultExtensions } from "./wysiwyg/extensions";

interface WysiwygContentsProps {
  content: string | null;
}
export function WysiwygContents({ content }: WysiwygContentsProps) {
  return content ? (
    <div className="relative mx-auto max-w-3xl border-slate-500/50 py-5">
      <div
        className="lg:prose-md prose"
        dangerouslySetInnerHTML={{
          __html: generateHTML(JSON.parse(content), defaultExtensions) || "",
        }}
      />
    </div>
  ) : null;
}
