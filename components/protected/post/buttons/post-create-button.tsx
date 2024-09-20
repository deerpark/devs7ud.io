"use client";

import { CreatePost } from "@/actions/post/create-post";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { protectedPostConfig } from "@/config/protected";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

const PostCreateButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user, loading } = useAuth();

  async function createPost() {
    setIsLoading(true);

    if (user?.id) {
      const post = {
        title: protectedPostConfig.untitled,
        user_id: user?.id,
      };

      const response = await CreatePost(post);

      if (response) {
        toast.success(protectedPostConfig.successCreate);
        // This forces a cache invalidation.
        router.refresh();
        // Redirect to the new post
        router.push("/editor/posts/" + response.id);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(protectedPostConfig.errorCreate);
      }
    } else {
      setIsLoading(false);
      toast.error(protectedPostConfig.errorCreate);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        type="button"
        onClick={createPost}
        className="flex items-center rounded-md bg-foreground px-3.5 py-2.5 text-sm font-semibold text-background shadow-sm hover:bg-foreground/50"
      >
        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
        {protectedPostConfig.newPost}
      </button>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedPostConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostCreateButton;
