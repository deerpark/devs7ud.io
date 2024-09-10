import { MainPostItem, MainPostItemLoading } from "@/components/main";
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
      <div className="hidden items-center md:flex md:gap-y-2">
        <h2 className="sticky top-0 z-40 border-b border-border/50 bg-background px-3 pb-4 text-xl font-black tracking-tight md:border-b-0 md:bg-transparent md:px-5 md:pb-0">
          업데이트
        </h2>
      </div>
      <div className="divide-y divide-border/50">
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
