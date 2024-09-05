import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { notFound } from "next/navigation";
import { handleServerError } from "./error-server";

export async function getPost(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const response = await supabase
      .from("posts")
      .select(`*, categories(*), profiles(*)`)
      .match({ slug: slug, published: true })
      .single<PostWithCategoryWithProfile>();

    if (!response.data) {
      notFound();
    }
    return response.data;
  } catch (error) {
    handleServerError((error as Error)?.message);
    return null;
  }
}