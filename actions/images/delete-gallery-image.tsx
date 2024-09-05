"use server";

import { createClient } from "@/lib/supabase/server";
import { handleServerError } from "@/lib/utils/error";
import { imageDeleteSchema } from "@/lib/validation/image";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import * as z from "zod";

export async function DeleteGalleryImage(
  context: z.infer<typeof imageDeleteSchema>,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { userId, postId, fileName } = imageDeleteSchema.parse(context);
    const bucketName =
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE ||
      "gallery-image";

    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([`${userId}/${postId}/${fileName}`]);

    if (error) {
      handleServerError(error.message);
    }
    if (data?.length && data?.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      handleServerError(error.message);
      return false;
    }
    return false;
  }
}
