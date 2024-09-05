"use client";

import { AddBookmark } from "@/actions/bookmark/add-bookmark";
import { DeleteBookmark } from "@/actions/bookmark/delete-bookmark";
import { LoginSection } from "@/components/login";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { detailBookMarkConfig } from "@/config/detail";
import {
  Bookmark,
  BookmarkMinus,
  BookmarkPlus,
  Shell,
  Loader2 as SpinnerIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { toast } from "sonner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DetailPostBookMarkButtonProps {
  id: string;
  isBookmarked?: boolean;
  userId?: string | null;
}

const DetailPostBookMarkButton: FC<DetailPostBookMarkButtonProps> = ({
  id,
  isBookmarked,
  userId,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Add a bookmark
  async function addBookmark(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    if (id && userId) {
      const bookmark = {
        id: id,
        user_id: userId,
      };

      const response = await AddBookmark(bookmark);
      if (response) {
        toast.success(detailBookMarkConfig.successAdd);
        router.refresh();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(detailBookMarkConfig.errorAdd);
      }
    } else {
      setIsLoading(false);
      toast.error(detailBookMarkConfig.errorAdd);
    }
  }

  // Delete a bookmark
  async function deleteBookmark(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    if (id && userId) {
      const bookmark = {
        id: id,
        user_id: userId,
      };

      const response = await DeleteBookmark(bookmark);
      if (response) {
        setIsLoading(false);
        toast.success(detailBookMarkConfig.successDelete);
        router.refresh();
      } else {
        setIsLoading(false);
        toast.error(detailBookMarkConfig.errorDelete);
      }
    } else {
      setIsLoading(false);
      toast.error(detailBookMarkConfig.errorDelete);
    }
  }

  return (
    <>
      {userId &&
        (isBookmarked ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-primary"
            disabled={isLoading}
            onClick={deleteBookmark}
          >
            {isLoading ? (
              <Shell className="h-4 w-4 animate-spin" strokeWidth={2.5} />
            ) : (
              <BookmarkMinus className="h-4 w-4" strokeWidth={2.5} />
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground"
            disabled={isLoading}
            onClick={addBookmark}
          >
            {isLoading ? (
              <SpinnerIcon className="h-4 w-4 animate-spin" strokeWidth={2.5} />
            ) : (
              <BookmarkPlus className="h-4 w-4" strokeWidth={2.5} />
            )}
          </Button>
        ))}
      {!userId && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground"
              disabled={isLoading}
            >
              <Bookmark className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </DialogTrigger>
          <DialogContent className="font-sans sm:max-w-sm">
            <LoginSection />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DetailPostBookMarkButton;
