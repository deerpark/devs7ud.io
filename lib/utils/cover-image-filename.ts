import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

// Get Cover image filename and public url
export async function getCoverImageFileName(
  bucketName: string,
  userId: string,
  postId: string,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${userId}/${postId}`, {
      limit: 1,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });

  if (error) {
    console.log("Error has occured while collection filenames from bucket!");
    console.log("Error message : ", error.message);
    return null;
  }

  if (data && data.length > 0) {
    return data[0].name;
  }
  return null;
}