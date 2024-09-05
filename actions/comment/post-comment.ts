"use server";

import { commentSchema } from "@/lib/validation/comment";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { handleServerError } from "@/lib/utils/error";

export async function PostComment(context: z.infer<typeof commentSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const comment = commentSchema.parse(context);
    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: comment.postId,
        user_id: comment.userId,
        comment: comment.comment,
      })
      .single();

    if (error) {
      handleServerError(error.message);
      return false;
    }
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      handleServerError(error.message);
      return false;
    }
    return false;
  }
}
