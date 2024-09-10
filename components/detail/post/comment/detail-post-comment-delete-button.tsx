"use client";

import { DeleteComment } from "@/actions/comment/delete-comment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { detailCommentConfig } from "@/config/detail";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "sonner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DetailPostCommentDeleteButtonProps {
  id?: string;
  userId?: string;
}

const DetailPostCommentDeleteButton: FC<DetailPostCommentDeleteButtonProps> = ({
  id = "",
  userId = "",
}) => {
  const supabase = createClient();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  // Delete bookmark
  async function deleteComment() {
    setIsDeleteLoading(true);
    if (id && user?.id && userId === user?.id) {
      const commentData = {
        id: id,
        userId: user?.id,
      };
      const response = await DeleteComment(commentData);
      if (response) {
        setIsDeleteLoading(false);
        toast.success(detailCommentConfig.successDeleted);
        router.refresh();
      } else {
        setIsDeleteLoading(false);
        toast.error(detailCommentConfig.errorDeleted);
      }
    } else {
      setIsDeleteLoading(false);
      toast.error(detailCommentConfig.errorDeleted);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user?.id === userId && (
        <>
          <div className="flex flex-shrink-0 self-center">
            <div className="relative inline-block text-left">
              <Button
                variant="ghost"
                size="icon"
                className="flex items-center rounded-full p-2"
              >
                <span className="sr-only">댓글 삭제</span>
                <TrashIcon
                  onClick={() => setShowDeleteAlert(true)}
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
          <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent className="text-md max-w-64 font-sans md:mx-auto md:max-w-full">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {detailCommentConfig.questionDelete}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {detailCommentConfig.warning}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {detailCommentConfig.cancel}
                </AlertDialogCancel>
                <AlertDialogAction onClick={deleteComment}>
                  {isDeleteLoading ? (
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  <span className="font-bold">
                    {detailCommentConfig.confirm}
                  </span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
};

export default DetailPostCommentDeleteButton;
