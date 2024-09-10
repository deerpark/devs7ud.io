import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export async function getCoverImageUrl(
  bucketName: string,
  userId: string,
  postId: string,
  fileName: string,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${userId}/${postId}/${fileName}`);

  return data.publicUrl;
}