import { CustomImage } from "@/components/shared/shared-image";
import { categoryIcons } from "@/config/main/main-category-config";
import { getGalleryImageFileNames } from "@/lib/utils/gallery-image-filenames";
import { getGalleryImageUrls } from "@/lib/utils/gallery-image-url";
import { getPublicImageUrl } from "@/lib/utils/image-url";
import { FocusPostWithCategory } from "@/types/collection";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export const dynamic = "force-dynamic";

interface AsidePostItemProps {
  post: FocusPostWithCategory;
  userId: string | null;
}

const bucketNameGalleryImage =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE!;

const AsidePostItem: React.FC<AsidePostItemProps> = async ({
  post: { post, category },
  userId,
}) => {
  // Get bookmark status
  const image = post.image
    ? await getPublicImageUrl("cover-image", post.image || "")
    : "";

  const Icon = categoryIcons[category.slug] as React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;

  // Gallery images setup
  const galleryImageFileNames = await getGalleryImageFileNames(
    bucketNameGalleryImage,
    userId,
    post.id,
  );
  const galleryImagePublicUrls = await getGalleryImageUrls(
    bucketNameGalleryImage,
    userId || "",
    post.id,
    galleryImageFileNames || [],
  );

  return (
    <li>
      <Link
        href={`/posts/${post.slug}`}
        className="flex items-center gap-x-3 rounded-2xl p-3 hover:bg-accent/50 active:bg-accent/70"
      >
        <article>
          <CustomImage
            src={image}
            alt={post.title ?? ""}
            height={256}
            width={256}
            priority
            className="pointer-events-none max-h-56 w-full rounded-2xl object-cover shadow-md shadow-muted ring-1 ring-border/50 lg:aspect-[1/0.5] lg:max-h-none"
          />
          <div className="py-3">
            <span className="line-clamp-1 flex-1 font-semibold text-muted-foreground">
              {post.title}
            </span>
            <span className="line-clamp-1 text-sm text-muted-foreground/50">
              {post.description}
            </span>
            <span className="inline-flex items-center gap-x-1 rounded-md bg-primary px-1 py-0.5 text-primary-foreground">
              <Icon size={12} strokeWidth={2} />
              <span className="text-xs font-semibold">{category.title}</span>
            </span>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default AsidePostItem;
