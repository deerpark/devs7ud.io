import {
  DetailPostComment,
  DetailPostFloatingBar,
  DetailPostHeading,
} from "@/components/detail/post";
import { DetailPostScrollUpButton } from "@/components/detail/post/buttons";
import { WysiwygContents } from "@/components/protected/editor/contents";
import { seoData } from "@/config/root/seo";
import { createClient } from "@/lib/supabase/server";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import { getBookmark } from "@/lib/utils/bookmark";
import { getComments } from "@/lib/utils/comments";
import { handleServerError } from "@/lib/utils/error";
import { getPost } from "@/lib/utils/post";
import {
  CommentWithProfile,
  PostWithCategoryWithProfile,
} from "@/types/collection";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import readingTime, { ReadTimeResults } from "reading-time";

export const revalidate = 30;

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params);
  const truncateDescription =
    post?.description?.slice(0, 100) + ("..." as string);
  const slug = "/posts/" + post?.slug;

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: {
      name: seoData.author.name,
      url: seoData.author.twitterUrl,
    },
    openGraph: {
      title: post.title as string,
      description: post.description as string,
      type: "article",
      url: getUrl() + slug,
      images: [
        {
          url: getOgImageUrl(
            post.title as string,
            truncateDescription as string,
            [post.categories?.title as string] as string[],
            slug as string,
          ),
          width: 1200,
          height: 630,
          alt: post.title as string,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title as string,
      description: post.description as string,
      images: [
        getOgImageUrl(
          post.title as string,
          truncateDescription as string,
          [post.categories?.title as string] as string[],
          slug as string,
        ),
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  // Get post data
  const post = await getPost(params);
  if (!post) {
    notFound();
  }

  let comments: CommentWithProfile[] = [];
  try {
    // Get comments
    comments = await getComments(post.id as string);
  } catch (error) {
    handleServerError((error as Error)?.message);
  }

  return (
    <>
      <div className="border-t px-5 pt-5 md:border-t-0 md:px-6 md:pt-0">
        <div className="rounded-lg bg-background">
          <div className="relative mx-auto max-w-5xl py-2">
            {/* Heading */}
            <DetailPostHeading post={post} />
          </div>
          {/* Content */}
          <WysiwygContents content={post.content} />
        </div>
        <DetailPostComment
          postId={post.id as string}
          comments={comments as CommentWithProfile[]}
        />
      </div>
      <DetailPostScrollUpButton />
    </>
  );
}
