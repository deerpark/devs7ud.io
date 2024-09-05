import { MainPostItem, MainPostItemLoading } from "@/components/main";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/utils/user-id";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { Shell } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { v4 } from "uuid";

export const revalidate = 0;

export default async function HomePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const userId = await getUserId();

  // Pagination
  const limit = 10;
  const from = 0;
  const to = limit;

  // Fetch posts
  const { data, error } = await supabase
    .from("posts")
    .select(`*, categories(*), profiles(*)`)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(from, to)
    .returns<PostWithCategoryWithProfile[]>();

  if (error) {
    notFound();
  }

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
