import { CustomImage } from "@/components/shared/shared-image";
import { createClient } from "@/lib/supabase/server";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { FocusPostWithCategory } from "@/types/collection";
import { Eraser, Shell } from "lucide-react";
import { cookies } from "next/headers";
import * as React from "react";
import { v4 } from "uuid";
import AsidePostItem from "../post/aside-post-item";

const getData = React.cache(async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch posts
  const { data, error } = await supabase
    .rpc("get_random_posts", { limit_count: 1 })
    .returns<{ result: FocusPostWithCategory }[]>();

  if (error) {
    throw error;
  }
  return { data: data.map((d) => d.result) };
});

export default async function MainAside() {
  const { data } = await getData();
  return (
    <div className="w-auto flex-none md:hidden lg:block lg:max-w-sm">
      <div className="flex flex-col gap-y-3 py-9 pl-3 pr-3 md:w-72 lg:sticky lg:top-0 lg:z-50 lg:pr-6">
        <div className="flex items-center gap-x-2">
          <h2 className="px-3 text-xl font-black">포커스</h2>
        </div>
        <ul className="flex flex-col gap-y-2">
          {data?.length ? (
            data.map((post) => (
              <React.Suspense
                key={v4()}
                fallback={
                  <li className="flex h-auto min-h-52 w-full flex-1 items-center justify-center">
                    <Shell
                      size={32}
                      className="animate-spin text-foreground/30"
                    />
                  </li>
                }
              >
                <AsidePostItem post={post} />
              </React.Suspense>
            ))
          ) : (
            <div className="mx-5 my-5 rounded-lg border-2 border-dashed bg-background p-3 text-center">
              <Eraser
                size={64}
                className="mx-auto block text-foreground/50"
                strokeWidth={1.5}
              />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
