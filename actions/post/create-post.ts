"use server";

import { postCreateSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { handleServerError } from "@/lib/utils/error";

export async function CreatePost(context: z.infer<typeof postCreateSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const post = postCreateSchema.parse(context);
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: post.title,
        author_id: post.user_id,
      })
      .select()
      .single();

    if (error) {
      handleServerError(error.message);
      return null;
    }
    return data;
  } catch (error) {
    handleServerError((error as Error)?.message);
    return null;
  }
}
