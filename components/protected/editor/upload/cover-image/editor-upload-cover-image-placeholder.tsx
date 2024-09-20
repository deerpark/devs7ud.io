import { protectedEditorConfig } from "@/config/protected";
import { PhotoIcon } from "@heroicons/react/20/solid";
import * as React from "react";

const EditorUploadCoverImagePlaceHolder = () => {
  return (
    <div className="col-span-full max-w-2xl">
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-foreground/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-border"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6">
            <p className="pl-1">{protectedEditorConfig.formImageNote}</p>
          </div>
          <p className="text-sm leading-5">
            {protectedEditorConfig.formImageSize}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorUploadCoverImagePlaceHolder;
