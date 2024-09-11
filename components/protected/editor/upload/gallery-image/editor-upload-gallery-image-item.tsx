"use client";

import { DeleteGalleryImage } from "@/actions/images/delete-gallery-image";
import { CustomImage } from "@/components/shared/shared-image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { protectedEditorConfig } from "@/config/protected";
import { shimmer, toBase64 } from "@/lib/utils";
import { Loader2 as SpinnerIcon, TrashIcon, ZoomIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "sonner";

interface EditorUploadGalleryImageItemProps {
  userId: string;
  postId: string;
  fileName: string;
  imageUrl: string;
}

const EditorUploadGalleryImageItem: FC<EditorUploadGalleryImageItemProps> = ({
  userId,
  postId,
  fileName,
  imageUrl,
}) => {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  async function deleteImage() {
    setIsDeleteLoading(!isDeleteLoading);
    const imageData = {
      userId: userId,
      postId: postId,
      fileName: fileName,
    };
    const response = await DeleteGalleryImage(imageData);
    if (response) {
      setIsDeleteLoading(false);
      toast.success(protectedEditorConfig.successMessagesDeleteImage);
      router.refresh();
    } else {
      setIsDeleteLoading(false);
      toast.error(protectedEditorConfig.errorMessagesDeleteImage);
    }
  }
  return (
    <>
      <PhotoProvider>
        <div className="flex items-center gap-x-3 border-b border-gray-200 pb-3">
          <div className="h-11 w-11 flex-none items-center">
            <CustomImage
              className="h-11 w-11 rounded-md bg-cover"
              src={imageUrl}
              alt="Gallery Photo"
              height={44}
              width={44}
              priority
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(44, 44),
              )}`}
            />
          </div>
          <div className="grow items-center justify-start text-sm">
            {imageUrl.split("/").at(-1)}
          </div>
          <div className="flex flex-none items-center gap-x-1">
            <PhotoView src={imageUrl}>
              <Button type="button" variant="outline" size="icon">
                <ZoomIn className="h-4 w-4 text-gray-500" />
              </Button>
            </PhotoView>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <TrashIcon className="h-4 w-4 text-gray-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="font-sans">
                  <AlertDialogTitle>
                    {protectedEditorConfig.deleteImageQuestion}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {protectedEditorConfig.deleteImageDescription}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="font-sans">
                  <AlertDialogCancel>
                    {protectedEditorConfig.cancel}
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={deleteImage}>
                    {isDeleteLoading ? (
                      <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <TrashIcon className="mr-2 h-4 w-4" />
                    )}
                    <span>{protectedEditorConfig.cofirm}</span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </PhotoProvider>
    </>
  );
};

export default EditorUploadGalleryImageItem;
