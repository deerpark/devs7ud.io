import { CustomImage } from "@/components/shared/shared-image";
import { categoryIcons } from "@/config/main/main-category-config";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { FocusPostWithCategory } from "@/types/collection";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export const dynamic = "force-dynamic";

interface AsidePostItemProps {
  post: FocusPostWithCategory;
}

const AsidePostItem: React.FC<AsidePostItemProps> = async ({
  post: { post, category },
}) => {
  // Get bookmark status
  const image = post.image
    ? await getPublicImageUrl("cover-image", post.image || "")
    : "";

  const Icon = categoryIcons[category.slug] as React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;

  return (
    <li>
      <Link
        href={`/posts/${post.slug}`}
        className="flex items-center gap-x-3 rounded-xl p-3 hover:bg-accent/50 active:bg-accent/70"
      >
        <article className="relative aspect-[1.25/1] w-full overflow-hidden rounded-xl bg-accent shadow-2xl">
          <CustomImage
            src={image}
            alt={post.title ?? ""}
            height={256}
            width={256}
            priority
            className="absolute inset-0 h-full w-full rounded-2xl object-cover"
          />
          <span className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-x-3 p-3">
            <span className="relative z-10 flex-1">
              <span className="flex items-center gap-x-3">
                <span className="line-clamp-1 flex-1 text-sm font-semibold text-muted-foreground/90">
                  {post.title}
                </span>
              </span>
              <span className="line-clamp-1 text-xs text-muted-foreground/70">
                {post.description}
              </span>
            </span>
            <span className="absolute inset-0 z-0 bg-background p-3" />
            <span className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-muted text-muted-foreground/80">
              <Icon size={20} strokeWidth={1.5} />
            </span>
          </span>
        </article>
      </Link>
    </li>
  );
};

export default AsidePostItem;
