"use client";

import {
  DetailPostCommentForm,
  DetailPostCommentItem,
  DetailPostCommentWrapper,
  DetailPostSignInToComment,
} from "@/components/detail/post/comment";
import { useAuth } from "@/hooks/use-auth";
import { CommentWithProfile } from "@/types/collection";
import * as React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DetailPostCommentProps {
  postId: string;
  comments: CommentWithProfile[];
}

const DetailPostComment: React.FC<DetailPostCommentProps> = ({
  postId = "",
  comments = [],
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DetailPostCommentWrapper>
      {user ? (
        <DetailPostCommentForm postId={postId} userId={user.id} />
      ) : (
        <DetailPostSignInToComment />
      )}
      <div className="flex flex-col gap-y-3">
        {comments?.map((comment) => (
          <DetailPostCommentItem
            key={comment.id.toString()}
            id={comment.id.toString()}
            name={comment.profiles.full_name as string}
            image={comment.profiles.avatar_url as string}
            comment={comment.comment as string}
            date={comment.created_at as string}
            userId={comment.user_id as string}
          />
        ))}
      </div>
    </DetailPostCommentWrapper>
  );
};

export default DetailPostComment;
