"use server";

import { postDeleteSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { handleServerError } from "@/lib/utils/error";

export async function DeletePost(context: z.infer<typeof postDeleteSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const post = postDeleteSchema.parse(context);

    const { data, error } = await supabase
      .from("posts")
      .delete()
      .match({ id: post.id, author_id: post.user_id })
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
