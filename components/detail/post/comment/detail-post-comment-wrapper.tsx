import React, { FC } from "react";

interface DetailPostCommentWrapperProps {
  children?: React.ReactNode;
}

const DetailPostCommentWrapper: FC<DetailPostCommentWrapperProps> = ({
  children,
}) => {
  return (
    <div
      id="comments"
      className="mx-auto my-5 flex max-w-5xl flex-col gap-y-3 rounded-2xl bg-muted/50 p-3"
    >
      {children}
    </div>
  );
};

export default DetailPostCommentWrapper;
