import { InputRule } from "@tiptap/core";
import TipTapCharacterCount from "@tiptap/extension-character-count";
// import TipTapCodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import TipTapFocus from "@tiptap/extension-focus";
import TipTapFontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapSubscript from "@tiptap/extension-subscript";
import TipTapSuperscript from "@tiptap/extension-superscript";
import TipTapTable from "@tiptap/extension-table";
import TipTapTableCell from "@tiptap/extension-table-cell";
import TipTapTableHeader from "@tiptap/extension-table-header";
import TipTapTableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TipTapTextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import TipTapTypography from "@tiptap/extension-typography";
import TiptapUnderline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
// import javascript from "highlight.js/lib/languages/javascript";
// import typescript from "highlight.js/lib/languages/typescript";
// import { common, createLowlight } from "lowlight";
import Image from "next/image";
import * as React from "react";
import { Markdown } from "tiptap-markdown";
import CustomKeymap from "./custom-keymap";
import DragAndDrop from "./drag-and-drop";
import SlashCommand from "./slash-command";

// const lowlight = createLowlight({ ...common, javascript, typescript });

/* import UpdatedImage from "./updated-image"; */

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 -mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    // codeBlock: {
    //   HTMLAttributes: {
    //     class:
    //       "rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800",
    //   },
    // },
    code: {
      HTMLAttributes: {
        class: "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-border/50",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-secondary underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    },
  }),
  TiptapImage.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: "rounded-lg border bg-background",
    },
  }),
  // TiptapImage.extend({
  //   // React로 <PhotoView>로 감싸기
  //   addNodeView() {
  //     return ({ node, HTMLAttributes }) => {
  //       console.log(node.attrs.src);
  //       return (
  //         <>
  //           <PhotoView src={node.attrs.src}>
  //             <Image
  //               {...HTMLAttributes}
  //               src={node.attrs.src}
  //               alt={(node.attrs.alt || "image") as string}
  //             />
  //           </PhotoView>
  //           <span>{node.attrs.src}</span>
  //         </>
  //       );
  //     };
  //   },
  // }).configure({
  //   inline: true, // 이미지를 인라인으로 표시
  //   allowBase64: true, // base64 이미지 허용
  //   HTMLAttributes: {
  //     class: "rounded-lg border bg-background cursor-pointer", // 이미지에 스타일 추가
  //   },
  // }),
  /* UpdatedImage.configure({
    HTMLAttributes: {
      class: "rounded-lg border border-stone-200",
    },
  }), */
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands";
    },
    includeChildren: true,
  }),
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
  CustomKeymap,
  DragAndDrop,
  TipTapCharacterCount,
  // TipTapCodeBlockLowlight.configure({
  //   lowlight,
  //   HTMLAttributes: {
  //     class: "rounded-sm bg-stone-100 p-5 font-mono font-medium",
  //   },
  // }),
  TipTapFocus,
  TipTapFontFamily,
  TipTapSubscript,
  TipTapSuperscript,
  TipTapTable,
  TipTapTableHeader,
  TipTapTableRow,
  TipTapTextAlign,
  TipTapTypography,
  TipTapTableCell,
];
