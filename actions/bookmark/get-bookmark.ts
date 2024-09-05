"use server";

import { bookmarkSchema } from "@/lib/validation/bookmark";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { handleServerError } from "@/lib/utils/error";

export async function GetBookmark(context: z.infer<typeof bookmarkSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const bookmark = bookmarkSchema.parse(context);

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .match({ id: bookmark.id, user_id: bookmark.user_id });

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
