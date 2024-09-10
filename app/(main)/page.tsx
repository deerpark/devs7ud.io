import { MainPostItem, MainPostItemLoading } from "@/components/main";
import CategoryHeader from "@/components/main/category/category-header";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/utils/user-id";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { Shell } from "lucide-react";
import { cookies } from "next/headers";
import * as React from "react";
import { v4 } from "uuid";

const getData = React.cache(async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const userId = await getUserId();

  // Fetch posts
  const { data, error } = await supabase
    .from("posts")
    .select(`*, categories(*), profiles(*)`)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(0, 10)
    .returns<PostWithCategoryWithProfile[]>();

  if (error) {
    throw error;
  }

  return { data, userId };
});

export default async function HomePage() {
  const { data, userId } = await getData();

  return (
    <>
      <CategoryHeader title="업데이트" className="hidden md:flex" />
      <div className="divide-y divide-border/50 border-t border-border/50 md:border-t-0">
        {data?.map((post) => (
          <React.Suspense
            key={v4()}
            fallback={
              <div className="flex h-auto min-h-52 w-full flex-1 items-center justify-center">
                <Shell size={32} className="animate-spin text-foreground/30" />
              </div>
            }
          >
            <MainPostItem post={post} userId={userId} />
          </React.Suspense>
        ))}
      </div>
    </>
  );
}
