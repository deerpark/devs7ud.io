import { CustomImage } from "@/components/shared/shared-image";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { FocusPostWithCategory } from "@/types/collection";
import Link from "next/link";
import * as React from "react";

export const dynamic = "force-dynamic";

interface AsidePostItemProps {
  post: FocusPostWithCategory;
}

const AsidePostItem: React.FC<AsidePostItemProps> = async ({ post }) => {
  // Get bookmark status
  const image = post.post_image
    ? await getPublicImageUrl("cover-image", post.post_image || "")
    : "";

  return (
    <li>
      <Link
        href="/"
        className="flex items-center gap-x-3 rounded-xl p-3 hover:bg-accent/50 active:bg-accent/70"
      >
        <article className="relative aspect-[1/1.25] w-full overflow-hidden rounded-xl bg-accent shadow-2xl">
          <CustomImage
            src={image}
            alt={post.post_title ?? ""}
            height={256}
            width={256}
            priority
            className="absolute inset-0 h-full w-full rounded-2xl object-cover"
          />
          <span className="absolute inset-x-0 bottom-0 z-10 flex flex-col">
            <span className="flex-none p-3">
              <span className="rounded-md border bg-background px-1 py-0.5 text-xs font-semibold text-muted-foreground">
                {post.category_title}
              </span>
            </span>
            <span className="relative flex flex-1 flex-col p-3">
              <span className="relative z-10 flex items-center gap-x-3">
                <span className="line-clamp-1 flex-1 text-sm font-semibold">
                  {post.post_title}
                </span>
              </span>
              <span className="relative z-10 line-clamp-1 text-sm text-foreground/80">
                {post.post_description}
              </span>
              <span className="absolute inset-0 z-0 bg-background/90 p-3 backdrop-blur-sm" />
            </span>
          </span>
        </article>
      </Link>
    </li>
  );
};

export default AsidePostItem;
