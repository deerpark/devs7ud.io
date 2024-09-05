"use client";

import { DeleteBookmark } from "@/actions/bookmark/delete-bookmark";
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
import { detailBookMarkConfig } from "@/config/detail";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProtectedBookmarkDeleteButtonProps {
  id?: string;
}

const ProtectedBookmarkDeleteButton: React.FC<
  ProtectedBookmarkDeleteButtonProps
> = ({ id }) => {
  const supabase = createClient();
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const { user, loading } = useAuth();

  // Delete a bookmark
  async function deleteBookmark() {
    setIsDeleteLoading(true);
    if (id && user?.id) {
      const savedPostData = {
        id: id,
        user_id: user?.id,
      };
      const response = await DeleteBookmark(savedPostData);
      if (response) {
        setIsDeleteLoading(false);
        toast.success(detailBookMarkConfig.successDelete);
        router.refresh();
      } else {
        setIsDeleteLoading(false);
        toast.error(detailBookMarkConfig.errorDelete);
      }
    } else {
      setIsDeleteLoading(false);
      toast.error(detailBookMarkConfig.errorDelete);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDeleteAlert(true)}
        className="rounded-md border bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="text-md font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>{detailBookMarkConfig.question}</AlertDialogTitle>
            <AlertDialogDescription>
              {detailBookMarkConfig.warning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{detailBookMarkConfig.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={deleteBookmark}>
              {isDeleteLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{detailBookMarkConfig.confirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProtectedBookmarkDeleteButton;
