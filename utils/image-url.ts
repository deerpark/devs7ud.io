import { cookies } from "next/headers";
import { getUserId } from "./user-id";
import { createClient } from "./supabase/server";

export async function getPublicImageUrl(postId: string, bucketName: string = "", fileName: string) {
  const userId = await getUserId();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const bucketNameFallback =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS || "posts";
  const { data } = supabase.storage
    .from(bucketName || bucketNameFallback)
    .getPublicUrl(`${userId}/${postId}/${fileName}`);

  if (data && data.publicUrl) return data.publicUrl;

  return "/images/not-found.jpg";
}