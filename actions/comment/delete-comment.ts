"use server";

import { commentDeleteSchema } from "@/lib/validation/comment";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { handleServerError } from "@/lib/utils/error";

export async function DeleteComment(
  context: z.infer<typeof commentDeleteSchema>,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const comment = commentDeleteSchema.parse(context);

    const { data, error } = await supabase
      .from("comments")
      .delete()
      .match({ id: comment.id, user_id: comment.userId })
      .select();

    if (error) {
      handleServerError(error.message);
      return false;
    }
    if (data && data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof z.ZodError) {
      handleServerError(error.message);
      return false;
    }
    return false;
  }
}
