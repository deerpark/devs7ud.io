import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export async function getGalleryImageUrls(
  bucketName: string,
  userId: string,
  postId: string,
  fileNames: string[],
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let filePublicUrls: string[] = [];
  fileNames.map((fileName) => {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`${userId}/${postId}/${fileName}`);

    data && filePublicUrls.push(data.publicUrl);
  });

  return filePublicUrls;
}