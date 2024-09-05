import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { CommentWithProfile } from "@/types/collection";
import { handleServerError } from "./error";

export async function getComments(postId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  if (!postId) return [];
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*, profiles(*)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
      .returns<CommentWithProfile[]>();

    if (error) {
      throw new Error(error.message);
    }
    return comments;
  } catch (error) {
    handleServerError((error as Error)?.message);
    return [];
  }
}