import { MainPostItem, MainPostItemLoading } from "@/components/main";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/utils/user-id";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { Shell } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";
import { v4 } from "uuid";

const getData = cache(async () => {
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
      <div className="flex items-center gap-x-2">
        <h2 className="px-3 text-xl font-black">업데이트</h2>
      </div>
      <div className="space-y-6">
        {data?.map((post) => (
          <Suspense
            key={v4()}
            fallback={
              <div className="flex h-full w-full flex-1 items-center justify-center">
                <Shell size={32} className="animate-spin" />
              </div>
            }
          >
            <MainPostItem post={post} userId={userId} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
