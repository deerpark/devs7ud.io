import Editor from "@/components/protected/editor/editor";
import { Separator } from "@/components/ui/separator";
import { protectedEditorConfig } from "@/config/protected";
import { getCoverImageFileName } from "@/lib/utils/cover-image-filename";
import { getCoverImageUrl } from "@/lib/utils/cover-image-url";
import { getGalleryImageFileNames } from "@/lib/utils/gallery-image-filenames";
import { getGalleryImageUrls } from "@/lib/utils/gallery-image-url";
import { getPostById } from "@/lib/utils/post-by-id";
import { getUserId } from "@/lib/utils/user-id";
import { notFound } from "next/navigation";

export const revalidate = 30;

interface PostEditorPageProps {
  params: { postId: string };
}

export default async function PostEditorPage({ params }: PostEditorPageProps) {
  const bucketNameCoverImage =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE!;
  const bucketNameGalleryImage =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE!;
  const userId = await getUserId();
  const post = await getPostById(params.postId, userId || "");

  // Cover image setup
  const coverImageFileName = await getCoverImageFileName(
    bucketNameCoverImage,
    userId || "",
    params.postId,
  );
  const coverImagePublicUrl = await getCoverImageUrl(
    bucketNameCoverImage,
    userId || "",
    params.postId,
    coverImageFileName || "",
  );

  // Gallery images setup
  const galleryImageFileNames = await getGalleryImageFileNames(
    bucketNameGalleryImage,
    userId,
    params.postId,
  );
  const galleryImagePublicUrls = await getGalleryImageUrls(
    bucketNameGalleryImage,
    userId || "",
    params.postId,
    galleryImageFileNames || [],
  );

  if (!post) {
    return notFound;
  }

  return (
    <div className="max-w-5xl px-10">
      <div>
        <h3 className="text-lg font-medium">{protectedEditorConfig.title}</h3>
        <p className="py-2 text-sm text-muted-foreground">
          {protectedEditorConfig.description}
        </p>
      </div>
      <Separator className="mb-5 max-w-2xl" />
      <Editor
        post={post}
        userId={userId || ""}
        coverImageFileName={coverImageFileName || ""}
        coverImagePublicUrl={coverImagePublicUrl || ""}
        galleryImageFileNames={galleryImageFileNames || []}
        galleryImagePublicUrls={galleryImagePublicUrls || []}
      />
    </div>
  );
}
