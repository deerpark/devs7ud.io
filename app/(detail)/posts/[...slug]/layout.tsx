import { DetailPostHeader } from "@/components/detail/post";
import { MainFooter, MainHeader } from "@/components/main";
import MainAside from "@/components/main/aside/main-aside";
import { getBookmark } from "@/lib/utils/bookmark";
import { getComments } from "@/lib/utils/comments";
import { handleServerError } from "@/lib/utils/error";
import { getPost } from "@/lib/utils/post";
import { getUserId } from "@/lib/utils/user-id";
import { CommentWithProfile } from "@/types/collection";
import { notFound } from "next/navigation";

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
}) {
  const post = await getPost(params);
  const userId = await getUserId();

  if (!post) {
    notFound();
  }
  // Set post views
  // const slug = params?.slug?.join("/");

  // Check user logged in or not
  let isBookmarked: boolean | undefined = false;
  let comments: CommentWithProfile[] = [];
  try {
    // Get bookmark status
    isBookmarked = await getBookmark(post.id as string, userId as string);

    // Get comments
    comments = await getComments(post.id as string);
  } catch (error) {
    handleServerError((error as Error)?.message);
  }
  return (
    <div
      className="flex min-h-screen flex-col items-center bg-background"
      vaul-drawer-wrapper="true"
    >
      <div className="flex w-full max-w-5xl flex-1 flex-col justify-center md:flex-row">
        <MainHeader />

        <div className="flex flex-1 flex-col gap-y-2 px-0 pb-9 md:px-5 md:pt-[22px]">
          <DetailPostHeader
            post={post}
            userId={userId}
            totalComments={comments.length}
            isBookmarked={isBookmarked}
          />
          {children}
        </div>
        <MainAside />
      </div>
      <MainFooter />
    </div>
  );
}
