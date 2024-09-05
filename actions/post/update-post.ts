"use server";

import { postUpdateSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { handleServerError } from "@/lib/utils/error";

export async function UpdatePost(context: z.infer<typeof postUpdateSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const post = postUpdateSchema.parse(context);

    const { data, error } = await supabase
      .from("posts")
      .update({
        id: post.id,
        title: post.title,
        slug: post.slug,
        category_id: post.categoryId,
        description: post.description,
        image: post.image,
        content: post.content,
        published: post.published,
      })
      .match({ id: post.id })
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
