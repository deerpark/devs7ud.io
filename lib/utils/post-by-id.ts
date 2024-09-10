import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { Draft } from "@/types/collection";

export async function getPostById(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .match({ id: postId, author_id: userId })
    .single<Draft>();

    if (error) {
      console.log("Error has occured while getting post data");
      console.log("Error message : ", error.message);
      return null;
    }
}