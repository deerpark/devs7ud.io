import { PhotoIcon } from "@heroicons/react/20/solid";
import * as React from "react";

const EditorUploadGalleryImagePlaceholder = () => {
  return (
    <div className="flex flex-row items-center border border-b border-dashed">
      <div className="m-3 items-center">
        <PhotoIcon className="h-8 w-8 rounded-md text-accent" />
      </div>
      <div className="ml-4 items-center">
        <div className="h-4 w-[300px] max-w-full rounded-md bg-accent sm:w-[400px]"></div>
      </div>
    </div>
  );
};

export default EditorUploadGalleryImagePlaceholder;
