"use client";

import { AddBookmark } from "@/actions/bookmark/add-bookmark";
import { DeleteBookmark } from "@/actions/bookmark/delete-bookmark";
import { LoginSection } from "@/components/login";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { detailBookMarkConfig } from "@/config/detail";
import { sharedLoginConfig } from "@/config/shared";
import {
  Bookmark,
  BookmarkMinus,
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
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
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
    e.nativeEvent.stopPropagation();
    e.preventDefault();
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
            className="rounded-full text-primary hover:bg-primary/10 hover:text-primary"
            disabled={isLoading}
            onClick={deleteBookmark}
          >
            {isLoading ? (
              <Shell className="h-5 w-5 animate-spin" strokeWidth={2.5} />
            ) : (
              <BookmarkMinus className="h-5 w-5" strokeWidth={2.5} />
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
            disabled={isLoading}
            onClick={addBookmark}
          >
            {isLoading ? (
              <SpinnerIcon className="h-5 w-5 animate-spin" strokeWidth={2.5} />
            ) : (
              <Bookmark className="h-5 w-5" strokeWidth={2.5} />
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
              className="rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
              disabled={isLoading}
            >
              <Bookmark className="h-5 w-5" strokeWidth={2.5} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[calc(100vw-40px)] gap-y-0 rounded-b-3xl rounded-t-xl p-0 font-sans sm:max-w-xs">
            <DialogHeader className="sr-only">
              <DialogTitle>{sharedLoginConfig.title}</DialogTitle>
            </DialogHeader>
            <LoginSection />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DetailPostBookMarkButton;
