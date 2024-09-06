"use client";

import { PostComment } from "@/actions/comment/post-comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { detailCommentConfig } from "@/config/detail";
import { commentFormSchema } from "@/lib/validation/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon, Shell, Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type FormValues = z.infer<typeof commentFormSchema>;

interface DetailPostCommentFormProps {
  postId: string;
  userId: string;
}

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
  comment: "",
};

const DetailPostCommentForm: React.FC<DetailPostCommentFormProps> = ({
  postId,
  userId,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    const formData = {
      postId: postId,
      userId: userId,
      comment: data.comment,
    };

    const response = await PostComment(formData);

    if (response) {
      setIsLoading(false);
      toast.success(detailCommentConfig.successAdd);
      router.refresh();
    } else {
      setIsLoading(false);
      toast.error(detailCommentConfig.errorAdd);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{detailCommentConfig.title}</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          disabled={isLoading}
          className="flex items-center justify-center gap-x-2"
        >
          {isLoading ? (
            <Shell className="h-4 w-4 animate-spin" />
          ) : (
            <SendIcon className="mr-2 h-4 w-4" />
          )}
          <span>{detailCommentConfig.submit}</span>
        </Button>
      </form>
    </Form>
  );
};

export default DetailPostCommentForm;
