import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

// Get Gallery images filenames and public urls
export async function getGalleryImageFileNames(bucketName: string, userId: string | null, postId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${userId}/${postId}`, {
      limit: 10,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });

  if (error) {
    console.log("Error has occured while collection filenames from bucket!");
    console.log("Error message : ", error.message);
    return null;
  }

  if (data) {
    const result = data?.map((item) => item.name);
    return result;
  }
  return null;
}